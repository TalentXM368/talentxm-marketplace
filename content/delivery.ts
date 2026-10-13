import type { DeliveryModel, Faq } from "./types";

// P-13. The old "eight ways" list (UX01: discard on Home) survives only as the progression here.

export const deliveryModels: DeliveryModel[] = [
  {
    slug: "advisory",
    name: "Advisory",
    group: "talent-led",
    icon: "lightbulb",
    buyerNeed: "A senior view on a decision before you commit budget.",
    ownership: "You own the decision and the delivery.",
    description: "Short advisory engagements and working sessions with a senior practitioner.",
  },
  {
    slug: "staff-augmentation",
    name: "Flexible talent",
    group: "talent-led",
    icon: "users",
    buyerNeed: "A specific skill on your team for a defined period.",
    ownership: "You direct the work; we supply and support the specialist.",
    description: "Contractors and contract-to-hire specialists who join your team and work your way.",
  },
  {
    slug: "direct-hire",
    name: "Direct hire",
    group: "talent-led",
    icon: "badge-check",
    buyerNeed: "A permanent hire for a hard-to-fill role.",
    ownership: "You employ the hire; we run the search and screening.",
    description: "Permanent placement with technical screening by practitioners.",
  },
  {
    slug: "capability-pod",
    name: "Capability pod",
    group: "outcome-led",
    icon: "workflow",
    buyerNeed: "A capability delivered end to end, without building a team first.",
    ownership: "We own delivery against agreed outcomes; you own priorities.",
    description: "A senior lead plus a small execution team that owns a capability and reports against agreed measures.",
  },
  {
    slug: "project-delivery",
    name: "Project delivery",
    group: "outcome-led",
    icon: "target",
    buyerNeed: "A defined scope delivered on a timeline.",
    ownership: "We own the scope, timeline and quality of the deliverable.",
    description: "Fixed-scope projects such as an integration, a platform extension or an agent pilot.",
  },
  {
    slug: "dedicated-team",
    name: "Dedicated team",
    group: "outcome-led",
    icon: "globe",
    buyerNeed: "Long-running capacity that works as part of your organisation.",
    ownership: "We run the team; you set the roadmap.",
    description: "A stable team across the US, LATAM and India working as an extension of yours.",
  },
  {
    slug: "managed-service",
    name: "Managed service",
    group: "outcome-led",
    icon: "server",
    buyerNeed: "Systems kept running and improved after launch.",
    ownership: "We own operation against service levels.",
    description: "Monitoring, incidents, upgrades and small changes for platforms, integrations and agents.",
  },
];

export function getDeliveryModels(slugs: string[]) {
  return slugs
    .map((s) => deliveryModels.find((m) => m.slug === s))
    .filter((m): m is DeliveryModel => Boolean(m));
}

/** From supplying a person to owning an outcome. */
export const progression = [
  { label: "Advisory", detail: "A senior view before you commit." },
  { label: "Flexible talent", detail: "Specialists who join your team." },
  { label: "Capability pod", detail: "A lead and a team that own a capability." },
  { label: "Project delivery", detail: "A defined scope delivered to a date." },
  { label: "Managed service", detail: "Systems run against service levels." },
];

export const ownershipRows = [
  { item: "Day-to-day direction", talent: "You", outcome: "TalentXM lead" },
  { item: "Delivery risk", talent: "You", outcome: "TalentXM" },
  { item: "Quality of the deliverable", talent: "Shared", outcome: "TalentXM" },
  { item: "Priorities and roadmap", talent: "You", outcome: "You" },
  { item: "Reporting", talent: "Timesheets", outcome: "Measures agreed on day one" },
];

export const firstCallQuestions: Faq[] = [
  { q: "What are you trying to deliver?", a: "Outcome first, role second. We shape the team around the deliverable." },
  { q: "What is the timeline?", a: "Sprints, quarters or open-ended. We size the lead and execution layer to match." },
  { q: "Where does the work live?", a: "Inside your stack, alongside your team, with your SSO and your tools." },
  { q: "What does success look like?", a: "We agree measures on day one and report against them every two weeks." },
];

export const deliveryRegions = [
  { name: "United States", detail: "Engagement leadership and client-facing roles, based from Columbus, Ohio." },
  { name: "LATAM", detail: "Nearshore engineering in overlapping US time zones." },
  { name: "India", detail: "Engineering depth and extended-hours coverage." },
];
