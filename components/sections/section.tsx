import { cn } from "@/lib/cn";

type Tone = "white" | "light" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-white",
  light: "txm-section-light",
  dark: "txm-section-dark",
};

export function Section({
  tone = "white",
  id,
  className,
  children,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("txm-section", tones[tone], className)}>
      <div className="txm-container">{children}</div>
    </section>
  );
}

/** Eyebrow + H2 + subtitle that opens every section (UX01: reuse). */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false,
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <p className={cn("txm-eyebrow mb-3", inverse ? "text-txm-cyan" : "text-txm-indigo")}>{eyebrow}</p>}
      <h2 id={id} className={cn("txm-h2", inverse ? "text-white" : "text-txm-ink")}>
        {title}
      </h2>
      {description && (
        <p className={cn("txm-lede mt-4", inverse ? "text-slate-300" : "text-txm-slate")}>{description}</p>
      )}
    </div>
  );
}
