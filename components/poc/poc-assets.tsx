import { PresentationEmbed } from "@/components/media/presentation-embed";
import { VideoEmbed } from "@/components/media/video-embed";
import type { Poc } from "@/content/types";
import { getPoc } from "@/lib/pocs";
import { cn } from "@/lib/cn";

// Standalone POC asset blocks. The POC page is built from these, and other sections
// (Use Cases, agent pages) embed them by slug so asset URLs live only on the POC.

export function PocVideo({ poc }: { poc: Poc }) {
  return <VideoEmbed video={poc.video} />;
}

export function PocPresentation({ poc }: { poc: Poc }) {
  return poc.presentation ? <PresentationEmbed presentation={poc.presentation} /> : null;
}

/** Video and presentation together, side by side on wide screens when both exist. */
export function PocAssets({ slug, className }: { slug: string; className?: string }) {
  const poc = getPoc(slug);
  if (!poc) return null;
  return (
    <div className={cn("grid gap-6", poc.presentation && "lg:grid-cols-2", className)}>
      <PocVideo poc={poc} />
      <PocPresentation poc={poc} />
    </div>
  );
}
