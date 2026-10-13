import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumb, type Crumb } from "@/components/layout/breadcrumb";
import { cn } from "@/lib/cn";

interface HeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  image?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  breadcrumbs?: Crumb[];
  size?: "lg" | "md";
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

/** Gradient + network background, eyebrow pill, H1, two CTAs (UX01: reuse). */
export function Hero({
  eyebrow,
  title,
  lede,
  image = "/images/hero-bg-dark.webp",
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
        size === "lg" ? "min-h-[78vh] lg:min-h-[82vh]" : "min-h-[52vh]",
        "flex items-center",
      )}
    >
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-txm-base via-txm-base/80 to-txm-base/55" />
      </div>
      <div
        aria-hidden="true"
        className="txm-mesh-animate absolute inset-0 -z-10 opacity-60"
        style={{ backgroundImage: "var(--txm-gradient-mesh)" }}
      />
      <div className="txm-container w-full py-16 md:py-24">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className={cn("grid items-center gap-12", aside ? "lg:grid-cols-[minmax(0,1fr)_420px]" : "")}>
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-txm-cyan" aria-hidden="true" />
              <span className="txm-small font-semibold text-white/90">{eyebrow}</span>
            </p>
            <h1 className="txm-h1 text-white">{title}</h1>
            <p className="txm-lede mt-5 max-w-2xl text-slate-300">{lede}</p>
            {(primary || secondary) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            {children}
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
