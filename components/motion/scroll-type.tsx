import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * Scroll-lit statement (MOTION.md: "Scroll-lit type"): a large sentence whose words brighten one
 * after another as it scrolls up the screen. Pure CSS; the text is fully legible without support.
 */
export function ScrubStatement({
  text,
  id,
  className,
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const words = text.split(" ");
  const last = Math.max(1, words.length - 1);
  return (
    <h2 id={id} className={cn("txm-statement txm-scrub", className)}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} style={{ "--k": (i / last).toFixed(3) } as React.CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

/**
 * Step words (MOTION.md: "Step words"): a sequence set as large words that start as outlines and fill
 * in one after another, once, when the list comes into view. Time-based rather than scroll-linked, so
 * every word always finishes filled whatever the screen size or scroll speed. Short single words are
 * set very large; longer step names a size down.
 */
export function StepWords({
  steps,
  label,
  tone = "dark",
}: {
  steps: { title: string; body: string }[];
  label?: string;
  tone?: "dark" | "light";
}) {
  const short = steps.every((s) => s.title.length <= 9);
  const size = short && steps.length <= 3 ? "xl" : short ? "lg" : "md";
  return (
    <Reveal
      as="ol"
      className="txm-steps"
      data-size={size}
      data-tone={tone}
      aria-label={label}
      style={{ "--n": steps.length } as React.CSSProperties}
    >
      {steps.map((s, i) => (
        <li key={s.title} style={{ "--i": i } as React.CSSProperties}>
          <h3 className="txm-steps-word">
            <span className="txm-steps-fill">{s.title}</span>
            <span className="txm-steps-outline" aria-hidden="true">
              {s.title}
            </span>
          </h3>
          <p
            className={cn(
              "txm-steps-body txm-body mt-4 max-w-[34ch]",
              tone === "dark" ? "text-txm-on-dark" : "text-txm-slate",
            )}
          >
            {s.body}
          </p>
        </li>
      ))}
    </Reveal>
  );
}
