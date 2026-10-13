import { FormSection } from "@/components/forms/form-section";
import { CheckList } from "@/components/sections/blocks";
import { InfoCard } from "@/components/sections/cards";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers & Talent Network",
  description:
    "Join the TalentXM talent network: integration, AI, platform and data specialists across the US, LATAM and India.",
  path: "/careers",
});

const skills = [
  { title: "Integration", body: "Workato, n8n, APIs, HL7 and FHIR, X12 and event-driven integration." },
  { title: "AI and data", body: "Agent design, evaluation, machine learning, data engineering and retrieval." },
  { title: "Enterprise platforms", body: "SAP, CRM, HCM, EHR and MES configuration and extension." },
  { title: "Cloud and security", body: "AWS, Azure, identity and access, and AI governance." },
];

export default function CareersPage() {
  return (
    <>
      <Hero
        eyebrow="Careers"
        title="Do enterprise AI work that ships."
        lede="We look for specialists who like real systems and real constraints. Join the talent network and we will contact you when work fits your skills."
        image="/images/office-bg.webp"
        primary={{ label: "Join Talent Network", href: "#join" }}
        breadcrumbs={[{ label: "Careers", href: "/careers" }]}
      />

      <Section labelledBy="skills-title">
        <SectionHeader id="skills-title" eyebrow="What we look for" title="Skills we work with." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <InfoCard key={s.title} title={s.title} body={s.body} />
          ))}
        </div>
      </Section>

      <FormSection
        id="join"
        formId="F-05"
        sourcePage="/careers"
        eyebrow="Join Talent Network"
        title="Tell us what you do best."
        description="Your details go to our recruiting team only. They are never used for sales outreach."
        aside={
          <CheckList
            items={[
              "We contact you when an engagement matches your skills and region.",
              "A practitioner reviews your profile.",
              "You can ask us to remove your details at any time.",
            ]}
          />
        }
      />
    </>
  );
}
