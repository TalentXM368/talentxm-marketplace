import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { LeadForm } from "@/components/forms/lead-form";
import { JourneySteps } from "@/components/sections/blocks";
import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Discuss Your AI Priority",
  description:
    "Tell TalentXM about the workflow you want to change. A named person will reply and suggest where to start.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read it", body: "A named person on our team reads your message and checks who is best placed to reply." },
  { title: "We reply", body: "You hear from that person directly, with questions or a suggested time to talk." },
  { title: "We map it", body: "On the first call we map the workflow, the systems and what a good outcome looks like." },
];

const otherRoutes = [
  { label: "Request an agent pilot", detail: "Start from one of the validated agents", href: "/ai-agents#request-pilot" },
  { label: "Structure my team", detail: "Specialists, pods or managed services", href: "/flexible-talent#structure-my-team" },
  { label: "Join the talent network", detail: "For specialists and candidates", href: "/careers#join" },
  { label: "Employer early access", detail: "The upcoming talent marketplace", href: "/marketplace#employers" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Discuss Your AI Priority",
          url: `${site.url}/contact`,
        }}
      />
      <Hero
        eyebrow="Contact"
        title="Discuss your AI priority."
        lede="Tell us the workflow you want to change and the systems involved. A named person will reply."
        image="/images/office-bg.webp"
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <Section labelledBy="next-title">
        <SectionHeader id="next-title" eyebrow="What happens next" title="Three steps after you send this." />
        <div className="mt-12">
          <JourneySteps steps={nextSteps} />
        </div>
      </Section>

      <section id="discuss" aria-labelledby="form-title" className="txm-section txm-section-light">
        <div className="txm-container grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div className="rounded-2xl border border-txm-line bg-white p-6 shadow-txm-card md:p-8">
            <h2 id="form-title" className="txm-h3 mb-6 text-txm-ink">
              Your priority
            </h2>
            <Suspense fallback={<LeadForm formId="F-01" sourcePage="/contact" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-4" aria-label="Other ways to reach us">
            <div className="rounded-2xl border border-txm-line bg-white p-6">
              <Mail className="h-5 w-5 text-txm-indigo" aria-hidden="true" />
              <p className="mt-3 font-semibold text-txm-ink">Email</p>
              <a href={`mailto:${site.email}`} className="txm-focus txm-small text-txm-indigo hover:text-txm-base">
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-txm-line bg-white p-6">
              <MessageCircle className="h-5 w-5 text-txm-indigo" aria-hidden="true" />
              <p className="mt-3 font-semibold text-txm-ink">WhatsApp</p>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="txm-focus txm-small text-txm-indigo hover:text-txm-base"
              >
                {site.whatsapp.display}
              </a>
            </div>
            <div className="rounded-2xl border border-txm-line bg-white p-6">
              <MapPin className="h-5 w-5 text-txm-indigo" aria-hidden="true" />
              <p className="mt-3 font-semibold text-txm-ink">Location</p>
              <p className="txm-small text-txm-slate">
                {site.location}, United States. Delivery across {site.regions}.
              </p>
            </div>

            <div className="rounded-2xl border border-txm-line bg-white p-2">
              <p className="txm-eyebrow px-4 pt-4 pb-2 text-txm-subtle">Other routes</p>
              <ul>
                {otherRoutes.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="txm-focus group flex items-center justify-between gap-3 rounded-xl px-4 py-3 hover:bg-slate-50"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-txm-ink">{r.label}</span>
                        <span className="block text-xs text-txm-subtle">{r.detail}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-txm-subtle" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
