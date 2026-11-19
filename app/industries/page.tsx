import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { IndustryPanels } from "@/components/sections/industry-panels";
import { Section, SectionHeader } from "@/components/sections/section";
import { agentsForIndustry, getAgent } from "@/content/agents";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Enterprise AI and integration services for healthcare and manufacturing, plus finance and operations workflows that apply across industries.",
  path: "/industries",
});

export default function IndustriesPage() {
  const ap = getAgent("ap-vendor-email-assistant");
  return (
    <>
      <Hero
        eyebrow="Industries"
        title="Two industries in depth. Enterprise operations everywhere."
        lede="We focus on healthcare and manufacturing, where administrative and operational load is heaviest. Finance, IT and operations work applies to any sector."
        primary={site.primaryCta}
        breadcrumbs={[{ label: "Industries", href: "/industries" }]}
      />

      <section aria-labelledby="industries-title" className="txm-section-dark border-t border-white/10 py-20 lg:py-28">
        <div className="txm-container">
          <h2 id="industries-title" className="sr-only">
            Industries we serve
          </h2>
          <IndustryPanels
            panels={industries.map((i) => ({
              title: i.name,
              description: i.summary,
              meta: `${agentsForIndustry(i.slug).length} validated agents · ${i.useCaseRows.length} mapped workflows`,
              href: `/industries/${i.slug}`,
              image: i.image,
            }))}
          />
        </div>
      </section>

      <Section tone="light" labelledBy="ops-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionHeader
            id="ops-title"
            title="Finance, IT and operations work in any sector."
            description="Accounts payable, integration, platform support and governance look similar across industries. Our service domains and cross-industry agents cover them."
          />
          <ul className="border-t border-txm-line">
            {[
              ...(ap ? [{ href: `/ai-agents/${ap.slug}`, title: ap.name, detail: `Cross-industry agent for ${ap.businessFunction.toLowerCase()}` }] : []),
              { href: "/services", title: "Enterprise AI Services", detail: "Five domains, from the foundation to managed services" },
            ].map((l) => (
              <li key={l.href} className="border-b border-txm-line">
                <Link href={l.href} className="txm-focus group flex items-start justify-between gap-6 py-6">
                  <span>
                    <span className="txm-h3 block text-txm-ink group-hover:text-txm-accent">{l.title}</span>
                    <span className="txm-body mt-1 block text-txm-slate">{l.detail}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 h-6 w-6 shrink-0 text-txm-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTABand
        title="Working in another industry?"
        description="Tell us about the workflow. If it sits on platforms and integrations we know, we can help."
        primary={site.primaryCta}
      />
    </>
  );
}
