import { FormSection } from "@/components/forms/form-section";
import { FAQ, PodModelDiagram, QuestionCards } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { IconTile } from "@/components/ui/icon";
import { deliveryModels, deliveryRegions, firstCallQuestions, ownershipRows, progression } from "@/content/delivery";
import { pageMetadata, serviceLd } from "@/lib/seo";

const description =
  "Flexible talent, capability pods, project delivery, dedicated teams and managed services across the US, LATAM and India.";

export const metadata = pageMetadata({ title: "Flexible Talent & Delivery Models", description, path: "/flexible-talent" });

const faqs = [
  {
    q: "What is the difference between talent-led and outcome-led?",
    a: "Talent-led models add people to your team and you direct the work. Outcome-led models make TalentXM accountable for a result against agreed measures.",
  },
  {
    q: "How quickly can a team start?",
    a: "It depends on the skills and the model. We agree a start date during scoping and do not promise one before we understand the work.",
  },
  {
    q: "Can we move from one model to another?",
    a: "Yes. Many clients start with a specialist or a project and move to a pod or managed service as the work grows.",
  },
];

export default function FlexibleTalentPage() {
  return (
    <>
      <JsonLd data={serviceLd("Flexible Talent & Delivery Models", description, "/flexible-talent")} />
      <Hero
        eyebrow="Flexible Talent"
        title="The right shape of team for the work."
        lede="From a single specialist on your team to a pod that owns the outcome. We size the team to the work, not to a headcount target."
        image="/images/office-bg.webp"
        primary={{ label: "Structure My Team", href: "#structure-my-team" }}
        secondary={{ label: "See the pod model", href: "#pod-model" }}
        breadcrumbs={[{ label: "Flexible Talent", href: "/flexible-talent" }]}
      />

      <Section labelledBy="progression-title">
        <SectionHeader
          id="progression-title"
          eyebrow="Progression"
          title="From supplying a person to owning an outcome."
          description="Each step moves more delivery responsibility to us."
        />
        <ol className="mt-12 grid gap-3 md:grid-cols-5">
          {progression.map((p, i) => (
            <li key={p.label} className="relative rounded-xl border border-txm-line bg-white p-5">
              <div
                className="txm-gradient-bg absolute inset-x-0 top-0 h-1 rounded-t-xl"
                style={{ opacity: 0.35 + i * 0.16 }}
                aria-hidden="true"
              />
              <p className="font-mono text-sm text-txm-subtle">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-semibold text-txm-ink">{p.label}</p>
              <p className="txm-small mt-1 text-txm-slate">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {(["talent-led", "outcome-led"] as const).map((group) => (
        <Section key={group} tone={group === "talent-led" ? "light" : "dark"} labelledBy={`${group}-title`}>
          <SectionHeader
            id={`${group}-title`}
            align="left"
            inverse={group === "outcome-led"}
            eyebrow={group === "talent-led" ? "Talent-led" : "Outcome-led"}
            title={group === "talent-led" ? "People who join your team." : "Teams accountable for the result."}
            description={
              group === "talent-led"
                ? "You direct the work. We find, screen and support the specialists."
                : "We own delivery against measures agreed on day one, and report on them every two weeks."
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {deliveryModels
              .filter((m) => m.group === group)
              .map((m) => (
                <div
                  key={m.slug}
                  className={
                    group === "talent-led"
                      ? "txm-card h-full p-6"
                      : "h-full rounded-2xl border border-white/10 bg-txm-surface p-6"
                  }
                >
                  <IconTile name={m.icon} size="sm" />
                  <h3 className={group === "talent-led" ? "mt-4 text-lg font-bold text-txm-ink" : "mt-4 text-lg font-bold text-white"}>
                    {m.name}
                  </h3>
                  <p className={group === "talent-led" ? "txm-small mt-2 text-txm-slate" : "txm-small mt-2 text-slate-300"}>
                    {m.description}
                  </p>
                  <p className={group === "talent-led" ? "txm-small mt-4 text-txm-subtle" : "txm-small mt-4 text-slate-400"}>
                    <span className="font-semibold">Best when:</span> {m.buyerNeed}
                  </p>
                </div>
              ))}
          </div>
        </Section>
      ))}

      <Section labelledBy="ownership-title">
        <SectionHeader id="ownership-title" eyebrow="Ownership" title="Who owns what." />
        <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-2xl border border-txm-line">
          <table className="w-full min-w-[520px] text-left">
            <thead className="bg-txm-light text-xs font-semibold tracking-wide text-txm-subtle uppercase">
              <tr>
                <th scope="col" className="px-5 py-4">Responsibility</th>
                <th scope="col" className="px-5 py-4">Talent-led</th>
                <th scope="col" className="px-5 py-4">Outcome-led</th>
              </tr>
            </thead>
            <tbody className="txm-small divide-y divide-txm-line bg-white text-txm-slate">
              {ownershipRows.map((r) => (
                <tr key={r.item}>
                  <th scope="row" className="px-5 py-4 font-semibold text-txm-ink">{r.item}</th>
                  <td className="px-5 py-4">{r.talent}</td>
                  <td className="px-5 py-4">{r.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="pod-model" tone="light" labelledBy="pod-title">
        <SectionHeader
          id="pod-title"
          eyebrow="The pod model"
          title="One lead. A small execution layer. Clear ownership."
          description="A senior lead carries the brief and the quality bar. The execution layer delivers the work."
        />
        <div className="mt-12">
          <PodModelDiagram
            lead="Senior pod lead"
            roles={["Builder", "Builder", "Specialist", "Specialist"]}
            note="Roles vary by engagement. Pods are sized to the work."
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="global-title">
        <SectionHeader id="global-title" inverse eyebrow="Global delivery" title="US · LATAM · India." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {deliveryRegions.map((r) => (
            <div key={r.name} className="rounded-2xl border border-white/10 bg-txm-surface p-6">
              <IconTile name="globe" size="sm" />
              <h3 className="mt-4 text-lg font-bold text-white">{r.name}</h3>
              <p className="txm-small mt-2 text-slate-300">{r.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="questions-title">
        <SectionHeader id="questions-title" eyebrow="The first call" title="Four questions we will ask you." />
        <div className="mt-12">
          <QuestionCards items={firstCallQuestions} />
        </div>
        <div className="mt-16">
          <FAQ items={faqs} />
        </div>
      </Section>

      <FormSection
        id="structure-my-team"
        formId="F-03"
        sourcePage="/flexible-talent"
        eyebrow="Structure My Team"
        title="Tell us about the work."
        description="Share the skills and timing you have in mind. We will propose a delivery model and the people for it."
      />
    </>
  );
}
