import type { MetadataRoute } from "next";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import { legalPages } from "@/content/legal";
import { getPocs, pocLibraryPath, pocPath } from "@/lib/pocs";
import { serviceDomains } from "@/content/services";
import { site } from "@/content/site";

// Built from the content files. Filtered catalogue URLs and noindex pages are excluded (Architecture S7).
const lastModified = "2026-10-19";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...serviceDomains.map((d) => `/services/${d.slug}`),
    "/ai-agents",
    ...agents.map((a) => `/ai-agents/${a.slug}`),
    "/industries",
    ...industries.map((i) => `/industries/${i.slug}`),
    pocLibraryPath,
    ...getPocs().map((p) => pocPath(p.slug)),
    "/flexible-talent",
    "/work",
    "/about",
    "/trust",
    "/careers",
    "/contact",
    "/marketplace",
    ...legalPages.map((p) => `/legal/${p.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
