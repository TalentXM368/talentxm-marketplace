"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface FieldNode {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  drift: number;
}

/** Small seeded generator so the field looks the same on every load. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function parseColor(value: string, fallback: number[]) {
  const hex = value.trim().replace("#", "");
  if (hex.length !== 6) return fallback;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

/**
 * Hero signature (MOTION.md: "Node field"): a drifting network of connected nodes in the
 * brand gradient, echoing the logo mark. Canvas 2D, decorative only.
 * Paused off screen and when the tab or page is hidden; one static frame under reduced motion.
 */
export function NodeField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const orange = parseColor(styles.getPropertyValue("--txm-brand-orange"), [249, 85, 43]);
    const yellow = parseColor(styles.getPropertyValue("--txm-brand-yellow"), [252, 228, 3]);
    const teal = parseColor(styles.getPropertyValue("--txm-brand-teal"), [87, 195, 187]);
    const colorAt = (t: number) => (t < 0.5 ? mix(orange, yellow, t * 2) : mix(yellow, teal, (t - 0.5) * 2));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = seeded(8);
    let width = 0;
    let height = 0;
    let nodes: FieldNode[] = [];
    let frame = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(14, Math.min(46, Math.round((width * height) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(),
        y: rand(),
        r: 3 + rand() * 9,
        phase: rand() * Math.PI * 2,
        speed: 0.12 + rand() * 0.22,
        drift: 14 + rand() * 30,
      }));
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);
      const linkDistance = Math.min(220, Math.max(120, width * 0.16));

      const points = nodes.map((n) => {
        let x = n.x * width + Math.cos(t * n.speed + n.phase) * n.drift;
        let y = n.y * height + Math.sin(t * n.speed * 0.9 + n.phase * 1.3) * n.drift;
        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 0.01) {
            const push = (1 - d / 180) * 26;
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }
        return { x, y, r: n.r, c: colorAt(Math.min(1, Math.max(0, x / width))) };
      });

      ctx.lineCap = "round";
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > linkDistance) continue;
          const strength = 1 - d / linkDistance;
          const c = mix(a.c, b.c, 0.5);
          ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${0.5 * strength})`;
          ctx.lineWidth = 1 + strength * 5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const p of points) {
        ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, 0.16)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${p.c[0]}, ${p.c[1]}, ${p.c[2]})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    build();
    draw(0);

    const onResize = () => {
      build();
      if (!running) draw(0);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("txm-node-field h-full w-full", className)} />;
}
