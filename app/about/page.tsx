import { JourneySteps } from "@/components/sections/blocks";
import { InfoCard } from "@/components/sections/cards";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { deliveryRegions } from "@/content/delivery";
import { site } from "@/content/site";
import { partnershipsVsExperience } from "@/content/trust";
import { organizationLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About TalentXM",
  description:
    "TalentXM is the enterprise AI services brand of BlockTXM Inc., delivering platforms, integration, AI agents and teams from Columbus, Ohio.",
  path: "/about",
});

const beliefs = [
  {
    icon: "compass" as const,
    title: "Start from the work, not the role.",
    body: "Outcomes are scoped before people are assigned. Teams are shaped to the work, not the other way round.",
  },
  {
    icon: "target" as const,
    title: "Senior thinking and senior delivery.",
    body: "Every engagement has a named lead who owns the outcome and a team that delivers every week.",
  },
  {
    icon: "sparkles" as const,
    title: "AI work, not AI theatre.",
    body: "Agents and teams work inside real workflows. We report against measures, not launch announcements.",
  },
  {
    icon: "handshake" as const,
    title: "Peer to peer, not vendor to client.",
    body: "We work as part of your team, and hand over the recipes and runbooks when our part is done.",
  },
];

const howWeWork = [
  { title: "Listen", body: "We start with the brief, the constraints and the people closest to the work." },
  { title: "Match", body: "We bring the platforms, integrations, agents and people that fit the workflow." },
  { title: "Deliver", body: "Fortnightly readouts against agreed measures, and documentation you keep." },
];

const ecosystem = [
  { name: "TalentXM", body: "Enterprise AI services, agents and delivery teams." },
  { name: "TravelXM", body: "Experiences and travel ventures inside the XM ecosystem." },
  { name: "WellnessXM", body: "Wellness and longevity ventures inside the XM ecosystem." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About TalentXM", url: `${site.url}/about` }} />
      <Hero
        eyebrow="About TalentXM"
        title="A services firm for enterprise AI."
        lede="TalentXM is the operating brand of BlockTXM Inc., based in Columbus, Ohio, with delivery teams across the US, LATAM and India."
        image="/images/office-bg.webp"
        primary={site.primaryCta}
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionHeader id="story-title" align="left" eyebrow="Our story" title="Why we started TalentXM." />
          <div className="txm-prose max-w-none">
            <p>
              TalentXM began inside the XM ecosystem because the people building AI work kept meeting the same
              problem: the right team to deliver it was hard to find. Resumes did not match outcomes, and roles did
              not match the work.
            </p>
            <p>
              So we built a different model. A senior lead owns the brief. A small team delivers. Specialists join
              when the work needs them, and integrations and agents take on the repeat work. The team you bring in
              stays until the engagement is done.
            </p>
            <p>
              Today that model covers the full path, from the platforms and data that AI depends on to the agents
              and the teams that run them.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="beliefs-title">
        <SectionHeader id="beliefs-title" eyebrow="What we believe" title="Four principles." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {beliefs.map((b) => (
            <InfoCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </div>
      </Section>

      <Section labelledBy="how-title">
        <SectionHeader id="how-title" eyebrow="How we work" title="Listen. Match. Deliver." />
        <div className="mt-12">
          <JourneySteps steps={howWeWork} />
        </div>
      </Section>

      <Section tone="dark" labelledBy="where-title">
        <SectionHeader id="where-title" inverse eyebrow="Where we operate" title="US · LATAM · India." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {deliveryRegions.map((r) => (
            <div key={r.name} className="rounded-2xl border border-white/10 bg-txm-surface p-6">
              <h3 className="text-lg font-bold text-white">{r.name}</h3>
              <p className="txm-small mt-2 text-slate-300">{r.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="partners" tone="light" labelledBy="partners-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeader
            id="partners-title"
            align="left"
            eyebrow="Partners"
            title="Partnerships, and the platforms we know."
            description="We keep formal partnerships separate from delivery experience, so you know which is which."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-txm-line bg-white p-6">
              <h3 className="font-semibold text-txm-ink">Partnerships</h3>
              <ul className="txm-small mt-3 space-y-2 text-txm-slate">
                {partnershipsVsExperience.partnerships.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-txm-line bg-white p-6">
              <h3 className="font-semibold text-txm-ink">Delivery experience</h3>
              <ul className="txm-small mt-3 space-y-2 text-txm-slate">
                {partnershipsVsExperience.experience.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="ecosystem-title">
        <SectionHeader id="ecosystem-title" eyebrow="The XM ecosystem" title="Part of a wider group." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ecosystem.map((e) => (
            <InfoCard key={e.name} title={e.name} body={e.body} />
          ))}
        </div>
      </Section>

      <CTABand
        title="Work with us."
        description="Tell us what you are trying to deliver, or join the talent network."
        primary={site.primaryCta}
        secondary={{ label: "Careers", href: "/careers" }}
      />
    </>
  );
}
