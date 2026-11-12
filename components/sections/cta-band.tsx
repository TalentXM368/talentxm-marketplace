import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";

/**
 * Closing CTA band on every page; only the copy changes (UX01: reuse).
 * `size="xl"` is the full-width closing moment with display type (MOTION.md: "Closing call").
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
  const actions = (
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
  );

  if (size === "xl") {
    return (
      <section className="txm-mesh-bg relative isolate overflow-hidden py-24 text-center md:py-36">
        <div
          aria-hidden="true"
          className="txm-mesh-animate absolute inset-0 -z-10 opacity-60"
          style={{ backgroundImage: "var(--txm-gradient-mesh)" }}
        />
        <Reveal className="txm-container">
          <h2 className="txm-display-xl mx-auto max-w-5xl text-white">
            <SplitText text={title} />
          </h2>
          {description && <p className="txm-lede mx-auto mt-6 max-w-2xl text-txm-on-dark">{description}</p>}
          {actions}
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
            {actions}
          </div>
        </div>
      </div>
    </section>
  );
}
