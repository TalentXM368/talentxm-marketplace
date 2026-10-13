import { FormSection } from "@/components/forms/form-section";
import { FAQ, JourneySteps } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Talent Marketplace: Early Access",
  description:
    "Early access to the TalentXM talent marketplace for employers, and the talent network for specialists.",
  path: "/marketplace",
});

const employerJourney = [
  { title: "Describe the work", body: "Share the deliverable, the platforms and the timeline, not only a job title." },
  { title: "See the evidence", body: "Review work samples and practitioner assessments for each specialist." },
  { title: "Engage", body: "Bring the specialist in on the delivery model that fits, from contract to direct hire." },
];

const talentJourney = [
  { title: "Join the network", body: "Tell us your skills, region and availability." },
  { title: "Show your work", body: "Practitioners review your experience against real delivery needs." },
  { title: "Get matched to work", body: "We contact you when an engagement fits your skills." },
];

const faqs = [
  {
    q: "When does the marketplace open?",
    a: "We are opening it to early-access employers and network members in stages. Join the list and we will contact you before each stage.",
  },
  {
    q: "Will I need an account now?",
    a: "No. Early access is a waiting list. No account is created when you submit the form.",
  },
  {
    q: "What does evidence not score mean?",
    a: "We show employers what a specialist has delivered and how a practitioner assessed it, rather than a single automated score.",
  },
];

export default function MarketplacePage() {
  return (
    <>
      <Hero
        eyebrow="Talent Marketplace · Early access"
        title="Hire for the work, with evidence you can check."
        lede="We are building a marketplace for enterprise AI and integration specialists. Employers see delivered work and practitioner reviews, not just a profile."
        image="/images/tech-bg-vibrant.webp"
        primary={{ label: "Employer early access", href: "#employers" }}
        secondary={{ label: "Join Talent Network", href: "#talent" }}
        breadcrumbs={[{ label: "Marketplace", href: "/marketplace" }]}
      />

      <Section labelledBy="employer-journey-title">
        <SectionHeader id="employer-journey-title" eyebrow="For employers" title="How it will work for employers." />
        <div className="mt-12">
          <JourneySteps steps={employerJourney} />
        </div>
      </Section>

      <Section tone="light" labelledBy="talent-journey-title">
        <SectionHeader id="talent-journey-title" eyebrow="For specialists" title="How it will work for talent." />
        <div className="mt-12">
          <JourneySteps steps={talentJourney} />
        </div>
      </Section>

      <Section tone="dark" labelledBy="evidence-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="txm-eyebrow text-txm-cyan">Evidence, not a score</p>
          <h2 id="evidence-title" className="txm-h2 mt-3 text-white">
            People decide who to hire.
          </h2>
          <p className="txm-lede mt-4 text-slate-300">
            The marketplace will help employers find and review specialists. It will not make hiring decisions or
            reduce a person to a single number.
          </p>
        </div>
      </Section>

      <FormSection
        id="employers"
        formId="F-04"
        sourcePage="/marketplace"
        tone="white"
        eyebrow="Employer early access"
        title="Join the employer waiting list."
        description="Tell us about your hiring needs. We will contact you when early access opens for your region."
      />

      <FormSection
        id="talent"
        formId="F-05"
        sourcePage="/marketplace"
        eyebrow="Join Talent Network"
        title="Join as a specialist."
        description="Your details go to our recruiting team only and are never used for sales outreach."
      />

      <Section labelledBy="faq-title">
        <SectionHeader id="faq-title" eyebrow="FAQ" title="Common questions." />
        <div className="mt-10">
          <FAQ items={faqs} />
        </div>
      </Section>
    </>
  );
}
