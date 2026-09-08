# Onboarding — working on the OpenInsights sites

Setup guide for a new contributor using Claude Code. Should take about 30 minutes.

Start to finish, you will end up able to run the EPM site locally, make a change with
Claude, and publish it.

## Before you start — what to ask Edouard for

1. A **GitHub** collaborator invite on `edouardclement-hub/OpenInsights`
2. The **site password** for epm.openinsights.ca (the live site is gated — you only
   need this to view it in a browser, not to develop)
3. A **Strapi admin** account, if you will be editing site content

You do **not** need any secrets or API keys to run the site locally.

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

That's it — no editing needed. The example already points at the live CMS, which
allows public reads, so the site works straight away. The remaining variables are
optional and commented out; each one has a safe default in dev.

This file is gitignored and must stay that way — **the repository is public.**

## 4. Run the site

```bash
npm run dev:frontend
```

Open http://localhost:4000. You are now running the EPM site locally against the live
CMS, so you will see real content. No password gate locally.

You do **not** need to run Strapi locally unless you are changing content types.

## 5. Make a change

Start Claude Code from the repo root:

```bash
claude
```

Claude reads `CLAUDE.md` automatically, so it already knows the architecture, the design
tokens, and the rules about what not to touch. Describe what you want in plain language.

Worth knowing before you ask for changes:

- **Most content is edited here, in code** — the real Conservative 2021 assessment, the
  team page and bios, methodology, contact, and the assessment slideshows. Just ask
  Claude; it knows where each one lives (see the table in `CLAUDE.md`).
- **Some content lives in Strapi instead** — the sample assessments, the homepage copy,
  the FAQs and the about page. Those are edited at the CMS admin, not in code.
- **One trap:** the Conservative 2021 assessment must be changed in code
  (`cms/src/index.ts`). Editing it in Strapi looks like it works, then reverts the next
  time the CMS restarts.
- **The corporate site** (openinsights.ca) is hand-written HTML in `corporate/`.
- Layout, styling and new features on either site are code changes.

## 6. Publish it

Check it looks right at http://localhost:4000 first. Then:

```bash
git add -A
git commit -m "describe what changed"
git push
```

That's it — the site rebuilds and your change is live in a couple of minutes.

**Pushing publishes immediately.** There is no review step, so what you push is what
visitors see. Look over your change locally before you push it.

If you want a safety net on something bigger, push to a branch instead of `main`
(`git checkout -b my-change` before committing). Vercel builds a private **preview URL**
for any branch — a real link you can check or share before merging it in. Optional, but
useful for a redesign or anything you are unsure about.

## 7. If you changed content in Strapi and the site looks stale

Pages are cached for 60 seconds to an hour. Publishing in Strapi does not instantly
update the live site. Wait it out, or ask Edouard to trigger a revalidation.

## Ground rules

- **A push to `main` goes live immediately** on a public site. Check your work locally
  first; for anything substantial, use a branch preview.
- **Never commit secrets.** The repo is public. Anything in `.env.local` or `cms/.env`
  stays out of git.
- **Do not mix the two brands' palettes.** Open Insights is sage/amber; EPM is
  navy/teal/gold. `CLAUDE.md` has the full table.
- **Ask before touching DNS.** Email forwarding for `info@openinsights.ca` runs on the
  same DNS zone and is easy to break.

## Where to look next

`CLAUDE.md` in the repo root is the fuller technical picture — architecture, content
model, conventions, and the things that surprise people.
