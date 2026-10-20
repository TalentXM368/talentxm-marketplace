// Content model for Phase 1. Field names mirror the Sanity schemas in the
// Architecture & Sitemap doc (A4) so the move to a CMS is a data swap.

export type IconName =
  | "layers"
  | "database"
  | "sparkles"
  | "shield"
  | "server"
  | "users"
  | "heart-pulse"
  | "factory"
  | "receipt"
  | "calendar"
  | "pill"
  | "activity"
  | "flask"
  | "mail"
  | "workflow"
  | "compass"
  | "target"
  | "handshake"
  | "globe"
  | "file-check"
  | "badge-check"
  | "clipboard"
  | "graduation"
  | "lightbulb"
  | "clock"
  | "repeat"
  | "wrench"
  | "building"
  | "lock"
  | "eye"
  | "scale";

/** Requires at least N items, so content rules from A4 are checked by the compiler. */
export type AtLeastOne<T> = [T, ...T[]];
export type AtLeastTwo<T> = [T, T, ...T[]];
export type AtLeastThree<T> = [T, T, T, ...T[]];

export interface Seo {
  /** 60 characters or fewer, without the " | TalentXM" suffix. */
  title: string;
  /** 155 characters or fewer. */
  description: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type EvidenceLevel = "tested" | "designed" | "experience";

export interface TechTag {
  category: "platform" | "integration" | "ai" | "standard";
  name: string;
  evidenceLevel: EvidenceLevel;
}

export type IndustrySlug = "healthcare" | "manufacturing";

export type FormId = "F-01" | "F-02" | "F-03" | "F-04" | "F-05";

export interface Capability {
  name: string;
  anchor: string;
  description: string;
}

export interface ServiceDomain {
  slug: string;
  name: string;
  /** Mega-menu column heading. */
  menuLabel: string;
  icon: IconName;
  /** Position in the Enterprise AI stack, 1 = foundation. */
  stackLayer: 1 | 2 | 3 | 4 | 5;
  summary: string;
  hero: { eyebrow: string; title: string; lede: string };
  stackPosition: string;
  capabilities: AtLeastThree<Capability>;
  platforms: TechTag[];
  connectsToAi: string;
  relatedAgents: string[];
  relatedIndustries: IndustrySlug[];
  deliveryModels: string[];
  faqs: Faq[];
  primaryForm: Extract<FormId, "F-01" | "F-03">;
  seo: Seo;
}

export type AgentStatus = "available" | "pilot" | "validated-poc" | "concept";

export type AgentType = "AI Agent" | "ML Model + assistant" | "Solution Accelerator";

export interface HumanDecisionPoint {
  step: string;
  who: string;
  why: string;
}

export interface VideoAsset {
  title: string;
  /** YouTube or Vimeo embed URL. */
  embedUrl: string;
  thumbnail: string;
  duration?: string;
}

export interface Agent {
  slug: string;
  name: string;
  agentType: AgentType;
  status: AgentStatus;
  statusEvidence: string;
  icon: IconName;
  /** Empty for cross-industry agents. */
  industries: IndustrySlug[];
  businessFunction: string;
  outcomeLine: string;
  summary: string;
  intendedUser: string;
  inputs: string[];
  actions: AtLeastThree<string>;
  doesNot: AtLeastTwo<string>;
  currentWorkflow: AtLeastTwo<string>;
  assistedWorkflow: AtLeastTwo<string>;
  humanDecisionPoints: AtLeastOne<HumanDecisionPoint>;
  securityControls: string[];
  evaluationMeasures: string[];
  techTags: TechTag[];
  deploymentOptions: string[];
  demoVideo?: VideoAsset;
  faqs: Faq[];
  seo: Seo;
}

export interface UseCaseRow {
  workflow: string;
  status: AgentStatus;
  systems: string;
  control: string;
  deliveryModel: string;
  measures: string;
  /** POC slugs that demonstrate this workflow. */
  pocs?: string[];
}

export interface Industry {
  slug: IndustrySlug;
  name: string;
  icon: IconName;
  image: string;
  summary: string;
  hero: { eyebrow: string; title: string; lede: string };
  useCaseIntro: string;
  useCaseRows: AtLeastOne<UseCaseRow>;
  featuredAgents: string[];
  standards: string[];
  notClaimed: AtLeastOne<string>;
  pod: { lead: string; roles: string[]; note: string };
  faqs: Faq[];
  seo: Seo;
}

export interface DeliveryModel {
  slug: string;
  name: string;
  group: "talent-led" | "outcome-led";
  icon: IconName;
  buyerNeed: string;
  ownership: string;
  description: string;
}

export interface TrustItem {
  statement: string;
  detail: string;
  state: "held" | "in-progress";
  /** ISO date. Must be reviewed within 90 days. */
  reviewedAt: string;
}

export type EvidenceLabel = "Validated POC" | "Client Outcome" | "Internal Build";

export interface EvidenceItem {
  slug: string;
  title: string;
  label: EvidenceLabel;
  agent: string;
  summary: string;
  validationSummary: string;
  engagementModel: string;
  poc?: string;
}

/** Industry folders in the POC Drive library. */
export type PocCategorySlug = "healthcare" | "financial-services" | "manufacturing" | "retail";

/** Folders under "Business Functions" in the POC Drive library. */
export type BusinessFunctionSlug =
  | "customer-service"
  | "finance"
  | "human-resources"
  | "marketing"
  | "procurement"
  | "recruiting"
  | "sales"
  | "supply-chain";

export interface PocCategory {
  slug: PocCategorySlug;
  name: string;
  icon: IconName;
}

export interface BusinessFunction {
  slug: BusinessFunctionSlug;
  name: string;
}

export interface Technology {
  slug: string;
  name: string;
  group: TechTag["category"];
}

export interface PresentationAsset {
  title: string;
  /** Google Slides /embed or Drive /preview URL. */
  embedUrl: string;
  /** Where "Open presentation" goes. */
  openUrl: string;
}

export interface VideoMoment {
  time: string;
  title: string;
  detail: string;
}

export interface Poc {
  slug: string;
  title: string;
  categories: AtLeastOne<PocCategorySlug>;
  functions: BusinessFunctionSlug[];
  /** Links the POC to the industry pages. */
  industries: IndustrySlug[];
  /** Agent slug, when the POC demonstrates a catalogue agent. */
  agent?: string;
  summary: string;
  problem: string;
  solution: string;
  outcomes: AtLeastOne<string>;
  /** What the POC deliberately does not do, as stated in the video or deck. */
  boundaries?: string[];
  /** Technology slugs from content/pocs.ts. */
  technologies: AtLeastOne<string>;
  video: VideoAsset;
  /** Key moments in the video, written from its transcript. `time` is m:ss. */
  walkthrough?: AtLeastOne<VideoMoment>;
  presentation?: PresentationAsset;
  /** ISO date the video was published. */
  publishedAt: string;
  seo: Seo;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  heading: string;
  href: string;
  links: NavLink[];
}

export interface Testimonial {
  quote: string;
  role: string;
  organisation: string;
  /** Recorded permission to publish. Required before the quote can render. */
  permissionRecord: string;
}

export interface ClientLogo {
  name: string;
  src: string;
  permissionRecord: string;
}

export interface Stat {
  value: string;
  label: string;
  source: string;
}
