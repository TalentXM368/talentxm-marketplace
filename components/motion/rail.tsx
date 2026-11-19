"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** How far, in px, a mouse has to move before a press becomes a drag (so plain clicks still open cards). */
const DRAG_THRESHOLD = 6;

/**
 * Horizontal card rail (MOTION.md: "Rail"). Native scroll with snap, so touch, trackpad and keyboard
 * all work. On top of that: the arrows move exactly one card and switch off at the ends, a mouse can
 * drag the row sideways, and a thin line under the rail shows how far along it you are.
 * Children are `<li>` elements.
 */
export function Rail({
  label,
  coverflow = false,
  tone = "light",
  children,
}: {
  label: string;
  /** Cards at the edges of the rail shrink slightly and dim (MOTION.md: "Coverflow rail"). */
  coverflow?: boolean;
  /** `dark` when the rail sits on a deep navy section: the arrows and progress line switch colours. */
  tone?: "light" | "dark";
  children: React.ReactNode;
}) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false, progress: 0, visible: 1 });
  const drag = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth;
    setEdges({
      start: list.scrollLeft <= 2,
      end: list.scrollLeft >= max - 2,
      progress: max > 0 ? list.scrollLeft / max : 0,
      visible: list.scrollWidth > 0 ? Math.min(1, list.clientWidth / list.scrollWidth) : 1,
    });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    measure();
    list.addEventListener("scroll", measure, { passive: true });
    // Once more when scrolling settles, so the arrows' end states are exact after a snap.
    list.addEventListener("scrollend", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => {
      list.removeEventListener("scroll", measure);
      list.removeEventListener("scrollend", measure);
      ro.disconnect();
    };
  }, [measure]);

  /** Scroll so the next (or previous) card lines up with the rail's left edge. */
  const go = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    if (cards.length === 0) return;
    // Layout positions (offsetLeft), not on-screen boxes: coverflow scales the cards, which would shrink the step.
    const padStart = parseFloat(getComputedStyle(list).scrollPaddingInlineStart) || 0;
    const current = list.scrollLeft + padStart;
    const lefts = cards.map((c) => c.offsetLeft);
    const target =
      direction === 1 ? lefts.find((l) => l > current + 4) : [...lefts].reverse().find((l) => l < current - 4);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: target === undefined ? (direction === 1 ? list.scrollWidth : 0) : target - padStart,
      behavior: reduced ? "auto" : "smooth",
    });
    if (reduced) measure();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const list = listRef.current;
    if (!list) return;
    drag.current = { x: e.clientX, left: list.scrollLeft, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const list = listRef.current;
    if (!d || !list) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      list.setPointerCapture(d.id);
      list.dataset.dragging = "";
    }
    list.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    const list = listRef.current;
    drag.current = null;
    if (!d?.moved || !list) return;
    suppressClick.current = true;
    if (list.hasPointerCapture(d.id)) list.releasePointerCapture(d.id);
    // Snap back on: the browser settles on the nearest card.
    delete list.dataset.dragging;
  };

  return (
    <div className="txm-rail-wrap" data-tone={tone}>
      <ul
        ref={listRef}
        className={cn("txm-rail", coverflow && "txm-coverflow")}
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // A drag that ends over a card must not open it.
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </ul>
      <div className="txm-container mt-8 flex items-center gap-6">
        <div className="txm-rail-progress" aria-hidden="true">
          <span
            style={{
              width: `${edges.visible * 100}%`,
              translate: `${(edges.progress * (1 - edges.visible) * 100) / Math.max(edges.visible, 0.01)}% 0`,
            }}
          />
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            // aria-disabled, not disabled: a keyboard user at the end keeps focus on the button.
            onClick={() => !edges.start && go(-1)}
            aria-disabled={edges.start}
            aria-label={`Previous: ${label}`}
            className="txm-focus txm-rail-btn"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => !edges.end && go(1)}
            aria-disabled={edges.end}
            aria-label={`Next: ${label}`}
            className="txm-focus txm-rail-btn"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
