import Image from "next/image";
import Link from "next/link";
import { footerColumns, legalLinks, site } from "@/content/site";
import { homeHref, isOpenPath } from "@/lib/site-lock";
import { LockedLabel } from "./locked-label";

/** Columns follow Architecture S3, so labels match the header. */
export function SiteFooter() {
  return (
    <footer className="bg-txm-base text-slate-300">
      <div className="txm-container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Link href={homeHref} className="txm-focus-inverse inline-block rounded-lg bg-white px-3 py-2" aria-label="TalentXM home">
              <Image src="/images/talentxm-logo.png" alt="TalentXM" width={1140} height={460} className="h-8 w-auto" />
            </Link>
            <p className="txm-small mt-5 max-w-xs text-slate-400">
              Enterprise AI services, from platforms and integration to agents and delivery teams.
            </p>
            <p className="txm-small mt-4 text-slate-400">
              <a href={`mailto:${site.email}`} className="txm-focus-inverse hover:text-white">
                {site.email}
              </a>
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="text-sm font-semibold text-white">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {isOpenPath(l.href) ? (
                      <Link href={l.href} className="txm-focus-inverse txm-small hover:text-white">
                        {l.label}
                      </Link>
                    ) : (
                      <LockedLabel className="txm-small">{l.label}</LockedLabel>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="txm-container flex flex-col gap-4 py-6 text-xs leading-5 text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {site.copyrightYear} {site.legalEntity}. TalentXM is the operating brand of {site.legalEntity}.{" "}
            {site.location} · {site.regions}
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="txm-focus-inverse hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>Workato Silver Partner</li>
            <li>Evidence reviewed {site.evidenceReviewedAt}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
