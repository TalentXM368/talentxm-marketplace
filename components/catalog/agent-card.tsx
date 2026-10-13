import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/icon";
import { StatusChip } from "@/components/signature/signature";
import { agentIndustryLabel } from "@/content/agents";
import type { Agent } from "@/content/types";

/** Problem / How it works / Industry fit, with tags and a CTA (UX01: reuse). */
export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="txm-card txm-card-hover flex h-full flex-col p-7">
      <div className="mb-5 flex items-start justify-between gap-3">
        <IconTile name={agent.icon} size="sm" />
        <StatusChip status={agent.status} />
      </div>
      <p className="txm-small mb-1 font-medium text-txm-subtle">{agent.agentType}</p>
      <h3 className="mb-4 text-xl font-bold text-txm-ink">
        <Link href={`/ai-agents/${agent.slug}`} className="txm-focus hover:text-txm-indigo">
          {agent.name}
        </Link>
      </h3>
      <dl className="mb-5 flex-1 space-y-3">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">Problem</dt>
          <dd className="txm-small mt-1 text-txm-slate">{agent.currentWorkflow[0]}.</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">How it works</dt>
          <dd className="txm-small mt-1 text-txm-slate">{agent.summary}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">Industry fit</dt>
          <dd className="txm-small mt-1 text-txm-slate">{agentIndustryLabel(agent)}</dd>
        </div>
      </dl>
      <ul className="mb-6 flex flex-wrap gap-1.5" aria-label="Technologies">
        {agent.techTags.slice(0, 4).map((t) => (
          <li key={t.name} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {t.name}
          </li>
        ))}
      </ul>
      <Link
        href={`/ai-agents/${agent.slug}`}
        className="txm-focus inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txm-base px-4 py-2.5 font-semibold text-white transition-colors hover:bg-txm-surface"
        aria-label={`View ${agent.name}`}
      >
        View agent
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
