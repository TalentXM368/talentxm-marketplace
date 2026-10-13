import { notFound } from "next/navigation";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { FAQ, StackDiagram } from "@/components/sections/blocks";
import { IndustryCard } from "@/components/sections/cards";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { TechTags } from "@/components/signature/signature";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { getAgents } from "@/content/agents";
import { getDeliveryModels } from "@/content/delivery";
import { industries } from "@/content/industries";
import { domainsByStack, getServiceDomain, serviceDomains } from "@/content/services";
import { pageMetadata, serviceLd } from "@/lib/seo";

export function generateStaticParams() {
  return serviceDomains.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[domain]">) {
  const { domain } = await params;
  const d = getServiceDomain(domain);
  if (!d) return {};
  return pageMetadata({ ...d.seo, path: `/services/${d.slug}` });
}

export default async function ServiceDomainPage({ params }: PageProps<"/services/[domain]">) {
  const { domain } = await params;
  const d = getServiceDomain(domain);
  if (!d) notFound();

  const path = `/services/${d.slug}`;
  const relatedAgents = getAgents(d.relatedAgents);
  const relatedIndustries = industries.filter((i) => d.relatedIndustries.includes(i.slug));
  const models = getDeliveryModels(d.deliveryModels);

  return (
    <>
      <JsonLd data={serviceLd(d.name, d.summary, path)} />
      <Hero
        eyebrow={d.hero.eyebrow}
        title={d.hero.title}
        lede={d.hero.lede}
        primary={
          d.primaryForm === "F-03"
            ? { label: "Structure My Team", href: "#structure-my-team" }
            : { label: "Discuss Your AI Priority", href: "#discuss" }
        }
        secondary={{ label: "See capabilities", href: "#capabilities" }}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: d.name, href: path },
        ]}
      />

      <Section tone="light" labelledBy="position-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader
            id="position-title"
            align="left"
            eyebrow="Where it sits"
            title={`${d.menuLabel} in the Enterprise AI stack`}
            description={d.stackPosition}
          />
          <StackDiagram domains={domainsByStack()} highlight={d.slug} />
        </div>
      </Section>

      <Section id="capabilities" labelledBy="capabilities-title">
        <SectionHeader id="capabilities-title" eyebrow="Capabilities" title="What we deliver." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {d.capabilities.map((c) => (
            <article key={c.anchor} id={c.anchor} className="txm-card scroll-mt-28 p-7">
              <h3 className="text-xl font-bold text-txm-ink">{c.name}</h3>
              <p className="txm-body mt-2 text-txm-slate">{c.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light" labelledBy="platforms-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              id="platforms-title"
              align="left"
              eyebrow="Platforms"
              title="Platforms and standards we work with."
              description="Each tag shows our evidence level: tested in a proof of concept, designed for, or team delivery experience."
            />
            <div className="mt-8">
              <TechTags tags={d.platforms} />
            </div>
          </div>
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <IconTile name="sparkles" size="sm" />
            <h3 className="mt-5 text-xl font-bold text-txm-ink">How this connects to AI</h3>
            <p className="txm-body mt-2 text-txm-slate">{d.connectsToAi}</p>
            <div className="mt-6">
              <ButtonLink href="/ai-agents" variant="text">
                Browse AI agents
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {relatedAgents.length > 0 && (
        <Section labelledBy="related-title">
          <SectionHeader id="related-title" eyebrow="Related" title="Agents and industries that use this domain." />
          <div className="mt-12">
            <AgentGrid items={relatedAgents} />
          </div>
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 md:grid-cols-2">
            {relatedIndustries.map((i) => (
              <IndustryCard key={i.slug} title={i.name} description={i.summary} href={`/industries/${i.slug}`} icon={i.icon} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="dark" labelledBy="models-title">
        <SectionHeader id="models-title" inverse eyebrow="Delivery models" title="How we can deliver it." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {models.map((m) => (
            <div key={m.slug} className="rounded-2xl border border-white/10 bg-txm-surface p-6">
              <IconTile name={m.icon} size="sm" />
              <p className="mt-4 font-semibold text-white">{m.name}</p>
              <p className="txm-small mt-1 text-slate-400">{m.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/flexible-talent" tone="dark" variant="secondary">
            Compare delivery models
          </ButtonLink>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <SectionHeader id="faq-title" eyebrow="FAQ" title={`${d.name}: common questions.`} />
        <div className="mt-10">
          <FAQ items={d.faqs} />
        </div>
      </Section>

      {d.primaryForm === "F-03" ? (
        <FormSection
          id="structure-my-team"
          formId="F-03"
          sourcePage={path}
          eyebrow="Structure My Team"
          title="Tell us what needs to keep running."
          description="Share the scope and the skills involved. We will propose a delivery model and the people to run it."
        />
      ) : (
        <FormSection
          id="discuss"
          formId="F-01"
          sourcePage={path}
          defaults={{ priority: `service:${d.slug}` }}
          eyebrow="Discuss Your AI Priority"
          title={`Talk to us about ${d.name.toLowerCase()}.`}
          description="Tell us about the workflow and the systems involved. A named person will reply."
        />
      )}
    </>
  );
}
