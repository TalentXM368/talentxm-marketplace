import type { BusinessFunction, Poc, PocCategory, Technology, VideoAsset } from "./types";

// POC Library. Categories and business functions mirror the folders in the POC Drive library.
// Videos are the YouTube recordings on @talentxm, or the Drive file when there is none.
// Technologies come from the presentation where one exists. For the other POCs the copy,
// technologies and `walkthrough` timestamps are written from the video transcript.

export const pocCategories: PocCategory[] = [
  { slug: "healthcare", name: "Healthcare", icon: "heart-pulse" },
  { slug: "financial-services", name: "Financial Services", icon: "receipt" },
  { slug: "manufacturing", name: "Manufacturing", icon: "factory" },
  { slug: "retail", name: "Retail", icon: "building" },
];

export const businessFunctions: BusinessFunction[] = [
  { slug: "customer-service", name: "Customer Service" },
  { slug: "finance", name: "Finance" },
  { slug: "human-resources", name: "Human Resources" },
  { slug: "marketing", name: "Marketing" },
  { slug: "procurement", name: "Purchasing & Procurement" },
  { slug: "recruiting", name: "Recruiting" },
  { slug: "sales", name: "Sales" },
  { slug: "supply-chain", name: "Supply Chain" },
];

export const technologies: Technology[] = [
  { slug: "copilot-studio", name: "Microsoft Copilot Studio", group: "ai" },
  { slug: "llm", name: "Large language model", group: "ai" },
  { slug: "anomaly-detection", name: "Anomaly detection (Isolation Forest)", group: "ai" },
  { slug: "decimer", name: "DECIMER", group: "ai" },
  { slug: "rdkit", name: "RDKit", group: "ai" },
  { slug: "ocr", name: "OCR document extraction", group: "ai" },
  { slug: "workato", name: "Workato", group: "integration" },
  { slug: "mulesoft", name: "MuleSoft Anypoint", group: "integration" },
  { slug: "power-automate", name: "Microsoft Power Automate", group: "integration" },
  { slug: "microsoft-teams", name: "Microsoft Teams", group: "integration" },
  { slug: "waystar", name: "Waystar", group: "integration" },
  { slug: "athenahealth", name: "athenahealth", group: "platform" },
  { slug: "epic", name: "Epic", group: "platform" },
  { slug: "salesforce", name: "Salesforce", group: "platform" },
  { slug: "salesforce-health-cloud", name: "Salesforce Health Cloud", group: "platform" },
  { slug: "shopify", name: "Shopify", group: "platform" },
  { slug: "sharepoint", name: "SharePoint", group: "platform" },
  { slug: "google-cloud", name: "Google Cloud", group: "platform" },
  { slug: "sap", name: "SAP", group: "platform" },
  { slug: "databricks", name: "Databricks", group: "platform" },
  { slug: "azure", name: "Microsoft Azure", group: "platform" },
  { slug: "smiles", name: "SMILES notation", group: "standard" },
  { slug: "mcp", name: "Model Context Protocol (MCP)", group: "standard" },
];

function youtube(id: string, title: string, duration: string): VideoAsset {
  return {
    title,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
    thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    duration,
  };
}

/** A video that is only in the POC Drive library. The file must be shared as "anyone with the link". */
function driveVideo(id: string, title: string, duration: string, thumbnail: string): VideoAsset {
  return { title, embedUrl: `https://drive.google.com/file/d/${id}/preview`, thumbnail, duration };
}

function drivePdf(id: string, title: string) {
  return {
    title,
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
    openUrl: `https://drive.google.com/file/d/${id}/view`,
  };
}

