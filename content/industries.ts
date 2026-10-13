import type { Industry, IndustrySlug } from "./types";

// P-11, P-12. Retail and Supply Chain are not Phase 1 industries (redirected to /industries).

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "heart-pulse",
    image: "/images/healthcare-bg.webp",
    summary: "Patient access, revenue cycle and clinical operations work inside the EHR and payer stack.",
    hero: {
      eyebrow: "Industries · Healthcare",
      title: "AI and integration work that respects clinicians' time.",
      lede: "We work on the administrative load around care: eligibility, scheduling, refills and the integrations between EHRs and payers. Every workflow keeps a clinician or staff member in charge of the decision.",
    },
    useCaseIntro:
      "Where we have built and tested work in healthcare, with the systems involved and the control that keeps a person in charge.",
    useCaseRows: [
      {
        workflow: "Insurance eligibility before the visit",
        status: "validated-poc",
        systems: "Payer eligibility API, X12 270/271, Copilot Studio",
        control: "Staff resolve every coverage exception",
        deliveryModel: "Capability pod",
        measures: "Visits checked before arrival; eligibility denials",
      },
      {
        workflow: "Routine appointment scheduling",
        status: "validated-poc",
        systems: "EHR scheduling API (sandbox)",
        control: "Clinical or urgent requests routed to staff",
        deliveryModel: "Capability pod",
        measures: "Requests handled without rework; time to booking",
      },
      {
        workflow: "Prescription refill preparation",
        status: "validated-poc",
        systems: "Medication history, refill protocols",
        control: "Clinician makes every refill decision",
        deliveryModel: "Project delivery",
        measures: "Time to clinician decision; summaries accepted",
      },
      {
        workflow: "EHR and payer integration",
        status: "available",
        systems: "Workato, n8n, HL7 / FHIR interfaces",
        control: "Monitored integrations with named owners",
        deliveryModel: "Managed service",
        measures: "Failed messages; time to recovery",
      },
    ],
    featuredAgents: ["eligibility-verification", "schedulexm", "refillxm"],
    standards: ["HIPAA-aware data handling", "X12 270/271", "HL7 FHIR", "Sandbox-first build"],
    notClaimed: [
      "We do not provide clinical advice or make clinical decisions.",
      "Agents shown here have been validated as proofs of concept, not deployed across a health system.",
      "We do not name client organisations without written permission.",
    ],
    pod: {
      lead: "Healthcare operations lead",
      roles: ["Integration engineer", "AI engineer", "EHR analyst", "QA and evaluation"],
      note: "Roles vary by engagement. A pod is sized to the workflow, not to a headcount target.",
    },
    faqs: [
      {
        q: "Do you work with protected health information?",
        a: "Only where a pilot requires it and the right agreements are in place. We build and test in sandbox environments first.",
      },
      {
        q: "Which EHRs have you worked with?",
        a: "Our scheduling proof of concept used an athenahealth sandbox. We assess other EHRs and their API access during scoping.",
      },
      {
        q: "How do we start?",
        a: "With one workflow. We review its current cost, the systems involved and where people need to stay in control.",
      },
    ],
    seo: {
      title: "Healthcare AI & Integration Services",
      description:
        "Eligibility, scheduling, refill and EHR integration work for healthcare providers, with staff and clinicians in charge of every decision.",
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    image: "/images/manufacturing-bg.webp",
    summary: "Asset operations, quality and engineering work that connects the shop floor to the business systems.",
    hero: {
      eyebrow: "Industries · Manufacturing",
      title: "Connect the shop floor to the systems that run the business.",
      lede: "We work where operational technology meets ERP and maintenance systems: machine health, technical documents and the integrations between them. Engineers and planners approve every action.",
    },
    useCaseIntro:
      "Where we have built and tested work in manufacturing, with the systems involved and the control that keeps a person in charge.",
    useCaseRows: [
      {
        workflow: "Machine health monitoring",
        status: "validated-poc",
        systems: "Equipment telemetry, anomaly model, Copilot Studio, CMMS",
        control: "Planner approves every work order",
        deliveryModel: "Capability pod",
        measures: "Alerts confirmed by engineers; lead time on test data",
      },
      {
        workflow: "Chemical and technical document extraction",
        status: "validated-poc",
        systems: "Document AI, quality records",
        control: "Qualified reviewer approves extracted data",
        deliveryModel: "Project delivery",
        measures: "Field accuracy; time per document",
      },
      {
        workflow: "ERP and MES integration",
        status: "available",
        systems: "Workato, n8n, ERP and MES APIs",
        control: "Monitored integrations with named owners",
        deliveryModel: "Managed service",
        measures: "Failed transactions; time to recovery",
      },
    ],
    featuredAgents: ["machine-health-monitoring", "chemical-document-interpretation"],
    standards: ["Read-only OT connections", "Approval before write-back", "ISA-95 aware integration design"],
    notClaimed: [
      "Our agents do not control equipment or replace safety systems.",
      "Agents shown here have been validated as proofs of concept, not rolled out across plants.",
      "We do not name client organisations without written permission.",
    ],
    pod: {
      lead: "Manufacturing operations lead",
      roles: ["OT and data engineer", "ML engineer", "Integration engineer", "Reliability analyst"],
      note: "Roles vary by engagement. A pod is sized to the workflow, not to a headcount target.",
    },
    faqs: [
      {
        q: "Do you connect directly to PLCs?",
        a: "We prefer to read from historians or gateways your OT team already trusts, with read-only access.",
      },
      {
        q: "Can this run at the edge?",
        a: "Yes. Models can run close to the equipment, with summaries sent to the cloud.",
      },
      {
        q: "How much data do we need?",
        a: "Several months of telemetry for the assets in scope is a good start. We check data quality in the first sprint.",
      },
    ],
    seo: {
      title: "Manufacturing AI & Integration Services",
      description:
        "Machine health monitoring, technical document extraction and ERP/MES integration for manufacturers, with engineers approving every action.",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export const industryNames: Record<IndustrySlug, string> = {
  healthcare: "Healthcare",
  manufacturing: "Manufacturing",
};
