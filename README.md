# talentxm.ai, Phase 1

The TalentXM corporate website, rebuilt in Next.js. It follows the **Architecture & Sitemap v1.0** document and the **UX01 component audit**. For Phase 1 all content is static and lives in typed files under `content/`, and the site deploys to Vercel.

## Stack

- Next.js 16 (App Router, TypeScript), with Cache Components turned on. Every marketing route is prerendered, and `ensureStatic = "navigation"` in `app/layout.tsx` enforces that.
- Tailwind CSS v4. The TalentXM v2 design tokens are in `app/globals.css`.
- react-hook-form and zod for forms F-01…F-05. The schemas are shared between the client and `/api/forms/[formId]`.
- lucide-react for icons, and Inter through `next/font`.

## Scripts

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, then the content gate (postbuild)
npm run start        # serve the production build
npm run lint
npm run typecheck
```

`npm run build` finishes by running `scripts/check-content.mjs`, a lightweight version of the publish gate (Architecture A8). It reads every prerendered page and fails the build on any of these:

- banned strings ("Live", "in production", "predictive maintenance", "SOC 2 certified", …)
- placeholders (`[BRACKETED]`, TODO, lorem, "Coming soon")
- missing or duplicate titles, or descriptions over 155 characters
- missing canonical URLs

Some catalogue rules are enforced by the compiler instead, through the tuple types in `content/types.ts`. Every agent needs a status, at least two "does not do" items and at least one human decision point.

## Structure

```
app/                 routes P-01…P-26, sitemap.ts, robots.ts, api/forms/[formId]
components/layout/   header + Services mega menu + mobile menu, footer, breadcrumb, contact launcher
components/sections/ hero, section header, cards, stack and pod diagrams, FAQ, CTA band, trust blocks
components/catalog/  agent card and the URL-state filter island
components/signature/ StatusChip, HumanDecisionPoints, TechTags
components/forms/    LeadForm (F-01…F-05), FormSection, ContactForm
components/media/    VideoEmbed (lite POC player, loads the iframe on play)
content/             site settings, services, agents, industries, delivery models, trust, legal
lib/                 SEO helpers and JSON-LD, form schemas and config
proxy.ts             410 responses for retired Replit routes
next.config.ts       301 redirect map (S6) and security headers
```

To edit copy, change the file in `content/`. The field names mirror the planned Sanity schemas (A4), so moving to the CMS later only means replacing these imports with queries.

## Trust signals that stay hidden until approved

Per UX01, these sections render nothing while their arrays in `content/site.ts` are empty:

- `clientLogos`: client logo strip
- `testimonials`: testimonial grid
- `stats`: stat band. Every stat needs a `source`.

Add `demoVideo` to an agent in `content/agents.ts` and its POC video player appears on that agent's page.

## Forms

In Phase 1, `/api/forms/[formId]` validates the payload against the form's zod schema and returns `{ ok: true }`. Nothing is sent anywhere. The next step (A5) is to add Turnstile, write a Supabase outbox row and send a signed webhook to n8n (W-01…W-05).

## Deployment

Pushes to `main` deploy to production on Vercel, and pull requests get preview URLs. Preview deployments send `X-Robots-Tag: noindex` and a disallow-all robots.txt. To point at a different domain, set `NEXT_PUBLIC_SITE_URL`; the default is `https://talentxm.ai`.

See `CONTENT-TODO.md` for the copy and claims that need sign-off before launch.
