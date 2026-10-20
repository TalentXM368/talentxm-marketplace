"use client";

import { Play } from "lucide-react";
import { seekVideo } from "@/components/media/video-embed";
import type { VideoAsset, VideoMoment } from "@/content/types";
import { canSeek } from "@/lib/video";

function toSeconds(time: string) {
  return time.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** Key moments from a POC video. On YouTube videos each timestamp starts the player there. */
export function PocWalkthrough({ video, moments }: { video: VideoAsset; moments: VideoMoment[] }) {
  const seekable = canSeek(video);

  return (
    <ol className="relative space-y-8 border-l border-txm-line pl-8">
      {moments.map((m) => (
        <li key={m.time + m.title} className="relative">
          <span
            className="absolute top-1.5 -left-[37px] h-2.5 w-2.5 rounded-full bg-txm-indigo ring-4 ring-white"
            aria-hidden="true"
          />
          {seekable ? (
            <button
              type="button"
              onClick={() => seekVideo(video, toSeconds(m.time))}
              className="txm-focus inline-flex items-center gap-1.5 rounded-md bg-txm-indigo/10 px-2 py-0.5 text-sm font-semibold text-txm-indigo tabular-nums hover:bg-txm-indigo/15"
              aria-label={`Play from ${m.time}: ${m.title}`}
            >
              <Play className="h-3 w-3 fill-current" aria-hidden="true" />
              {m.time}
            </button>
          ) : (
            <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-700 tabular-nums">
              {m.time}
            </span>
          )}
          <h3 className="mt-2 text-lg font-bold text-txm-ink">{m.title}</h3>
          <p className="txm-body mt-1 text-txm-slate">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}
