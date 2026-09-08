# OpenInsights — project guide

Context for Claude Code sessions in this repo. Read before making changes.

## What this repo is

A monorepo (npm workspaces) holding **two separate websites for two distinct brands**.
Confusing them is the most common and most damaging mistake here.

| | Open Insights (corporate) | Energy Policy Monitor (EPM) |
|---|---|---|
| Directory | `corporate/` | `frontend/` |
| Live at | https://www.openinsights.ca | https://epm.openinsights.ca |
| Stack | Static HTML/CSS/JS — no framework | Next.js 16 + React 19 + Tailwind 4 |
| Content source | Hand-edited in `corporate/index.html` | In the repo; assessment records from Strapi |
| Palette | sage `#4a6741`, amber `#e5a94a`, paper `#f5f2eb`, ink `#0f1410` | navy `#0D1B2A`, teal `#0C7A7A`, teal-bright `#0FA8A8`, gold `#C9963B` |
| Mono font | IBM Plex Mono | DM Mono |
| Feel | academic / editorial | data / dashboard |

Both share Playfair Display (headings) + DM Sans (body). **Never mix the two palettes.**

Open Insights is the parent organization; EPM is its first product. More products may
follow, so keep the corporate site product-agnostic.

## The three workspaces

- **`frontend/`** — the EPM site. Next.js App Router, TypeScript. Dev server on **port 4000**.
- **`cms/`** — Strapi 5 + PostgreSQL. Admin UI is how staff edit EPM content. Port 1337.
- **`corporate/`** — static files, no build step.

## Where EPM content lives

**Almost everything is in code.** Edit the file and push — no CMS needed.

| Content | File |
|---|---|
| Homepage copy | `frontend/src/app/page.tsx` → `HOMEPAGE` |
| FAQs (shown on /about) | `frontend/src/app/about/page.tsx` → `FAQS` |
| **Conservative 2021 assessment** (the only real one) | `cms/src/index.ts` → `CONSERVATIVE_2021` |
| Team page and bios | `frontend/src/app/team/page.tsx` → `TEAM` |
| Methodology page | `frontend/src/app/methodology/page.tsx` |
| Contact page | `frontend/src/app/contact/page.tsx` |
| Assessment slideshows | `frontend/public/assessments/<slug>/slides/` + `frontend/src/lib/assessment-slides.ts` |

### The one exception: assessment records

`/assessments` and `/assessments/[slug]` fetch their records from Strapi via
`frontend/src/lib/strapi.ts`. Five exist: four are `isExample: true` placeholders that
render with an "Example" banner, and one is real.

That real one is still edited **in code**. `seedIfEmpty()` in `cms/src/index.ts`
re-syncs its fields from the file on every Strapi boot, so editing it in the Strapi
admin looks like it works and then reverts on the next restart. Add a new real
assessment by following the `CONSERVATIVE_2021` pattern in that file.

Strapi remains installed and running for future use, but no routine content work needs
it. Everything else is a file in this repo.

`getHomepage()` and `getFaqs()` are still exported from `frontend/src/lib/strapi.ts` but
are deliberately unused — the pages own that copy now. Don't wire them back up.

Content types live in `cms/src/api/*/content-types/*/schema.json`: `assessment`,
`team-member`, `faq`, `homepage`, `about-page`, `global`. Only `assessment` is actually
in use; `about-page`, `global` and `team-member` are empty.

`assessment` key fields: `title`, `slug`, `jurisdiction`, `party`, `status`,
`policyStatus`, `sector`, `claim`, `finding`, `claimedValue`, `modelledValue`,
`execSummary`, `findings` (json), `tags` (json), `epmPlus`, `isExample`, plus media
(`cardImage`, `detailImage`) and link fields (`zenodoUrl`, `ideaUrl`, `githubUrl`,
`datasetUrl`, `policyEncodingUrl`, `assumptionsUrl`).

## Deploys — read this before pushing

**Pushing to `main` deploys to production immediately.** Two Vercel projects watch this
one repo with different root directories:

- `open-insights-corporate` → root `corporate/` → www.openinsights.ca
- `open-insights-frontend` → root `frontend/` → epm.openinsights.ca

Strapi runs separately on Railway (`cms-production-4424.up.railway.app`) and is **not**
deployed by pushing here.

The team works directly on `main` — there is no required review step, so a push is a
publish. Verify changes locally (`npm run dev:frontend`) before pushing.

For a large or risky change, pushing to a branch instead gives a Vercel preview URL to
check first. Use that judgement; it is not enforced.

## Local development

```bash
npm install            # from the repo root — installs all workspaces
npm run dev:frontend   # EPM site on http://localhost:4000, reading from prod Strapi
npm run dev:cms        # Strapi admin on http://localhost:1337/admin (needs cms/.env)
npm run dev            # both at once
```

Most work needs only `dev:frontend`. Running `cms/` locally is only necessary when
changing content types or Strapi config.

Node 20–24 required (Strapi constraint).

### Environment files

Both are gitignored and will not arrive with a clone:

- `frontend/.env.local` — `cp frontend/.env.example frontend/.env.local` is the whole
  setup. **No secrets are needed for frontend development**: the example points at the
  live CMS, which allows public reads, and every other variable has a safe dev default
  (`SITE_PASSWORD` unset leaves the password gate open; `REVALIDATION_SECRET` only
  guards an endpoint you would not call locally).
- `cms/.env` — only needed to run Strapi locally, which most work does not require.
  See `cms/.env.example`; the secrets in it can be any values for a local instance.

**This repository is public.** Never commit a real secret, and never paste env values
into a file, a commit message, or an issue.

## Things that surprise people

- **The EPM site is password-gated.** `frontend/src/middleware.ts` gates everything
  behind `SITE_PASSWORD` when that env var is set. It is set in Vercel prod but not
  locally, so the gate is open in dev and closed on the live site.
- **`isExample`** marks placeholder assessments — real and sample content coexist.
- **Content changes need a revalidation ping.** Pages are ISR-cached (60s for
  assessments, 3600s for global/team/about). `POST /api/revalidate` with the
  `x-revalidate-secret` header flushes everything.
- **Cross-brand links are hardcoded** in `corporate/index.html` and
  `frontend/src/components/blocks/M3PlatformSchematic.tsx`. If a domain moves, update
  both.
- **DNS lives at WHC**, not Vercel. The `emailfwd` A record, the `MX` record and the SPF
  `TXT` record carry email forwarding for `info@openinsights.ca` — do not touch them
  while editing DNS.

## Design system

EPM tokens are defined in `frontend/src/app/epm.css` under `:root` — use the CSS
variables (`var(--teal)`, `var(--navy)`), never raw hex. Standard transition is
`220ms cubic-bezier(0.4,0,0.2,1)`. Container maxes out at 1100–1200px.

Corporate tokens are in `corporate/css/styles.css`, same principle.

## Conventions

- TypeScript throughout `frontend/`; Strapi response shapes are typed in
  `frontend/src/types/strapi.ts`.
- Fetching goes through the helpers in `frontend/src/lib/strapi.ts` — add a helper there
  rather than calling `fetch` from a component.
- Page components live in `frontend/src/app/*/page.tsx`; reusable pieces in
  `frontend/src/components/blocks/` and `frontend/src/components/layout/`.
- `npm run lint -w frontend` before pushing.

New here? See `ONBOARDING.md` for setup start to finish.
