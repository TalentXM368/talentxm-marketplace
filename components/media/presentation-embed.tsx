"use client";

import { useState } from "react";
import { Presentation } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { PresentationAsset } from "@/content/types";

/** POC presentation viewer. The Google Slides or Drive iframe loads only after the visitor opens it. */
export function PresentationEmbed({ presentation }: { presentation: PresentationAsset }) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-txm-line bg-white shadow-txm-card">
      <div className="relative aspect-video bg-txm-light">
        {open ? (
          <iframe
            src={presentation.embedUrl}
            title={presentation.title}
            allow="fullscreen"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="txm-focus group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4"
            aria-label={`View presentation: ${presentation.title}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-txm-card transition-transform group-hover:scale-105">
              <Presentation className="h-7 w-7 text-txm-indigo" aria-hidden="true" />
            </span>
            <span className="font-semibold text-txm-ink">View the presentation</span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-txm-line px-5 py-4">
        <span className="font-semibold text-txm-ink">{presentation.title}</span>
        <ButtonLink href={presentation.openUrl} variant="text" size="sm">
          Open in a new tab
        </ButtonLink>
      </figcaption>
    </figure>
  );
}
