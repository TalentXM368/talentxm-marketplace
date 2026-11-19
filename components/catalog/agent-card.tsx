import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/icon";
import { StatusChip } from "@/components/signature/signature";
import { agentIndustryLabel } from "@/content/agents";
import type { Agent } from "@/content/types";

/**
 * Agent card (UX01: reuse). Where it fits, what it is, the one outcome it delivers, and its main tools.
 * The full problem, workflow and controls live on the agent page; the whole card links there.
 */
export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="txm-card txm-card-hover group relative flex h-full flex-col p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <IconTile name={agent.icon} size="sm" />
        <StatusChip status={agent.status} />
      </div>
      <p className="txm-card-kicker mt-6 text-txm-accent">{agentIndustryLabel(agent)}</p>
      <h3 className="txm-card-title mt-2 text-txm-ink">
        <Link
          href={`/ai-agents/${agent.slug}`}
          className="txm-focus rounded-sm after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
        >
          {agent.name}
        </Link>
      </h3>
      <p className="txm-card-body mt-3 flex-1 text-txm-slate">{agent.outcomeLine}</p>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
        {agent.techTags.slice(0, 3).map((t) => (
          <li key={t.name} className="txm-tag">
            {t.name}
          </li>
        ))}
      </ul>
      <p
        className="mt-6 inline-flex items-center gap-1.5 border-t border-txm-line pt-5 text-sm font-semibold text-txm-navy"
        aria-hidden="true"
      >
        View agent
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}
