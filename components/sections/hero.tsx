import { ArrowDown } from "lucide-react";
import { HeroGate } from "@/components/motion/hero-gate";
import { LogoForm } from "@/components/motion/logo-form";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumb, type Crumb } from "@/components/layout/breadcrumb";
import { cn } from "@/lib/cn";

interface HeroProps {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Kept for existing callers. Heroes now use the logo form instead of a background photo. */
  image?: string;
  /** Replaces the default background (the soft logo form). Ignored with `bleed`. */
  visual?: React.ReactNode;
  /** Large display headline (MOTION.md: "Display type"). */
  display?: boolean;
  /** Short line in capitals under a hairline rule, as on the brand essence board. */
  tagline?: string;
  /** In-page target for the "scroll" hint under the calls to action. */
  scrollHint?: { label: string; href: string };
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  breadcrumbs?: Crumb[];
  size?: "lg" | "md";
  /**
   * Home only: the hero has no background of its own. It sits inside `.txm-bleed`, which draws the
   * logo form across the hero and the section after it (see app/page.tsx).
   */
  bleed?: boolean;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Deep navy hero with the logo form on the right, under the transparent header (BRANDING.md).
 * Eyebrow, headline, optional tagline or lede, and two calls to action.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  visual,
  display = false,
  tagline,
  scrollHint,
  primary,
  secondary,
  breadcrumbs,
  size = "md",
  bleed = false,
  aside,
  children,
}: HeroProps) {
  return (
    <section
      data-hero-gate=""
      className={cn(
        "txm-under-header relative flex items-center",
        bleed ? "" : "isolate overflow-hidden bg-txm-base",
        size === "lg" ? "min-h-[88svh] lg:min-h-svh" : "min-h-[56vh]",
      )}
    >
      <HeroGate />
      {!bleed && <div className="absolute inset-0 -z-10">{visual ?? <LogoForm tone="soft" />}</div>}
      <div className="txm-container w-full py-16 md:py-24">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className={cn("grid items-center gap-12", aside ? "lg:grid-cols-[minmax(0,1fr)_420px]" : "")}>
          <div className={display ? "max-w-2xl" : "max-w-3xl"}>
            <p className="txm-eyebrow txm-load mb-6 text-white/85" style={step(0)}>
              {eyebrow}
            </p>
            <h1 className={cn(display ? "txm-display" : "txm-h1", "txm-words-load text-white")}>
              <SplitText text={title} />
            </h1>
            {tagline && (
              <div className="txm-load mt-10" style={step(2)}>
                <span className="block h-px w-20 bg-white/70" aria-hidden="true" />
                <p className="txm-tagline mt-8 text-white/90">{tagline}</p>
              </div>
            )}
            {lede && (
              <p className="txm-lede txm-load mt-6 max-w-xl text-txm-on-dark" style={step(2)}>
                {lede}
              </p>
            )}
            {(primary || secondary) && (
              <div className="txm-load mt-10 flex flex-col gap-3 sm:flex-row" style={step(3)}>
                {primary && (
                  <ButtonLink href={primary.href} tone="dark">
                    {primary.label}
                  </ButtonLink>
                )}
                {secondary && (
                  <ButtonLink href={secondary.href} tone="dark" variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            )}
            {scrollHint && (
              <a
                href={scrollHint.href}
                className="txm-focus-inverse txm-load txm-scroll-hint txm-small mt-12 inline-flex items-center gap-2 font-semibold text-txm-on-dark hover:text-white"
                style={step(5)}
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {scrollHint.label}
              </a>
            )}
            {children}
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
