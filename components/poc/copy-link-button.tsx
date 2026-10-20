"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

/** Copies the page URL so the POC can be sent to a client. */
export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonStyles({ variant: "secondary", tone: "dark" })}>
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
