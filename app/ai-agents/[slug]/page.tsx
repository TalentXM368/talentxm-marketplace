import { notFound } from "next/navigation";
import { ArrowDown } from "lucide-react";
import { AgentGrid } from "@/components/catalog/agent-catalog";
import { FormSection } from "@/components/forms/form-section";
import { VideoEmbed } from "@/components/media/video-embed";
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
        eyebrow={`${a.agentType} · ${agentIndustryLabel(a)}`}
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
          <p className="txm-small text-slate-300">{a.statusEvidence}</p>
        </div>
      </Hero>

      <Section labelledBy="outcome-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="txm-eyebrow text-txm-indigo">Outcome</p>
            <h2 id="outcome-title" className="txm-h3 mt-3 text-txm-ink">
              {a.summary}
            </h2>
          </div>
          <dl className="space-y-5 rounded-2xl border border-txm-line bg-txm-light p-6">
            <div>
              <dt className="txm-eyebrow text-txm-subtle">Intended user</dt>
              <dd className="txm-body mt-1 text-txm-ink">{a.intendedUser}</dd>
            </div>
            <div>
              <dt className="txm-eyebrow text-txm-subtle">Status</dt>
              <dd className="txm-body mt-1 text-txm-ink">{statusLabels[a.status]}</dd>
            </div>
            <div>
              <dt className="txm-eyebrow text-txm-subtle">Inputs</dt>
              <dd className="mt-2">
                <CheckList items={a.inputs} />
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="workflow" tone="light" labelledBy="workflow-title">
        <SectionHeader id="workflow-title" eyebrow="Workflow" title="Today, and with the agent." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h3 className="text-lg font-bold text-txm-ink">Current workflow</h3>
            <ol className="mt-4 space-y-3">
              {a.currentWorkflow.map((s) => (
                <li key={s} className="txm-body flex gap-3 text-txm-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-txm-indigo/25 bg-white p-7 shadow-txm-card">
            <h3 className="text-lg font-bold text-txm-ink">Assisted workflow</h3>
            <ol className="mt-4 space-y-3">
              {a.assistedWorkflow.map((s) => (
                <li key={s} className="txm-body flex gap-3 text-txm-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-txm-indigo" aria-hidden="true" />
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
            <SectionHeader id="capabilities-title" align="left" eyebrow="Capabilities" title="What the agent does." />
            <div className="mt-8">
              <CheckList items={a.actions} />
            </div>
          </div>
          <div className="rounded-2xl border border-red-100 bg-red-50/60 p-7">
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

      <Section tone="light" labelledBy="architecture-title">
        <SectionHeader
          id="architecture-title"
          eyebrow="Architecture"
          title="How information moves."
          description="Inputs are read with scoped access. The agent prepares the work. A person decides before anything is written back."
        />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-4" aria-label="Agent data flow">
          {[
            { t: "Inputs", d: a.inputs[0] },
            { t: "Agent", d: a.actions[0] },
            { t: "Human decision", d: a.humanDecisionPoints[0].step },
            { t: "Systems", d: a.techTags.map((t) => t.name).slice(0, 2).join(", ") },
          ].map((step, i, arr) => (
            <li key={step.t} className="relative">
              <div
                className={
                  step.t === "Human decision"
                    ? "txm-gradient-bg h-full rounded-xl p-5 text-white"
                    : "h-full rounded-xl border border-txm-line bg-white p-5"
                }
              >
                <p className={step.t === "Human decision" ? "txm-eyebrow text-white/80" : "txm-eyebrow text-txm-subtle"}>
                  {step.t}
                </p>
                <p className={step.t === "Human decision" ? "mt-2 font-semibold" : "mt-2 font-semibold text-txm-ink"}>
                  {step.d}
                </p>
              </div>
              {i < arr.length - 1 && (
                <ArrowDown className="mx-auto my-1 h-4 w-4 text-txm-subtle md:hidden" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="oversight-title">
        <SectionHeader
          id="oversight-title"
          eyebrow="Human oversight"
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
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h3 className="text-lg font-bold text-txm-ink">Security controls</h3>
            <div className="mt-4">
              <CheckList items={a.securityControls} />
            </div>
          </div>
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h3 className="text-lg font-bold text-txm-ink">Evaluation measures</h3>
            <div className="mt-4">
              <CheckList items={a.evaluationMeasures} />
            </div>
          </div>
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h3 className="text-lg font-bold text-txm-ink">Deployment options</h3>
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
            eyebrow="Technologies"
            title="Built with, and connects to."
            description="Tested means used in the proof of concept. Designed for means the connection is designed but not yet tested with live data."
          />
          <TechTags tags={a.techTags} />
        </div>
      </Section>

      {demoVideo && (
        <Section tone="light" labelledBy="demo-title">
          <SectionHeader id="demo-title" eyebrow="Demo" title={`See ${a.name} work.`} />
          <div className="mx-auto mt-10 max-w-5xl">
            <VideoEmbed video={demoVideo} />
          </div>
          {agentPocs.length > 0 && (
            <div className="mt-16">
              <p className="txm-eyebrow mb-6 text-center text-txm-indigo">From the POC Library</p>
              <PocGrid items={agentPocs} />
            </div>
          )}
        </Section>
      )}

      {a.faqs.length > 0 && (
        <Section labelledBy="faq-title">
          <SectionHeader id="faq-title" eyebrow="FAQ" title="Common questions." />
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
        eyebrow="Request an Agent Pilot"
        title={`Pilot ${a.name} on your workflow.`}
        description="Tell us about your systems and timeline. We will scope a pilot with agreed measures and the human decision points above."
      />

      {others.length > 0 && (
        <Section labelledBy="more-title">
          <SectionHeader id="more-title" eyebrow="More agents" title="Related agents." />
          <div className="mt-12">
            <AgentGrid items={others.slice(0, 3)} />
          </div>
        </Section>
      )}
    </>
  );
}
