import { CircleCheck, Clock } from "lucide-react";
import { FormSection } from "@/components/forms/form-section";
import { CheckList, ComplianceRow } from "@/components/sections/blocks";
import { InfoCard } from "@/components/sections/cards";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { partnershipsVsExperience, responsibleAi, trustItems, trustReviewedAt, websiteData } from "@/content/trust";
import type { TrustItem } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust, Security & Responsible AI",
  description:
    "What TalentXM holds today, what is in progress, and how we keep people in control of AI work. Reviewed every 90 days.",
  path: "/trust",
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}
const reviewed = formatIsoDate(trustReviewedAt);

function TrustList({ items }: { items: TrustItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li key={t.statement} className="flex gap-4 rounded-xl border border-txm-line bg-white p-5">
          {t.state === "held" ? (
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          ) : (
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold text-txm-ink">{t.statement}</p>
            <p className="txm-small mt-1 text-txm-slate">{t.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TrustPage() {
  return (
    <>
      <Hero
        eyebrow={`Trust · Reviewed ${reviewed}`}
        title="What we hold today, and what is in progress."
        lede="Buyers check claims. This page lists our partnerships, controls and programmes as they stand, with the date of the last review."
        primary={{ label: "Request programme status", href: "#request-status" }}
        breadcrumbs={[{ label: "Trust", href: "/trust" }]}
      />

      <Section labelledBy="held-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="held-title" className="txm-h3 text-txm-ink">Held today</h2>
            <div className="mt-6">
              <TrustList items={trustItems.filter((t) => t.state === "held")} />
            </div>
          </div>
          <div>
            <h2 className="txm-h3 text-txm-ink">In progress</h2>
            <div className="mt-6">
              <TrustList items={trustItems.filter((t) => t.state === "in-progress")} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="frameworks-title">
        <SectionHeader
          id="frameworks-title"
          eyebrow="Frameworks"
          title="Frameworks we design against."
          description="These shape how we design and document our work. They are not certifications."
        />
        <div className="mt-10">
          <ComplianceRow />
        </div>
      </Section>

      <Section id="responsible-ai" labelledBy="rai-title">
        <SectionHeader id="rai-title" eyebrow="Responsible AI" title="How we keep people in control." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {responsibleAi.map((r) => (
            <InfoCard key={r.title} title={r.title} body={r.body} />
          ))}
        </div>
      </Section>

      <Section tone="light" labelledBy="partners-title">
        <SectionHeader
          id="partners-title"
          eyebrow="Partnerships vs experience"
          title="Which is which."
          description="A partnership is a formal relationship with the vendor. Experience means our team has delivered on the platform."
        />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-txm-line bg-white p-6">
            <h3 className="font-semibold text-txm-ink">Formal partnerships</h3>
            <div className="mt-3">
              <CheckList items={partnershipsVsExperience.partnerships} />
            </div>
          </div>
          <div className="rounded-2xl border border-txm-line bg-white p-6">
            <h3 className="font-semibold text-txm-ink">Delivery experience</h3>
            <div className="mt-3">
              <CheckList items={partnershipsVsExperience.experience} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="website-data" labelledBy="data-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeader id="data-title" align="left" eyebrow="Website data" title="What happens to what you send us." />
          <CheckList items={websiteData} />
        </div>
      </Section>

      <FormSection
        id="request-status"
        formId="F-01"
        sourcePage="/trust"
        defaults={{ priority: "security" }}
        eyebrow="Request programme status"
        title="Ask for our current security status."
        description="Tell us what your review needs. A named person will reply with the current scope and documents we can share."
      />
    </>
  );
}
