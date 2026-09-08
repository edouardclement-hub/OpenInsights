# Onboarding — working on the OpenInsights sites

Setup guide for a new contributor using Claude Code. Should take about 30 minutes.

Start to finish, you will end up able to run the EPM site locally, make a change with
Claude, preview it on a real URL, and open a PR.

## Before you start — what to ask Edouard for

1. A **GitHub** collaborator invite on `edouardclement-hub/OpenInsights`
2. The contents of **`frontend/.env.local`** (sent securely — 1Password or similar,
   never Slack or email)
3. A **Strapi admin** account, if you will be editing site content
4. The **site password** for epm.openinsights.ca (the live EPM site is gated)

You will also need your own **Claude Code access** — a Claude Pro/Max subscription, or a
seat on the team plan. It authenticates per person; it cannot be shared.

## 1. Install the tools

- **Node.js 20–24.** Check with `node -v`. If you need it, install via
  [nvm](https://github.com/nvm-sh/nvm) or nodejs.org. Node 25+ will not work — Strapi
  pins the range.
- **Git.** On macOS, `git --version` prompts to install if missing.
- **Claude Code** — https://claude.com/claude-code. Sign in with your own account.
- **A code editor**, e.g. VS Code.

## 2. Get the code

```bash
git clone https://github.com/edouardclement-hub/OpenInsights.git
cd OpenInsights
npm install
```

`npm install` from the root installs all three workspaces at once. It takes a few minutes.

## 3. Add your environment file

```bash
cp frontend/.env.example frontend/.env.local
```

Then open `frontend/.env.local` and paste in the values Edouard sent. For everyday
frontend work `STRAPI_URL` and `NEXT_PUBLIC_SITE_URL` are the ones that matter.

This file is gitignored and must stay that way — **the repository is public.**

## 4. Run the site

```bash
npm run dev:frontend
```

Open http://localhost:4000. You are now running the EPM site locally against the live
CMS, so you will see real content. No password gate locally.

You do **not** need to run Strapi locally unless you are changing content types.

## 5. Make a change

Always work on a branch — pushing to `main` deploys straight to production.

```bash
git checkout -b your-change-name
```

Then start Claude Code from the repo root:

```bash
claude
```

Claude reads `CLAUDE.md` automatically, so it already knows the architecture, the design
tokens, and the rules about what not to touch. Describe what you want in plain language.

Worth knowing before you ask for changes:

- **EPM site content** — assessments, team bios, FAQs — lives in **Strapi**, not in the
  code. Edit it in the Strapi admin, not by asking Claude to change a component.
- **The corporate site** (openinsights.ca) is hand-written HTML in `corporate/`. That
  content *is* edited in code.
- Layout, styling and new features on either site are code changes.

## 6. Preview and open a PR

```bash
git add -A
git commit -m "describe what changed"
git push -u origin your-change-name
```

Vercel automatically builds a **preview URL** for your branch — a real link showing your
change, safe to share for feedback. Find it in the PR, or in the Vercel dashboard.

Then open a pull request on GitHub for Edouard to review. Once merged to `main`, it goes
live within a couple of minutes.

## 7. If you changed content in Strapi and the site looks stale

Pages are cached for 60 seconds to an hour. Publishing in Strapi does not instantly
update the live site. Wait it out, or ask Edouard to trigger a revalidation.

## Ground rules

- **Never push directly to `main`** — it is an instant production deploy of a live site.
- **Never commit secrets.** The repo is public. Anything in `.env.local` or `cms/.env`
  stays out of git.
- **Do not mix the two brands' palettes.** Open Insights is sage/amber; EPM is
  navy/teal/gold. `CLAUDE.md` has the full table.
- **Ask before touching DNS.** Email forwarding for `info@openinsights.ca` runs on the
  same DNS zone and is easy to break.

## Where to look next

`CLAUDE.md` in the repo root is the fuller technical picture — architecture, content
model, conventions, and the things that surprise people.
