import { Fragment } from "react";

/**
 * Masked word reveal for headings (MOTION.md: "Heading reveal").
 * Server component: the words are real text, so the heading reads normally without JS or CSS.
 * Animates on load inside `.txm-words-load`, or on scroll inside a pending `Reveal`.
 */
export function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="txm-words">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="txm-word">
            <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
