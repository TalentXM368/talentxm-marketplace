import { industries } from "@/content/industries";
import { businessFunctions, pocCategories, pocs, technologies } from "@/content/pocs";
import type { BusinessFunction, IndustrySlug, Poc, PocCategory, PocCategorySlug, Technology } from "@/content/types";

// The only module the UI reads POC data through. When POCs move to a Drive sync,
// Cloudflare or Sanity, these functions change and the pages do not.

export const pocLibraryPath = "/poc-library";

export function pocPath(slug: string) {
  return `${pocLibraryPath}/${slug}`;
}

/** Newest first. */
export function getPocs(): Poc[] {
  return [...pocs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPoc(slug: string) {
  return pocs.find((p) => p.slug === slug);
}

export function getPocsBySlug(slugs: string[]) {
  return slugs.map(getPoc).filter((p): p is Poc => Boolean(p));
}

/** Categories with at least one POC, so the filter never offers an empty result. */
export function usedPocCategories() {
  return pocCategories.filter((c) => pocs.some((p) => p.categories.includes(c.slug)));
}

export function usedBusinessFunctions() {
  return businessFunctions.filter((f) => pocs.some((p) => p.functions.includes(f.slug)));
}

export function getPocCategory(slug: PocCategorySlug) {
  return pocCategories.find((c) => c.slug === slug);
}

/** Category names first, then business functions, e.g. "Healthcare · Sales". */
export function pocLabels(poc: Poc) {
  const cats = poc.categories.map((c) => pocCategories.find((x) => x.slug === c)).filter((c): c is PocCategory => Boolean(c));
  const fns = poc.functions.map((f) => businessFunctions.find((x) => x.slug === f)).filter((f): f is BusinessFunction => Boolean(f));
  return [...cats, ...fns].map((x) => x.name);
}

export function getTechnologies() {
  return technologies;
}

export function getTechnology(slug: string) {
  return technologies.find((t) => t.slug === slug);
}

export function pocTechnologies(poc: Poc): Technology[] {
  return poc.technologies.map(getTechnology).filter((t): t is Technology => Boolean(t));
}

/** Technologies used by at least one POC, so the filter never offers an empty result. */
export function usedTechnologies() {
  const used = new Set(pocs.flatMap((p) => p.technologies));
  return technologies.filter((t) => used.has(t.slug));
}

export function pocsForAgent(agentSlug: string) {
  return getPocs().filter((p) => p.agent === agentSlug);
}

export function pocsForIndustry(slug: IndustrySlug) {
  return getPocs().filter((p) => p.industries.includes(slug));
}

/** Shared category first, then most shared technologies. */
export function relatedPocs(poc: Poc, limit = 3) {
  const score = (p: Poc) =>
    (p.categories.some((c) => poc.categories.includes(c)) ? 10 : 0) +
    p.technologies.filter((t) => poc.technologies.includes(t)).length;
  return getPocs()
    .filter((p) => p.slug !== poc.slug)
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

export interface PocUseCase {
  title: string;
  context: string;
  href: string;
}

/** Use cases that reference this POC. The future Use Cases section adds its entries here. */
export function getPocUseCases(slug: string): PocUseCase[] {
  return industries.flatMap((ind) =>
    ind.useCaseRows
      .filter((r) => r.pocs?.includes(slug))
      .map((r) => ({ title: r.workflow, context: ind.name, href: `/industries/${ind.slug}#use-cases` })),
  );
}
