import { FAQ, JourneySteps, StackDiagram } from "@/components/sections/blocks";
import { ServiceCard } from "@/components/sections/cards";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { domainsByStack, serviceDomains } from "@/content/services";
import { servicesPromo, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Five enterprise AI service domains: platforms, data and integration, AI and automation, cloud and cybersecurity, and managed services.";

export const metadata = pageMetadata({ title: "Enterprise AI Services", description, path: "/services" });

const journey = [
  { title: "Discover", body: "We map one workflow, its systems and its constraints, and agree what a good outcome looks like." },
  { title: "Prepare", body: "We fix what the workflow depends on: platform configuration, data quality, integration and access." },
  { title: "Build", body: "We deliver the automation or agent in your environment, with human decision points designed in." },
  { title: "Operate", body: "We run, measure and improve it, or hand it over with documentation and runbooks." },
];

const faqs = [
  {
    q: "Do we need to buy all five domains?",
    a: "No. Most clients start with one workflow and the domains it touches. The stack shows how the pieces depend on each other.",
  },
  {
    q: "Do you sell software licences?",
    a: "No. We are a services firm. We work with the platforms you already own and recommend tools only where they fit.",
  },
  {
    q: "Where is the work delivered from?",
    a: "Engagements are led from the US, with delivery teams across LATAM and India.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: serviceDomains.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: d.name, url: `${site.url}/services/${d.slug}` },
          })),
        }}
      />
      <Hero
        eyebrow="Enterprise AI Services"
        title="The services that make enterprise AI work."
        lede="Five service domains, from the cloud foundation to managed operations. We start with the workflow you want to change and bring in only the domains it needs."
        primary={site.primaryCta}
        secondary={{ label: "See the stack", href: "#stack" }}
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      <Section id="stack" tone="light" labelledBy="stack-title">
        <SectionHeader
          id="stack-title"
          eyebrow="The Enterprise AI stack"
          title="Each layer depends on the one beneath it."
          description="Agents sit on top. Underneath are the integrations that feed them, the platforms that hold the records and the foundation that secures it all."
        />
        <div className="mt-12">
          <StackDiagram domains={domainsByStack()} />
        </div>
      </Section>

      <Section labelledBy="domains-title">
        <SectionHeader id="domains-title" eyebrow="Service domains" title="Five domains." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceDomains.map((d) => (
            <ServiceCard
              key={d.slug}
              layout="wide"
              title={d.name}
              description={d.summary}
              href={`/services/${d.slug}`}
              icon={d.icon}
              linkLabel={`Explore ${d.name}`}
            />
          ))}
        </div>
      </Section>

      <Section tone="light" labelledBy="journey-title">
        <SectionHeader id="journey-title" eyebrow="How an engagement runs" title="Discover. Prepare. Build. Operate." />
        <div className="mt-12">
          <JourneySteps steps={journey} />
        </div>
      </Section>

      <Section tone="dark" labelledBy="discovery-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="txm-eyebrow text-txm-cyan">Discovery offer</p>
          <h2 id="discovery-title" className="txm-h2 mt-3 text-white">
            {servicesPromo.title}
          </h2>
          <p className="txm-lede mt-4 text-slate-300">
            A short, fixed-scope engagement. We map one workflow end to end, assess the platforms and data it depends
            on, and recommend what to build, what to fix first and what to leave alone.
          </p>
          <div className="mt-8">
            <ButtonLink href={servicesPromo.href} tone="dark">
              {servicesPromo.label}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <SectionHeader id="faq-title" eyebrow="FAQ" title="Common questions." />
        <div className="mt-10">
          <FAQ items={faqs} />
        </div>
      </Section>

      <CTABand
        title="Which workflow would you change first?"
        description="Tell us about it. We will tell you which domains it touches and where to start."
        primary={site.primaryCta}
      />
    </>
  );
}
