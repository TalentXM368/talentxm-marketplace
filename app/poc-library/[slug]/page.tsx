import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FormSection } from "@/components/forms/form-section";
import { CopyLinkButton } from "@/components/poc/copy-link-button";
import { PocAssets } from "@/components/poc/poc-assets";
import { PocGrid } from "@/components/poc/poc-card";
import { PocWalkthrough } from "@/components/poc/poc-walkthrough";
import { CheckList } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/sections/section";
import { Hero } from "@/components/sections/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getAgent } from "@/content/agents";
import { site } from "@/content/site";
import type { Poc, TechTag, VideoMoment } from "@/content/types";
import {
  getPoc,
  getPocs,
  pocLabels,
  pocLibraryPath,
  pocPath,
  pocTechnologies,
  relatedPocs,
  getPocUseCases,
} from "@/lib/pocs";
import { pageMetadata, videoLd } from "@/lib/seo";
import { canSeek } from "@/lib/video";

function Walkthrough({ poc, moments }: { poc: Poc; moments: VideoMoment[] }) {
  return (
    <div>
      <h2 className="txm-eyebrow text-txm-indigo">In the video</h2>
      <p className="txm-small mt-2 text-txm-slate">
        {canSeek(poc.video) ? "Select a time to play the video from that point." : "Key moments in the recording."}
      </p>
      <div className="mt-8">
        <PocWalkthrough video={poc.video} moments={moments} />
      </div>
    </div>
  );
}

const groupLabels: Record<TechTag["category"], string> = {
  ai: "AI",
  integration: "Integration",
  platform: "Platforms",
  standard: "Standards",
};

export function generateStaticParams() {
  return getPocs().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/poc-library/[slug]">) {
  const { slug } = await params;
  const p = getPoc(slug);
  if (!p) return {};
  return pageMetadata({
    ...p.seo,
    path: pocPath(p.slug),
    image: { url: p.video.thumbnail, width: 1280, height: 720, alt: p.title },
  });
}

