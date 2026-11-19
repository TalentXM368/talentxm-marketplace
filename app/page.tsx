import Link from "next/link";
import { AgentCard } from "@/components/catalog/agent-card";
import { AgentFlow, type FlowStage } from "@/components/motion/agent-flow";
import { FollowTheSun } from "@/components/motion/follow-the-sun";
import { LogoForm } from "@/components/motion/logo-form";
import { Rail } from "@/components/motion/rail";
import { Reveal } from "@/components/motion/reveal";
import { ScrubStatement, StepWords } from "@/components/motion/scroll-type";
import { ClientLogoStrip, ComplianceRow, StatBand, TestimonialGrid } from "@/components/sections/blocks";
import { CTABand } from "@/components/sections/cta-band";
import { DeliveryScale } from "@/components/sections/delivery-scale";
import { Hero } from "@/components/sections/hero";
import { IndustryPanels } from "@/components/sections/industry-panels";
import { StackIndex } from "@/components/sections/stack-index";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { agentIndustryLabel, agents } from "@/content/agents";
import { deliveryModels, deliveryRegions } from "@/content/delivery";
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

const journey = [
  { title: "Define", body: "We map one workflow with you: the outcome, the systems it touches and who makes each decision." },
  { title: "Match", body: "We choose the delivery model and the people, from a single specialist to a capability pod." },
  { title: "Deploy", body: "We build in your environment, report against the measures agreed on day one and hand over runbooks." },
];

/** Every evidence item is a validated POC, so the row names the agent's industry instead of repeating that label. */
const evidenceKicker = (slug: string) => {
  const agent = agents.find((a) => a.slug === slug);
  return agent ? agentIndustryLabel(agent) : "Validated POC";
};

const trustLinks = [
  { label: "Security and status", href: "/trust" },
  { label: "Responsible AI", href: "/trust#responsible-ai" },
  { label: "How we handle website data", href: "/trust#website-data" },
];

/** How TalentXM works, end to end; every link leads to the part of the site that covers it. */
const howItWorks: FlowStage[] = [
  {
    key: "platforms",
    label: "Platforms and data",
    title: "We prepare the ground.",
    items: [
      { text: "Cloud & Cybersecurity", detail: "A secure foundation.", href: "/services/cloud-cybersecurity" },
      { text: "Enterprise Platforms", detail: "ERP, HCM, CRM, EHR and MES.", href: "/services/enterprise-platforms" },
      { text: "Data & Integration", detail: "Clean data, connected systems.", href: "/services/data-integration" },
    ],
  },
  {
    key: "agent",
    label: "AI agents",
    title: "We build agents for one workflow at a time.",
    items: [
      { text: "AI & Automation", detail: "Agents, models and automation.", href: "/services/ai-automation" },
      { text: "The agent catalogue", detail: "Six agents, validated end to end.", href: "/ai-agents" },
      { text: "POC Library", detail: "Recorded walkthroughs of each build.", href: "/poc-library" },
    ],
  },
  {
    key: "human",
    label: "Your people decide",
    title: "People keep the decisions that matter.",
    items: [
      { text: "Every agent names the step where a person decides, and who that is." },
      { text: "Responsible AI", detail: "How we design for oversight.", href: "/trust#responsible-ai" },
    ],
  },
  {
    key: "teams",
    label: "Teams",
    title: "Specialists run and improve it.",
    items: [
      { text: "Flexible talent", detail: "From one specialist to a pod.", href: "/flexible-talent" },
      { text: "Operate & Scale", detail: "Managed services after launch.", href: "/services/managed-services" },
      { text: "Talent Marketplace", detail: "Early access for employers and specialists.", href: "/marketplace" },
    ],
  },
];

