import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { IconTile } from "@/components/ui/icon";
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

      <Section labelledBy="industries-title">
        <h2 id="industries-title" className="sr-only">
          Industries we serve
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="txm-card txm-focus group flex flex-col overflow-hidden"
            >
              <div className="relative h-48 bg-txm-base">
                <Image src={i.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-txm-base/80 to-transparent" />
                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                  <IconTile name={i.icon} size="sm" />
                  <span className="text-2xl font-bold text-white">{i.name}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="txm-body text-txm-slate">{i.summary}</p>
                <p className="txm-small mt-4 text-txm-subtle">
                  {agentsForIndustry(i.slug).length} validated agents · {i.useCaseRows.length} mapped workflows
                </p>
                <span className="mt-6 flex items-center gap-2 font-semibold text-txm-indigo">
                  Explore {i.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="light" labelledBy="ops-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader
            id="ops-title"
            align="left"
            eyebrow="Enterprise operations"
            title="Finance, IT and operations work in any sector."
            description="Accounts payable, integration, platform support and governance look similar across industries. Our service domains and cross-industry agents cover them."
          />
          <div className="grid gap-4">
            {ap && (
              <Link href={`/ai-agents/${ap.slug}`} className="txm-card txm-focus group flex items-center gap-4 p-5">
                <IconTile name={ap.icon} size="sm" />
                <span className="flex-1">
                  <span className="block font-semibold text-txm-ink">{ap.name}</span>
                  <span className="txm-small block text-txm-slate">Cross-industry · {ap.businessFunction}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-txm-indigo" aria-hidden="true" />
              </Link>
            )}
            <Link href="/services" className="txm-card txm-focus group flex items-center gap-4 p-5">
              <IconTile name="layers" size="sm" />
              <span className="flex-1">
                <span className="block font-semibold text-txm-ink">Enterprise AI Services</span>
                <span className="txm-small block text-txm-slate">Five domains from the foundation to managed services</span>
              </span>
              <ArrowRight className="h-4 w-4 text-txm-indigo" aria-hidden="true" />
            </Link>
          </div>
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
