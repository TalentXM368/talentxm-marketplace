import type { Agent, AgentStatus, IndustrySlug } from "./types";

// P-09 launch agents (Architecture S2). All "Validated POC".
// Items marked VERIFY in the architecture doc are kept general here; see CONTENT-TODO.md.

export const statusLabels: Record<AgentStatus, string> = {
  available: "Available",
  pilot: "Pilot",
  "validated-poc": "Validated POC",
  concept: "Concept",
};

export const statusDescriptions: Record<AgentStatus, string> = {
  available: "Deployed with at least one client and supported as a service.",
  pilot: "Running with a client on real data under a pilot agreement.",
  "validated-poc": "Built and tested end to end against sandbox or demo systems.",
  concept: "Designed and scoped. Not yet built.",
};

export const agents: Agent[] = [
  {
    slug: "eligibility-verification",
    name: "Eligibility Verification",
    agentType: "AI Agent",
    status: "validated-poc",
    statusEvidence: "Tested against the Optum eligibility API using X12 270/271 transactions.",
    icon: "file-check",
    industries: ["healthcare"],
    businessFunction: "Revenue cycle",
    outcomeLine: "Confirm coverage and patient responsibility before the visit, not after the denial.",
    summary:
      "Checks insurance eligibility and benefits for upcoming appointments and flags gaps to front-desk staff before the patient arrives.",
    intendedUser: "Patient access and front-desk teams in provider organisations.",
    inputs: [
      "Upcoming appointment schedule",
      "Patient demographics and insurance member ID",
      "Payer eligibility endpoint (X12 270/271)",
    ],
    actions: [
      "Sends eligibility requests for scheduled visits",
      "Reads active coverage, plan and benefit details from the response",
      "Flags missing, inactive or mismatched coverage for staff review",
      "Summarises results in Microsoft Copilot Studio for the desk team",
    ],
    doesNot: [
      "Change coverage or demographic data in the EHR without staff approval",
      "Give patients a final bill or a guaranteed cost",
      "Decide whether a visit goes ahead",
    ],
    currentWorkflow: [
      "Staff log in to payer portals one patient at a time",
      "Coverage problems surface after the visit, as denials",
      "Rework lands on billing teams weeks later",
    ],
    assistedWorkflow: [
      "Eligibility is checked for the whole schedule ahead of time",
      "Staff start the day with a short list of exceptions",
      "Coverage questions are resolved with the patient before the visit",
    ],
    humanDecisionPoints: [
      {
        step: "Coverage exception",
        who: "Patient access staff",
        why: "A person decides how to resolve inactive or mismatched coverage with the patient.",
      },
      {
        step: "Record update",
        who: "Registration lead",
        why: "Any change to the patient record is approved by staff, not written by the agent.",
      },
    ],
    securityControls: [
      "Least-privilege payer credentials held in a secrets store",
      "No protected health information retained in agent logs",
      "Every request and response recorded in an audit trail",
    ],
    evaluationMeasures: [
      "Share of scheduled visits checked before arrival",
      "Exceptions confirmed as real by staff",
      "Eligibility-related denials, measured against a baseline",
    ],
    techTags: [
      { category: "ai", name: "Microsoft Copilot Studio", evidenceLevel: "tested" },
      { category: "integration", name: "Optum eligibility API", evidenceLevel: "tested" },
      { category: "standard", name: "X12 270/271", evidenceLevel: "tested" },
    ],
    deploymentOptions: ["Client Microsoft 365 tenant", "Client cloud account with managed service"],
    faqs: [
      {
        q: "Which payers does it support?",
        a: "The proof of concept was tested against the Optum eligibility API. Other payers and clearinghouses are scoped during a pilot.",
      },
      {
        q: "Does it work with our EHR?",
        a: "The agent reads the schedule and writes nothing back without approval. EHR connection is agreed during pilot scoping.",
      },
    ],
    seo: {
      title: "Eligibility Verification AI Agent",
      description:
        "An AI agent that checks insurance eligibility for scheduled visits and flags coverage gaps to staff before the patient arrives.",
    },
  },
  {
    slug: "schedulexm",
    name: "ScheduleXM",
    agentType: "AI Agent",
    status: "validated-poc",
    statusEvidence: "Built and tested against an athenahealth sandbox.",
    icon: "calendar",
    industries: ["healthcare"],
    businessFunction: "Patient access",
    outcomeLine: "Handle routine appointment requests so schedulers can focus on the difficult ones.",
    summary:
      "An appointment scheduling agent that understands a booking request, finds suitable slots and prepares the booking for confirmation.",
    intendedUser: "Scheduling and contact-centre teams in clinics and provider groups.",
    inputs: [
      "Patient request by message or form",
      "Provider schedules and appointment types",
      "Scheduling rules set by the practice",
    ],
    actions: [
      "Identifies the appointment type and urgency from the request",
      "Searches available slots that match the practice's rules",
      "Proposes options and prepares the booking",
      "Routes complex or clinical requests to a scheduler",
    ],
    doesNot: [
      "Give clinical advice or triage symptoms",
      "Override provider schedule rules or templates",
      "Book appointments that the practice has marked for staff only",
    ],
    currentWorkflow: [
      "Requests arrive by phone, portal and email",
      "Schedulers search several calendars for each request",
      "Simple bookings take the same time as complex ones",
    ],
    assistedWorkflow: [
      "Routine requests arrive with suitable slots already found",
      "Schedulers confirm or adjust instead of searching",
      "Complex requests are flagged and routed straight to a person",
    ],
    humanDecisionPoints: [
      {
        step: "Clinical or urgent request",
        who: "Scheduler or clinical staff",
        why: "Anything that may need clinical judgement goes to a person.",
      },
      {
        step: "Booking confirmation",
        who: "Scheduler",
        why: "Staff confirm bookings while the practice builds confidence in the agent.",
      },
    ],
    securityControls: [
      "Sandbox-first build before any production connection",
      "Role-scoped EHR API access",
      "Conversation records retained under the practice's policy",
    ],
    evaluationMeasures: [
      "Requests handled without rework",
      "Time from request to confirmed booking",
      "Requests correctly routed to staff",
    ],
    techTags: [
      { category: "platform", name: "athenahealth", evidenceLevel: "designed" },
      { category: "ai", name: "Large language model", evidenceLevel: "tested" },
    ],
    deploymentOptions: ["Client cloud account", "Managed service"],
    faqs: [
      {
        q: "Which EHRs does ScheduleXM support?",
        a: "The proof of concept was built against an athenahealth sandbox. Other EHRs are assessed during pilot scoping.",
      },
      {
        q: "Can patients use it directly?",
        a: "That is a pilot decision. Most practices start with staff-facing use and extend once results are reviewed.",
      },
    ],
    seo: {
      title: "ScheduleXM: Appointment Scheduling AI Agent",
      description:
        "ScheduleXM handles routine appointment requests, finds suitable slots and routes complex requests to schedulers.",
    },
  },
  {
    slug: "refillxm",
    name: "RefillXM",
    agentType: "AI Agent",
    status: "validated-poc",
    statusEvidence: "Built and tested end to end against demo systems.",
    icon: "pill",
    industries: ["healthcare"],
    businessFunction: "Clinical operations",
    outcomeLine: "Prepare routine refill requests so clinicians review them in minutes.",
    summary:
      "Reads incoming prescription refill requests, gathers the information a clinician needs and queues each request for review.",
    intendedUser: "Clinical support and nursing teams in primary and specialty care.",
    inputs: [
      "Refill requests from patients and pharmacies",
      "Medication list and recent visit history",
      "Practice refill protocols",
    ],
    actions: [
      "Reads and classifies each refill request",
      "Gathers medication history and protocol criteria",
      "Prepares a summary for clinician review",
      "Flags requests that fall outside protocol",
    ],
    doesNot: [
      "Approve or deny a prescription",
      "Change doses or medications",
      "Contact the pharmacy without clinician sign-off",
    ],
    currentWorkflow: [
      "Refill requests arrive in several queues",
      "Staff look up history and protocol for each one",
      "Clinicians review incomplete requests and send them back",
    ],
    assistedWorkflow: [
      "Each request arrives with history and protocol checks attached",
      "Out-of-protocol requests are flagged first",
      "Clinicians approve or decline from one summary",
    ],
    humanDecisionPoints: [
      {
        step: "Refill decision",
        who: "Licensed clinician",
        why: "Every prescription decision is made by a clinician.",
      },
    ],
    securityControls: [
      "Read-only access to medication history",
      "No prescription actions available to the agent",
      "Audit trail for every summary produced",
    ],
    evaluationMeasures: [
      "Time from request to clinician decision",
      "Summaries accepted without correction",
      "Out-of-protocol requests correctly flagged",
    ],
    techTags: [{ category: "ai", name: "Large language model", evidenceLevel: "tested" }],
    deploymentOptions: ["Client cloud account", "Managed service"],
    faqs: [
      {
        q: "Does RefillXM make prescribing decisions?",
        a: "No. It prepares information for a clinician, who makes every decision.",
      },
    ],
    seo: {
      title: "RefillXM: Prescription Refill AI Agent",
      description:
        "RefillXM prepares prescription refill requests with history and protocol checks so clinicians can review them quickly.",
    },
  },
  {
    slug: "machine-health-monitoring",
    name: "Machine Health Monitoring",
    agentType: "ML Model + assistant",
    status: "validated-poc",
    statusEvidence: "Anomaly model and assistant tested on sample equipment telemetry.",
    icon: "activity",
    industries: ["manufacturing"],
    businessFunction: "Asset operations",
    outcomeLine: "Spot abnormal machine behaviour early and give maintenance teams the context to act.",
    summary:
      "An anomaly detection model watches equipment telemetry. An assistant explains what changed and drafts a maintenance request for a planner to approve.",
    intendedUser: "Maintenance planners and reliability engineers.",
    inputs: [
      "Sensor and machine telemetry",
      "Asset register and maintenance history",
      "Normal operating ranges per asset",
    ],
    actions: [
      "Learns normal operating patterns for each asset",
      "Flags readings that drift from those patterns",
      "Explains the change in plain language in Microsoft Copilot Studio",
      "Drafts a work order for the maintenance system",
    ],
    doesNot: [
      "Stop, start or change settings on equipment",
      "Write to the maintenance system without planner approval",
      "Replace safety systems or alarms already in place",
    ],
    currentWorkflow: [
      "Telemetry sits in historians and spreadsheets",
      "Problems are found when something breaks",
      "Work orders are raised by hand after the event",
    ],
    assistedWorkflow: [
      "Abnormal readings are flagged as they appear",
      "Planners see what changed and why it matters",
      "A draft work order is ready for approval",
    ],
    humanDecisionPoints: [
      {
        step: "Work order approval",
        who: "Maintenance planner",
        why: "The write-back to the maintenance system is held until a planner approves it.",
      },
      {
        step: "Threshold changes",
        who: "Reliability engineer",
        why: "Changes to what counts as abnormal are reviewed by an engineer.",
      },
    ],
    securityControls: [
      "Read-only connection to telemetry sources",
      "Approval control on maintenance system write-back",
      "Model and threshold changes logged",
    ],
    evaluationMeasures: [
      "Alerts confirmed as real by engineers",
      "Lead time between alert and failure on test data",
      "Draft work orders accepted without changes",
    ],
    techTags: [
      { category: "ai", name: "Anomaly detection", evidenceLevel: "tested" },
      { category: "ai", name: "Microsoft Copilot Studio", evidenceLevel: "tested" },
      { category: "platform", name: "CMMS write-back", evidenceLevel: "designed" },
    ],
    deploymentOptions: ["Client cloud account", "Edge plus cloud", "Managed service"],
    faqs: [
      {
        q: "What data do you need to start?",
        a: "Several months of telemetry for the assets in scope, plus their maintenance history. We assess data quality in the first sprint.",
      },
      {
        q: "Does it control equipment?",
        a: "No. It reads telemetry and drafts requests. People decide what happens on the floor.",
      },
    ],
    seo: {
      title: "Machine Health Monitoring: ML Model + Assistant",
      description:
        "Anomaly detection on equipment telemetry with an assistant that explains changes and drafts work orders for planner approval.",
    },
  },
  {
    slug: "chemical-document-interpretation",
    name: "Chemical-Document Interpretation",
    agentType: "Solution Accelerator",
    status: "validated-poc",
    statusEvidence: "Tested on a sample set of technical and safety documents.",
    icon: "flask",
    industries: ["manufacturing"],
    businessFunction: "Quality & engineering",
    outcomeLine: "Turn dense technical and safety documents into structured, searchable data.",
    summary:
      "Reads chemical and technical documents, extracts the fields engineering and quality teams need and shows the source for every value.",
    intendedUser: "Quality, regulatory and process engineering teams.",
    inputs: [
      "Safety data sheets and technical data sheets",
      "Supplier specifications",
      "The field list your team needs extracted",
    ],
    actions: [
      "Reads documents in common formats",
      "Extracts properties, hazards and handling data",
      "Links each value to the passage it came from",
      "Flags low-confidence values for review",
    ],
    doesNot: [
      "Certify a material as safe or compliant",
      "Replace review by a qualified person",
      "Publish extracted data without approval",
    ],
    currentWorkflow: [
      "Engineers read long documents to find a few values",
      "Data is re-keyed into spreadsheets",
      "Different people extract the same document differently",
    ],
    assistedWorkflow: [
      "Values are extracted with a link to the source text",
      "Reviewers check flagged values instead of whole documents",
      "Approved data lands in one structured format",
    ],
    humanDecisionPoints: [
      {
        step: "Data approval",
        who: "Quality or regulatory reviewer",
        why: "Extracted values are approved by a qualified person before use.",
      },
    ],
    securityControls: [
      "Documents processed in the client's environment",
      "No document content used to train shared models",
      "Reviewer approvals recorded",
    ],
    evaluationMeasures: [
      "Field-level accuracy against reviewer corrections",
      "Time per document before and after",
      "Share of values flagged for review",
    ],
    techTags: [{ category: "ai", name: "Document AI", evidenceLevel: "tested" }],
    deploymentOptions: ["Client cloud account", "Managed service"],
    faqs: [
      {
        q: "Which document types are supported?",
        a: "The accelerator was tested on safety and technical data sheets. Other document types are assessed with a sample set during scoping.",
      },
    ],
    seo: {
      title: "Chemical-Document Interpretation Accelerator",
      description:
        "Extract structured data from chemical and technical documents, with the source shown for every value and review by your team.",
    },
  },
  {
    slug: "ap-vendor-email-assistant",
    name: "AP Vendor Email Assistant",
    agentType: "AI Agent",
    status: "validated-poc",
    statusEvidence:
      "Built on Workato with demo connectors for SAP S/4HANA, Ariba, BTP and BlackLine, and tested in Microsoft Teams.",
    icon: "mail",
    industries: [],
    businessFunction: "Accounts payable",
    outcomeLine: "Answer routine vendor payment questions with the facts from your finance systems.",
    summary:
      "Reads vendor emails about invoices and payments, looks up the status in finance systems and drafts a reply for an AP specialist to send.",
    intendedUser: "Accounts payable and shared-services finance teams.",
    inputs: [
      "Vendor emails to the AP mailbox",
      "Invoice and payment status from ERP and procurement systems",
      "Reconciliation status",
    ],
    actions: [
      "Classifies each email by request type",
      "Looks up invoice, PO and payment status",
      "Drafts a reply with the relevant facts",
      "Posts the draft to Microsoft Teams for review",
    ],
    doesNot: [
      "Release, hold or change payments",
      "Change vendor bank details",
      "Send replies without AP approval",
    ],
    currentWorkflow: [
      "AP staff read every vendor email",
      "Each answer needs lookups in several systems",
      "Routine status questions crowd out exceptions",
    ],
    assistedWorkflow: [
      "Emails arrive classified, with status already looked up",
      "Specialists approve or edit a drafted reply",
      "Exceptions and bank-detail requests go straight to a person",
    ],
    humanDecisionPoints: [
      {
        step: "Reply approval",
        who: "AP specialist",
        why: "No reply reaches a vendor without a person approving it.",
      },
      {
        step: "Bank-detail or payment request",
        who: "AP lead",
        why: "Requests that could indicate fraud are always handled by a person.",
      },
    ],
    securityControls: [
      "Read-only finance system access",
      "Fraud-sensitive requests excluded from automation",
      "All drafts and approvals logged",
    ],
    evaluationMeasures: [
      "Drafts sent without edits",
      "Time to first response",
      "Correct routing of exceptions",
    ],
    techTags: [
      { category: "integration", name: "Workato", evidenceLevel: "tested" },
      { category: "platform", name: "SAP S/4HANA", evidenceLevel: "designed" },
      { category: "platform", name: "SAP Ariba", evidenceLevel: "designed" },
      { category: "platform", name: "SAP BTP", evidenceLevel: "designed" },
      { category: "platform", name: "BlackLine", evidenceLevel: "designed" },
      { category: "integration", name: "Microsoft Teams", evidenceLevel: "tested" },
    ],
    deploymentOptions: ["Client Workato workspace", "Managed service"],
    faqs: [
      {
        q: "Have the SAP connections been tested with real data?",
        a: "The proof of concept used demo connectors. Connection to your SAP and BlackLine environments is part of a pilot.",
      },
      {
        q: "Do we need Workato?",
        a: "The proof of concept runs on Workato. We can assess other integration platforms during scoping.",
      },
    ],
    seo: {
      title: "AP Vendor Email Assistant AI Agent",
      description:
        "An AI agent that reads vendor payment emails, looks up status in finance systems and drafts replies for AP approval.",
    },
  },
];

export function getAgent(slug: string) {
  return agents.find((a) => a.slug === slug);
}

export function getAgents(slugs: string[]) {
  return slugs.map(getAgent).filter((a): a is Agent => Boolean(a));
}

export function agentsForIndustry(slug: IndustrySlug) {
  return agents.filter((a) => a.industries.includes(slug));
}

/** Catalogue filter values. One taxonomy shared with the Industries menu (UX01). */
export const agentIndustryFilters = [
  { value: "healthcare", label: "Healthcare" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "cross-industry", label: "Cross-industry" },
] as const;

export const agentTypeFilters = [
  { value: "AI Agent", label: "AI Agent" },
  { value: "ML Model + assistant", label: "ML Model + assistant" },
  { value: "Solution Accelerator", label: "Solution Accelerator" },
] as const;

export function agentIndustryLabel(agent: Agent) {
  if (agent.industries.length === 0) return `Cross-industry · ${agent.businessFunction}`;
  const names: Record<IndustrySlug, string> = { healthcare: "Healthcare", manufacturing: "Manufacturing" };
  return `${agent.industries.map((i) => names[i]).join(", ")} · ${agent.businessFunction}`;
}
