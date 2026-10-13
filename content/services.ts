import type { ServiceDomain } from "./types";

// P-03…P-07. Capability anchors follow the S3 mega-menu items.
// Platform tags: evidence levels need confirmation with the delivery lead (CONTENT-TODO.md).

export const serviceDomains: ServiceDomain[] = [
  {
    slug: "enterprise-platforms",
    name: "Enterprise Platforms",
    menuLabel: "Enterprise Platforms",
    icon: "layers",
    stackLayer: 2,
    summary:
      "Implementation, extension and support for the systems of record your business runs on: ERP, HCM, CRM, EHR and MES.",
    hero: {
      eyebrow: "Services · Enterprise Platforms",
      title: "Make the systems of record ready for AI.",
      lede: "AI is only as useful as the platforms it reads from and writes to. We implement, extend and stabilise ERP, HCM, CRM, EHR and MES so the data is clean and the workflows have a place for automation to live.",
    },
    stackPosition:
      "Enterprise platforms sit just above the cloud foundation. They hold the records that every agent, report and integration depends on.",
    capabilities: [
      {
        name: "ERP",
        anchor: "erp",
        description:
          "Finance, procurement and supply processes on SAP S/4HANA and other ERPs, including the vendor and accounts payable flows that AI assistance touches first.",
      },
      {
        name: "HCM",
        anchor: "hcm",
        description:
          "Workforce, payroll and onboarding configuration, with the data hygiene needed before any employment-related automation is considered.",
      },
      {
        name: "CRM",
        anchor: "crm",
        description:
          "Lead, account and service processes in Zoho CRM and comparable platforms, built so sales and service teams trust what they see.",
      },
      {
        name: "EHR",
        anchor: "ehr",
        description:
          "Scheduling, registration and clinical operations workflows around the EHR, using sandbox and API access where the vendor supports it.",
      },
      {
        name: "MES",
        anchor: "mes",
        description:
          "Shop-floor execution, quality records and maintenance systems, connected to the asset and engineering data that sits beside them.",
      },
    ],
    platforms: [
      { category: "platform", name: "SAP S/4HANA", evidenceLevel: "designed" },
      { category: "platform", name: "SAP Ariba", evidenceLevel: "designed" },
      { category: "platform", name: "Zoho CRM", evidenceLevel: "experience" },
      { category: "platform", name: "athenahealth", evidenceLevel: "designed" },
      { category: "platform", name: "CMMS", evidenceLevel: "designed" },
    ],
    connectsToAi:
      "Every agent we have validated reads from or writes back to one of these platforms. Getting permissions, field mappings and audit trails right here is what makes an AI pilot safe to extend.",
    relatedAgents: ["ap-vendor-email-assistant", "schedulexm", "machine-health-monitoring"],
    relatedIndustries: ["healthcare", "manufacturing"],
    deliveryModels: ["capability-pod", "project-delivery"],
    faqs: [
      {
        q: "Do you replace our current platform?",
        a: "Rarely. Most work is extending and stabilising what you already run so that integration and AI work has a reliable base.",
      },
      {
        q: "Can you work inside our vendor's sandbox?",
        a: "Yes. We prefer to build and test against a sandbox or non-production tenant before anything touches live records.",
      },
      {
        q: "Who owns the configuration when the engagement ends?",
        a: "You do. Configuration, documentation and runbooks are handed over as part of every engagement.",
      },
    ],
    primaryForm: "F-01",
    seo: {
      title: "Enterprise Platforms: ERP, HCM, CRM, EHR, MES",
      description:
        "Implementation and extension of ERP, HCM, CRM, EHR and MES platforms, prepared for integration and AI-assisted workflows.",
    },
  },
  {
    slug: "data-integration",
    name: "Data & Integration",
    menuLabel: "Data & Integration",
    icon: "database",
    stackLayer: 3,
    summary:
      "Data engineering, enterprise integration and interoperability that move the right data between systems, on time and with a record of what happened.",
    hero: {
      eyebrow: "Services · Data & Integration",
      title: "Connect the systems before you automate them.",
      lede: "Most AI projects stall on integration, not on models. We design and build the pipelines, recipes and interfaces that let platforms share data reliably, with monitoring your team can read.",
    },
    stackPosition:
      "Data and integration is the layer between your platforms and anything intelligent. It decides what an agent can see and what it is allowed to change.",
    capabilities: [
      {
        name: "Data Engineering",
        anchor: "data-engineering",
        description:
          "Pipelines, transformations and quality checks that turn operational data into something analytics and AI can use.",
      },
      {
        name: "Enterprise Integration",
        anchor: "enterprise-integration",
        description:
          "Workato recipes, n8n workflows and API integrations with error handling, retries and alerting built in from the first sprint.",
      },
      {
        name: "Interoperability",
        anchor: "interoperability",
        description:
          "Healthcare and industrial standards such as X12 270/271 and FHIR, mapped carefully between systems that were never designed to talk.",
      },
      {
        name: "Data Architecture",
        anchor: "data-architecture",
        description:
          "Models, ownership and retention rules for the data your integrations and agents depend on.",
      },
    ],
    platforms: [
      { category: "integration", name: "Workato", evidenceLevel: "tested" },
      { category: "integration", name: "n8n", evidenceLevel: "experience" },
      { category: "integration", name: "AWS", evidenceLevel: "experience" },
      { category: "standard", name: "X12 270/271", evidenceLevel: "tested" },
      { category: "standard", name: "FHIR", evidenceLevel: "experience" },
    ],
    connectsToAi:
      "Agents call integrations, not databases. Each validated agent on this site runs through an integration layer that logs the call, limits the scope and can be switched off.",
    relatedAgents: ["eligibility-verification", "ap-vendor-email-assistant"],
    relatedIndustries: ["healthcare", "manufacturing"],
    deliveryModels: ["capability-pod", "project-delivery", "managed-service"],
    faqs: [
      {
        q: "Are you a Workato partner?",
        a: "Yes. TalentXM is a Workato Silver Partner, and we also build on n8n and native cloud services where they fit better.",
      },
      {
        q: "How do you handle integration failures?",
        a: "Every integration we ship has retries, alerting and a clear owner. Failures are visible to your team, not buried in logs.",
      },
      {
        q: "Can you take over integrations another partner built?",
        a: "Yes. We start with a review of what exists, document it and agree what to keep, fix or rebuild.",
      },
    ],
    primaryForm: "F-01",
    seo: {
      title: "Data & Integration Services",
      description:
        "Data engineering, Workato and n8n integration, and healthcare interoperability that give your platforms and AI agents reliable data.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    menuLabel: "AI & Automation",
    icon: "sparkles",
    stackLayer: 4,
    summary:
      "Enterprise AI, agentic workflows, machine learning and intelligent automation, scoped to a real workflow with a person in charge of each decision.",
    hero: {
      eyebrow: "Services · AI & Automation",
      title: "AI that fits into the workflow your team already runs.",
      lede: "We start from one workflow and one measurable outcome. Then we decide whether it needs an agent, a model, a rule or nothing at all, and we design where people stay in control.",
    },
    stackPosition:
      "AI and automation sit on top of clean platforms and governed integrations. Without those layers, an agent has nothing reliable to act on.",
    capabilities: [
      {
        name: "Enterprise AI",
        anchor: "enterprise-ai",
        description:
          "Assistants and retrieval over your own documents and records, deployed in tools such as Microsoft Copilot Studio and Teams.",
      },
      {
        name: "Agentic AI",
        anchor: "agentic-ai",
        description:
          "Agents that take bounded actions across systems, with explicit human decision points and an audit trail for every step.",
      },
      {
        name: "Machine Learning",
        anchor: "machine-learning",
        description:
          "Anomaly detection and classification models trained on your operational data, with evaluation measures agreed up front.",
      },
      {
        name: "Intelligent Automation",
        anchor: "intelligent-automation",
        description:
          "Document reading, routing and rule-based automation for work that is repetitive but still needs a reviewer.",
      },
    ],
    platforms: [
      { category: "ai", name: "Microsoft Copilot Studio", evidenceLevel: "tested" },
      { category: "ai", name: "Anthropic Claude", evidenceLevel: "experience" },
      { category: "ai", name: "Anomaly detection", evidenceLevel: "tested" },
      { category: "integration", name: "Microsoft Teams", evidenceLevel: "tested" },
    ],
    connectsToAi:
      "This is where the AI agents catalogue comes from. Each agent began as an AI and automation engagement scoped to a single workflow.",
    relatedAgents: [
      "eligibility-verification",
      "machine-health-monitoring",
      "chemical-document-interpretation",
      "ap-vendor-email-assistant",
    ],
    relatedIndustries: ["healthcare", "manufacturing"],
    deliveryModels: ["capability-pod", "project-delivery"],
    faqs: [
      {
        q: "Where do we start?",
        a: "With a capability discovery: one workflow, its current cost, the systems it touches and what a good outcome looks like.",
      },
      {
        q: "Which model provider do you use?",
        a: "It depends on your platform, data and policy. We have built on Microsoft Copilot Studio and on Anthropic models, and we design so the provider can change.",
      },
      {
        q: "How do you keep people in control?",
        a: "Every agent has named human decision points. The agent prepares and recommends; a person approves anything that changes a record or reaches a customer.",
      },
    ],
    primaryForm: "F-01",
    seo: {
      title: "AI & Automation Services",
      description:
        "Enterprise AI, agentic workflows, machine learning and intelligent automation, scoped to one workflow with people in control.",
    },
  },
  {
    slug: "cloud-cybersecurity",
    name: "Cloud & Cybersecurity",
    menuLabel: "Cloud & Cybersecurity",
    icon: "shield",
    stackLayer: 1,
    summary:
      "Cloud engineering, security, identity and AI governance that give every other layer a foundation your security team can sign off.",
    hero: {
      eyebrow: "Services · Cloud & Cybersecurity",
      title: "A foundation your security team will approve.",
      lede: "AI raises new questions about access, data residency and accountability. We build the cloud and identity foundation, and the governance, that let you answer them before a pilot goes wider.",
    },
    stackPosition:
      "Cloud and cybersecurity is the foundation of the stack. Identity, network and governance decisions here limit what every layer above can do.",
    capabilities: [
      {
        name: "Cloud Engineering",
        anchor: "cloud-engineering",
        description:
          "Landing zones, environments and infrastructure as code on AWS and Azure, with separate development, staging and production from day one.",
      },
      {
        name: "Cybersecurity",
        anchor: "cybersecurity",
        description:
          "Security reviews, hardening and monitoring for the applications and integrations we deliver and the ones we inherit.",
      },
      {
        name: "Identity & Access",
        anchor: "identity-access",
        description:
          "Single sign-on, least-privilege roles and service accounts scoped so agents and integrations only reach what they need.",
      },
      {
        name: "AI Governance",
        anchor: "ai-governance",
        description:
          "Use policies, risk reviews and evaluation records aligned with GDPR, India's DPDP Act, the EU AI Act and NYC Local Law 144 where they apply.",
      },
    ],
    platforms: [
      { category: "platform", name: "AWS", evidenceLevel: "experience" },
      { category: "platform", name: "Microsoft Azure", evidenceLevel: "experience" },
      { category: "standard", name: "GDPR", evidenceLevel: "experience" },
      { category: "standard", name: "EU AI Act", evidenceLevel: "experience" },
    ],
    connectsToAi:
      "Agent permissions are identity decisions. The governance records produced here are the ones a risk or compliance reviewer asks for before an agent leaves pilot.",
    relatedAgents: ["eligibility-verification", "machine-health-monitoring"],
    relatedIndustries: ["healthcare", "manufacturing"],
    deliveryModels: ["project-delivery", "managed-service"],
    faqs: [
      {
        q: "Do you hold security certifications?",
        a: "Our current trust status, including what is held today and what is in progress, is listed on the Trust page and reviewed every 90 days.",
      },
      {
        q: "Can you work inside our existing cloud tenancy?",
        a: "Yes. We work in your accounts with roles you control, so access can be reviewed and removed at any time.",
      },
      {
        q: "What does AI governance include?",
        a: "A use policy, a register of AI systems, risk reviews for each use case and evaluation records your auditors can read.",
      },
    ],
    primaryForm: "F-01",
    seo: {
      title: "Cloud & Cybersecurity Services",
      description:
        "Cloud engineering, cybersecurity, identity and AI governance that give your AI and integration work a foundation security teams approve.",
    },
  },
  {
    slug: "managed-services",
    name: "Managed Services",
    menuLabel: "Operate & Scale",
    icon: "server",
    stackLayer: 5,
    summary:
      "Run and improve what has been built: managed services, flexible talent, capability pods and dedicated teams with clear ownership.",
    hero: {
      eyebrow: "Services · Operate & Scale",
      title: "Keep it running after the launch.",
      lede: "Integrations drift, platforms upgrade and agents need evaluation. We operate what we build, or what you already run, with a named lead and service levels you agree up front.",
    },
    stackPosition:
      "Managed services wrap the whole stack. They are how platforms, integrations and agents keep working after the project team moves on.",
    capabilities: [
      {
        name: "Managed Services",
        anchor: "managed-services",
        description:
          "Monitoring, incident handling, upgrades and small changes for platforms, integrations and agents, run against agreed service levels.",
      },
      {
        name: "Flexible Talent",
        anchor: "flexible-talent",
        description:
          "Specialists added to your team for a defined period, from a single engineer to a part-time architect.",
      },
      {
        name: "Capability Pods",
        anchor: "capability-pods",
        description:
          "A senior lead plus a small execution team that owns a capability, such as integration or AI evaluation, end to end.",
      },
      {
        name: "Dedicated Teams",
        anchor: "dedicated-teams",
        description:
          "A longer-running team across the US, LATAM and India that works as an extension of your own.",
      },
    ],
    platforms: [
      { category: "integration", name: "Workato", evidenceLevel: "tested" },
      { category: "integration", name: "n8n", evidenceLevel: "experience" },
      { category: "platform", name: "Zoho", evidenceLevel: "experience" },
    ],
    connectsToAi:
      "Agents need ongoing evaluation, prompt and rule changes, and someone accountable when behaviour drifts. Managed services include that work.",
    relatedAgents: ["ap-vendor-email-assistant", "eligibility-verification"],
    relatedIndustries: ["healthcare", "manufacturing"],
    deliveryModels: ["staff-augmentation", "capability-pod", "dedicated-team", "managed-service"],
    faqs: [
      {
        q: "Can you manage systems another partner built?",
        a: "Yes. We start with a handover review, document what exists and agree service levels before taking ownership.",
      },
      {
        q: "How is a managed service different from a pod?",
        a: "A pod owns a capability and delivers change. A managed service keeps an agreed scope running against service levels. Many clients use both.",
      },
      {
        q: "Where are your teams located?",
        a: "Delivery runs across the US, LATAM and India, so coverage can follow your working hours.",
      },
    ],
    primaryForm: "F-03",
    seo: {
      title: "Managed Services, Pods & Dedicated Teams",
      description:
        "Managed services, flexible talent, capability pods and dedicated teams that operate and improve your platforms, integrations and agents.",
    },
  },
];

export function getServiceDomain(slug: string) {
  return serviceDomains.find((d) => d.slug === slug);
}

/** Stack order for the Enterprise AI stack diagram, foundation last. */
export function domainsByStack() {
  return [...serviceDomains].sort((a, b) => b.stackLayer - a.stackLayer);
}
