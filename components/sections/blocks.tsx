import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { IconTile } from "@/components/ui/icon";
import { frameworks } from "@/content/trust";
import type { ClientLogo, Faq, ServiceDomain, Stat, Testimonial } from "@/content/types";
import { faqLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

/** Numbered steps: what working with TalentXM looks like (UX01: reuse). */
export function JourneySteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className={cn("grid gap-6", steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
      {steps.map((s, i) => (
        <li key={s.title} className="txm-card p-7">
          <p className="mb-3 font-mono text-sm text-txm-subtle">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mb-2 text-xl font-bold text-txm-ink">{s.title}</h3>
          <p className="txm-body text-txm-slate">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Enterprise AI stack: five service domains as layers, foundation at the bottom. */
export function StackDiagram({ domains, highlight }: { domains: ServiceDomain[]; highlight?: string }) {
  return (
    <figure className="mx-auto max-w-3xl">
      <ol className="flex flex-col gap-2" aria-label="Enterprise AI stack, top layer first">
        {domains.map((d) => {
          const active = highlight === d.slug;
          return (
            <li key={d.slug}>
              <Link
                href={`/services/${d.slug}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "txm-focus group flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors",
                  active
                    ? "txm-gradient-bg border-transparent text-white"
                    : "border-txm-line bg-white text-txm-ink hover:border-txm-indigo/40",
                  d.stackLayer === 5 && !active && "bg-slate-50",
                )}
              >
                <span
                  className={cn("w-6 font-mono text-sm", active ? "text-white/80" : "text-txm-subtle")}
                  aria-hidden="true"
                >
                  L{d.stackLayer}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{d.menuLabel}</span>
                  <span className={cn("txm-small block", active ? "text-white/85" : "text-txm-slate")}>
                    {d.capabilities.map((c) => c.name).join(" · ")}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <figcaption className="txm-small mt-4 text-center text-txm-subtle">
        Each layer depends on the one beneath it. Operate &amp; Scale wraps the whole stack.
      </figcaption>
    </figure>
  );
}

/** Lead layer + execution layer explainer (UX01: reuse). */
export function PodModelDiagram({ lead, roles, note }: { lead: string; roles: string[]; note: string }) {
  return (
    <figure className="txm-card mx-auto max-w-4xl p-6 md:p-8">
      <div className="txm-gradient-bg mb-5 rounded-2xl p-6">
        <p className="txm-eyebrow text-white/80">Lead layer</p>
        <p className="mt-1 text-2xl font-bold text-white">{lead}</p>
        <p className="txm-small mt-1 text-white/85">Owns the brief, the quality bar and the fortnightly readout.</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {roles.map((role) => (
          <li key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs font-semibold tracking-wider text-txm-subtle uppercase">Execution layer</p>
            <p className="mt-1 font-bold text-txm-ink">{role}</p>
          </li>
        ))}
      </ul>
      <figcaption className="txm-small mt-6 text-center text-txm-subtle">{note}</figcaption>
    </figure>
  );
}

/** FAQ block using native disclosure, so it works without JavaScript. */
export function FAQ({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqLd(items)} />}
      <div className="mx-auto max-w-3xl divide-y divide-txm-line border-y border-txm-line">
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

/** Numbered question cards (Pods page). Also usable as a light FAQ block. */
export function QuestionCards({ items }: { items: Faq[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((q, i) => (
        <div key={q.q} className="txm-card p-7">
          <p className="mb-2 font-mono text-sm text-txm-subtle">Q{i + 1}</p>
          <h3 className="mb-2 text-xl font-bold text-txm-ink">{q.q}</h3>
          <p className="txm-body text-txm-slate">{q.a}</p>
        </div>
      ))}
    </div>
  );
}

/** Frameworks we design against. Labelled as frameworks, not certifications. */
export function ComplianceRow() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3" aria-label="Frameworks we design against">
      {frameworks.map((f) => (
        <li
          key={f.name}
          className="flex items-center gap-2 rounded-full border border-txm-line bg-white px-4 py-2.5 shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-txm-indigo" aria-hidden="true" />
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
        <figure key={t.quote} className="txm-card p-7">
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
              tone === "dark" ? "bg-txm-cyan" : "bg-txm-indigo",
            )}
            aria-hidden="true"
          />
          <span className={cn("txm-body", tone === "dark" ? "text-slate-300" : "text-txm-slate")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconFeature({
  icon,
  title,
  body,
}: {
  icon: Parameters<typeof IconTile>[0]["name"];
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <IconTile name={icon} size="sm" />
      <div>
        <h3 className="font-semibold text-txm-ink">{title}</h3>
        <p className="txm-small mt-1 text-txm-slate">{body}</p>
      </div>
    </div>
  );
}
