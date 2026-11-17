"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Database, FileInput, Network, Pause, Play, UserCheck, Users } from "lucide-react";

const stageIcons = {
  inputs: FileInput,
  agent: Cpu,
  human: UserCheck,
  systems: Network,
  platforms: Database,
  teams: Users,
};

export interface FlowStage {
  /** Picks the icon. `human` is the person's decision: drawn in yellow, and the flow rests there longest. */
  key: keyof typeof stageIcons;
  label: string;
  title: string;
  items: { text: string; detail?: string; href?: string }[];
}

/** How long the flow rests at each station. It waits longest where a person decides. */
const dwell = (key: FlowStage["key"]) => (key === "human" ? 5200 : 3800);

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Flow (MOTION.md: "Agent flow"): a request travels along a line through a few stations, for example
 * the four stations of an agent (Inputs, Agent, Human decision, Systems), and rests longest where a
 * person decides.
 * It plays while the section is on screen, can be paused, and any station can be opened directly.
 * Every stage is in the HTML; without JavaScript or with reduced motion all of them simply show.
 */
export function AgentFlow({
  stages,
  header,
  footer,
  label = "How one request moves through the agent",
}: {
  stages: FlowStage[];
  header: React.ReactNode;
  footer?: React.ReactNode;
  /** Accessible name of the list of stations. */
  label?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState({ index: 0, jump: false });
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const count = stages.length;
  const running = playing && inView && !reduced;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.setAttribute("data-enhanced", "");
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setStep((s) => {
        const next = (s.index + 1) % count;
        return { index: next, jump: next === 0 };
      });
    }, dwell(stages[step.index].key));
    return () => window.clearTimeout(t);
  }, [running, step.index, count, stages]);

  const active = step.index;
  const progress = count > 1 ? active / (count - 1) : 0;

  return (
    <div
      ref={rootRef}
      className="txm-flow"
      data-jump={step.jump ? "" : undefined}
      style={{ "--flow-k": progress, "--flow-n": count } as React.CSSProperties}
    >
      <div className="txm-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">{header}</div>
          <div className="flex flex-wrap items-center gap-3">
            {footer}
            {!reduced && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause the animation" : "Play the animation"}
                className="txm-focus-inverse inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>

        <div className="txm-flow-stage">
          <div className="txm-flow-rail" aria-hidden="true">
            <span className="txm-flow-fill" />
            <span className="txm-flow-runner">
              <span className="txm-flow-packet" />
            </span>
          </div>
          <ol className="txm-flow-list" aria-label={label}>
            {stages.map((s, i) => {
              const StageIcon = stageIcons[s.key];
              const state = i === active ? "active" : i < active ? "done" : "todo";
              return (
                <li
                  key={s.key}
                  className="txm-flow-step"
                  data-state={state}
                  data-kind={s.key}
                  aria-current={i === active ? "step" : undefined}
                >
                  <button
                    type="button"
                    className="txm-flow-node txm-focus-inverse"
                    onClick={() => {
                      setStep({ index: i, jump: false });
                      setPlaying(false);
                    }}
                    aria-label={`Show step ${i + 1}: ${s.label}`}
                  >
                    <StageIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="txm-flow-body">
                    <p className="txm-small font-semibold text-txm-on-dark">
                      {i + 1}. {s.label}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">{s.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {s.items.map((item) => (
                        <li key={item.text} className="txm-flow-item txm-small text-txm-on-dark">
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="txm-focus-inverse group inline-flex items-start gap-1.5 font-semibold text-white hover:text-txm-yellow"
                            >
                              {item.text}
                              <ArrowUpRight
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-txm-yellow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          ) : (
                            <span className="block text-white/90">{item.text}</span>
                          )}
                          {item.detail && <span className="mt-0.5 block text-txm-on-dark/80">{item.detail}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
