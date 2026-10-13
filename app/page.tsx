import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import {
  ClientLogoStrip,
  ComplianceRow,
  JourneySteps,
  StackDiagram,
  StatBand,
  TestimonialGrid,
} from "@/components/sections/blocks";
import { IndustryCard, ServiceCard } from "@/components/sections/cards";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { agents } from "@/content/agents";
import { deliveryModels } from "@/content/delivery";
import { industries } from "@/content/industries";
import { domainsByStack } from "@/content/services";
import { clientLogos, site, stats, testimonials } from "@/content/site";
import { evidenceItems } from "@/content/trust";
import { organizationLd, pageMetadata, websiteLd } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Enterprise AI Services",
    description:
      "TalentXM prepares your platforms and data, builds AI agents for specific workflows and staffs the teams that run them.",
    path: "/",
  }),
  title: { absolute: "TalentXM: Enterprise AI Services" },
};

const holistic = [
  {
    title: "Enterprise AI services",
    description: "Platforms, data and integration, AI and automation, and the cloud foundation beneath them.",
    href: "/services",
    icon: "layers" as const,
  },
  {
    title: "Validated AI agents",
    description: "Agents for specific workflows, each with a published status and named human decision points.",
    href: "/ai-agents",
    icon: "sparkles" as const,
  },
  {
    title: "Flexible delivery",
    description: "Specialists, capability pods, project teams and managed services across the US, LATAM and India.",
    href: "/flexible-talent",
    icon: "users" as const,
  },
  {
    title: "Governed by design",
    description: "Scoped access, audit trails and evaluation measures agreed before any pilot begins.",
    href: "/trust",
    icon: "shield" as const,
  },
];

const journey = [
  { title: "Define", body: "We map one workflow with you: the outcome, the systems it touches and who makes each decision." },
  { title: "Match", body: "We choose the delivery model and the people, from a single specialist to a capability pod." },
  { title: "Deploy", body: "We build in your environment, report against the measures agreed on day one and hand over runbooks." },
];

