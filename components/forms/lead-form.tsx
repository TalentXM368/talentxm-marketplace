"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import type { FormId } from "@/content/types";
import { formConfigs, type FieldDef } from "@/lib/forms/config";
import { formSchemas } from "@/lib/forms/schemas";
import { cn } from "@/lib/cn";

type Values = Record<string, string | boolean | undefined>;
type Status = "idle" | "submitting" | "success" | "error";

/** FormShell for F-01…F-05: fields, consent, error summary and success panel (Architecture S5). */
export function LeadForm({
  formId,
  sourcePage,
  defaults,
  successNote,
}: {
  formId: FormId;
  sourcePage: string;
  defaults?: Record<string, string>;
  successNote?: React.ReactNode;
}) {
  const config = formConfigs[formId];
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [invalidAttempts, setInvalidAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(formSchemas[formId]) as unknown as Resolver<Values>,
    defaultValues: {
      ...Object.fromEntries(config.fields.map((f) => [f.name, ""])),
      ...defaults,
      consent: false,
      sourcePage,
      website: "",
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (invalidAttempts > 0) summaryRef.current?.focus();
  }, [invalidAttempts]);

  const onInvalid = (errs: FieldErrors<Values>) => {
    if (Object.keys(errs).length === 0) return;
    setShowSummary(true);
    setInvalidAttempts((n) => n + 1);
  };

  const onSubmit = async (values: Values) => {
    setShowSummary(false);
    setStatus("submitting");
    try {
      const res = await fetch(`/api/forms/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 outline-none"
      >
        <CircleCheck className="h-8 w-8 text-emerald-700" aria-hidden="true" />
        <p className="mt-4 text-xl font-bold text-txm-ink">Thank you — a named person will reply.</p>
        {successNote && <div className="txm-body mt-2 text-txm-slate">{successNote}</div>}
      </div>
    );
  }

  const errorEntries = config.fields
    .filter((f) => errors[f.name])
    .map((f) => ({ name: f.name, label: f.label, message: String(errors[f.name]?.message ?? "") }));
  if (errors.consent) errorEntries.push({ name: "consent", label: "Consent", message: String(errors.consent.message) });

  const fieldId = (name: string) => `${formId}-${name}`;

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-5">
      {showSummary && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 outline-none"
        >
          <p className="flex items-center gap-2 font-semibold text-red-800">
            <CircleAlert className="h-5 w-5" aria-hidden="true" />
            Please fix {errorEntries.length === 1 ? "this field" : `these ${errorEntries.length} fields`}
          </p>
          <ul className="txm-small mt-2 list-disc space-y-1 pl-6 text-red-800">
            {errorEntries.map((e) => (
              <li key={e.name}>
                <a href={`#${fieldId(e.name)}`} className="underline underline-offset-2">
                  {e.label}: {e.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {config.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            id={fieldId(field.name)}
            error={errors[field.name]?.message ? String(errors[field.name]?.message) : undefined}
            registration={register(field.name)}
          />
        ))}
      </div>

      {/* Honeypot: hidden from people, often filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input id={fieldId("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("sourcePage")} />

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            type="checkbox"
            className="txm-focus mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-txm-indigo"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            {...register("consent")}
          />
          <label htmlFor={fieldId("consent")} className="txm-small text-txm-slate">
            I agree that TalentXM may contact me about this request. See the{" "}
            <Link href="/legal/privacy" className="txm-focus font-medium text-txm-indigo underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id={`${fieldId("consent")}-error`} className="txm-small mt-1.5 ml-7 text-red-700">
            {String(errors.consent.message)}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="txm-small rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          We could not send your request. Please try again, or email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="txm-focus inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txm-base px-6 py-3.5 font-semibold text-white transition-colors hover:bg-txm-surface disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending…" : config.submitLabel}
      </button>
    </form>
  );
}

function Field({
  field,
  id,
  error,
  registration,
}: {
  field: FieldDef;
  id: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<Values>>["register"]>;
}) {
  const describedBy = [field.hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  const control = cn(
    "txm-focus block w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-txm-ink placeholder:text-slate-400",
    error ? "border-red-400" : "border-slate-300 hover:border-slate-400",
  );
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    "aria-required": field.required || undefined,
    ...registration,
  };

  return (
    <div className={cn(field.half ? "sm:col-span-1" : "sm:col-span-2")}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-txm-ink">
        {field.label}
        {!field.required && <span className="ml-1 font-normal text-txm-subtle">(optional)</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea rows={4} className={control} {...shared} />
      ) : field.type === "select" ? (
        <select className={cn(control, "pr-8")} {...shared}>
          <option value="" disabled={field.required}>
            {field.required ? "Choose one" : "No preference"}
          </option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={field.type} autoComplete={field.autoComplete} className={control} {...shared} />
      )}
      {field.hint && (
        <p id={`${id}-hint`} className="txm-small mt-1.5 text-txm-subtle">
          {field.hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="txm-small mt-1.5 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
