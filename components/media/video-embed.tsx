"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoAsset } from "@/content/types";

const SEEK_EVENT = "txm:video-seek";

interface SeekDetail {
  embedUrl: string;
  seconds: number;
}

/** Starts the matching VideoEmbed on the page at `seconds`. */
export function seekVideo(video: VideoAsset, seconds: number) {
  window.dispatchEvent(new CustomEvent<SeekDetail>(SEEK_EVENT, { detail: { embedUrl: video.embedUrl, seconds } }));
}

/**
 * POC video player (UX01: new). Shows a thumbnail, play button and title.
 * The third-party iframe loads only after the visitor presses play.
 */
export function VideoEmbed({ video }: { video: VideoAsset }) {
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function onSeek(e: Event) {
      const { embedUrl, seconds } = (e as CustomEvent<SeekDetail>).detail;
      if (embedUrl !== video.embedUrl) return;
      setStart(seconds);
      setPlaying(true);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.addEventListener(SEEK_EVENT, onSeek);
    return () => window.removeEventListener(SEEK_EVENT, onSeek);
  }, [video.embedUrl]);

  const params = `autoplay=1${start > 0 ? `&start=${start}` : ""}`;

  return (
    <figure ref={ref} className="overflow-hidden rounded-2xl border border-txm-line bg-txm-base shadow-txm-card">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            key={start}
            src={`${video.embedUrl}${video.embedUrl.includes("?") ? "&" : "?"}${params}`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="txm-focus-inverse group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${video.title}`}
          >
            <Image src={video.thumbnail} alt="" fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-txm-base/40 transition-colors group-hover:bg-txm-base/25" />
            <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-txm-elev transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-txm-base text-txm-base" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="font-semibold text-white">{video.title}</span>
        {video.duration && <span className="txm-small text-slate-400">{video.duration}</span>}
      </figcaption>
    </figure>
  );
}
