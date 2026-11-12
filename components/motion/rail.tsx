"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Horizontal card rail (MOTION.md: "Rail"). Native scroll with snap, so touch, trackpad and
 * keyboard all work; the buttons just scroll by one card. Children are `<li>` elements.
 */
export function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const listRef = useRef<HTMLUListElement | null>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : list.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div>
      <ul ref={listRef} className="txm-rail" aria-label={label} tabIndex={0}>
        {children}
      </ul>
      <div className="txm-container mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={`Previous: ${label}`}
          className="txm-focus txm-rail-btn"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={`Next: ${label}`}
          className="txm-focus txm-rail-btn"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
