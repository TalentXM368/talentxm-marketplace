# Content to verify before launch

Phase 1 copy was drafted from the Replit site, the Architecture & Sitemap doc (S2/S3) and UX01. Nothing below appears on the site as a placeholder. Each item is neutral copy that someone needs to confirm or replace.

## Claims (Srilakshmi, plus the delivery lead or security owner)

- [ ] **Agent details** (`content/agents.ts`). The architecture marks several as VERIFY:
  - ScheduleXM: whether the athenahealth sandbox work counts as designed or tested
  - RefillXM: the technologies used
  - Chemical-Document Interpretation: the technologies used
- [ ] **Technology evidence levels** on agents and service domains: tested, designed for, or team experience.
- [ ] **Trust items** (`content/trust.ts`). Confirm "Claude Partner Network member" and the wording of the two in-progress items. Security owner sign-off is needed, and each item must be re-reviewed within 90 days.
- [ ] **"Available" status** on the integration and managed-service rows of the industry use-case tables (`content/industries.ts`).
- [ ] **HIPAA-aware data handling** listed under Healthcare standards.

## Contact details (UX01)

- [ ] Public email. It is currently `hello@talentxm.ai`; the old `blocktxm.com` address has been removed.
- [ ] WhatsApp number: +91 79897 78830, taken from the old site. Keep it, or replace it with a US number.
- [ ] LinkedIn URL in `content/site.ts`. It isn't rendered yet.

## Trust signals that stay hidden until approved (UX01)

- [ ] Which client logos can be published, each with a permission record.
- [ ] Approved testimonials, each with a permission record.
- [ ] Any stats, each with a source.
- [x] POC demo videos for the agents (POC Library, `content/pocs.ts`).
- [x] POC presentations from Drive: ChemistXM and machine health.
- [ ] Retail Control Plane deck is marked confidential and is not embedded. Add a client-facing version when one exists.
- [x] Copy, key moments and boundaries written from the video transcripts (ScheduleXM, eligibility, patient re-engagement, OPS Genie, contract compliance, AP vendor email, Retail Control Plane).
- [ ] Review the transcript-based POC copy. The technologies now follow the videos, so the eligibility POC (Workato GO, Azure, Epic) no longer matches its agent record (Copilot Studio, Optum, X12), and the AP vendor POC no longer lists the SAP and BlackLine systems marked "designed" on its agent.
- [ ] Healthcare OPS Genie video cites figures ($800,000 a year saved, 26–39% of staff time on data entry, $200 billion waste) that are not on the page. They need a source before they can be used.

## Legal (counsel, TXM-044)

- [ ] The Privacy, Terms, Cookies and Accessibility pages (`content/legal.ts`) were rewritten for a services website. Counsel needs to review them, including the DPDP Act and US state privacy wording.

## Redirects

- [ ] Confirm that no active users rely on `/login`, `/admin` or the dashboards before they return 410 (`proxy.ts`, TXM-016).

## Copy trims from the 2026-11-19 design pass (sign-off)

Service copy was cut to 20 words or fewer per line so cards read at a glance (`content/services.ts`). No facts were added or removed beyond what is listed. Approve, or restore the original wording.

- [ ] ERP: "including the vendor and accounts payable flows that AI assistance touches first" → "including vendor and AP flows AI touches first".
- [ ] CRM: "comparable platforms … trust what they see" → "similar platforms … trust the data".
- [ ] Enterprise Platforms, how it connects to AI: "reads from or writes back to one of these platforms. Getting permissions, field mappings and audit trails right here is what makes an AI pilot safe to extend" → "uses one of these platforms. Correct permissions, field mappings and audit trails make a pilot safe to extend".
- [ ] Data & Integration, how it connects to AI: dropped "Agents call integrations, not databases." Now: "Every validated agent works through an integration layer that logs calls, limits scope and can be switched off."
- [ ] AI & Automation, how it connects to AI: "This is where the AI agents catalogue comes from…" → "The AI agents catalogue comes from this work: each agent began as an engagement scoped to one workflow."
- [ ] Cloud & Cybersecurity, how it connects to AI: "a risk or compliance reviewer" → "reviewers", joined into one sentence.
- [ ] Capability Pods: "A senior lead plus a small execution team that owns a capability" → "A senior lead and a small execution team owning one capability".
- [ ] AI Governance (25 words) left unchanged: shortening it would drop "where they apply", a legal qualifier. Counsel or the security owner to decide.
- [ ] The AP Vendor Email POC no longer sits under the Manufacturing filter (`content/pocs.ts`). Its agent is cross-industry, so it is now found under Finance.
