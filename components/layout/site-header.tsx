"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { companyMenu, industriesMenu, servicesMenu, servicesPromo, site, utilityLinks } from "@/content/site";
import { cn } from "@/lib/cn";

type MenuKey = "services" | "industries" | "company";

const flatLinks = [
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Flexible Talent", href: "/flexible-talent" },
  { label: "POC Library", href: "/poc-library" },
  { label: "Work", href: "/work" },
];

export function SiteHeader() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  // A mouse click fires pointerenter (opens) then click (toggles). The first click after a
  // hover-open should keep the menu open rather than close it.
  const openedByHover = useRef(false);
  const close = useCallback(() => {
    openedByHover.current = false;
    setOpen(null);
  }, []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = (key: MenuKey) => {
    const keepOpen = openedByHover.current;
    openedByHover.current = false;
    setOpen((cur) => (cur === key && !keepOpen ? null : key));
  };
  const hoverOpen = (key: MenuKey) => {
    if (open === key) return;
    openedByHover.current = true;
    setOpen(key);
  };

  return (
    <>
      <div className="hidden bg-txm-base text-slate-300 md:block">
        <div className="txm-container flex h-9 items-center justify-end gap-6">
          {utilityLinks.map((l) => (
            <Link key={l.href} href={l.href} className="txm-focus-inverse txm-small hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow",
          condensed ? "border-txm-line shadow-txm-card" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "txm-container flex items-center justify-between gap-6 transition-[height]",
            condensed ? "h-16" : "h-[72px]",
          )}
        >
          <Link href="/" className="txm-focus shrink-0" aria-label="TalentXM home" onNavigate={close}>
            <Image src="/images/talentxm-logo.png" alt="TalentXM" width={1140} height={460} priority className="h-9 w-auto" />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li className="relative" onMouseLeave={() => open === "services" && close()}>
                <MenuTrigger
                  label="Services"
                  expanded={open === "services"}
                  onClick={() => toggle("services")}
                  onMouseEnter={() => hoverOpen("services")}
                  controls="menu-services"
                  ref={(el) => {
                    triggers.current.services = el;
                  }}
                />
                {open === "services" && <ServicesMegaMenu onNavigate={close} />}
              </li>
              <li>
                <NavLink href="/ai-agents" onNavigate={close}>
                  AI Agents
                </NavLink>
              </li>
              <li className="relative" onMouseLeave={() => open === "industries" && close()}>
                <MenuTrigger
                  label="Industries"
                  expanded={open === "industries"}
                  onClick={() => toggle("industries")}
                  onMouseEnter={() => hoverOpen("industries")}
                  controls="menu-industries"
                  ref={(el) => {
                    triggers.current.industries = el;
                  }}
                />
                {open === "industries" && <Dropdown id="menu-industries" links={industriesMenu} onNavigate={close} />}
              </li>
              <li>
                <NavLink href="/flexible-talent" onNavigate={close}>
                  Flexible Talent
                </NavLink>
              </li>
              <li>
                <NavLink href="/poc-library" onNavigate={close}>
                  POC Library
                </NavLink>
              </li>
              <li>
                <NavLink href="/work" onNavigate={close}>
                  Work
                </NavLink>
              </li>
              <li className="relative" onMouseLeave={() => open === "company" && close()}>
                <MenuTrigger
                  label="Company"
                  expanded={open === "company"}
                  onClick={() => toggle("company")}
                  onMouseEnter={() => hoverOpen("company")}
                  controls="menu-company"
                  ref={(el) => {
                    triggers.current.company = el;
                  }}
                />
                {open === "company" && <Dropdown id="menu-company" links={companyMenu} onNavigate={close} align="right" />}
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.primaryCta.href}
              onNavigate={close}
              className="txm-focus hidden items-center gap-2 rounded-lg bg-txm-base px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-txm-surface sm:inline-flex"
            >
              {site.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="txm-focus inline-flex h-11 w-11 items-center justify-center rounded-lg text-txm-ink hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileMenu onClose={closeMobile} />}
    </>
  );
}

function NavLink({ href, children, onNavigate }: { href: string; children: React.ReactNode; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onNavigate={onNavigate}
      className="txm-focus rounded-md px-3 py-2 text-[15px] font-medium text-txm-ink transition-colors hover:text-txm-indigo"
    >
      {children}
    </Link>
  );
}

function MenuTrigger({
  label,
  expanded,
  onClick,
  onMouseEnter,
  controls,
  ref,
}: {
  label: string;
  expanded: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  controls: string;
  ref: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      onPointerEnter={(e) => {
        // Hover opens menus for mouse users only; touch and keyboard use click.
        if (e.pointerType === "mouse") onMouseEnter();
      }}
      className={cn(
        "txm-focus inline-flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-txm-indigo",
        expanded ? "text-txm-indigo" : "text-txm-ink",
      )}
    >
      {label}
      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
    </button>
  );
}

function ServicesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div id="menu-services" className="fixed inset-x-0 top-auto z-50 pt-3">
      <div className="txm-container">
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_220px] gap-6 rounded-2xl border border-txm-line bg-white p-6 shadow-txm-elev">
          {servicesMenu.map((col) => (
            <div key={col.href}>
              <Link
                href={col.href}
                onNavigate={onNavigate}
                className="txm-focus mb-3 block text-sm font-semibold text-txm-ink hover:text-txm-indigo"
              >
                {col.heading}
              </Link>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onNavigate={onNavigate}
                      className="txm-focus txm-small text-txm-slate hover:text-txm-indigo"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="txm-mesh-bg rounded-xl p-5 text-white">
            <p className="font-semibold">{servicesPromo.title}</p>
            <p className="txm-small mt-2 text-slate-300">{servicesPromo.body}</p>
            <Link
              href={servicesPromo.href}
              onNavigate={onNavigate}
              className="txm-focus-inverse mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-txm-cyan hover:text-white"
            >
              {servicesPromo.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="col-span-6 border-t border-txm-line pt-4">
            <Link
              href="/services"
              onNavigate={onNavigate}
              className="txm-focus txm-small inline-flex items-center gap-1.5 font-semibold text-txm-indigo hover:text-txm-base"
            >
              All Enterprise AI Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  id,
  links,
  onNavigate,
  align = "left",
}: {
  id: string;
  links: { label: string; href: string; description?: string }[];
  onNavigate: () => void;
  align?: "left" | "right";
}) {
  return (
    <div id={id} className={cn("absolute top-full z-50 w-72 pt-3", align === "right" ? "right-0" : "left-0")}>
      <ul className="rounded-2xl border border-txm-line bg-white p-2 shadow-txm-elev">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onNavigate={onNavigate}
              className="txm-focus block rounded-lg px-4 py-3 hover:bg-slate-50"
            >
              <span className="block text-sm font-semibold text-txm-ink">{l.label}</span>
              {l.description && <span className="txm-small block text-txm-slate">{l.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-screen mobile menu: accordions, pinned CTA, focus trapped while open (Architecture S3). */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button, summary") ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    focusables()[0]?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  const linkClass = "txm-focus block rounded-lg px-3 py-3 text-base font-medium text-txm-ink hover:bg-slate-50";

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-txm-line px-4">
        <p id={titleId} className="sr-only">
          Menu
        </p>
        <Link href="/" onNavigate={onClose} aria-label="TalentXM home" className="txm-focus">
          <Image src="/images/talentxm-logo.png" alt="TalentXM" width={1140} height={460} className="h-8 w-auto" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="txm-focus inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-100"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
        <MobileAccordion label="Services">
          <Link href="/services" onNavigate={onClose} className={linkClass}>
            All Enterprise AI Services
          </Link>
          {servicesMenu.map((col) => (
            <Link key={col.href} href={col.href} onNavigate={onClose} className={linkClass}>
              {col.heading}
            </Link>
          ))}
        </MobileAccordion>
        <Link href="/ai-agents" onNavigate={onClose} className={cn(linkClass, "text-lg font-semibold")}>
          AI Agents
        </Link>
        <MobileAccordion label="Industries">
          {industriesMenu.map((l) => (
            <Link key={l.href} href={l.href} onNavigate={onClose} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </MobileAccordion>
        {flatLinks.slice(1).map((l) => (
          <Link key={l.href} href={l.href} onNavigate={onClose} className={cn(linkClass, "text-lg font-semibold")}>
            {l.label}
          </Link>
        ))}
        <MobileAccordion label="Company">
          {companyMenu.map((l) => (
            <Link key={l.href} href={l.href} onNavigate={onClose} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </MobileAccordion>
        <div className="mt-4 border-t border-txm-line pt-4">
          {utilityLinks.map((l) => (
            <Link key={l.href} href={l.href} onNavigate={onClose} className={cn(linkClass, "text-txm-slate")}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="shrink-0 border-t border-txm-line p-4">
        <Link
          href={site.primaryCta.href}
          onNavigate={onClose}
          className="txm-focus flex w-full items-center justify-center gap-2 rounded-lg bg-txm-base px-6 py-3.5 font-semibold text-white"
        >
          {site.primaryCta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-transparent">
      <summary className="txm-focus flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-lg font-semibold text-txm-ink hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="h-5 w-5 text-txm-subtle transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mb-2 ml-3 border-l border-txm-line pl-2">{children}</div>
    </details>
  );
}
