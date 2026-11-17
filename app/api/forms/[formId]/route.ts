import { formMeta, formSchemas, isFormId } from "@/lib/forms/schemas";
import { createZohoLead } from "@/lib/forms/zoho";

// F-01…F-05. Validates the payload; CRM forms (F-01…F-04) create a Lead in TalentXM's Zoho CRM (lib/forms/zoho.ts).
// Still to add (Architecture A5): a Turnstile check against spam, and Zoho Recruit for F-05.
export async function POST(request: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  if (!isFormId(formId)) {
    return Response.json({ ok: false, error: "unknown_form" }, { status: 404 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return Response.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = formSchemas[formId].safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation_failed", fields: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 422 },
    );
  }

  // Honeypot filled: accept silently so bots get no signal.
  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  if (formMeta[formId].destination === "crm") {
    const result = await createZohoLead(formId, parsed.data);
    if (result.ok) {
      console.info(`[forms] ${formId} created Zoho lead ${result.leadId}`);
      return Response.json({ ok: true });
    }
    if (result.reason === "not_configured" && process.env.NODE_ENV !== "production") {
      console.warn(`[forms] ${formId} accepted but not sent: the ZOHO_* variables are not set (see lib/forms/zoho.ts)`);
      return Response.json({ ok: true });
    }
    // The visitor sees the "could not send" message with the email address, so the request is not lost silently.
    return Response.json({ ok: false, error: result.reason }, { status: result.reason === "not_configured" ? 503 : 502 });
  }

  // F-05 (talent network) goes to Zoho Recruit, which is not connected yet; its form stays hidden until formsLive.
  console.info(`[forms] ${formId} (${formMeta[formId].name}) accepted from ${parsed.data.sourcePage || "unknown page"}`);
  return Response.json({ ok: true });
}
