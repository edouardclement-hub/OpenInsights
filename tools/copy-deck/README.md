# Copy deck generator

Builds `EPM_Website_Copy_Deck.docx`: every piece of written copy on
<https://epm.openinsights.ca>, laid out page by page for the team to review in
Google Docs.

## Build it

```bash
npm run copy-deck
```

Writes `EPM_Website_Copy_Deck.docx` to the repo root. The first run creates a
local Python environment in `tools/copy-deck/.venv`; later runs take seconds.
Both the deck and that environment are gitignored.

Optional, to eyeball the layout before sharing it (needs Google Chrome):

```bash
npm run copy-deck:pdf
```

## Getting it to the team

1. Upload the `.docx` to Drive, then **Open with → Google Docs**.
2. Share with the team as **Commenter** so edits arrive as suggestions.
3. **View → Show outline** gives a navigable sidebar of every page and section.

The document explains the rest of the workflow on its first two pages.

## Where the content comes from

| Content | Source | Stays current? |
|---|---|---|
| Assessment records | Production CMS, over the API | Yes, read on every build |
| Slide captions | `frontend/src/lib/assessment-slides.ts` | Yes, parsed on every build |
| Page copy (home, about, team, methodology, contact, nav, footer) | Transcribed in `pages_*.py` here | **No.** See below |

Page copy is written inside React components mixed in with markup, so it is
transcribed into this tool rather than extracted. That means **editing a page's
copy in the site does not update this tool**.

To catch that, every build runs a drift check. It walks the `.tsx` files, pulls
out the strings a visitor would see, and lists any that are missing from the
deck:

```
Drift check
  2 string(s) in the code are not in the deck.
  Page copy is transcribed in tools/copy-deck/pages_*.py; update it there.
    frontend/src/app/about/page.tsx    Our funding and governance
```

When that happens, find the matching section in the `pages_*.py` module and
update the wording to match the code. The check can throw the odd false
positive, so read it as "look at these", not "these are broken".

## Which CMS it reads

Production, always, because the deck documents the live site.
`frontend/.env.local` often points at a local Strapi whose records differ, so it
is deliberately ignored. To point somewhere else for a one-off:

```bash
STRAPI_URL=http://localhost:1337 npm run copy-deck
```

## Files

| File | What it does |
|---|---|
| `build_deck.py` | Entry point: fetches, builds, reports |
| `sources.py` | Live inputs: CMS records, slide captions, date formatting |
| `deckkit.py` | Word styling helpers (headings, labels, copy blocks, boxes) |
| `front_matter.py` | Title page, how-to boxes, change log, global elements |
| `assessment_template.py` | Chrome shared by all six assessment pages |
| `pages_core.py` | Home, assessments list, assessment detail pages |
| `pages_methodology.py` | Methodology page and per-assessment flags |
| `pages_rest.py` | Team, about, contact, privacy, terms, login, 404 |
| `check_drift.py` | Reports page copy that has moved on |
| `render_pdf.py` | Optional PDF render for a layout check |

## House rules for the deck's own wording

- Arial throughout, real Word heading styles so Google Docs builds an outline.
- Canadian English in anything the tool writes.
- No em dashes in the tool's own text: headings, labels, instructions. Em dashes
  inside quoted site copy are left exactly as they appear on the site.
- Site copy is reproduced **verbatim**. Typos and placeholders are kept as-is and
  flagged in an amber box rather than silently fixed.
