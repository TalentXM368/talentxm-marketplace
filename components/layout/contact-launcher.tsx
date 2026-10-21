"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { site } from "@/content/site";
import { isOpenPath } from "@/lib/site-lock";

// Routes to pages that are not open yet (lib/site-lock.ts) are left out; WhatsApp always shows.
const routes = [
  { label: "Discuss your AI priority", detail: "For enterprise teams", href: "/contact" },
  { label: "Request an agent pilot", detail: "Start from a validated agent", href: "/ai-agents#request-pilot" },
  { label: "Join the talent network", detail: "For specialists and candidates", href: "/careers#join" },
].filter((r) => isOpenPath(r.href));

/**
 * One floating contact entry point (UX01: replaces the stacked chat + WhatsApp buttons).
 * The AI assistant arrives in Phase 2 (Architecture A6).
 */
export function ContactLauncher() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Contact TalentXM"
          className="w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-txm-line bg-white shadow-txm-elev"
        >
          <div className="txm-mesh-bg px-5 py-4">
            <p className="font-semibold text-white">How can we help?</p>
            <p className="txm-small text-slate-300">
              {routes.length > 0 ? "Pick a route and a named person will reply." : "Message us and a named person will reply."}
            </p>
          </div>
          <ul className="p-2">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onNavigate={close}
                  className="txm-focus group flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-slate-50"
                >
                  <span>
                    <span className="block text-sm font-semibold text-txm-ink">{r.label}</span>
                    <span className="block text-xs text-txm-subtle">{r.detail}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-txm-subtle transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
            <li className={routes.length > 0 ? "mt-1 border-t border-txm-line pt-1" : undefined}>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="txm-focus flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-slate-50"
              >
                <span>
                  <span className="block text-sm font-semibold text-txm-ink">Message us on WhatsApp</span>
                  <span className="block text-xs text-txm-subtle">{site.whatsapp.display}</span>
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="txm-focus txm-gradient-bg flex h-14 items-center gap-2 rounded-full px-5 font-semibold text-white shadow-txm-elev"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? "Close" : "Contact us"}</span>
        <span className="sr-only sm:hidden">{open ? "Close contact options" : "Contact us"}</span>
      </button>
    </div>
  );
}