export const pocs: Poc[] = [
  {
    slug: "schedulexm",
    title: "ScheduleXM: Conversational Patient Scheduling",
    categories: ["healthcare"],
    functions: [],
    industries: ["healthcare"],
    agent: "schedulexm",
    summary:
      "A conversational assistant that books, reschedules, cancels and checks in patients inside athenahealth, through 37 MCP skills.",
    problem:
      "Front desks spend hours answering calls, searching for open slots, rescheduling visits and handling cancellations, while patients wait on hold or try to book after office hours. Every appointment means moving through several EHR screens.",
    solution:
      "Staff tell ScheduleXM what they need in plain language. It identifies the right department and provider, retrieves open slots, registers a new patient when needed and books the visit, which is recorded in athenahealth. The same assistant reschedules and cancels, releases freed slots and runs check-in, with the EHR kept at the centre.",
    outcomes: [
      "Scheduling actions requested in plain language instead of across several screens",
      "Cancelled slots released for another booking, so capacity gets used",
      "Booking, changes and check-in handled in one connected flow",
      "Front-desk time moved from repetitive admin to supporting patients",
    ],
    boundaries: ["Keeps athenahealth as the system of record. It makes the EHR easier to use and does not replace it."],
    technologies: ["athenahealth", "mcp", "llm"],
    video: youtube("_pEns7kR7lA", "ScheduleXM POC walkthrough", "2:48"),
    walkthrough: [
      {
        time: "0:02",
        title: "The front-desk workload",
        detail:
          "Calls, slot searches, rescheduling and cancellations fill the front desk's day while patients wait on hold or try to book after hours.",
      },
      {
        time: "0:20",
        title: "Meet ScheduleXM",
        detail:
          "An AI scheduling assistant connected to athenahealth. Teams ask for scheduling actions in natural language instead of navigating screens.",
      },
      {
        time: "0:42",
        title: "Booking an appointment",
        detail:
          "When a patient calls, the assistant finds the department and provider, retrieves open slots, registers a new patient if needed and records the booking in athenahealth.",
      },
      {
        time: "1:10",
        title: "Rescheduling and cancellations",
        detail:
          "Staff search new availability, move or cancel appointments through the same assistant, and a cancelled slot is released for another booking.",
      },
      {
        time: "1:37",
        title: "Check-in",
        detail:
          "ScheduleXM uses athenahealth visit management to start check-in, review the required information and complete it.",
      },
      {
        time: "2:00",
        title: "The integration engine",
        detail:
          "37 AI-accessible skills, connected through Model Context Protocol, cover appointments, patients, providers, check-in and reporting.",
      },
      {
        time: "2:22",
        title: "Roadmap",
        detail: "Next steps extend toward patient self-service, appointment confirmations and calendar synchronization.",
      },
    ],
    publishedAt: "2026-10-19",
    seo: {
      title: "ScheduleXM POC: Patient Scheduling Agent",
      description:
        "Watch the ScheduleXM proof of concept: a conversational assistant that books, reschedules, cancels and checks in patients in athenahealth.",
    },
  },
  {
    slug: "eligibility-verification",
    title: "Agentic Healthcare Eligibility Framework",
    categories: ["healthcare"],
    functions: [],
    industries: ["healthcare"],
    agent: "eligibility-verification",
    summary:
      "Four agents scan insurance cards, verify coverage, resolve exceptions and flag prior authorizations, with staff working in Workato GO or Teams.",
    problem:
      "Eligibility checks are manual, reactive and prone to error, and legacy systems cannot handle the complexity. A wrong member ID, a payer API outage or a missing authorization can delay care or cost thousands.",
    solution:
      "Four agents share the work. The intake genie scans insurance cards, validates patient data and flags discrepancies. The eligibility genie verifies coverage, resolves transient errors and standardizes responses. The exception genie investigates failures and gives staff a clear fix, and the prior auth genie finds procedures that need approval and pre-fills the request. Staff search, act and resolve from one interface: Workato GO or Microsoft Teams.",
    outcomes: [
      "Discrepancies flagged before they delay care",
      "Coverage verified automatically, with transient errors resolved",
      "Exceptions arrive with clear, actionable next steps",
      "Prior authorizations identified before claims are denied",
    ],
    technologies: ["workato", "azure", "epic", "microsoft-teams"],
    video: youtube("1ufIZHucAFw", "Agentic eligibility framework overview", "1:36"),
    walkthrough: [
      {
        time: "0:02",
        title: "Why eligibility checks break",
        detail:
          "Manual, reactive checks fail on a wrong ID, a payer API outage or a missing authorization, and one mistake can delay care.",
      },
      {
        time: "0:17",
        title: "The framework",
        detail: "An agentic eligibility framework built on Workato GO, Microsoft Azure and Epic.",
      },
      {
        time: "0:34",
        title: "Intake genie",
        detail: "Scans insurance cards, validates patient data and flags discrepancies before they delay care.",
      },
      {
        time: "0:38",
        title: "Eligibility genie",
        detail: "Verifies coverage, resolves transient errors and standardizes payer responses.",
      },
      {
        time: "0:50",
        title: "Exception genie",
        detail: "When something fails, it investigates, finds the fix and notifies staff with clear next steps.",
      },
      {
        time: "0:56",
        title: "Prior auth genie",
        detail: "Identifies procedures that need approval and pre-fills the request before a claim is denied.",
      },
      {
        time: "1:10",
        title: "One interface for staff",
        detail: "Staff search, act and resolve from Workato GO or Microsoft Teams.",
      },
    ],
    publishedAt: "2025-07-25",
    seo: {
      title: "Agentic Eligibility Verification POC",
      description:
        "Watch the agentic eligibility proof of concept: agents for intake, coverage checks, exceptions and prior authorizations, built on Workato GO.",
    },
  },
  {
    slug: "patient-re-engagement",
    title: "Patient Re-engagement Assistant",
    categories: ["healthcare"],
    functions: [],
    industries: ["healthcare"],
    summary:
      "Ask in plain English who to re-engage. Rule-based, read-only analytics return prioritised candidates and exceptions, with reasons, for staff to review.",
    problem:
      "Patients with prior clinical activity go dormant, and the signals that show it are scattered across scheduling and workflow systems that were never built to talk to each other. Teams look at five lists that disagree, and none of them says who actually needs a call.",
    solution:
      "Explicit, reviewable business rules run against curated, governed data and filter out misleading workflow noise. Outreach and operations staff ask questions in plain English. The assistant returns reactivation candidates ordered by score, days inactive and clinical activity, surfaces workflow exceptions and explains the reasoning behind each item. A person decides what happens next, and approved outreach runs through the CRM and workflows already in place.",
    outcomes: [
      "Reactivation candidates split into high and medium priority, each with its reasoning",
      "Workflow exceptions explained, with a recommended next step",
      "Candidate volume, outreach conversion, bookings and slot fill by department",
      "Funnel movement tracked stage by stage against a baseline",
    ],
    boundaries: [
      "Read only by design",
      "Patients appear as safe references, never by name or raw PHI",
      "No clinical diagnosis, medical advice or treatment recommendation",
      "A person reviews every opportunity before any outreach",
      "Asks a clarifying question instead of guessing, and never invents a number or record",
    ],
    technologies: ["athenahealth", "google-cloud"],
    video: youtube("YukYmS3Q_vc", "Patient re-engagement POC walkthrough", "6:39"),
    walkthrough: [
      {
        time: "0:09",
        title: "The re-engagement gap",
        detail:
          "Dormant patients are hidden across fragmented scheduling and workflow signals, so the opportunity is invisible in the tools teams use every day.",
      },
      {
        time: "0:51",
        title: "Rules, not a black box",
        detail:
          "Explicit business rules run on governed data. A filled appointment status alone is not treated as proof that the patient showed up.",
      },
      {
        time: "1:30",
        title: "Questions in plain English",
        detail:
          "Staff ask how many reactivation candidates there are, which department has the largest opportunity, or which high-priority patients to contact. Conceptual questions are answered from built-in guidance.",
      },
      {
        time: "2:12",
        title: "A prioritised candidate list",
        detail:
          "20 candidates in this batch, ordered by score, days inactive and clinical activity, split into high and medium priority, each shown as a safe reference.",
      },
      {
        time: "2:36",
        title: "Exceptions explained",
        detail:
          "20 high-severity exceptions trace back to one patient and provider: filled appointments pointing to an encounter that does not exist. The assistant recommends escalating to data engineering.",
      },
      {
        time: "3:11",
        title: "Decision support, not a decision maker",
        detail:
          "No raw PHI, diagnosis, treatment advice or autonomous outreach. A person reviews each opportunity and outreach runs through the existing CRM.",
      },
      {
        time: "3:58",
        title: "Measured against a baseline",
        detail:
          "Candidates, conversion, bookings, slot fill and funnel movement by department, with short windows compared against the full data set.",
      },
      {
        time: "5:41",
        title: "Under the hood",
        detail:
          "Curated healthcare data with an athenahealth integration, Google Cloud serving layers and seven connected skills.",
      },
    ],
    publishedAt: "2026-10-02",
    seo: {
      title: "Patient Re-engagement POC",
      description:
        "Watch the patient re-engagement proof of concept: rule-driven, read-only prioritisation of patients to re-engage, reviewed by staff.",
    },
  },
  {
    slug: "healthcare-ops-genie",
    title: "Healthcare OPS Genie: Referral to Registration",
    categories: ["healthcare"],
    functions: [],
    industries: ["healthcare"],
    summary:
      "Turns a referral email into a registered patient in Salesforce Health Cloud, collects ID and insurance documents and checks eligibility with Waystar.",
    problem:
      "When a referral arrives, registration staff copy patient details from the attachment into Epic and again into Salesforce Health Cloud, check eligibility in Availity and then pVerify if that fails, and finally schedule the visit and notify the care team. Each patient takes hours of manual work.",
    solution:
      "OPS Genie runs on Workato recipes. A referral email triggers the first recipe, which extracts demographics and clinical notes with OCR and registers the patient in Salesforce Health Cloud with an MRN. The genie sends a welcome email, asks the patient for a driving licence and insurance card, validates both and checks eligibility directly through Waystar, telling the patient which fields to correct when data is missing. Admin staff then work with the genie in a Workato GO chat.",
    outcomes: [
      "Patients registered from the referral email without re-keying",
      "ID and insurance card collected and validated by email",
      "Eligibility checked through Waystar, with missing fields sent back for correction",
      "Admin staff look up patients, log complaints and check coverage in one chat",
    ],
    technologies: ["workato", "salesforce-health-cloud", "azure", "waystar", "ocr"],
    video: youtube("NX9RBpTbxb0", "Healthcare OPS Genie demo", "6:56"),
    walkthrough: [
      {
        time: "0:14",
        title: "The cost of manual operations",
        detail: "Healthcare staff lose much of their time to repetitive data entry across disconnected systems.",
      },
      {
        time: "0:39",
        title: "Today's referral process",
        detail:
          "Staff extract data from the referral, enter it into Epic and Salesforce Health Cloud, check eligibility in Availity and pVerify, then schedule and notify the care team by hand.",
      },
      {
        time: "1:32",
        title: "Meet Healthcare OPS Genie",
        detail:
          "An AI assistant built on Workato that handles registration, eligibility verification and operational coordination.",
      },
      {
        time: "1:52",
        title: "Referral email to registered patient",
        detail:
          "The first recipe extracts demographics and clinical notes with OCR and registers the patient in Salesforce Health Cloud with an MRN.",
      },
      {
        time: "2:48",
        title: "Welcome and document request",
        detail:
          "The patient receives a welcome email with next steps, then a request for their driving licence and insurance card.",
      },
      {
        time: "3:24",
        title: "Documents verified",
        detail: "A recipe checks both documents and confirms by email that each one was processed.",
      },
      {
        time: "3:59",
        title: "Eligibility through Waystar",
        detail:
          "A direct API connection to Waystar validates the insurance card. When data is missing, the response lists the fields to correct.",
      },
      {
        time: "4:49",
        title: "Chat for admin staff",
        detail:
          "In Workato GO, staff look up a patient by MRN, log a complaint and research insurance status in Azure Health Data Services.",
      },
    ],
    publishedAt: "2025-08-08",
    seo: {
      title: "Healthcare OPS Genie POC",
      description:
        "Watch Healthcare OPS Genie: referral emails turned into registered patients in Salesforce Health Cloud, with document checks and Waystar eligibility.",
    },
  },
  {
    slug: "contract-compliance",
    title: "Contract Compliance Genie: Governed Analytics and Intake",
    categories: ["healthcare"],
    functions: ["sales"],
    industries: ["healthcare"],
    summary:
      "Nine bounded Workato skills answer commercial questions over SAP and Salesforce data and run governed contract intake, with people approving every clause.",
    problem:
      "One legal customer can sit under several ERP and CRM identifiers. Pipeline, orders, billing and P&L live at different grains and refresh on different cycles, and key contract obligations are buried in PDFs. Analysts reconcile sources instead of explaining what changed, and executives need provenance, access control and auditability around every AI interaction.",
    solution:
      "The assistant routes each question to one of nine bounded skills running in Workato, over governed Databricks data sets built from SAP and Salesforce. A private language model gateway interprets the question and explains the results, but never invents them or writes free-form queries. Analytics are read only. Contract intake stores documents and proposes clauses inside a controlled workflow, and every clause waits for a human reviewer.",
    outcomes: [
      "Pipeline compared with billed actuals, with gaps reported and caveats kept",
      "Duplicate customer records grouped into one canonical customer for analysis",
      "Every number traced to its source system, tables, row count and refresh time",
      "Agreements fingerprinted, versioned and turned into candidate clauses with source evidence",
    ],
    boundaries: [
      "Analytics are read only, and neither mode writes to SAP or Salesforce directly",
      "Customer matching is an analytical grouping. No ERP or CRM master record is merged.",
      "Cannot approve clauses or activate compliance rules. Only an authorised reviewer can.",
      "A corrupted file fails cleanly: nothing is stored or activated, and the attempt is audited",
    ],
    technologies: ["workato", "databricks", "sap", "salesforce", "llm"],
    video: youtube("SBJIdZu-n_g", "Contract compliance POC walkthrough", "6:06"),
    walkthrough: [
      {
        time: "0:00",
        title: "Scattered answers",
        detail:
          "Customer identities, pipeline, billing and contract obligations are spread across systems and PDFs, and analysts spend their time reconciling them.",
      },
      {
        time: "0:38",
        title: "The design goal",
        detail: "Make enterprise data conversational without making the AI the system of record.",
      },
      {
        time: "0:46",
        title: "Nine bounded skills",
        detail:
          "Each question goes to a Workato skill over governed Databricks data from SAP and Salesforce. A private model gateway explains results and never writes free-form queries.",
      },
      {
        time: "1:18",
        title: "What the genie covers",
        detail:
          "Recorded on synthetic data: commercial performance, customer identity, data provenance, executive briefing and governed contract intake.",
      },
      {
        time: "1:47",
        title: "Pipeline against billed actuals",
        detail:
          "For one customer, 125,000 in pipeline against zero billed. The genie confirms the zero is a valid value and does not invent a reason.",
      },
      {
        time: "2:26",
        title: "Customer identity",
        detail:
          "Two SAP customer numbers that share a tax ID are resolved to one canonical customer, without merging any master record.",
      },
      {
        time: "3:00",
        title: "Where the numbers come from",
        detail:
          "Source system, billing and material tables, 17,792 rows and a refresh timestamp, with the caveat that a timestamp does not prove a freshness SLA was met.",
      },
      {
        time: "3:24",
        title: "Governed contract intake",
        detail:
          "An uploaded agreement is preserved, fingerprinted with SHA-256 and turned into candidate obligations with source evidence, all pending human review.",
      },
      {
        time: "4:08",
        title: "Duplicates and addendums",
        detail:
          "The same file under a new name is recognised by its hash. An addendum becomes version 2, linked to version 1, with 12 new proposed terms.",
      },
      {
        time: "4:50",
        title: "Holding the approval boundary",
        detail:
          "Asked to approve every clause and activate the rules, the genie refuses: extraction confidence is not approval, and only an authorised reviewer can approve.",
      },
      {
        time: "5:23",
        title: "A controlled failure",
        detail:
          "A corrupted PDF is not stored, produces no clauses and activates nothing. The attempt is audited and the operator gets a clear next step.",
      },
    ],
    publishedAt: "2026-10-19",
    seo: {
      title: "Contract Compliance Genie POC",
      description:
        "Watch the contract compliance proof of concept: bounded Workato skills over SAP and Salesforce data, and contract intake with human approval.",
    },
  },
  {
    slug: "machine-health-monitoring",
    title: "Machine Health Monitoring",
    categories: ["manufacturing"],
    functions: [],
    industries: ["manufacturing"],
    agent: "machine-health-monitoring",
    summary:
      "Learns a baseline for each machine, flags anomalies in telemetry and explains them through a diagnostics assistant.",
    problem:
      "Equipment generates large volumes of telemetry, but early signs of degradation get lost in the noise, and most plants lack the labelled failure data that classic models need.",
    solution:
      "An Isolation Forest model learns normal behaviour for each machine and flags drift. Anomalies are surfaced through APIs, dashboards and a conversational diagnostics agent that drafts work orders for a planner to approve.",
    outcomes: [
      "Earlier anomaly detection",
      "Less unplanned downtime",
      "Better maintenance prioritisation",
      "Faster root-cause investigation",
    ],
    technologies: ["anomaly-detection", "copilot-studio"],
    video: youtube("-nSwc9tDgDg", "Machine health monitoring POC walkthrough", "3:23"),
    presentation: drivePdf("1az5R9vrzar7vpNxG9KBkeJL7PMljKZq0", "Machine health: POC to production blueprint"),
    publishedAt: "2026-10-02",
    seo: {
      title: "Machine Health Monitoring POC",
      description:
        "Watch the machine health proof of concept: per-machine baselines, anomaly detection on telemetry and a diagnostics assistant.",
    },
  },
  {
    slug: "chemistxm",
    title: "ChemistXM: Chemical Structures from Scientific PDFs",
    categories: ["manufacturing"],
    functions: [],
    industries: ["manufacturing"],
    agent: "chemical-document-interpretation",
    summary:
      "Extracts molecular structures from PDFs, generates SMILES and enriches each result for chemist review, keeping the source page.",
    problem:
      "Chemical structures are trapped inside PDFs, reports and customer records. Chemists re-key them by hand, different tools produce different identifiers, and records lose the link to their source page.",
    solution:
      "A PDF dropped in an approved SharePoint folder or attached to a Salesforce record starts a Power Automate flow. A Cloud Run container runs a DECIMER pipeline that finds each structure and generates a candidate SMILES string. RDKit canonicalises and enriches it, and low-confidence results go to a chemist, who accepts, corrects or rejects them.",
    outcomes: [
      "Faster first-pass interpretation of chemical documents",
      "More consistent chemical identifiers",
      "Every structure traceable to its source document and page",
      "Clear review queues, with the chemist making the final call",
    ],
    technologies: ["decimer", "rdkit", "google-cloud", "power-automate", "salesforce", "sharepoint", "smiles"],
    video: youtube("6VA5DrGITuk", "ChemistXM POC walkthrough", "4:27"),
    presentation: drivePdf("1iiBlvwt_ix16rFrAPkvBQSebMhykz34_", "ChemistXM commercial overview"),
    publishedAt: "2026-10-02",
    seo: {
      title: "ChemistXM POC: Structures from Scientific PDFs",
      description:
        "Watch ChemistXM: molecular structures extracted from PDFs, converted to SMILES and enriched with RDKit, ready for chemist review.",
    },
  },
  {
    slug: "ap-vendor-email-assistant",
    title: "AP Vendor Email Assistant",
    categories: ["manufacturing"],
    functions: ["finance"],
    industries: [],
    agent: "ap-vendor-email-assistant",
    summary:
      "Reads vendor emails, checks the sender's access and finds the answer in finance systems, then replies, drafts for AP review or escalates in Teams.",
    problem:
      "Vendor emails eat the AP team's day. Payment status, PO questions, rebates and invoice mismatches each mean someone stops what they are doing and digs through several systems for the answer.",
    solution:
      "Vendors write to a dedicated AP mailbox. The agent interprets each request, including attachments, confirms the sender is entitled to the information and looks up the answer in ERP, payroll or expense systems. You decide how each type of request is handled: an automatic reply for simple requests such as PO status, a draft for the AP team to approve when a payment does not match the invoice, or an escalation in Microsoft Teams for complex cases.",
    outcomes: [
      "Simple requests such as PO status answered without AP involvement",
      "Discrepancy research done before the AP team sees the draft",
      "Vendors answered within the hour, and employees can check expense report status",
      "Consistent responses that scale without additional headcount",
    ],
    boundaries: [
      "Shares information only with senders who have access to it",
      "You choose which requests the agent answers alone and which need a second look",
      "Mismatches, rebate disputes and fraud alerts go to the AP team",
    ],
    technologies: ["workato", "microsoft-teams", "llm"],
    video: youtube("eOhgTBzRsLo", "AP vendor email assistant POC walkthrough", "5:09"),
    walkthrough: [
      {
        time: "0:01",
        title: "Vendor emails eat the day",
        detail: "Payment status, PO questions, rebates and invoice mismatches each send someone digging through systems.",
      },
      {
        time: "0:14",
        title: "How the agent works",
        detail:
          "A vendor emails AP, the agent interprets the request, connects to ERP, payroll or expense systems and takes action.",
      },
      {
        time: "0:37",
        title: "Three types of action",
        detail:
          "Auto-response for simple requests, a draft when you want a second look, and escalation for mismatches, rebate disputes and fraud alerts.",
      },
      {
        time: "1:38",
        title: "What changes",
        detail:
          "Less manual email traffic, faster responses for vendors and employees, access checks on every request and growth without extra headcount.",
      },
      {
        time: "2:36",
        title: "A dedicated mailbox",
        detail: "Vendors are directed to one AP address that the agent monitors.",
      },
      {
        time: "2:50",
        title: "Auto-response: PO details",
        detail:
          "The agent understands the request, confirms the sender has access to the information and replies directly, with no work for the AP team.",
      },
      {
        time: "3:13",
        title: "Draft: payment mismatch",
        detail:
          "The agent finds where the payment and invoice differ, writes the reply and routes it to the AP team, who tweak or approve it before it is sent.",
      },
      {
        time: "3:55",
        title: "Escalation: a misrouted attachment",
        detail:
          "The agent reads an attachment that belongs to another team and posts to the AP team in Teams with its planned response before anything goes out.",
      },
    ],
    publishedAt: "2026-07-17",
    seo: {
      title: "AP Vendor Email Assistant POC",
      description:
        "Watch the AP vendor email proof of concept: vendor emails answered, drafted for AP approval or escalated in Teams, with access checks.",
    },
  },
  {
    slug: "retail-control-plane",
    title: "Retail Control Plane: Demand Sensing and Chase Rebuy",
    categories: ["retail"],
    functions: ["supply-chain"],
    industries: [],
    summary:
      "Senses demand exceptions on a style or SKU, nets the network position and recommends a chase or pullback for planner approval.",
    problem:
      "A demand swing costs retailers margin both ways: stockouts on the styles customers want, or overstock and markdowns in the wrong locations. The decision window is short and the data sits in separate systems.",
    solution:
      "Six governed skills run on an MCP server on Workato, behind one gateway to eight systems of record including Shopify and Salesforce. Demand sensing combines seven signals into one deterministic response. The agent nets store, online, DC, on-order and backorder stock against demand and calculates the chase quantity in plain rules, with no language model in the calculation. Copilot Studio explains the result to the planner, and every write waits for planner approval.",
    outcomes: [
      "The right chase quantity, sourced from the right fulfilment centre",
      "Same inputs always produce the same quantity, explainable line by line",
      "Fewer split shipments and handling touches, and a faster path to the shelf",
      "Every action logged, time-stamped and traceable to the approved recommendation",
    ],
    boundaries: [
      "The model can propose, but only a person can authorise a write to a system of record",
      "The chase quantity is calculated by rules, never by the language model",
      "Routing rules on the MCP server cannot be overridden by the model",
      "One governed gateway, so no system of record is duplicated or bypassed",
    ],
    technologies: ["workato", "copilot-studio", "mulesoft", "shopify", "salesforce", "mcp"],
    video: driveVideo(
      "1fifQIrkJefWcCFYJxwbwdy1AchBnIjhT",
      "Retail Control Plane POC walkthrough",
      "4:08",
      "/images/pocs/retail-control-plane.jpg",
    ),
    walkthrough: [
      {
        time: "0:03",
        title: "Sense, decide, approve, execute, fulfil",
        detail: "A walkthrough of the chase and rebuy agent on the Retail Control Plane, in five steps.",
      },
      {
        time: "0:14",
        title: "What runs underneath",
        detail: "Six governed skills. Demand sensing pulls seven signals together and returns one deterministic response.",
      },
      {
        time: "0:35",
        title: "Rules, not tokens",
        detail:
          "The chase decision is plain rules, with no language model tokens spent on it. Every tool is registered on a governed MCP server with routing rules the model cannot override.",
      },
      {
        time: "0:51",
        title: "One governed gateway",
        detail:
          "A single gateway fronts eight systems of record, including Shopify and Salesforce, so nothing is duplicated and nothing is bypassed.",
      },
      {
        time: "1:07",
        title: "Turn 1: demand for a SKU",
        detail:
          "The planner asks a plain question. The agent returns the forecast: 96 units a week at 82% confidence, healthy trailing sell-through and seasonality running hot.",
      },
      {
        time: "1:32",
        title: "Turn 2: the network position",
        detail:
          "The agent nets store, online and DC stock, on-order and backorder against demand to get true weeks of supply, and recommends a chase of 337 units with its reasoning shown in full.",
      },
      {
        time: "2:10",
        title: "Turn 3: the approval gate",
        detail:
          "The agent shows the action, SKU, quantity and urgency, then stops. Nothing executes until a person says yes.",
      },
      {
        time: "2:43",
        title: "Turn 4: the fulfilment plan",
        detail:
          "Once approved, it recommends where to source from: a New York fulfilment centre with same-day courier and no split shipment.",
      },
      {
        time: "3:10",
        title: "Turn 5: execute and log",
        detail:
          "The order is routed to that centre, and the action is logged, time-stamped and tied to the recommendation the planner approved.",
      },
    ],
    publishedAt: "2026-09-24",
    seo: {
      title: "Retail Control Plane POC: Chase Rebuy Agent",
      description:
        "Watch the Retail Control Plane proof of concept: demand sensing and network-aware chase or pullback, approved by a planner before any action.",
    },
  },
];
