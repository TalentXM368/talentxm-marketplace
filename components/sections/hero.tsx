import { ArrowDown } from "lucide-react";
import { RibbonField } from "@/components/motion/ribbon-field";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumb, type Crumb } from "@/components/layout/breadcrumb";
import { cn } from "@/lib/cn";

interface HeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  /** Kept for existing callers. Heroes now use the brand shapes instead of a background photo. */
  image?: string;
  /** Replaces the default background (the soft ribbon field). */
  visual?: React.ReactNode;
  /** Large display headline (MOTION.md: "Display type"). */
  display?: boolean;
  /** In-page target for the "scroll" hint under the calls to action. */
  scrollHint?: { label: string; href: string };
  /** Short brand lines set in wide capitals at the bottom right, as on the brand board. */
  signature?: string[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  breadcrumbs?: Crumb[];
  size?: "lg" | "md";
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Deep navy with the brand shapes, eyebrow pill, H1 and two CTAs (UX01: reuse; BRANDING.md). */
export function Hero({
  eyebrow,
  title,
  lede,
  visual,
  display = false,
  scrollHint,
  signature,
  primary,
  secondary,
  breadcrumbs,
  size = "md",
  aside,
  children,
}: HeroProps) {
  return (
    <section
      className={cn(
        "txm-mesh-bg relative isolate overflow-hidden",
        size === "lg" ? "min-h-[84vh] lg:min-h-[90vh]" : "min-h-[52vh]",
        "flex items-center",
      )}
    >
      <div className="absolute inset-0 -z-10">{visual ?? <RibbonField tone="soft" />}</div>
      <div className="txm-container w-full py-16 md:py-24">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className={cn("grid items-center gap-12", aside ? "lg:grid-cols-[minmax(0,1fr)_420px]" : "")}>
          <div className={display ? "max-w-4xl" : "max-w-3xl"}>
            <p
              className="txm-load mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5"
              style={step(0)}
            >
              <span className="h-2 w-2 rounded-full bg-txm-yellow" aria-hidden="true" />
              <span className="txm-small font-semibold text-white/90">{eyebrow}</span>
            </p>
            <h1 className={cn(display ? "txm-display" : "txm-h1", "txm-words-load text-white")}>
              <SplitText text={title} />
            </h1>
            <p className="txm-lede txm-load mt-6 max-w-xl text-txm-on-dark" style={step(2)}>
              {lede}
            </p>
            {(primary || secondary) && (
              <div className="txm-load mt-8 flex flex-col gap-3 sm:flex-row" style={step(3)}>
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
      {signature && (
        <p
          className="txm-signature txm-load absolute bottom-10 left-[max(24px,calc((100vw-1200px)/2+24px))] hidden text-txm-on-dark lg:block"
          style={step(6)}
        >
          {signature.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
