"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoAsset } from "@/content/types";

/**
 * POC video player (UX01: new). Shows a thumbnail, play button and title.
 * The third-party iframe loads only after the visitor presses play.
 */
export function VideoEmbed({ video }: { video: VideoAsset }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-txm-line bg-txm-base shadow-txm-card">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`${video.embedUrl}${video.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
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
