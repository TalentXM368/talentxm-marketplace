import { z } from "zod";
import type { FormId } from "@/content/types";

// F-01…F-05 field rules (Architecture S5). Shared by the client forms and /api/forms/[formId].

const name = z.string().trim().min(2, "Enter your name").max(120);
const workEmail = z.string().trim().email("Enter a valid work email").max(200);
const email = z.string().trim().email("Enter a valid email").max(200);
const company = z.string().trim().min(2, "Enter your company").max(160);
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const consent = z.literal(true, { message: "Please agree so we can reply to you" });

const base = {
  consent,
  sourcePage: optionalText(200),
  // Honeypot. Real visitors leave it empty.
  website: z.string().max(0).optional().or(z.literal("")),
};

export const formSchemas = {
  "F-01": z.object({
    name,
    email: workEmail,
    company,
    role: optionalText(120),
    priority: z.string().min(1, "Choose a priority area"),
    message: z.string().trim().min(10, "Tell us a little more (10 characters or more)").max(4000),
    ...base,
  }),
  "F-02": z.object({
    name,
    email: workEmail,
    company,
    role: optionalText(120),
    agent: z.string().min(1, "Choose an agent"),
    systems: optionalText(500),
    timeline: optionalText(60),
    ...base,
  }),
  "F-03": z.object({
    name,
    email: workEmail,
    company,
    model: z.string().min(1, "Choose a delivery model"),
    skills: optionalText(1000),
    startWindow: optionalText(60),
    ...base,
  }),
  "F-04": z.object({
    name,
    email: workEmail,
    company,
    hiringNeeds: optionalText(1000),
    ...base,
  }),
  "F-05": z.object({
    name,
    email,
    skills: z.string().trim().min(2, "List your primary skills").max(500),
    region: z.string().min(1, "Choose your region"),
    linkedin: z
      .string()
      .trim()
      .url("Enter a full URL, starting with https://")
      .max(300)
      .optional()
      .or(z.literal("")),
    availability: optionalText(60),
    ...base,
  }),
} satisfies Record<FormId, z.ZodTypeAny>;

export type FormValues<T extends FormId> = z.input<(typeof formSchemas)[T]>;

export function isFormId(value: string): value is FormId {
  return value in formSchemas;
}

export const formMeta: Record<FormId, { name: string; destination: string }> = {
  "F-01": { name: "Discuss Your AI Priority", destination: "crm" },
  "F-02": { name: "Request an Agent Pilot", destination: "crm" },
  "F-03": { name: "Structure My Team", destination: "crm" },
  "F-04": { name: "Employer Early Access", destination: "crm" },
  "F-05": { name: "Join Talent Network", destination: "recruit" },
};
