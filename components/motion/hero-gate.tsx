"use client";

import { useEffect, useRef } from "react";

/** Longest the hero text waits for the logo form and fonts before it comes in anyway. */
const MAX_WAIT = 1200;

/**
 * Hero gate (MOTION.md: "Load-in"). The hero's load-in waits until the page is ready to be seen: the
 * fonts have loaded and the logo form has drawn its first frame (or fallen back to the still SVG), so a
 * visitor never watches the hero assemble. Capped at MAX_WAIT.
 *
 * It marks the closest `[data-hero-gate]` element with `data-ready`. The CSS pauses the load-in only
 * while scripting is on and motion is allowed, so without JavaScript or with reduced motion the hero
 * shows at once.
 */
export function HeroGate() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const gate = ref.current?.closest<HTMLElement>("[data-hero-gate]");
    if (!gate) return;
    // The form may sit outside the hero (the home page shares it with the next section).
    const scope = gate.closest<HTMLElement>("[data-hero-scope]") ?? gate;
    const form = scope.querySelector<HTMLElement>(".txm-form");

    let done = false;
    let fontsReady = false;
    const open = () => {
      if (done) return;
      done = true;
      gate.setAttribute("data-ready", "");
    };
    const formReady = () =>
      !form || form.hasAttribute("data-gl") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const check = () => {
      if (fontsReady && formReady()) open();
    };

    const observer = form ? new MutationObserver(check) : null;
    if (form) observer?.observe(form, { attributes: true, attributeFilter: ["data-gl"] });
    document.fonts.ready.then(() => {
      fontsReady = true;
      check();
    });
    const cap = window.setTimeout(open, MAX_WAIT);

    return () => {
      observer?.disconnect();
      window.clearTimeout(cap);
      // Never leave the hero hidden if this unmounts first.
      open();
    };
  }, []);

  return <span ref={ref} hidden />;
}