export default async function PocPage({ params }: PageProps<"/poc-library/[slug]">) {
  const { slug } = await params;
  const p = getPoc(slug);
  if (!p) notFound();

  const path = pocPath(p.slug);
  const agent = p.agent ? getAgent(p.agent) : undefined;
  const techs = pocTechnologies(p);
  const techGroups = (Object.keys(groupLabels) as TechTag["category"][])
    .map((g) => ({ g, items: techs.filter((t) => t.group === g) }))
    .filter((x) => x.items.length > 0);
  const useCases = getPocUseCases(p.slug);
  const related = relatedPocs(p);

  return (
    <>
      <JsonLd data={videoLd(p.video, p.title, p.summary, p.publishedAt, path)} />
      <Hero
        eyebrow={`Proof of concept · ${pocLabels(p).join(" · ")}`}
        title={p.title}
        lede={p.summary}
        image="/images/neural-bg.webp"
        primary={{ label: "Watch the POC", href: "#poc-video" }}
        secondary={{ label: agent ? "Request an Agent Pilot" : "Discuss This Workflow", href: "#request" }}
        breadcrumbs={[
          { label: "POC Library", href: pocLibraryPath },
          { label: p.title, href: path },
        ]}
      >
        <div className="mt-6">
          <CopyLinkButton url={`${site.url}${path}`} />
        </div>
      </Hero>

      <Section id="poc-video" labelledBy="video-title">
        <h2 id="video-title" className="sr-only">
          Video and presentation
        </h2>
        {p.walkthrough && !p.presentation ? (
          // Video stays in view beside the key moments, so a timestamp plays next to where it was selected.
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <PocAssets slug={p.slug} />
            </div>
            <Walkthrough poc={p} moments={p.walkthrough} />
          </div>
        ) : (
          <>
            <PocAssets slug={p.slug} className={p.presentation ? undefined : "mx-auto max-w-4xl"} />
            {p.walkthrough && (
              <div className="mx-auto mt-14 max-w-3xl">
                <Walkthrough poc={p} moments={p.walkthrough} />
              </div>
            )}
          </>
        )}
      </Section>

      <Section tone="light" labelledBy="overview-title">
        <SectionHeader id="overview-title" eyebrow="Overview" title="The problem, and what the POC does." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-txm-line bg-white p-7">
            <h3 className="text-lg font-bold text-txm-ink">The problem</h3>
            <p className="txm-body mt-3 text-txm-slate">{p.problem}</p>
          </div>
          <div className="rounded-2xl border border-txm-indigo/25 bg-white p-7 shadow-txm-card">
            <h3 className="text-lg font-bold text-txm-ink">What the POC does</h3>
            <p className="txm-body mt-3 text-txm-slate">{p.solution}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="outcomes-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader id="outcomes-title" align="left" eyebrow="Outcomes" title="What it is built to improve." />
            <div className="mt-8">
              <CheckList items={p.outcomes} />
            </div>
            {p.boundaries && p.boundaries.length > 0 && (
              <div className="mt-10 rounded-2xl border border-txm-line bg-txm-light p-6">
                <h3 className="txm-eyebrow text-txm-indigo">Boundaries built in</h3>
                <ul className="mt-4 space-y-3">
                  {p.boundaries.map((b) => (
                    <li key={b} className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-txm-indigo" aria-hidden="true" />
                      <span className="txm-body text-txm-slate">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <h2 className="txm-eyebrow mb-6 text-txm-indigo">Technologies used</h2>
            <div className="space-y-6">
              {techGroups.map(({ g, items }) => (
                <div key={g}>
                  <p className="txm-eyebrow mb-3 text-txm-subtle">{groupLabels[g]}</p>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`${pocLibraryPath}?tech=${t.slug}`}
                          className="txm-focus inline-flex rounded-lg border border-txm-line bg-white px-3 py-1.5 text-sm font-semibold text-txm-ink hover:border-txm-indigo/40 hover:text-txm-indigo"
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {(agent || useCases.length > 0) && (
        <Section tone="light" labelledBy="applies-title">
          <SectionHeader id="applies-title" eyebrow="Where this applies" title="Related agent and use cases." />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            {agent && (
              <li>
                <Link
                  href={`/ai-agents/${agent.slug}`}
                  className="txm-card group flex h-full flex-col p-6"
                >
                  <span className="txm-eyebrow text-txm-subtle">AI agent</span>
                  <span className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-txm-ink group-hover:text-txm-indigo">
                    {agent.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="txm-small mt-1 text-txm-slate">{agent.outcomeLine}</span>
                </Link>
              </li>
            )}
            {useCases.map((u) => (
              <li key={u.href + u.title}>
                <Link href={u.href} className="txm-card group flex h-full flex-col p-6">
                  <span className="txm-eyebrow text-txm-subtle">Use case · {u.context}</span>
                  <span className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-txm-ink group-hover:text-txm-indigo">
                    {u.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {agent ? (
        <FormSection
          id="request"
          formId="F-02"
          sourcePage={path}
          defaults={{ agent: agent.slug }}
          eyebrow="Request an Agent Pilot"
          title={`Run ${agent.name} on your workflow.`}
          description="Tell us about your systems and timeline. We will scope a pilot with agreed measures and human decision points."
        />
      ) : (
        <FormSection
          id="request"
          formId="F-01"
          sourcePage={path}
          eyebrow="Discuss This Workflow"
          title="Want this on your systems?"
          description="Tell us about the workflow and the systems involved. We will reply with how we would scope it."
        />
      )}

      {related.length > 0 && (
        <Section labelledBy="related-title">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader id="related-title" align="left" eyebrow="More POCs" title="Related proofs of concept." />
            <Link
              href={pocLibraryPath}
              className="txm-focus group inline-flex shrink-0 items-center gap-2 font-semibold text-txm-indigo hover:text-txm-base"
            >
              All POCs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <PocGrid items={related} />
          </div>
        </Section>
      )}
    </>
  );
}
