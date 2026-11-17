"use client";

import { useEffect, useId, useRef } from "react";
import { markPaths, markViewBox } from "@/components/brand/mark-paths";
import { startLogoForm } from "./logo-form-gl";
import { cn } from "@/lib/cn";

/**
 * The logo form (MOTION.md: "Logo form"): the TalentXM mark at hero scale, bleeding off the right
 * edge, its brand colours blending inside it and glowing against deep navy.
 *
 * On deep navy the form is drawn in WebGL from the first frame: it breathes, catches light from the
 * pointer and recedes as the page scrolls. An inline SVG is always in the HTML but stays hidden while
 * WebGL starts (CSS, `scripting: enabled`); it shows only without JavaScript, without WebGL
 * (`data-gl="off"`) and with reduced motion.
 *
 * `tone="soft"` is the quieter placement for interior heroes and closing bands.
 * `palette="on-orange"` draws the mark flat in Trust Blue for the orange closing band.
 * Decorative only; hidden from assistive technology.
 */
export function LogoForm({
  palette = "on-dark",
  tone = "hero",
  className,
}: {
  palette?: "on-dark" | "on-orange";
  tone?: "hero" | "soft";
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const webgl = palette === "on-dark";

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!webgl || !root || !box || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fallBack = () => root.setAttribute("data-gl", "off");
    const stop = startLogoForm({
      root,
      box,
      canvas,
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
  }, [webgl]);

  const { x, y, w, h } = markViewBox;
  const solid = palette === "on-orange";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-palette={palette}
      data-tone={tone}
      className={cn("txm-form", className)}
    >
      {webgl && <canvas ref={canvasRef} className="txm-form-canvas" />}
      <div ref={boxRef} className="txm-form-box" style={{ aspectRatio: `${w} / ${h}` }}>
        <svg viewBox={`${x} ${y} ${w} ${h}`} className="txm-form-svg" focusable="false">
          {!solid && (
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
          )}
          {solid ? (
            <g style={{ fill: "var(--txm-brand-navy)" }}>
              {markPaths.map((d) => (
                <path key={d} d={d} fillRule="evenodd" />
              ))}
            </g>
          ) : (
            <>
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
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
