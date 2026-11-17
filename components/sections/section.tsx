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
 * H2 and an optional one-line description that open a section (UX01: reuse). Left aligned by default.
 * No label above the headline: the headline says what the section is.
 * `reveal` animates it in on scroll, with the title rising word by word (MOTION.md).
 */
export function SectionHeader({
  title,
  description,
  align = "left",
  inverse = false,
  reveal = false,
  id,
  className,
}: {
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
      <h2 id={id} className={cn("txm-h2", inverse ? "text-white" : "text-txm-ink")}>
        {reveal && typeof title === "string" ? <SplitText text={title} /> : title}
      </h2>
      {description && (
        <p className={cn("txm-lede mt-5 max-w-2xl", inverse ? "text-txm-on-dark" : "text-txm-slate")}>{description}</p>
      )}
    </>
  );
  return reveal ? <Reveal className={classes}>{content}</Reveal> : <div className={classes}>{content}</div>;
}
