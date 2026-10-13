import { UserCheck } from "lucide-react";
import { statusDescriptions, statusLabels } from "@/content/agents";
import type { AgentStatus, EvidenceLevel, HumanDecisionPoint, TechTag } from "@/content/types";
import { cn } from "@/lib/cn";

const statusStyles: Record<AgentStatus, string> = {
  available: "bg-emerald-50 text-emerald-800 border-emerald-200",
  pilot: "bg-sky-50 text-sky-800 border-sky-200",
  "validated-poc": "bg-indigo-50 text-indigo-800 border-indigo-200",
  concept: "bg-slate-100 text-slate-700 border-slate-300",
};

/** Agent status, replacing the old "Live" badge. */
export function StatusChip({ status, className }: { status: AgentStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        statusStyles[status],
        className,
      )}
      title={statusDescriptions[status]}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

export function StatusLegend({ statuses }: { statuses: AgentStatus[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statuses.map((s) => (
        <div key={s} className="rounded-xl border border-txm-line bg-white p-4">
          <dt>
            <StatusChip status={s} />
          </dt>
          <dd className="txm-small mt-2 text-txm-slate">{statusDescriptions[s]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HumanDecisionPoints({ points }: { points: HumanDecisionPoint[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {points.map((p) => (
        <li key={p.step} className="flex gap-4 rounded-xl border border-txm-line bg-white p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-txm-base">
            <UserCheck className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-txm-ink">{p.step}</p>
            <p className="txm-small mt-0.5 font-medium text-txm-indigo">{p.who}</p>
            <p className="txm-small mt-2 text-txm-slate">{p.why}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const evidenceLabels: Record<EvidenceLevel, string> = {
  tested: "Tested",
  designed: "Designed for",
  experience: "Team experience",
};

const categoryLabels: Record<TechTag["category"], string> = {
  platform: "Platforms",
  integration: "Integration",
  ai: "AI",
  standard: "Standards",
};

/** Technology tags grouped by category, each with its evidence level. */
export function TechTags({ tags, inverse = false }: { tags: TechTag[]; inverse?: boolean }) {
  const groups = (Object.keys(categoryLabels) as TechTag["category"][])
    .map((category) => ({ category, items: tags.filter((t) => t.category === category) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.category}>
          <p className={cn("txm-eyebrow mb-3", inverse ? "text-slate-400" : "text-txm-subtle")}>
            {categoryLabels[g.category]}
          </p>
          <ul className="flex flex-wrap gap-2">
            {g.items.map((t) => (
              <li
                key={t.name}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm",
                  inverse ? "border-white/15 bg-white/5 text-white" : "border-txm-line bg-white text-txm-ink",
                )}
              >
                <span className="font-semibold">{t.name}</span>
                <span className={cn("text-xs", inverse ? "text-slate-400" : "text-txm-subtle")}>
                  {evidenceLabels[t.evidenceLevel]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
