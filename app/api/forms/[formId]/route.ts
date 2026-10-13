import { formMeta, formSchemas, isFormId } from "@/lib/forms/schemas";

// Phase 1 stub for F-01…F-05. It validates and acknowledges; nothing leaves the server yet.
// Phase 1 integration (Architecture A5): Turnstile check, Supabase outbox row, signed n8n webhook.
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

  console.info(`[forms] ${formId} (${formMeta[formId].name}) accepted from ${parsed.data.sourcePage || "unknown page"}`);
  return Response.json({ ok: true });
}
