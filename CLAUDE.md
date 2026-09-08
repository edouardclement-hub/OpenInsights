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
| Content source | Hand-edited in `corporate/index.html` | **Strapi CMS** (`cms/`) |
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

## Core rule: Strapi is the source of truth for EPM

Every piece of EPM content — assessments, team members, FAQs, homepage and about copy —
comes from Strapi via `frontend/src/lib/strapi.ts`. **Do not hardcode content into
components.** If something needs to change on the EPM site and it is content rather than
layout, it belongs in the CMS, not in a `.tsx` file.

Content types live in `cms/src/api/*/content-types/*/schema.json`:
`assessment`, `team-member`, `faq`, `homepage`, `about-page`, `global`.

`assessment` is the main one (draft & publish enabled). Key fields: `title`, `slug`,
`jurisdiction`, `party`, `status`, `policyStatus`, `sector`, `claim`, `finding`,
`claimedValue`, `modelledValue`, `execSummary`, `findings` (json), `tags` (json),
`epmPlus`, `isExample`, plus media (`cardImage`, `detailImage`) and link fields
(`zenodoUrl`, `ideaUrl`, `githubUrl`, `datasetUrl`, `policyEncodingUrl`, `assumptionsUrl`).

Business logic belongs in the CMS layer, not the frontend — a custom staff UI is planned
for later and should be able to reuse the same API contract.

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

Both are gitignored and will not arrive with a clone — get them from Edouard:

- `frontend/.env.local` — see `frontend/.env.example`. `STRAPI_URL` and
  `NEXT_PUBLIC_SITE_URL` are enough for everyday frontend work.
- `cms/.env` — only needed to run Strapi locally. See `cms/.env.example`.

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
