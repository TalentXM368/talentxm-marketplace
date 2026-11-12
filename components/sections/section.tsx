import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
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

/**
 * Eyebrow + H2 + subtitle that opens every section (UX01: reuse).
 * `reveal` animates it in on scroll, with the title rising word by word (MOTION.md).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false,
  reveal = false,
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  reveal?: boolean;
  id?: string;
  className?: string;
}) {
  const classes = cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className);
  const content = (
    <>
      {eyebrow && <p className={cn("txm-eyebrow mb-3", inverse ? "text-txm-yellow" : "text-txm-accent")}>{eyebrow}</p>}
      <h2 id={id} className={cn("txm-h2", inverse ? "text-white" : "text-txm-ink")}>
        {reveal && typeof title === "string" ? <SplitText text={title} /> : title}
      </h2>
      {description && (
        <p className={cn("txm-lede mt-4", inverse ? "text-txm-on-dark" : "text-txm-slate")}>{description}</p>
      )}
    </>
  );
  return reveal ? <Reveal className={classes}>{content}</Reveal> : <div className={classes}>{content}</div>;
}
