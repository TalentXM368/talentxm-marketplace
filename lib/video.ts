import type { VideoAsset } from "@/content/types";

/** Only YouTube embeds accept a start time; Drive previews always start at 0:00. */
export function canSeek(video: VideoAsset) {
  return video.embedUrl.includes("youtube");
}
