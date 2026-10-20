import type { EvidenceItem, TrustItem } from "./types";

// P-16. Every item needs review within 90 days (A4). Statements need security-owner sign-off.
export const trustReviewedAt = "2026-10-13";

export const trustItems: TrustItem[] = [
  {
    statement: "Workato Silver Partner",
    detail: "TalentXM is a Workato Silver Partner for integration and automation delivery.",
    state: "held",
    reviewedAt: "2026-10-13",
  },
  {
    statement: "Claude Partner Network member",
    detail: "TalentXM is part of Anthropic's Claude Partner Network.",
    state: "held",
    reviewedAt: "2026-10-13",
  },
  {
    statement: "Human decision points on every agent",
    detail: "Each agent on this site lists the steps a person must approve. We do not deploy agents without them.",
    state: "held",
    reviewedAt: "2026-10-13",
  },
  {
    statement: "Formal security attestation",
    detail: "We are preparing an independent security attestation. Ask us for the current scope and timeline.",
    state: "in-progress",
    reviewedAt: "2026-10-13",
  },
  {
    statement: "AI governance framework",
    detail: "Use policy, AI system register and risk review process aligned with the EU AI Act and NYC Local Law 144.",
    state: "in-progress",
    reviewedAt: "2026-10-13",
  },
];

/** Frameworks we design against. These are not certifications. */
export const frameworks = [
  { name: "SOC 2", caption: "Security controls" },
  { name: "GDPR", caption: "EU data protection" },
  { name: "DPDP Act", caption: "India data protection" },
  { name: "EU AI Act", caption: "Risk-tiered AI" },
  { name: "NYC LL 144", caption: "Automated hiring tools" },
];

export const responsibleAi = [
  {
    title: "People decide",
    body: "Agents prepare, draft and recommend. A named person approves anything that changes a record or reaches a customer.",
  },
  {
    title: "Scoped access",
    body: "Agents use least-privilege credentials and read-only access wherever a workflow allows it.",
  },
  {
    title: "Measured, not assumed",
    body: "Each agent has evaluation measures agreed before a pilot and reported during it.",
  },
  {
    title: "Honest status",
    body: "Every agent shows its status. Validated POC means tested end to end, not deployed at scale.",
  },
];

export const partnershipsVsExperience = {
  partnerships: ["Workato (Silver Partner)", "Anthropic (Claude Partner Network)"],
  experience: ["Microsoft Copilot Studio", "AWS", "Microsoft Azure", "SAP", "Zoho", "athenahealth (sandbox)", "n8n"],
};

export const websiteData = [
  "Forms collect only the fields shown, and are used to reply to you.",
  "Enterprise enquiries go to our CRM. Talent applications go to our recruiting system and never to sales.",
  "Analytics run only after consent. We do not sell personal data.",
];

// P-14. Evidence items. "Client Outcome" requires a permission record before publishing.
export const evidenceItems: EvidenceItem[] = [
  {
    slug: "eligibility-verification-poc",
    title: "Eligibility checks against a live payer API",
    label: "Validated POC",
    agent: "eligibility-verification",
    summary: "An agent that sends X12 270 requests and reads 271 responses for scheduled visits.",
    validationSummary: "Tested end to end against the Optum eligibility API.",
    engagementModel: "Capability pod",
    poc: "eligibility-verification",
  },
  {
    slug: "schedulexm-poc",
    title: "Appointment scheduling in an EHR sandbox",
    label: "Validated POC",
    agent: "schedulexm",
    summary: "Request understanding, slot search and booking preparation with routing to schedulers.",
    validationSummary: "Built and tested against an athenahealth sandbox.",
    engagementModel: "Capability pod",
    poc: "schedulexm",
  },
  {
    slug: "refillxm-poc",
    title: "Refill requests prepared for clinician review",
    label: "Validated POC",
    agent: "refillxm",
    summary: "Classification and summarisation of refill requests against practice protocols.",
    validationSummary: "Tested end to end against demo systems.",
    engagementModel: "Project delivery",
  },
  {
    slug: "machine-health-poc",
    title: "Anomaly detection with a maintenance assistant",
    label: "Validated POC",
    agent: "machine-health-monitoring",
    summary: "A model that flags abnormal telemetry and an assistant that drafts work orders for approval.",
    validationSummary: "Tested on sample equipment telemetry with an approval control on write-back.",
    engagementModel: "Capability pod",
    poc: "machine-health-monitoring",
  },
  {
    slug: "chemical-documents-poc",
    title: "Structured data from technical documents",
    label: "Validated POC",
    agent: "chemical-document-interpretation",
    summary: "Field extraction from safety and technical data sheets, with the source passage for each value.",
    validationSummary: "Tested on a sample document set with reviewer corrections.",
    engagementModel: "Project delivery",
    poc: "chemistxm",
  },
  {
    slug: "ap-vendor-email-poc",
    title: "Vendor payment questions answered from SAP data",
    label: "Validated POC",
    agent: "ap-vendor-email-assistant",
    summary: "Email classification, status lookup and reply drafting with approval in Microsoft Teams.",
    validationSummary: "Built on Workato with demo SAP S/4HANA, Ariba, BTP and BlackLine connectors.",
    engagementModel: "Project delivery",
    poc: "ap-vendor-email-assistant",
  },
];
