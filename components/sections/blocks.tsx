import Image from "next/image";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { StepWords } from "@/components/motion/scroll-type";
import { JsonLd } from "@/components/seo/json-ld";
import { frameworks } from "@/content/trust";
import type { ClientLogo, Faq, Stat, Testimonial } from "@/content/types";
import { faqLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

/** Steps of a process, as large words that fill in on scroll (MOTION.md: "Step words"; UX01: reuse). */
export function JourneySteps({
  steps,
  tone = "light",
  label,
}: {
  steps: { title: string; body: string }[];
  /** Match the section behind it. */
  tone?: "light" | "dark";
  label?: string;
}) {
  return <StepWords steps={steps} tone={tone} label={label} />;
}

/** Lead layer + execution layer explainer (UX01: reuse). */
export function PodModelDiagram({ lead, roles, note }: { lead: string; roles: string[]; note: string }) {
  return (
    <figure className="max-w-4xl">
      <div className="mb-3 rounded-[var(--txm-radius-md)] bg-txm-navy p-6 md:p-8">
        <p className="txm-card-kicker text-txm-yellow">Lead layer</p>
        <p className="txm-card-title mt-2 text-white" data-size="lg">
          {lead}
        </p>
        <p className="txm-card-body mt-2 text-white/85">Owns the brief, the quality bar and the fortnightly readout.</p>
      </div>
      <p className="txm-card-kicker mt-6 mb-1 text-txm-subtle">Execution layer</p>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {roles.map((role) => (
          <li key={role} className="border-t border-txm-line pt-4">
            <p className="txm-card-title text-txm-ink">{role}</p>
          </li>
        ))}
      </ul>
      <figcaption className="txm-small mt-6 text-txm-subtle">{note}</figcaption>
    </figure>
  );
}

/** FAQ block using native disclosure, so it works without JavaScript. */
export function FAQ({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqLd(items)} />}
      <div className="max-w-3xl divide-y divide-txm-line border-y border-txm-line">
        {items.map((item, i) => (
          <details key={item.q} className="group" open={i === 0}>
            <summary className="txm-focus flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <span className="text-base font-semibold text-txm-ink md:text-lg">{item.q}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-txm-subtle transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="txm-body pr-10 pb-5 text-txm-slate">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

/** Questions set as ruled columns, each with its short answer. */
export function QuestionCards({ items }: { items: Faq[] }) {
  return (
    <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
      {items.map((q) => (
        <div key={q.q} className="border-t border-txm-line pt-6">
          <h3 className="txm-card-title text-txm-ink" data-size="lg">
            {q.q}
          </h3>
          <p className="txm-card-body mt-3 text-txm-slate">{q.a}</p>
        </div>
      ))}
    </div>
  );
}

/** Frameworks we design against. Labelled as frameworks, not certifications. */
export function ComplianceRow({ align = "start" }: { align?: "center" | "start" }) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-3", align === "center" ? "justify-center" : "justify-start")}
      aria-label="Frameworks we design against"
    >
      {frameworks.map((f) => (
        <li
          key={f.name}
          className="flex items-center gap-2 rounded-full border border-txm-line bg-white px-4 py-2.5 shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-txm-accent" aria-hidden="true" />
          <span className="txm-small font-semibold text-txm-ink">{f.name}</span>
          <span className="txm-small hidden text-txm-subtle md:inline">{f.caption}</span>
        </li>
      ))}
    </ul>
  );
}

/** Client logos. Renders nothing until approved logos exist (UX01: new). */
export function ClientLogoStrip({ logos }: { logos: ClientLogo[] }) {
  if (logos.length === 0) return null;
  return (
    <section className="border-y border-txm-line bg-white py-10" aria-label="Clients">
      <ul className="txm-container flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((l) => (
          <li key={l.name}>
            <Image src={l.src} alt={l.name} width={140} height={40} className="h-10 w-auto opacity-80 grayscale" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Testimonials. Hidden rather than shipped empty (UX01). */
export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((t) => (
        <figure key={t.quote} className="txm-card p-6 md:p-7">
          <blockquote className="txm-body text-txm-ink">{t.quote}</blockquote>
          <figcaption className="txm-small mt-5 text-txm-subtle">
            {t.role}, {t.organisation}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Stats render only when every figure has a source (UX01: adjust). */
export function StatBand({ stats }: { stats: Stat[] }) {
  if (stats.length === 0 || stats.some((s) => !s.source)) return null;
  return (
    <dl className="grid gap-8 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block text-5xl font-extrabold tracking-tight text-white md:text-6xl">{s.value}</span>
            <span className="mt-2 block font-semibold text-white">{s.label}</span>
            <span className="txm-small mt-1 block text-slate-400">Source: {s.source}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={cn(
              "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
              tone === "dark" ? "bg-txm-yellow" : "bg-txm-orange",
            )}
            aria-hidden="true"
          />
          <span className={cn("txm-body", tone === "dark" ? "text-txm-on-dark" : "text-txm-slate")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
