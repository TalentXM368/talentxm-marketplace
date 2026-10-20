import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Poc } from "@/content/types";
import { pocLabels, pocPath, pocTechnologies } from "@/lib/pocs";

/** Library card: thumbnail, category, title, summary and technologies. The whole card links to the POC. */
export function PocCard({ poc, headingLevel = "h3" }: { poc: Poc; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const techs = pocTechnologies(poc);
  const shown = techs.slice(0, 4);
  const more = techs.length - shown.length;

  return (
    <article className="txm-card txm-card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video bg-txm-base">
        <Image
          src={poc.video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-txm-base/25 transition-colors group-hover:bg-txm-base/10" />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-txm-elev">
          <Play className="ml-0.5 h-4 w-4 fill-txm-base text-txm-base" aria-hidden="true" />
        </span>
        {poc.video.duration && (
          <span className="absolute right-3 bottom-3 rounded-md bg-txm-base/85 px-2 py-0.5 text-xs font-semibold text-white">
            {poc.video.duration}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="txm-eyebrow text-txm-indigo">{pocLabels(poc).join(" · ")}</p>
        <Heading className="mt-2 text-lg font-bold text-txm-ink">
          <Link
            href={pocPath(poc.slug)}
            className="txm-focus after:absolute after:inset-0 after:content-[''] hover:text-txm-indigo"
          >
            {poc.title}
          </Link>
        </Heading>
        <p className="txm-small mt-2 flex-1 text-txm-slate">{poc.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {shown.map((t) => (
            <li key={t.slug} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {t.name}
            </li>
          ))}
          {more > 0 && (
            <li className="rounded-full px-1.5 py-1 text-xs font-medium text-txm-subtle">+{more} more</li>
          )}
        </ul>
      </div>
    </article>
  );
}

export function PocGrid({ items }: { items: Poc[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PocCard key={p.slug} poc={p} />
      ))}
    </div>
  );
}
