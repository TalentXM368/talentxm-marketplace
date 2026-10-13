import { Suspense } from "react";
import { AgentCatalog, AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { CheckList } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { StatusLegend } from "@/components/signature/signature";
import { agents } from "@/content/agents";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "AI agents for eligibility, scheduling, refills, machine health, technical documents and accounts payable, each with a published status.";

// Filtered URLs (?industry=…) share this canonical, so only the base catalogue is indexed (Architecture S7).
export const metadata = pageMetadata({ title: "AI Agents", description, path: "/ai-agents" });

export default function AgentsCatalogPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AI Agents",
          description,
          url: `${site.url}/ai-agents`,
          hasPart: agents.map((a) => ({ "@type": "Service", name: a.name, url: `${site.url}/ai-agents/${a.slug}` })),
        }}
      />
      <Hero
        eyebrow="AI Agents"
        title="Agents built for one workflow each, and labelled honestly."
        lede="Every agent here has been built and tested end to end. Each page shows what it does, what it does not do, and where a person makes the decision."
        image="/images/neural-bg.webp"
        primary={{ label: "Request an Agent Pilot", href: "#request-pilot" }}
        secondary={{ label: "How status is assigned", href: "#status" }}
        breadcrumbs={[{ label: "AI Agents", href: "/ai-agents" }]}
      />

      <Section tone="light" labelledBy="catalog-title" className="pt-12 md:pt-16">
        <h2 id="catalog-title" className="sr-only">
          Agent catalogue
        </h2>
        <div className="mb-10">
          <StatusLegend statuses={["available", "pilot", "validated-poc", "concept"]} />
        </div>
        <Suspense fallback={<AgentGrid items={agents} />}>
          <AgentCatalog />
        </Suspense>
      </Section>

      <Section id="status" labelledBy="status-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeader
            id="status-title"
            align="left"
            eyebrow="Status"
            title="How status is assigned."
            description="Status describes evidence, not ambition. It changes only when the evidence does, and the delivery lead signs off every change."
          />
          <CheckList
            items={[
              "Concept: designed and scoped with a client or internally. Nothing built yet.",
              "Validated POC: built end to end and tested against real APIs, sandboxes or demo connectors.",
              "Pilot: running with a client on real data under a pilot agreement.",
              "Available: deployed with at least one client and supported as a service.",
              "Every agent lists at least two things it does not do and at least one human decision point.",
            ]}
          />
        </div>
      </Section>

      <FormSection
        id="request-pilot"
        formId="F-02"
        sourcePage="/ai-agents"
        eyebrow="Request an Agent Pilot"
        title="Run an agent on your workflow."
        description="Choose an agent and tell us about the systems involved. We will scope a pilot with clear measures and human decision points."
      />
    </>
  );
}
