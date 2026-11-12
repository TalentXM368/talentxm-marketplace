"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Brand shapes (MOTION.md: "Ribbon field"): the large flowing forms from the brand board,
 * an orange ribbon over a teal crescent and a yellow lobe, glowing against deep navy.
 * They drift slowly, shift a little with the pointer and slide as the page scrolls.
 * Decorative only. Still under reduced motion; pointer and scroll tracking stop when hidden.
 *
 * `palette="on-orange"` swaps the ribbon to deep navy for use on an orange surface.
 * `tone="soft"` is the quieter version for interior page heroes.
 */
export function RibbonField({
  palette = "on-dark",
  tone = "hero",
  className,
}: {
  palette?: "on-dark" | "on-orange";
  tone?: "hero" | "soft";
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      root.style.setProperty("--rb-px", px.toFixed(3));
      root.style.setProperty("--rb-py", py.toFixed(3));
      root.style.setProperty("--rb-sy", scrolled.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-palette={palette}
      data-tone={tone}
      className={cn("txm-ribbons", className)}
    >
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMax slice" className="h-full w-full" focusable="false">
        <defs>
          <linearGradient id={id("ribbon")} x1="0.9" y1="0" x2="0.35" y2="1">
            <stop offset="0" style={{ stopColor: "var(--rb-1)", stopOpacity: 1 }} />
            <stop offset="0.55" style={{ stopColor: "var(--rb-1)", stopOpacity: "var(--rb-o2, 0.72)" }} />
            <stop offset="1" style={{ stopColor: "var(--rb-1)", stopOpacity: "var(--rb-o3, 0.08)" }} />
          </linearGradient>
          <linearGradient id={id("crescent")} x1="1" y1="0" x2="0.2" y2="1">
            <stop offset="0" style={{ stopColor: "var(--rb-2)", stopOpacity: 0.95 }} />
            <stop offset="1" style={{ stopColor: "var(--rb-2)", stopOpacity: "var(--rb-o4, 0.18)" }} />
          </linearGradient>
          <linearGradient id={id("lobe")} x1="1" y1="0.2" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--rb-3)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--rb-3)", stopOpacity: 0.5 }} />
          </linearGradient>
          <radialGradient id={id("depth")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: "var(--rb-depth)", stopOpacity: 0.9 }} />
            <stop offset="1" style={{ stopColor: "var(--rb-depth)", stopOpacity: 0 }} />
          </radialGradient>
          <filter id={id("bloom")} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id={id("soften")} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id={id("grain")} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 -0.16" />
          </filter>
          <pattern id={id("dots")} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
          <clipPath id={id("ribbon-clip")}>
            <path d="M 660 900 C 730 640 960 410 1440 230 L 1440 520 C 1170 570 1000 710 950 900 Z" />
          </clipPath>
        </defs>

        {/* Scaled past the right edge so drifting never exposes where the shapes end. */}
        <g transform="translate(-40 -60) scale(1.14)">
        <g className="txm-ribbon-layer" style={{ "--rb-depth-k": 0.25 } as React.CSSProperties}>
          <ellipse cx="1130" cy="330" rx="640" ry="430" fill={url("depth")} />
        </g>

        <g className="txm-ribbon-layer" style={{ "--rb-depth-k": 0.6, "--rb-i": 2 } as React.CSSProperties}>
          <g className="txm-ribbon-drift txm-ribbon-drift-c">
            <ellipse cx="1400" cy="960" rx="430" ry="190" transform="rotate(-14 1400 960)" fill={url("lobe")} />
          </g>
        </g>

        <g className="txm-ribbon-layer" style={{ "--rb-depth-k": 0.85, "--rb-i": 1 } as React.CSSProperties}>
          <g className="txm-ribbon-drift txm-ribbon-drift-b">
            <path
              d="M 880 900 C 930 740 1120 590 1440 520 L 1440 770 C 1290 800 1170 850 1130 900 Z"
              fill={url("crescent")}
            />
            <path
              d="M 880 900 C 930 740 1120 590 1440 520"
              fill="none"
              style={{ stroke: "var(--rb-2)" }}
              strokeWidth="2"
              strokeOpacity="0.9"
              filter={url("soften")}
            />
          </g>
        </g>

        <g className="txm-ribbon-layer" style={{ "--rb-depth-k": 1.2, "--rb-i": 0 } as React.CSSProperties}>
          <g className="txm-ribbon-drift txm-ribbon-drift-a">
            <path
              d="M 660 900 C 730 640 960 410 1440 230"
              fill="none"
              style={{ stroke: "var(--rb-1)" }}
              strokeWidth="46"
              strokeOpacity="0.55"
              filter={url("bloom")}
            />
            <path
              d="M 660 900 C 730 640 960 410 1440 230 L 1440 520 C 1170 570 1000 710 950 900 Z"
              fill={url("ribbon")}
            />
            <rect
              x="600"
              y="200"
              width="840"
              height="700"
              fill={url("dots")}
              opacity="0.16"
              clipPath={url("ribbon-clip")}
            />
            <path
              d="M 660 900 C 730 640 960 410 1440 230"
              fill="none"
              style={{ stroke: "var(--rb-rim)" }}
              strokeWidth="2.5"
              strokeOpacity="0.9"
              filter={url("soften")}
            />
          </g>
        </g>

        <g className="txm-ribbon-layer" style={{ "--rb-depth-k": 1.6 } as React.CSSProperties}>
          <path
            d="M 520 900 C 640 560 940 300 1440 120"
            fill="none"
            style={{ stroke: "var(--rb-2)" }}
            strokeWidth="1"
            strokeOpacity="0.35"
          />
          <path
            d="M 580 900 C 690 600 950 350 1440 170"
            fill="none"
            style={{ stroke: "var(--rb-rim)" }}
            strokeWidth="1"
            strokeOpacity="0.22"
          />
        </g>

        </g>

        <rect width="1440" height="900" filter={url("grain")} opacity="0.22" style={{ mixBlendMode: "soft-light" }} />
      </svg>
    </div>
  );
}
