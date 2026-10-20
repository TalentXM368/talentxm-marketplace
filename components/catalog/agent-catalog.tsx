"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { agentIndustryFilters, agents, agentTypeFilters } from "@/content/agents";
import type { Agent } from "@/content/types";
import { AgentCard } from "./agent-card";
import { FilterGroup } from "./filter-controls";

function matches(agent: Agent, industry: string | null, type: string | null) {
  if (industry) {
    const ok =
      industry === "cross-industry"
        ? agent.industries.length === 0
        : agent.industries.includes(industry as Agent["industries"][number]);
    if (!ok) return false;
  }
  if (type && agent.agentType !== type) return false;
  return true;
}

/** Catalogue filters with state in the query string (Architecture S1, S7). */
export function AgentCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const industry = searchParams.get("industry");
  const type = searchParams.get("type");
  const results = agents.filter((a) => matches(a, industry, type));

  function update(key: "industry" | "type", value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-txm-line bg-white p-5 md:p-6">
        <FilterGroup
          label="Industry"
          options={agentIndustryFilters}
          value={industry}
          onChange={(v) => update("industry", v)}
        />
        <FilterGroup label="Agent type" options={agentTypeFilters} value={type} onChange={(v) => update("type", v)} />
      </div>

      <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="txm-small text-txm-slate" aria-live="polite">
          Showing {results.length} of {agents.length} agents
        </p>
        {(industry || type) && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="txm-focus txm-small font-semibold text-txm-indigo hover:text-txm-base"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <AgentGrid items={results} />
      ) : (
        <div className="rounded-2xl border border-dashed border-txm-line bg-white p-10 text-center">
          <p className="font-semibold text-txm-ink">No agents match these filters.</p>
          <p className="txm-small mt-2 text-txm-slate">
            Try another combination, or tell us about the workflow you have in mind.
          </p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="txm-focus txm-small mt-4 font-semibold text-txm-indigo hover:text-txm-base"
          >
            Show all agents
          </button>
        </div>
      )}
    </div>
  );
}

export function AgentGrid({ items }: { items: Agent[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <AgentCard key={a.slug} agent={a} />
      ))}
    </div>
  );
}
