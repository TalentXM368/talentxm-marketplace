import { notFound } from "next/navigation";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { CheckList, FAQ, PodModelDiagram } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { StatusChip } from "@/components/signature/signature";
import { ButtonLink } from "@/components/ui/button";
import { getAgents } from "@/content/agents";
import { getIndustry, industries } from "@/content/industries";
import { pageMetadata, serviceLd } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMetadata({ ...i.seo, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const path = `/industries/${ind.slug}`;
  const featured = getAgents(ind.featuredAgents);

  return (
    <>
      <JsonLd data={serviceLd(`${ind.name} AI and integration services`, ind.summary, path)} />
      <Hero
        eyebrow={ind.hero.eyebrow}
        title={ind.hero.title}
        lede={ind.hero.lede}
        image={ind.image}
        primary={{ label: "Discuss Your AI Priority", href: "#discuss" }}
        secondary={{ label: "See the use cases", href: "#use-cases" }}
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: ind.name, href: path },
        ]}
      />

      <Section id="use-cases" labelledBy="use-cases-title">
        <SectionHeader id="use-cases-title" eyebrow="Use-case map" title={`${ind.name} workflows we work on.`} description={ind.useCaseIntro} />

        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-txm-line lg:block">
          <table className="w-full text-left">
            <thead className="bg-txm-light">
              <tr className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">
                <th scope="col" className="px-5 py-4">Workflow</th>
                <th scope="col" className="px-5 py-4">Status</th>
                <th scope="col" className="px-5 py-4">Systems</th>
                <th scope="col" className="px-5 py-4">Control</th>
                <th scope="col" className="px-5 py-4">Delivery</th>
                <th scope="col" className="px-5 py-4">Measures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-txm-line bg-white">
              {ind.useCaseRows.map((r) => (
                <tr key={r.workflow} className="txm-small align-top text-txm-slate">
                  <th scope="row" className="px-5 py-4 font-semibold text-txm-ink">{r.workflow}</th>
                  <td className="px-5 py-4"><StatusChip status={r.status} /></td>
                  <td className="px-5 py-4">{r.systems}</td>
                  <td className="px-5 py-4">{r.control}</td>
                  <td className="px-5 py-4">{r.deliveryModel}</td>
                  <td className="px-5 py-4">{r.measures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-12 space-y-4 lg:hidden">
          {ind.useCaseRows.map((r) => (
            <li key={r.workflow} className="rounded-2xl border border-txm-line bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-semibold text-txm-ink">{r.workflow}</p>
                <StatusChip status={r.status} />
              </div>
              <dl className="txm-small mt-4 grid gap-3 text-txm-slate">
                {[
                  ["Systems", r.systems],
                  ["Control", r.control],
                  ["Delivery", r.deliveryModel],
                  ["Measures", r.measures],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">{k}</dt>
                    <dd className="mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      {featured.length > 0 && (
        <Section tone="light" labelledBy="featured-title">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader id="featured-title" align="left" eyebrow="Featured agents" title={`Agents for ${ind.name.toLowerCase()}.`} />
            <ButtonLink href={`/ai-agents?industry=${ind.slug}`} variant="text" className="shrink-0">
              Filter the catalogue
            </ButtonLink>
          </div>
          <div className="mt-12">
            <AgentGrid items={featured} />
          </div>
        </Section>
      )}

      <Section labelledBy="standards-title">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h2 id="standards-title" className="text-xl font-bold text-txm-ink">Standards and practices</h2>
            <div className="mt-4">
              <CheckList items={ind.standards} />
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-7">
            <h2 className="text-xl font-bold text-txm-ink">What we do not claim</h2>
            <div className="mt-4">
              <CheckList items={ind.notClaimed} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="pod-title">
        <SectionHeader
          id="pod-title"
          eyebrow="Pod composition"
          title={`A typical ${ind.name.toLowerCase()} pod.`}
          description="A senior lead who knows the industry, plus a small execution team sized to the workflow."
        />
        <div className="mt-12">
          <PodModelDiagram lead={ind.pod.lead} roles={ind.pod.roles} note={ind.pod.note} />
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/flexible-talent" variant="secondary">
            See all delivery models
          </ButtonLink>
        </div>
      </Section>

      {ind.faqs.length > 0 && (
        <Section labelledBy="faq-title">
          <SectionHeader id="faq-title" eyebrow="FAQ" title={`${ind.name}: common questions.`} />
          <div className="mt-10">
            <FAQ items={ind.faqs} />
          </div>
        </Section>
      )}

      <FormSection
        id="discuss"
        formId="F-01"
        sourcePage={path}
        defaults={{ priority: `industry:${ind.slug}` }}
        eyebrow="Discuss Your AI Priority"
        title={`Talk to us about ${ind.name.toLowerCase()}.`}
        description="Tell us about the workflow and the systems involved. A named person will reply."
      />
    </>
  );
}
