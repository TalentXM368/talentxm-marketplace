"use client";

import { useEffect, useId, useRef } from "react";
import { markPaths, markViewBox } from "@/components/brand/mark-paths";
import { startLogoForm } from "./logo-form-gl";
import { cn } from "@/lib/cn";

/** How bright each placement is: the hero is the strongest; the closing band and interior heroes step back. */
const defaultIntensity = { hero: 0.8, closing: 0.55, soft: 0.85 } as const;

/**
 * The logo form (MOTION.md: "Logo form"): the TalentXM mark at hero scale, its brand colours
 * blending inside it and glowing against deep navy.
 *
 * It is drawn in WebGL from the first frame: it breathes, catches light from the pointer and recedes
 * as the page scrolls. An inline SVG is always in the HTML but stays hidden while WebGL starts (CSS,
 * `scripting: enabled`); it shows only without JavaScript, without WebGL (`data-gl="off"`) and with
 * reduced motion. `data-gl` is also what `HeroGate` waits for before the hero text comes in.
 *
 * `tone` sets the placement: `hero` (home, clear of the header and bleeding into the next section),
 * `closing` (the home closing band) and `soft` (interior heroes and closing bands, further right).
 * `intensity` (0 to 1) dims it without touching the layout. Decorative only; hidden from assistive technology.
 */
export function LogoForm({
  tone = "hero",
  intensity,
  className,
}: {
  tone?: "hero" | "closing" | "soft";
  intensity?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const strength = Math.min(1, Math.max(0, intensity ?? defaultIntensity[tone]));

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!root || !box || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fallBack = () => root.setAttribute("data-gl", "off");
    const stop = startLogoForm({
      root,
      box,
      canvas,
      intensity: strength,
      onReady: () => root.setAttribute("data-gl", "on"),
      onLost: fallBack,
    });
    if (!stop) fallBack();
    // If the first frame has not arrived after a moment, show the still form rather than nothing.
    const guard = window.setTimeout(() => {
      if (root.getAttribute("data-gl") !== "on") fallBack();
    }, 2500);

    return () => {
      window.clearTimeout(guard);
      stop?.();
      root.removeAttribute("data-gl");
    };
  }, [strength]);

  const { x, y, w, h } = markViewBox;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-tone={tone}
      className={cn("txm-form", className)}
      style={{ "--form-intensity": strength } as React.CSSProperties}
    >
      <canvas ref={canvasRef} className="txm-form-canvas" />
      <div ref={boxRef} className="txm-form-box" style={{ aspectRatio: `${w} / ${h}` }}>
        <svg viewBox={`${x} ${y} ${w} ${h}`} className="txm-form-svg" focusable="false">
          <defs>
            <linearGradient id={id("blend")} x1="0.1" y1="0.15" x2="0.95" y2="0.9">
              <stop offset="0" style={{ stopColor: "var(--txm-brand-teal)" }} />
              <stop offset="0.48" style={{ stopColor: "var(--txm-brand-yellow)" }} />
              <stop offset="1" style={{ stopColor: "var(--txm-brand-orange)" }} />
            </linearGradient>
            <filter id={id("glow")} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
          </defs>
          <g filter={`url(#${id("glow")})`} opacity="0.6">
            {markPaths.map((d) => (
              <path key={d} d={d} fillRule="evenodd" fill={`url(#${id("blend")})`} />
            ))}
          </g>
          <g>
            {markPaths.map((d) => (
              <path key={d} d={d} fillRule="evenodd" fill={`url(#${id("blend")})`} fillOpacity="0.82" />
            ))}
          </g>
          <g fill="none" style={{ stroke: "var(--txm-tint-bright)" }} strokeWidth="0.45" strokeOpacity="0.7">
            {markPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
