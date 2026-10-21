import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { pocLibraryPath } from "@/lib/pocs";
import { pageMetadata } from "@/lib/seo";
import { underDevelopmentPath } from "@/lib/site-lock";

export const metadata = pageMetadata({
  title: "Under development",
  description: "This part of TalentXM.ai is still being built. The POC Library is open now.",
  path: underDevelopmentPath,
  noindex: true,
});

/** Shown in place of every locked page while the site is under development (lib/site-lock.ts). */
export default function UnderDevelopment() {
  return (
    <section className="txm-mesh-bg flex min-h-[70vh] items-center">
      <div className="txm-container py-20">
        <p className="txm-eyebrow text-txm-cyan">Under development</p>
        <h1 className="txm-h1 mt-3 max-w-3xl text-white">This part of TalentXM.ai is still being built.</h1>
        <p className="txm-lede mt-4 max-w-2xl text-slate-300">
          The POC Library is open now. Watch the proofs of concept we have built and recorded, and filter them by
          industry, business function or technology.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink href={pocLibraryPath} tone="dark">
            Browse the POC Library
          </ButtonLink>
          <a
            href={`mailto:${site.email}`}
            className="txm-focus-inverse rounded-md text-sm font-semibold text-slate-300 hover:text-white"
          >
            Questions? {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
