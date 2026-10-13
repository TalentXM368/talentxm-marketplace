import type { FormId } from "@/content/types";
import { LeadForm } from "./lead-form";

/** A titled form block, used on form pages and at the end of service pages. */
export function FormSection({
  id,
  formId,
  sourcePage,
  eyebrow,
  title,
  description,
  defaults,
  aside,
  tone = "light",
}: {
  id: string;
  formId: FormId;
  sourcePage: string;
  eyebrow?: string;
  title: string;
  description?: string;
  defaults?: Record<string, string>;
  aside?: React.ReactNode;
  tone?: "light" | "white";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={tone === "light" ? "txm-section txm-section-light" : "txm-section bg-white"}>
      <div className="txm-container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          {eyebrow && <p className="txm-eyebrow mb-3 text-txm-indigo">{eyebrow}</p>}
          <h2 id={`${id}-title`} className="txm-h2 text-txm-ink">
            {title}
          </h2>
          {description && <p className="txm-lede mt-4 text-txm-slate">{description}</p>}
          {aside && <div className="mt-8">{aside}</div>}
        </div>
        <div className="rounded-2xl border border-txm-line bg-white p-6 shadow-txm-card md:p-8">
          <LeadForm formId={formId} sourcePage={sourcePage} defaults={defaults} />
        </div>
      </div>
    </section>
  );
}
