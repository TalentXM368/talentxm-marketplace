import { ButtonLink } from "@/components/ui/button";

/** Closing CTA band on every page; only the copy changes (UX01: reuse). */
export function CTABand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="txm-section bg-white">
      <div className="txm-container">
        <div className="relative isolate overflow-hidden rounded-3xl bg-txm-base px-6 py-12 text-center md:px-16 md:py-16">
          <div
            aria-hidden="true"
            className="txm-mesh-animate absolute inset-0 -z-10 opacity-60"
            style={{ backgroundImage: "var(--txm-gradient-mesh)" }}
          />
          <div className="mx-auto max-w-2xl">
            <h2 className="txm-h2 text-white">{title}</h2>
            {description && <p className="txm-lede mt-4 text-slate-300">{description}</p>}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} tone="dark">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} tone="dark" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
