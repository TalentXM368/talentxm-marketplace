import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceDomain } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The service stack as a large type index, top layer first (MOTION.md: "Spotlight index").
 * Each row brightens as it passes the middle of the screen. Every row links to its domain.
 * `current` marks the domain of the page being read; `detail="summary"` shows each domain's summary.
 */
export function StackIndex({
  domains,
  current,
  detail = "capabilities",
}: {
  domains: ServiceDomain[];
  current?: string;
  detail?: "capabilities" | "summary";
}) {
  return (
    <ol className="txm-index" aria-label="Five service domains, top layer first">
      {domains.map((d) => (
        <li key={d.slug}>
          <Link
            href={`/services/${d.slug}`}
            aria-current={current === d.slug ? "page" : undefined}
            className={cn("txm-index-row txm-focus-inverse group", current && current !== d.slug && "is-muted")}
          >
            <span className="txm-index-layer">
              <span aria-hidden="true">L{d.stackLayer}</span>
              <span className="sr-only">Layer {d.stackLayer}:</span>
            </span>
            <span className="txm-index-name">{d.menuLabel}</span>
            <span className="txm-index-caps">
              {detail === "summary" ? d.summary : d.capabilities.map((c) => c.name).join(", ")}
            </span>
            <ArrowUpRight
              className="txm-index-arrow h-6 w-6 text-txm-yellow transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
