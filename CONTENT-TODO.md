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
- [ ] POC demo videos for the agents: embed URL, thumbnail and title.

## Legal (counsel, TXM-044)

- [ ] The Privacy, Terms, Cookies and Accessibility pages (`content/legal.ts`) were rewritten for a services website. Counsel needs to review them, including the DPDP Act and US state privacy wording.

## Redirects

- [ ] Confirm that no active users rely on `/login`, `/admin` or the dashboards before they return 410 (`proxy.ts`, TXM-016).
