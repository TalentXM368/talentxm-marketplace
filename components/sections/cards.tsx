import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IconTile } from "@/components/ui/icon";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Base card for every service listing (UX01: pillar card reused).
 * `layout="wide"` is the two-column offering-card variant.
 */
export function ServiceCard({
  title,
  description,
  href,
  icon,
  number,
  linkLabel = "Explore",
  layout = "stacked",
}: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  number?: string;
  linkLabel?: string;
  layout?: "stacked" | "wide";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "txm-card txm-focus group flex h-full p-7",
        layout === "wide" ? "flex-col gap-5 sm:flex-row sm:items-start" : "flex-col",
      )}
    >
      <div className={cn("flex items-start justify-between", layout === "stacked" && "mb-6")}>
        <IconTile name={icon} />
        {number && layout === "stacked" && <span className="txm-small font-mono text-txm-subtle">{number}</span>}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 text-xl font-bold text-txm-ink">{title}</h3>
        <p className="txm-body mb-6 flex-1 text-txm-slate">{description}</p>
        <span className="flex items-center gap-2 font-semibold text-txm-indigo">
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** One industry card version, always with a description (UX01). */
export function IndustryCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}) {
  return (
    <Link href={href} className="txm-card txm-focus group block h-full p-6">
      <div className="mb-4 flex items-start justify-between">
        <IconTile name={icon} size="sm" tone="dark" />
        <ArrowUpRight
          className="h-5 w-5 text-txm-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <h3 className="mb-1 text-lg font-bold text-txm-ink">{title}</h3>
      <p className="txm-small text-txm-slate">{description}</p>
    </Link>
  );
}

export function InfoCard({
  title,
  body,
  icon,
  label,
  className,
}: {
  title: string;
  body: string;
  icon?: IconName;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("txm-card h-full p-7", className)}>
      {icon && (
        <div className="mb-5">
          <IconTile name={icon} size="sm" />
        </div>
      )}
      {label && <p className="mb-2 font-mono text-sm text-txm-subtle">{label}</p>}
      <h3 className="mb-2 text-xl font-bold text-txm-ink">{title}</h3>
      <p className="txm-body text-txm-slate">{body}</p>
    </div>
  );
}
