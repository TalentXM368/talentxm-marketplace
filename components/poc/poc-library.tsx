"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { FilterButton, FilterGroup, MultiFilterGroup } from "@/components/catalog/filter-controls";
import type { Poc } from "@/content/types";
import { getPocs, pocTechnologies, usedBusinessFunctions, usedPocCategories, usedTechnologies } from "@/lib/pocs";
import { PocGrid } from "./poc-card";

const COLLAPSED_TECH_COUNT = 10;

type Key = "category" | "function" | "tech" | "q";

function matches(poc: Poc, category: string | null, fn: string | null, techs: string[], query: string) {
  if (category && !poc.categories.includes(category as Poc["categories"][number])) return false;
  if (fn && !poc.functions.includes(fn as Poc["functions"][number])) return false;
  if (techs.length > 0 && !poc.technologies.some((t) => techs.includes(t))) return false;
  if (query) {
    const haystack = [poc.title, poc.summary, ...pocTechnologies(poc).map((t) => t.name)].join(" ").toLowerCase();
    if (!haystack.includes(query.toLowerCase())) return false;
  }
  return true;
}

/** POC Library filters with state in the query string, so a filtered view can be shared. */
export function PocLibrary() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams.get("category");
  const fn = searchParams.get("function");
  const techs = searchParams.get("tech")?.split(",").filter(Boolean) ?? [];
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [showAllTech, setShowAllTech] = useState(false);

  const all = getPocs();
  const results = all.filter((p) => matches(p, category, fn, techs, query.trim()));
  const functions = usedBusinessFunctions();

  // Most-used technologies first, so the collapsed list shows the useful ones.
  const techOptions = usedTechnologies()
    .map((t) => ({ value: t.slug, label: t.name, count: all.filter((p) => p.technologies.includes(t.slug)).length }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  const visibleTech = showAllTech
    ? techOptions
    : techOptions.filter((o, i) => i < COLLAPSED_TECH_COUNT || techs.includes(o.value));

  function update(changes: Partial<Record<Key, string | null>>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function clear() {
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  const filtered = Boolean(category || fn || techs.length > 0 || query.trim());

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-txm-line bg-white p-5 md:p-6">
        <label className="relative block">
          <span className="sr-only">Search POCs</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-txm-subtle"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              update({ q: e.target.value.trim() || null });
            }}
            placeholder="Search by workflow, system or technology"
            className="txm-focus w-full rounded-lg border border-txm-line bg-white py-2.5 pr-4 pl-11 text-[15px] text-txm-ink placeholder:text-txm-subtle"
          />
        </label>
        <FilterGroup
          label="Industry"
          options={usedPocCategories().map((c) => ({ value: c.slug, label: c.name }))}
          value={category}
          onChange={(v) => update({ category: v })}
        />
        {functions.length > 0 && (
          <FilterGroup
            label="Business function"
            options={functions.map((f) => ({ value: f.slug, label: f.name }))}
            value={fn}
            onChange={(v) => update({ function: v })}
          />
        )}
        <MultiFilterGroup
          label="Technology"
          options={visibleTech}
          values={techs}
          onChange={(v) => update({ tech: v.join(",") || null })}
        >
          {techOptions.length > COLLAPSED_TECH_COUNT && (
            <FilterButton active={false} onClick={() => setShowAllTech((s) => !s)}>
              {showAllTech ? "Show fewer" : `Show all ${techOptions.length}`}
            </FilterButton>
          )}
        </MultiFilterGroup>
      </div>

      <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="txm-small text-txm-slate" aria-live="polite">
          Showing {results.length} of {all.length} POCs
        </p>
        {filtered && (
          <button
            type="button"
            onClick={clear}
            className="txm-focus txm-small font-semibold text-txm-indigo hover:text-txm-base"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <PocGrid items={results} />
      ) : (
        <div className="rounded-2xl border border-dashed border-txm-line bg-white p-10 text-center">
          <p className="font-semibold text-txm-ink">No POCs match these filters.</p>
          <p className="txm-small mt-2 text-txm-slate">
            Try another combination, or tell us about the workflow you have in mind.
          </p>
          <button
            type="button"
            onClick={clear}
            className="txm-focus txm-small mt-4 font-semibold text-txm-indigo hover:text-txm-base"
          >
            Show all POCs
          </button>
        </div>
      )}
    </div>
  );
}
