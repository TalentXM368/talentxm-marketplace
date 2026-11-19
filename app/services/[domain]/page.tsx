import { notFound } from "next/navigation";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { FAQ } from "@/components/sections/blocks";
import { IndustryCard } from "@/components/sections/cards";
import { DeliveryScale } from "@/components/sections/delivery-scale";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { StackIndex } from "@/components/sections/stack-index";
import { JsonLd } from "@/components/seo/json-ld";
import { TechTags } from "@/components/signature/signature";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
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

      <Section tone="dark" labelledBy="position-title" className="border-t border-white/10">
        <SectionHeader
          id="position-title"
          inverse
          title={`${d.menuLabel} in the Enterprise AI stack.`}
          description={d.stackPosition}
        />
        <div className="mt-14">
          <StackIndex domains={domainsByStack()} current={d.slug} />
        </div>
      </Section>

      <Section id="capabilities" labelledBy="capabilities-title">
        <SectionHeader id="capabilities-title" title="What we deliver." />
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {d.capabilities.map((c) => (
            <article key={c.anchor} id={c.anchor} className="scroll-mt-28 border-t border-txm-line pt-6">
              <h3 className="txm-card-title text-txm-ink" data-size="lg">{c.name}</h3>
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
              title="Platforms and standards we work with."
              description="Each tag shows our evidence level: tested in a proof of concept, designed for, or team delivery experience."
            />
            <div className="mt-8">
              <TechTags tags={d.platforms} />
            </div>
          </div>
          <div className="border-t border-txm-line pt-6">
            <Icon name="sparkles" className="h-6 w-6 text-txm-accent" />
            <h3 className="txm-card-title mt-4 text-txm-ink" data-size="lg">How this connects to AI</h3>
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
          <SectionHeader id="related-title" title="Agents and industries that use this domain." />
          <div className="mt-12">
            <AgentGrid items={relatedAgents} />
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {relatedIndustries.map((i) => (
              <IndustryCard key={i.slug} title={i.name} description={i.summary} href={`/industries/${i.slug}`} icon={i.icon} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="dark" labelledBy="models-title">
        <SectionHeader id="models-title" inverse title="How we can deliver it." />
        <div className="mt-12">
          <DeliveryScale models={models} />
        </div>
        <div className="mt-12">
          <ButtonLink href="/flexible-talent" tone="dark" variant="secondary">
            Compare delivery models
          </ButtonLink>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <SectionHeader id="faq-title" title={`${d.name}: common questions.`} />
        <div className="mt-10">
          <FAQ items={d.faqs} />
        </div>
      </Section>

      {d.primaryForm === "F-03" ? (
        <FormSection
          id="structure-my-team"
          formId="F-03"
          sourcePage={path}
          title="Tell us what needs to keep running."
          description="Share the scope and the skills involved. We will propose a delivery model and the people to run it."
        />
      ) : (
        <FormSection
          id="discuss"
          formId="F-01"
          sourcePage={path}
          defaults={{ priority: `service:${d.slug}` }}
          title={`Talk to us about ${d.name.toLowerCase()}.`}
          description="Tell us about the workflow and the systems involved. A named person will reply."
        />
      )}
    </>
  );
}
