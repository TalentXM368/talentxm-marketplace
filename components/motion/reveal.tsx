"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealTag = "div" | "ul" | "ol" | "section" | "li" | "figure";

// Layout effect on the client so the hidden state lands before first paint; plain effect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scroll reveal (MOTION.md: "Reveal"). Children stay server-rendered and visible without JS.
 * Only elements that start below the fold are hidden, then shown once when 10% enters the viewport.
 * `stagger` reveals direct children one after another; `reverse` starts from the last child.
 */
export function Reveal({
  as = "div",
  stagger = false,
  reverse = false,
  className,
  children,
  ...rest
}: {
  as?: RevealTag;
  stagger?: boolean;
  reverse?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">) {
  const ref = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal === "shown") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Already on screen at load: leave it visible, no entrance.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      // If the page is hidden before the reveal ran, never leave content invisible.
      if (el.dataset.reveal === "pending") el.dataset.reveal = "shown";
    };
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("txm-reveal", stagger && "txm-reveal-stagger", reverse && "txm-reveal-reverse", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