export default function HomePage() {
  const domains = domainsByStack();
  const panels = [
    ...industries.map((i) => ({ title: i.name, description: i.summary, href: `/industries/${i.slug}`, image: i.image })),
    {
      title: "All industries",
      description: "Finance, operations and IT workflows that apply across sectors.",
      href: "/industries",
      image: "/images/tech-dashboard-bg.webp",
    },
  ];

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />

      {/* The hero and the flow share one surface: the logo form starts below the header and ends whole in the flow section. */}
      <div className="txm-bleed" data-hero-scope="">
        <div className="txm-bleed-visual">
          <LogoForm tone="hero" />
        </div>
        <Hero
          size="lg"
          display
          bleed
          scrollHint={{ label: "See how it works", href: "#how-it-works" }}
          eyebrow="Enterprise AI services from the US, LATAM and India"
          title="Human Intelligence Extended"
          tagline="Talent, technology and possibility in motion."
          primary={site.primaryCta}
          secondary={{ label: "Explore AI Agents", href: "/ai-agents" }}
        />

        <ClientLogoStrip logos={clientLogos} />

        <section id="how-it-works" aria-labelledby="flow-title" className="relative pt-16 pb-24 text-white lg:pt-28 lg:pb-32">
          <AgentFlow
            stages={howItWorks}
            label="How TalentXM works, from platforms to teams"
            header={
              <>
                <h2 id="flow-title" className="txm-h2 text-white">
                  One partner from the platform to the people.
                </h2>
                <p className="txm-lede mt-4 text-txm-on-dark">
                  We prepare your platforms and data, build AI agents for specific workflows and staff the teams that run
                  them. Your people stay in charge of the decisions.
                </p>
              </>
            }
            footer={
              <ButtonLink href="/services" tone="dark">
                Explore services
              </ButtonLink>
            }
          />
        </section>
      </div>

      <section aria-labelledby="stack-title" className="txm-section-dark py-24 lg:py-40">
        <div className="txm-container">
          <ScrubStatement
            id="stack-title"
            text="AI work usually fails between teams. We cover the whole path, from your platforms and data to the agent, so one team answers for the outcome."
          />
          <div className="mt-20 lg:mt-28">
            <StackIndex domains={domains} />
          </div>
          <div className="mt-10">
            <ButtonLink href="/services" tone="dark" variant="text">
              See all services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="txm-section-dark border-t border-white/10 py-24 lg:py-32">
        <div className="txm-container">
          <h2 id="steps-title" className="sr-only">
            How an engagement runs
          </h2>
          <StepWords steps={journey} label="How an engagement runs" />
        </div>
      </section>

      <section aria-labelledby="agents-title" className="txm-section-dark border-t border-white/10 py-24 lg:py-32">
        <div className="txm-container flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <h2 id="agents-title" className="txm-h2 text-white">
              Six agents, validated end to end.
            </h2>
            <p className="txm-lede mt-4 text-txm-on-dark">
              Each one is built for one workflow, tested against real APIs or sandboxes, and published with its status.
            </p>
          </Reveal>
          <ButtonLink href="/ai-agents" tone="dark" variant="text" className="shrink-0">
            View the catalogue
          </ButtonLink>
        </div>
        <div className="mt-12">
          <Rail label="AI agents" coverflow tone="dark">
            {agents.map((a) => (
              <li key={a.slug}>
                <AgentCard agent={a} />
              </li>
            ))}
          </Rail>
        </div>
      </section>

      <section aria-labelledby="industries-title" className="txm-section-dark py-24 lg:py-32">
        <div className="txm-container">
          <h2 id="industries-title" className="txm-h2 max-w-2xl text-white">
            Depth where the workflows are hardest.
          </h2>
          <div className="mt-12">
            <IndustryPanels panels={panels} />
          </div>
        </div>
      </section>

      <section aria-labelledby="hours-title" className="txm-section-dark border-t border-white/10 py-24 lg:py-32">
        <div className="txm-container">
          <h2 id="hours-title" className="txm-h2 max-w-3xl text-white">
            Your team keeps normal hours. The work keeps moving.
          </h2>
          <div className="mt-14">
            <FollowTheSun regions={deliveryRegions} />
          </div>

          <div className="mt-24 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h3 className="txm-h3 max-w-xl text-white">From one specialist to a team that owns the outcome.</h3>
            <ButtonLink href="/flexible-talent" tone="dark" variant="text" className="shrink-0">
              Compare delivery models
            </ButtonLink>
          </div>
          <div className="mt-10">
            <DeliveryScale models={deliveryModels} />
          </div>
          {stats.length > 0 && (
            <div className="mt-16">
              <StatBand stats={stats} />
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="proof-title" className="txm-section txm-section-light">
        <div className="txm-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="proof-title" className="txm-h2 max-w-2xl text-txm-ink">
              Built, tested and labelled honestly.
            </h2>
            <ButtonLink href="/work" variant="text" className="shrink-0">
              See the work
            </ButtonLink>
          </div>
          <Reveal as="ul" stagger className="mt-12 border-t border-txm-line">
            {evidenceItems.slice(0, 3).map((e) => (
              <li
                key={e.slug}
                className="grid gap-2 border-b border-txm-line py-7 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
              >
                <p className="txm-card-kicker pt-1 text-txm-accent">{evidenceKicker(e.agent)}</p>
                <h3 className="txm-card-title text-txm-ink">{e.title}</h3>
                <p className="txm-card-body text-txm-slate">{e.validationSummary}</p>
              </li>
            ))}
          </Reveal>
          {testimonials.length > 0 && (
            <div className="mt-12">
              <TestimonialGrid items={testimonials} />
            </div>
          )}

          <div className="mt-20">
            <p className="txm-lede mb-6 text-txm-ink">Designed against the frameworks security teams ask for.</p>
            <ComplianceRow align="start" />
            <p className="txm-small mt-6 text-txm-slate">Workato Silver Partner and member of the Claude Partner Network.</p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {trustLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="txm-focus font-semibold text-txm-accent hover:text-txm-base">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABand
        size="xl"
        title="Start with one workflow."
        description="Tell us the workflow and the systems involved. We will come back with a view on where AI helps, and where it does not."
        primary={site.primaryCta}
        secondary={{ label: "Explore AI Agents", href: "/ai-agents" }}
      />

      <section className="txm-section-dark border-t border-white/10 py-16" aria-labelledby="marketplace-title">
        <div className="txm-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="txm-small font-semibold text-txm-yellow">Early access</p>
            <h2 id="marketplace-title" className="txm-h3 mt-2 text-white">
              Talent Marketplace
            </h2>
            <p className="txm-body mt-3 text-txm-on-dark">
              Employers see evidence of work, not just a score. Join the early-access list as an employer, or the talent
              network as a specialist.
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
