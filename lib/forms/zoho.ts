import type { FormId } from "@/content/types";
import { formConfigs } from "@/lib/forms/config";
import { formMeta } from "@/lib/forms/schemas";

// Creates a Lead in TalentXM's Zoho CRM from a website form (F-01…F-04).
// Server only: imported by app/api/forms/[formId]/route.ts, never by a client component.
//
// Environment (Vercel → Settings → Environment Variables; .env.local for `next dev`):
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN  from the TalentXM Self Client in api-console.zoho.com
//   ZOHO_ACCOUNTS_URL  optional, the accounts server of the org's data centre (default https://accounts.zoho.com)
//   ZOHO_LEAD_SOURCE   optional, Lead Source value (default "Website Form")
//   ZOHO_LEAD_STATUS   optional, Lead Status value (default "New")
//   ZOHO_LEAD_OWNER_ID optional, Zoho user ID of the Lead Owner (default: the user who authorised the Self Client)
// If Zoho rejects one of these three (a picklist value or user that does not exist), the lead is created without it
// and the reason is logged, so a visitor's request is never lost over a CRM setting.

const accountsUrl = () => (process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com").replace(/\/+$/, "");
const timeout = () => AbortSignal.timeout(10_000);

export type LeadResult = { ok: true; leadId: string } | { ok: false; reason: "not_configured" | "crm_error" };

export function zohoConfigured(): boolean {
  return Boolean(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN);
}

// Access tokens last an hour and Zoho limits how often a refresh token can be exchanged,
// so one token is kept per server instance and concurrent requests share one refresh.
type ZohoAuth = { token: string; apiDomain: string; expiresAt: number };
let cached: ZohoAuth | null = null;
let refreshing: Promise<ZohoAuth | null> | null = null;

async function accessToken(force = false): Promise<ZohoAuth | null> {
  if (!force && cached && cached.expiresAt > Date.now() + 60_000) return cached;
  refreshing ??= (async (): Promise<ZohoAuth | null> => {
    try {
      const res = await fetch(`${accountsUrl()}/oauth/v2/token`, {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: process.env.ZOHO_REFRESH_TOKEN ?? "",
          client_id: process.env.ZOHO_CLIENT_ID ?? "",
          client_secret: process.env.ZOHO_CLIENT_SECRET ?? "",
        }),
        signal: timeout(),
      });
      const body = (await res.json().catch(() => ({}))) as {
        access_token?: string;
        api_domain?: string;
        expires_in?: number;
        error?: string;
      };
      if (!res.ok || !body.access_token) {
        console.error(`[forms] Zoho token refresh failed: ${res.status} ${body.error ?? ""}`.trim());
        cached = null;
        return null;
      }
      cached = {
        token: body.access_token,
        apiDomain: (body.api_domain || "https://www.zohoapis.com").replace(/\/+$/, ""),
        expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
      };
      return cached;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

const coreFields = new Set(["name", "email", "company", "role", "consent", "sourcePage", "website"]);

/** The answers that have no Lead field of their own, as "Label: answer" lines, with select values shown by label. */
function describe(formId: FormId, values: Record<string, unknown>): string {
  const lines = [`Website form: ${formMeta[formId].name} (${formId})`];
  if (values.sourcePage) lines.push(`Page: ${String(values.sourcePage)}`);
  lines.push("");
  for (const field of formConfigs[formId].fields) {
    if (coreFields.has(field.name)) continue;
    const raw = String(values[field.name] ?? "").trim();
    if (!raw) continue;
    const shown = field.options?.find((o) => o.value === raw)?.label ?? raw;
    lines.push(field.type === "textarea" ? `\n${field.label}\n${shown}\n` : `${field.label}: ${shown}`);
  }
  lines.push("", "Consent to be contacted: yes");
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, 30_000);
}

function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { First_Name: undefined, Last_Name: parts[0] ?? "Unknown" };
  return { First_Name: parts.slice(0, -1).join(" ").slice(0, 40), Last_Name: parts.at(-1)!.slice(0, 80) };
}

const optionalFields = new Set(["Lead_Source", "Lead_Status", "Owner"]);

type InsertResult = { kind: "ok"; id: string } | { kind: "unauthorised" } | { kind: "rejected"; status: number; code: string; field: string } | { kind: "failed" };

async function insertLead(auth: ZohoAuth, lead: Record<string, unknown>): Promise<InsertResult> {
  try {
    const res = await fetch(`${auth.apiDomain}/crm/v8/Leads`, {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${auth.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ data: [lead] }),
      signal: timeout(),
    });
    if (res.status === 401) return { kind: "unauthorised" };
    const body = (await res.json().catch(() => ({}))) as {
      data?: { status?: string; code?: string; details?: { id?: string; api_name?: string } }[];
      code?: string;
      details?: { api_name?: string };
    };
    const row = body.data?.[0];
    if (res.ok && row?.status === "success" && row.details?.id) return { kind: "ok", id: row.details.id };
    return {
      kind: "rejected",
      status: res.status,
      code: row?.code ?? body.code ?? "",
      field: row?.details?.api_name ?? body.details?.api_name ?? "",
    };
  } catch {
    return { kind: "failed" };
  }
}

export async function createZohoLead(formId: FormId, values: Record<string, unknown>): Promise<LeadResult> {
  if (!zohoConfigured()) return { ok: false, reason: "not_configured" };

  const lead: Record<string, unknown> = {
    ...splitName(String(values.name ?? "")),
    Email: String(values.email ?? ""),
    Company: String(values.company ?? "").slice(0, 200) || undefined,
    Designation: String(values.role ?? "").slice(0, 100) || undefined,
    Description: describe(formId, values),
    Lead_Source: process.env.ZOHO_LEAD_SOURCE || "Website Form",
    Lead_Status: process.env.ZOHO_LEAD_STATUS || "New",
  };
  if (process.env.ZOHO_LEAD_OWNER_ID) lead.Owner = { id: process.env.ZOHO_LEAD_OWNER_ID };

  let refreshed = false;
  // At most: one token refresh plus dropping each optional field once.
  for (let tries = 0; tries < 5; tries++) {
    const auth = await accessToken(refreshed);
    if (!auth) return { ok: false, reason: "crm_error" };
    const result = await insertLead(auth, lead);

    if (result.kind === "ok") return { ok: true, leadId: result.id };
    if (result.kind === "unauthorised" && !refreshed) {
      refreshed = true;
      continue;
    }
    if (result.kind === "rejected" && optionalFields.has(result.field) && result.field in lead) {
      console.warn(`[forms] Zoho rejected ${result.field} (${result.code}); creating the ${formId} lead without it`);
      delete lead[result.field];
      continue;
    }
    console.error(
      result.kind === "rejected"
        ? `[forms] Zoho rejected the ${formId} lead: ${result.status} ${result.code} ${result.field}`.trim()
        : `[forms] Zoho request for ${formId} failed (${result.kind})`,
    );
    return { ok: false, reason: "crm_error" };
  }
  return { ok: false, reason: "crm_error" };
}