export default function HomePage() {
  const domains = domainsByStack();
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />

      <Hero
        size="lg"
        eyebrow="Enterprise AI services · US · LATAM · India"
        title="Enterprise AI, built into the systems you already run."
        lede="TalentXM is a services firm. We prepare your platforms and data, build AI agents for specific workflows and staff the teams that run them, with a person in charge of every decision."
        primary={site.primaryCta}
        secondary={{ label: "Explore AI Agents", href: "/ai-agents" }}
      />

      <ClientLogoStrip logos={clientLogos} />

      <section className="border-b border-txm-line bg-white py-10" aria-label="Frameworks and partnerships">
        <div className="txm-container">
          <p className="txm-eyebrow mb-6 text-center text-txm-subtle">
            Designed against the frameworks security teams ask for
          </p>
          <ComplianceRow />
          <p className="txm-small mt-6 text-center text-txm-slate">
            Workato Silver Partner · Claude Partner Network ·{" "}
            <Link href="/trust" className="txm-focus font-semibold text-txm-indigo hover:text-txm-base">
              Current trust status
            </Link>
          </p>
        </div>
      </section>

      <Section labelledBy="holistic-title">
        <SectionHeader
          id="holistic-title"
          eyebrow="What we do"
          title="One partner from the platform to the agent."
          description="Most AI work fails between teams: the platform team, the integration partner and the AI vendor. We cover the whole path, so one team is accountable for the outcome."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {holistic.map((h, i) => (
            <ServiceCard key={h.href} number={String(i + 1).padStart(2, "0")} {...h} />
          ))}
        </div>
      </Section>

      <Section tone="light" labelledBy="stack-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              id="stack-title"
              align="left"
              eyebrow="Enterprise AI Services"
              title="Five domains, one stack."
              description="Each service domain is a layer. Agents only work when the layers beneath them are sound, which is why we start with the foundation and the data."
            />
            <div className="mt-8">
              <ButtonLink href="/services" variant="secondary">
                See all services
              </ButtonLink>
            </div>
          </div>
          <StackDiagram domains={domains} />
        </div>
      </Section>

      <Section labelledBy="journey-title">
        <SectionHeader
          id="journey-title"
          eyebrow="How it works"
          title="Define. Match. Deploy."
          description="Three steps from the first conversation to work running in your environment."
        />
        <div className="mt-12">
          <JourneySteps steps={journey} />
        </div>
      </Section>

      <Section tone="light" labelledBy="agents-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="agents-title"
            align="left"
            eyebrow="AI Agents"
            title="Six agents, validated end to end."
            description="Each one is built for a single workflow, tested against real APIs or sandboxes, and published with its status."
          />
          <ButtonLink href="/ai-agents" variant="text" className="shrink-0">
            View the catalogue
          </ButtonLink>
        </div>
        <div className="mt-12">
          <AgentGrid items={agents} />
        </div>
      </Section>

      <Section labelledBy="industries-title">
        <SectionHeader
          id="industries-title"
          eyebrow="Industries"
          title="Depth where the workflows are hardest."
          description="We concentrate on two industries where administrative and operational load is highest, and bring the same services to enterprise operations everywhere."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {industries.map((i) => (
            <IndustryCard key={i.slug} title={i.name} description={i.summary} href={`/industries/${i.slug}`} icon={i.icon} />
          ))}
          <IndustryCard
            title="All industries"
            description="Finance, operations and IT workflows that apply across sectors."
            href="/industries"
            icon="building"
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="delivery-title">
        <SectionHeader
          id="delivery-title"
          inverse
          eyebrow="Delivery models"
          title="From one specialist to a team that owns the outcome."
          description="Talent-led models add people to your team. Outcome-led models make us accountable for the result."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {(["talent-led", "outcome-led"] as const).map((group) => (
            <div key={group} className="rounded-2xl border border-white/10 bg-txm-surface p-6">
              <p className="txm-eyebrow text-txm-cyan">{group === "talent-led" ? "Talent-led" : "Outcome-led"}</p>
              <ul className="mt-4 space-y-4">
                {deliveryModels
                  .filter((m) => m.group === group)
                  .map((m) => (
                    <li key={m.slug} className="flex gap-4">
                      <IconTile name={m.icon} size="sm" />
                      <div>
                        <p className="font-semibold text-white">{m.name}</p>
                        <p className="txm-small text-slate-400">{m.buyerNeed}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/flexible-talent" tone="dark" variant="secondary">
            Compare delivery models
          </ButtonLink>
        </div>
        {stats.length > 0 && (
          <div className="mt-16">
            <StatBand stats={stats} />
          </div>
        )}
      </Section>

      <Section labelledBy="evidence-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="evidence-title"
            align="left"
            eyebrow="Work"
            title="Built, tested and labelled honestly."
            description="Every piece of evidence carries a label, so you know whether it is a validated proof of concept or a client outcome."
          />
          <ButtonLink href="/work" variant="text" className="shrink-0">
            See the work
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {evidenceItems.slice(0, 3).map((e) => (
            <li key={e.slug} className="txm-card p-7">
              <p className="txm-eyebrow text-txm-indigo">{e.label}</p>
              <h3 className="mt-2 text-lg font-bold text-txm-ink">{e.title}</h3>
              <p className="txm-small mt-2 text-txm-slate">{e.validationSummary}</p>
            </li>
          ))}
        </ul>
        {testimonials.length > 0 && (
          <div className="mt-12">
            <TestimonialGrid items={testimonials} />
          </div>
        )}
      </Section>

      <Section tone="light" labelledBy="trust-title">
        <SectionHeader
          id="trust-title"
          eyebrow="Trust"
          title="What we hold today, and what is in progress."
          description="Our trust page lists partnerships, controls and programmes with the date each was last reviewed."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { label: "Security & status", href: "/trust" },
            { label: "Responsible AI", href: "/trust#responsible-ai" },
            { label: "How we handle website data", href: "/trust#website-data" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="txm-card txm-focus group flex items-center justify-between gap-3 p-5 font-semibold text-txm-ink"
            >
              {l.label}
              <ArrowRight
                className="h-4 w-4 text-txm-indigo transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Section>

      <CTABand
        title="Start with one workflow."
        description="Tell us the workflow and the systems involved. We will come back with a view on where AI helps, and where it does not."
        primary={site.primaryCta}
        secondary={{ label: "Explore AI Agents", href: "/ai-agents" }}
      />

      <section className="txm-section-dark py-16" aria-labelledby="marketplace-title">
        <div className="txm-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="txm-eyebrow text-txm-cyan">Coming next · Early access</p>
            <h2 id="marketplace-title" className="txm-h3 mt-2 text-white">
              Talent Marketplace
            </h2>
            <p className="txm-body mt-3 text-slate-300">
              A marketplace where employers see evidence of work, not just a score. Join the early-access list as an
              employer, or join the talent network as a specialist.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/marketplace#employers" tone="dark">
              Employer early access
            </ButtonLink>
            <ButtonLink href="/careers#join" tone="dark" variant="secondary">
              Join talent network
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
