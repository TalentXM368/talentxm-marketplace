import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { pocLibraryPath } from "@/lib/pocs";
import { isOpenPath, siteLocked } from "@/lib/site-lock";

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
].filter((l) => isOpenPath(l.href));

// While the site is locked the POC Library is the only place to send people.
const mainLink = siteLocked
  ? { label: "Go to the POC Library", href: pocLibraryPath }
  : { label: "Go to Services", href: "/services" };

export default function NotFound() {
  return (
    <section className="txm-mesh-bg flex min-h-[70vh] items-center">
      <div className="txm-container py-20">
        <p className="txm-eyebrow text-txm-cyan">404</p>
        <h1 className="txm-h1 mt-3 text-white">We could not find that page.</h1>
        <p className="txm-lede mt-4 max-w-2xl text-slate-300">
          It may have moved when we rebuilt the site.
          {topLinks.length > 0 && " These pages are a good place to start."}
        </p>
        {topLinks.length > 0 && (
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
        )}
        <div className="mt-10">
          <ButtonLink href={mainLink.href} tone="dark">
            {mainLink.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
