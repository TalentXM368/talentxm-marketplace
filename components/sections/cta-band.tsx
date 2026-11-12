import { Reveal } from "@/components/motion/reveal";
import { RibbonField } from "@/components/motion/ribbon-field";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";

/**
 * Closing CTA band on every page; only the copy changes (UX01: reuse).
 * `size="xl"` is the full-width closing moment on Energy Orange-Red (MOTION.md: "Closing call").
 */
export function CTABand({
  title,
  description,
  primary,
  secondary,
  size = "md",
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  size?: "md" | "xl";
}) {
  if (size === "xl") {
    return (
      <section className="relative isolate overflow-hidden bg-txm-orange py-24 md:py-36">
        <div className="absolute inset-0 -z-10">
          <RibbonField palette="on-orange" />
        </div>
        <Reveal className="txm-container">
          <h2 className="txm-display-xl max-w-4xl text-white">
            <SplitText text={title} />
          </h2>
          {description && <p className="txm-lede mt-6 max-w-xl font-medium text-txm-base">{description}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href} className="bg-txm-base hover:bg-txm-navy">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink
                href={secondary.href}
                variant="secondary"
                className="border-txm-base/50 text-txm-base hover:border-txm-base hover:bg-white/25"
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </section>
    );
  }

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
            {description && <p className="txm-lede mt-4 text-txm-on-dark">{description}</p>}
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
