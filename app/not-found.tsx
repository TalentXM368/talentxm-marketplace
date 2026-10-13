import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const topLinks = [
  { label: "Enterprise AI Services", href: "/services" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Industries", href: "/industries" },
  { label: "Flexible Talent", href: "/flexible-talent" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="txm-mesh-bg flex min-h-[70vh] items-center">
      <div className="txm-container py-20">
        <p className="txm-eyebrow text-txm-cyan">404</p>
        <h1 className="txm-h1 mt-3 text-white">We could not find that page.</h1>
        <p className="txm-lede mt-4 max-w-2xl text-slate-300">
          It may have moved when we rebuilt the site. These pages are a good place to start.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {topLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="txm-focus-inverse inline-block rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="/services" tone="dark">
            Go to Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
