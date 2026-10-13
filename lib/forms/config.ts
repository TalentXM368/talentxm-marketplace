import { agents } from "@/content/agents";
import { deliveryModels } from "@/content/delivery";
import { industries } from "@/content/industries";
import { serviceDomains } from "@/content/services";
import type { FormId } from "@/content/types";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  options?: FieldOption[];
  hint?: string;
  half?: boolean;
}

export interface FormConfig {
  id: FormId;
  submitLabel: string;
  fields: FieldDef[];
}

const nameField: FieldDef = { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name", half: true };
const workEmail: FieldDef = { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true };
const companyField: FieldDef = { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization", half: true };
const roleField: FieldDef = { name: "role", label: "Role", type: "text", autoComplete: "organization-title", half: true };

export const priorityOptions: FieldOption[] = [
  { value: "capability-discovery", label: "Capability discovery: not sure where to start" },
  ...serviceDomains.map((d) => ({ value: `service:${d.slug}`, label: d.name })),
  ...industries.map((i) => ({ value: `industry:${i.slug}`, label: `${i.name} workflows` })),
  { value: "ai-agents", label: "One of the AI agents" },
  { value: "security", label: "Security or programme status" },
];

const timelineOptions: FieldOption[] = [
  { value: "this-quarter", label: "This quarter" },
  { value: "next-quarter", label: "Next quarter" },
  { value: "later", label: "Later this year or beyond" },
  { value: "exploring", label: "Just exploring" },
];

export const formConfigs: Record<FormId, FormConfig> = {
  "F-01": {
    id: "F-01",
    submitLabel: "Discuss your AI priority",
    fields: [
      nameField,
      workEmail,
      companyField,
      roleField,
      { name: "priority", label: "Priority area", type: "select", required: true, options: priorityOptions },
      {
        name: "message",
        label: "What would you like to discuss?",
        type: "textarea",
        required: true,
        hint: "The workflow, the systems involved and what a good outcome looks like.",
      },
    ],
  },
  "F-02": {
    id: "F-02",
    submitLabel: "Request an agent pilot",
    fields: [
      nameField,
      workEmail,
      companyField,
      roleField,
      {
        name: "agent",
        label: "Agent",
        type: "select",
        required: true,
        options: agents.map((a) => ({ value: a.slug, label: a.name })),
      },
      { name: "timeline", label: "Timeline", type: "select", options: timelineOptions },
      {
        name: "systems",
        label: "Systems in use",
        type: "textarea",
        hint: "For example your EHR, ERP, integration platform or Microsoft 365.",
      },
    ],
  },
  "F-03": {
    id: "F-03",
    submitLabel: "Structure my team",
    fields: [
      nameField,
      workEmail,
      companyField,
      {
        name: "model",
        label: "Delivery model",
        type: "select",
        required: true,
        half: true,
        options: [
          ...deliveryModels.map((m) => ({ value: m.slug, label: m.name })),
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      { name: "startWindow", label: "When do you want to start?", type: "select", options: timelineOptions },
      { name: "skills", label: "Skills needed", type: "textarea", hint: "Roles, platforms and seniority." },
    ],
  },
  "F-04": {
    id: "F-04",
    submitLabel: "Request early access",
    fields: [
      nameField,
      workEmail,
      { ...companyField, half: false },
      { name: "hiringNeeds", label: "Hiring needs", type: "textarea", hint: "Roles, volume and timing." },
    ],
  },
  "F-05": {
    id: "F-05",
    submitLabel: "Join the talent network",
    fields: [
      nameField,
      { ...workEmail, label: "Email" },
      {
        name: "region",
        label: "Region",
        type: "select",
        required: true,
        half: true,
        options: [
          { value: "us", label: "United States" },
          { value: "latam", label: "Latin America" },
          { value: "india", label: "India" },
          { value: "other", label: "Elsewhere" },
        ],
      },
      {
        name: "availability",
        label: "Availability",
        type: "select",
        half: true,
        options: [
          { value: "now", label: "Available now" },
          { value: "1-3-months", label: "In 1–3 months" },
          { value: "open", label: "Open to the right role" },
        ],
      },
      { name: "skills", label: "Primary skills", type: "text", required: true, hint: "For example Workato, SAP FI, Python, FHIR." },
      { name: "linkedin", label: "LinkedIn profile URL", type: "url", autoComplete: "url" },
    ],
  },
};
