import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

/** One industry card version, always with a description (UX01). The whole card links to the industry. */
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
    <Link href={href} className="txm-focus group block h-full border-t border-txm-line pt-6">
      <div className="mb-5 flex items-start justify-between">
        <Icon name={icon} className="h-6 w-6 text-txm-accent" />
        <ArrowUpRight
          className="h-5 w-5 text-txm-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <h3 className="txm-card-title text-txm-ink group-hover:text-txm-accent">{title}</h3>
      <p className="txm-card-body mt-2 text-txm-slate">{description}</p>
    </Link>
  );
}

/**
 * A ruled column with an optional icon, a title and one or two sentences.
 * `size="md"` for four-column grids, where the large title would wrap into a narrow column.
 */
export function InfoCard({
  title,
  body,
  icon,
  size = "lg",
  className,
}: {
  title: string;
  body: string;
  icon?: IconName;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("h-full border-t border-txm-line pt-6", className)}>
      {icon && <Icon name={icon} className="mb-5 h-6 w-6 text-txm-accent" />}
      <h3 className="txm-card-title text-txm-ink" data-size={size === "lg" ? "lg" : undefined}>
        {title}
      </h3>
      <p className="txm-card-body mt-3 text-txm-slate">{body}</p>
    </div>
  );
}
