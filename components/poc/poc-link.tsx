import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { getPocsBySlug, pocPath } from "@/lib/pocs";

/** "Watch POC" links for a use case that references POCs by slug. */
export function PocLinks({ slugs }: { slugs?: string[] }) {
  const items = getPocsBySlug(slugs ?? []);
  if (items.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={pocPath(p.slug)}
            className="txm-focus txm-small inline-flex items-center gap-1.5 font-semibold text-txm-indigo hover:text-txm-base"
          >
            <PlayCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {items.length > 1 ? (
              <span>
                <span className="sr-only">Watch POC: </span>
                {p.title}
              </span>
            ) : (
              <span>
                Watch POC<span className="sr-only">: {p.title}</span>
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
