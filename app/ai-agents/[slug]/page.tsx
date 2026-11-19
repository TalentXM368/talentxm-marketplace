import { notFound } from "next/navigation";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { VideoEmbed } from "@/components/media/video-embed";
import { AgentFlow } from "@/components/motion/agent-flow";
import { PocGrid } from "@/components/poc/poc-card";
import { CheckList, FAQ } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { HumanDecisionPoints, StatusChip, TechTags } from "@/components/signature/signature";
import { agentIndustryLabel, agents, getAgent, statusLabels } from "@/content/agents";
import { pocsForAgent } from "@/lib/pocs";
import { pageMetadata, serviceLd } from "@/lib/seo";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ai-agents/[slug]">) {
  const { slug } = await params;
  const a = getAgent(slug);
  if (!a) return {};
  return pageMetadata({ ...a.seo, path: `/ai-agents/${a.slug}` });
}

export default async function AgentPage({ params }: PageProps<"/ai-agents/[slug]">) {
  const { slug } = await params;
  const a = getAgent(slug);
  if (!a) notFound();

  const path = `/ai-agents/${a.slug}`;
  const sameIndustry = agents.filter((o) => o.slug !== a.slug && o.industries.some((i) => a.industries.includes(i)));
  const others = sameIndustry.length > 0 ? sameIndustry : agents.filter((o) => o.slug !== a.slug);
  const agentPocs = pocsForAgent(a.slug);
  const demoVideo = a.demoVideo ?? agentPocs[0]?.video;

  return (
    <>
      <JsonLd data={serviceLd(a.name, a.summary, path)} />
      <Hero
        eyebrow={`${a.agentType}, ${agentIndustryLabel(a)}`}
        title={a.name}
        lede={a.outcomeLine}
        image="/images/neural-bg.webp"
        primary={{ label: "Request an Agent Pilot", href: "#request-pilot" }}
        secondary={{ label: "See how it works", href: "#workflow" }}
        breadcrumbs={[
          { label: "AI Agents", href: "/ai-agents" },
          { label: a.name, href: path },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusChip status={a.status} className="bg-white" />
          <p className="txm-small text-txm-on-dark">{a.statusEvidence}</p>
        </div>
      </Hero>

      <Section labelledBy="outcome-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="txm-small font-semibold text-txm-accent">Outcome</p>
            <h2 id="outcome-title" className="txm-h3 mt-3 text-txm-ink">
              {a.summary}
            </h2>
          </div>
          <dl className="space-y-5 border-t border-txm-line pt-6">
            <div>
              <dt className="txm-small font-semibold text-txm-subtle">Intended user</dt>
              <dd className="txm-body mt-1 text-txm-ink">{a.intendedUser}</dd>
            </div>
            <div>
              <dt className="txm-small font-semibold text-txm-subtle">Status</dt>
              <dd className="txm-body mt-1 text-txm-ink">{statusLabels[a.status]}</dd>
            </div>
            <div>
              <dt className="txm-small font-semibold text-txm-subtle">Inputs</dt>
              <dd className="mt-2">
                <CheckList items={a.inputs} />
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="workflow" tone="light" labelledBy="workflow-title">
        <SectionHeader id="workflow-title" title="Today, and with the agent." />
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          <div className="border-t border-txm-line pt-6">
            <h3 className="txm-card-title text-txm-ink" data-size="lg">Current workflow</h3>
            <ol className="mt-4 space-y-3">
              {a.currentWorkflow.map((s) => (
                <li key={s} className="txm-body flex gap-3 text-txm-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t-2 border-txm-orange pt-6">
            <h3 className="txm-card-title text-txm-ink" data-size="lg">Assisted workflow</h3>
            <ol className="mt-4 space-y-3">
              {a.assistedWorkflow.map((s) => (
                <li key={s} className="txm-body flex gap-3 text-txm-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-txm-orange" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section labelledBy="capabilities-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader id="capabilities-title" align="left" title="What the agent does." />
            <div className="mt-8">
              <CheckList items={a.actions} />
            </div>
          </div>
          <div className="border-t-2 border-txm-ink pt-6">
            <h2 className="text-xl font-bold text-txm-ink">What it does not do</h2>
            <ul className="mt-4 space-y-3">
              {a.doesNot.map((d) => (
                <li key={d} className="txm-body flex gap-3 text-txm-slate">
                  <span className="mt-2.5 h-1.5 w-3 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section aria-labelledby="architecture-title" className="txm-section-dark border-t border-white/10 py-24 lg:py-32">
        <AgentFlow
          stages={[
            { key: "inputs", label: "Inputs", title: "What the agent reads", items: a.inputs.map((text) => ({ text })) },
            { key: "agent", label: "Agent", title: "What the agent does", items: a.actions.map((text) => ({ text })) },
            {
              key: "human",
              label: "Human decision",
              title: "Where a person decides",
              items: a.humanDecisionPoints.map((d) => ({ text: `${d.step}: ${d.who}`, detail: d.why })),
            },
            { key: "systems", label: "Systems", title: "What it runs on", items: a.techTags.map((t) => ({ text: t.name })) },
          ]}
          header={
            <>
              <h2 id="architecture-title" className="txm-h2 text-white">
                How information moves.
              </h2>
              <p className="txm-lede mt-4 text-txm-on-dark">
                Inputs are read with scoped access. The agent prepares the work. A person decides before anything is
                written back.
              </p>
            </>
          }
        />
      </section>

      <Section labelledBy="oversight-title">
        <SectionHeader
          id="oversight-title"
          title="Where a person decides."
          description="These decision points are part of the design, not an optional setting."
        />
        <div className="mt-12">
          <HumanDecisionPoints points={a.humanDecisionPoints} />
        </div>
      </Section>

      <Section tone="light" labelledBy="controls-title">
        <h2 id="controls-title" className="sr-only">
          Security, evaluation and deployment
        </h2>
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
          <div className="border-t border-txm-line pt-6">
            <h3 className="txm-card-title text-txm-ink">Security controls</h3>
            <div className="mt-4">
              <CheckList items={a.securityControls} />
            </div>
          </div>
          <div className="border-t border-txm-line pt-6">
            <h3 className="txm-card-title text-txm-ink">Evaluation measures</h3>
            <div className="mt-4">
              <CheckList items={a.evaluationMeasures} />
            </div>
          </div>
          <div className="border-t border-txm-line pt-6">
            <h3 className="txm-card-title text-txm-ink">Deployment options</h3>
            <div className="mt-4">
              <CheckList items={a.deploymentOptions} />
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="tech-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionHeader
            id="tech-title"
            align="left"
            title="Built with, and connects to."
            description="Tested means used in the proof of concept. Designed for means the connection is designed but not yet tested with live data."
          />
          <TechTags tags={a.techTags} />
        </div>
      </Section>

      {demoVideo && (
        <Section tone="light" labelledBy="demo-title">
          <SectionHeader id="demo-title" title={`See ${a.name} work.`} />
          <div className="mt-10 max-w-5xl">
            <VideoEmbed video={demoVideo} />
          </div>
          {agentPocs.length > 0 && (
            <div className="mt-16">
              <p className="txm-small mb-6 font-semibold text-txm-accent">From the POC Library</p>
              <PocGrid items={agentPocs} />
            </div>
          )}
        </Section>
      )}

      {a.faqs.length > 0 && (
        <Section labelledBy="faq-title">
          <SectionHeader id="faq-title" title="Common questions." />
          <div className="mt-10">
            <FAQ items={a.faqs} />
          </div>
        </Section>
      )}

      <FormSection
        id="request-pilot"
        formId="F-02"
        sourcePage={path}
        defaults={{ agent: a.slug }}
        title={`Pilot ${a.name} on your workflow.`}
        description="Tell us about your systems and timeline. We will scope a pilot with agreed measures and the human decision points above."
      />

      {others.length > 0 && (
        <Section labelledBy="more-title">
          <SectionHeader id="more-title" title="Related agents." />
          <div className="mt-12">
            <AgentGrid items={others.slice(0, 3)} />
          </div>
        </Section>
      )}
    </>
  );
}
