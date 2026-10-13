"use client";

import { useSearchParams } from "next/navigation";
import { priorityOptions } from "@/lib/forms/config";
import { LeadForm } from "./lead-form";

/** F-01 on /contact, with the priority area prefilled from ?priority= when it is a known option. */
export function ContactForm() {
  const priority = useSearchParams().get("priority");
  const known = priorityOptions.some((o) => o.value === priority);
  return (
    <LeadForm
      key={known ? priority : "none"}
      formId="F-01"
      sourcePage="/contact"
      defaults={known && priority ? { priority } : undefined}
    />
  );
}
