import { FormSection } from "@/components/forms/form-section";
import { FollowTheSun } from "@/components/motion/follow-the-sun";
import { FAQ, PodModelDiagram, QuestionCards } from "@/components/sections/blocks";
import { DeliveryScale } from "@/components/sections/delivery-scale";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { deliveryModels, deliveryRegions, firstCallQuestions, ownershipRows } from "@/content/delivery";
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

      <Section tone="dark" labelledBy="progression-title" className="border-t border-white/10">
        <SectionHeader
          id="progression-title"
          inverse
          title="From supplying a person to owning an outcome."
          description="Each step to the right moves more delivery responsibility to us."
        />
        <div className="mt-14">
          <DeliveryScale models={deliveryModels} />
        </div>
      </Section>

      {(["talent-led", "outcome-led"] as const).map((group) => (
        <Section key={group} tone={group === "talent-led" ? "light" : "white"} labelledBy={`${group}-title`}>
          <SectionHeader
            id={`${group}-title`}
            title={group === "talent-led" ? "Talent-led: people who join your team." : "Outcome-led: teams accountable for the result."}
            description={
              group === "talent-led"
                ? "You direct the work. We find, screen and support the specialists."
                : "We own delivery against measures agreed on day one, and report on them every two weeks."
            }
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {deliveryModels
              .filter((m) => m.group === group)
              .map((m) => (
                <div key={m.slug} className="h-full border-t border-txm-line pt-6">
                  <Icon name={m.icon} className="h-6 w-6 text-txm-accent" />
                  <h3 className="txm-card-title mt-5 text-txm-ink">{m.name}</h3>
                  <p className="txm-card-body mt-2 text-txm-slate">{m.description}</p>
                  <p className="txm-card-kicker mt-5 text-txm-subtle">Best when</p>
                  <p className="txm-card-body mt-1 text-txm-ink">{m.buyerNeed}</p>
                </div>
              ))}
          </div>
        </Section>
      ))}

      <Section labelledBy="ownership-title">
        <SectionHeader id="ownership-title" title="Who owns what." />
        <div className="mt-12 max-w-4xl overflow-x-auto border-t border-txm-line">
          <table className="w-full min-w-[520px] text-left">
            <thead className="text-xs font-semibold text-txm-subtle">
              <tr>
                <th scope="col" className="px-5 py-4">Responsibility</th>
                <th scope="col" className="px-5 py-4">Talent-led</th>
                <th scope="col" className="px-5 py-4">Outcome-led</th>
              </tr>
            </thead>
            <tbody className="txm-small divide-y divide-txm-line border-y border-txm-line text-txm-slate">
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

      <Section tone="dark" labelledBy="global-title" className="border-t border-white/10">
        <SectionHeader
          id="global-title"
          inverse
          title="US, LATAM and India: normal hours, work that keeps moving."
        />
        <div className="mt-14">
          <FollowTheSun regions={deliveryRegions} />
        </div>
      </Section>

      <Section labelledBy="questions-title">
        <SectionHeader id="questions-title" title="Four questions we will ask you." />
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
        title="Tell us about the work."
        description="Share the skills and timing you have in mind. We will propose a delivery model and the people for it."
      />
    </>
  );
}
