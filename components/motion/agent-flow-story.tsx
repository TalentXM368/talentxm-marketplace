"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Cpu, FileInput, Network, UserCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FlowStage {
  key: "inputs" | "agent" | "human" | "systems";
  label: string;
  title: string;
  items: { text: string; detail?: string }[];
}

const stageIcons = { inputs: FileInput, agent: Cpu, human: UserCheck, systems: Network };

/**
 * Pinned scroll story (MOTION.md: "Pinned story"): scrolling walks through how one agent
 * handles a job. On large screens the section pins and the four stages swap in place.
 * On small screens, or with reduced motion, every stage is simply stacked in the page.
 */
export function AgentFlowStory({
  stages,
  header,
  footer,
}: {
  stages: FlowStage[];
  header: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Pinning is opt-in: without JS every stage stays stacked and readable.
    el.dataset.enhanced = "true";
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      el.style.setProperty("--story-p", progress.toFixed(4));
      setActive(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stages.length]);

  return (
    <div ref={sectionRef} className="txm-story" style={{ "--story-steps": stages.length } as React.CSSProperties}>
      <div className="txm-story-pin">
        <div className="txm-container grid w-full gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col justify-center">
            {header}
            <ol className="txm-story-rail mt-8 hidden lg:block" aria-hidden="true">
              {stages.map((s, i) => (
                <li key={s.key} data-state={i === active ? "active" : i < active ? "done" : "todo"}>
                  <span className="txm-story-dot">{i < active ? <Check className="h-3 w-3" /> : i + 1}</span>
                  <span className="txm-story-label">{s.label}</span>
                </li>
              ))}
            </ol>
            {footer && <div className="mt-8 hidden lg:block">{footer}</div>}
          </div>

          <ol className="txm-story-stages">
            {stages.map((s, i) => {
              const StageIcon = stageIcons[s.key];
              const human = s.key === "human";
              return (
                <li
                  key={s.key}
                  className="txm-story-stage"
                  data-state={i === active ? "active" : i < active ? "done" : "todo"}
                >
                  <div
                    className={cn(
                      "h-full rounded-3xl p-7 md:p-9",
                      human ? "txm-gradient-bg text-txm-base" : "border border-white/10 bg-txm-surface text-white",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl",
                          human ? "bg-txm-base text-white" : "bg-white/10 text-txm-yellow",
                        )}
                      >
                        <StageIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className={cn("txm-eyebrow", human ? "text-txm-base/80" : "text-txm-yellow")}>
                        {String(i + 1).padStart(2, "0")} · {s.label}
                      </p>
                    </div>
                    <h3 className="txm-h3 mt-5">{s.title}</h3>
                    <ul className="mt-6 space-y-3">
                      {s.items.map((item) => (
                        <li
                          key={item.text}
                          className={cn(
                            "txm-story-item rounded-xl px-4 py-3",
                            human ? "bg-white/55" : "border border-white/10 bg-white/5",
                          )}
                        >
                          <p className="font-semibold">{item.text}</p>
                          {item.detail && (
                            <p className={cn("txm-small mt-1", human ? "text-txm-base/85" : "text-txm-on-dark")}>
                              {item.detail}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
          {footer && <div className="lg:hidden">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
