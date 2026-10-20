import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { getAgent } from "@/content/agents";
import { pocPath } from "@/lib/pocs";
import { evidenceItems } from "@/content/trust";
import type { EvidenceLabel } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work: Built, Tested, Measured",
  description:
    "Proofs of concept and client work from TalentXM, each labelled with the evidence behind it and the engagement model used.",
  path: "/work",
});

const labels: { label: EvidenceLabel; body: string }[] = [
  { label: "Validated POC", body: "Built end to end and tested against real APIs, sandboxes or demo connectors." },
  { label: "Client Outcome", body: "Results from a client engagement, published with the client's permission." },
  { label: "Internal Build", body: "Tools and accelerators we built and use in our own delivery." },
];

export default function WorkPage() {
  return (
    <>
      <Hero
        eyebrow="Work"
        title="Built, tested, measured."
        lede="Every item carries a label that says what kind of evidence it is. We publish client outcomes only with written permission."
        image="/images/tech-dashboard-bg.webp"
        primary={{ label: "Request an Agent Pilot", href: "/ai-agents#request-pilot" }}
        secondary={{ label: "Open the POC Library", href: "/poc-library" }}
        breadcrumbs={[{ label: "Work", href: "/work" }]}
      />

      <Section tone="light" labelledBy="legend-title" className="pt-12 md:pt-16">
        <h2 id="legend-title" className="txm-eyebrow mb-4 text-txm-subtle">
          Evidence labels
        </h2>
        <dl className="grid gap-4 md:grid-cols-3">
          {labels.map((l) => (
            <div key={l.label} className="rounded-xl border border-txm-line bg-white p-5">
              <dt className="font-semibold text-txm-ink">{l.label}</dt>
              <dd className="txm-small mt-1 text-txm-slate">{l.body}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {evidenceItems.map((e) => {
            const agent = getAgent(e.agent);
            return (
              <li key={e.slug} className="txm-card flex h-full flex-col p-7">
                <p className="txm-eyebrow text-txm-indigo">{e.label}</p>
                <h3 className="mt-2 text-xl font-bold text-txm-ink">{e.title}</h3>
                <p className="txm-body mt-2 text-txm-slate">{e.summary}</p>
                <dl className="txm-small mt-5 grid gap-3 border-t border-txm-line pt-5 text-txm-slate sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">Validation</dt>
                    <dd className="mt-0.5">{e.validationSummary}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-txm-subtle uppercase">Engagement model</dt>
                    <dd className="mt-0.5">{e.engagementModel}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {e.poc && (
                    <Link
                      href={pocPath(e.poc)}
                      className="txm-focus group inline-flex items-center gap-2 font-semibold text-txm-indigo hover:text-txm-base"
                    >
                      Watch the POC
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                  {agent && (
                    <Link
                      href={`/ai-agents/${agent.slug}`}
                      className="txm-focus group inline-flex items-center gap-2 font-semibold text-txm-indigo hover:text-txm-base"
                    >
                      {agent.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <CTABand
        title="Want to see one running on your data?"
        description="Pick an agent and we will scope a pilot with measures and human decision points agreed up front."
        primary={{ label: "Request an Agent Pilot", href: "/ai-agents#request-pilot" }}
      />
    </>
  );
}
