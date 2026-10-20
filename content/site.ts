import { serviceDomains } from "./services";
import type { ClientLogo, MegaMenuColumn, NavLink, Stat, Testimonial } from "./types";

export const site = {
  name: "TalentXM",
  legalEntity: "BlockTXM Inc.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentxm.ai",
  description:
    "TalentXM delivers enterprise AI services: platforms, data and integration, AI agents and flexible delivery teams across the US, LATAM and India.",
  location: "Columbus, Ohio",
  regions: "US · LATAM · India",
  // VERIFY: public contact details (UX01 flagged the old blocktxm.com address and "Number on request").
  email: "hello@talentxm.ai",
  whatsapp: {
    display: "+91 79897 78830",
    href: "https://wa.me/917989778830?text=Hi%20TalentXM%2C%20I%27m%20visiting%20the%20website%20and%20have%20a%20question",
  },
  linkedin: "https://www.linkedin.com/company/talentxm",
  evidenceReviewedAt: "October 2026",
  copyrightYear: 2026,
  primaryCta: { label: "Discuss Your AI Priority", href: "/contact" },
};

export const utilityLinks: NavLink[] = [
  { label: "Talent Marketplace: Early Access", href: "/marketplace" },
  { label: "Join Talent Network", href: "/careers#join" },
];

export const servicesMenu: MegaMenuColumn[] = serviceDomains.map((d) => ({
  heading: d.menuLabel,
  href: `/services/${d.slug}`,
  links: d.capabilities.map((c) => ({
    label: c.name,
    // Flexible Talent has its own page (P-13).
    href: c.anchor === "flexible-talent" ? "/flexible-talent" : `/services/${d.slug}#${c.anchor}`,
  })),
}));

export const servicesPromo = {
  title: "Start with a capability discovery",
  body: "One workflow, its systems and what a good outcome looks like. We map it with you before anything is built.",
  href: "/contact?priority=capability-discovery",
  label: "Book a discovery",
};

export const industriesMenu: NavLink[] = [
  { label: "Healthcare", href: "/industries/healthcare", description: "Patient access, revenue cycle, clinical ops" },
  { label: "Manufacturing", href: "/industries/manufacturing", description: "Asset operations, quality, engineering" },
  { label: "All industries", href: "/industries" },
];

export const companyMenu: NavLink[] = [
  { label: "About", href: "/about", description: "Who we are and how we work" },
  { label: "Trust", href: "/trust", description: "Security, responsible AI, status" },
  { label: "Careers", href: "/careers", description: "Roles and the talent network" },
];

/** Insights (P-21) stays out of the header until three articles exist. */
export const showInsights = false;

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Enterprise AI Services", href: "/services" },
      ...serviceDomains.map((d) => ({ label: d.name, href: `/services/${d.slug}` })),
    ],
  },
  {
    heading: "AI Agents & Industries",
    links: [
      { label: "AI Agents", href: "/ai-agents" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "POC Library", href: "/poc-library" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    heading: "Delivery",
    links: [
      { label: "Flexible Talent & Delivery Models", href: "/flexible-talent" },
      { label: "Talent Marketplace: Early Access", href: "/marketplace" },
      { label: "Join Talent Network", href: "/careers#join" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Trust", href: "/trust" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

// Trust signals that need approval before they can render (UX01).
// Sections stay hidden while these lists are empty.
export const clientLogos: ClientLogo[] = [];
export const testimonials: Testimonial[] = [];
export const stats: Stat[] = [];
