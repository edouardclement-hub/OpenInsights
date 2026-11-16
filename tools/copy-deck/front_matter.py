# -*- coding: utf-8 -*-
"""Front matter + global elements for the EPM copy deck."""
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from deckkit import Deck, NAVY, TEAL, GREY, set_cell_shading, set_table_borders, HDR_FILL

from sources import today_label

DATE = today_label()
SITE = "https://epm.openinsights.ca"


def section(d, title, status="Live"):
    d.heading(title, 2)
    par = d.p("Status: " + status, size=9, italic=True, color=GREY, before=0, after=3)
    par.paragraph_format.keep_with_next = True


def page_head(d, name, path, files):
    d.heading(name, 1)
    url = SITE + path
    par = d.p(url, size=9.5, color=TEAL, before=0, after=0)
    par.paragraph_format.keep_with_next = True
    for f in files:
        par = d.p("Source: " + f, size=9, color=GREY, before=0, after=0)
        par.paragraph_format.keep_with_next = True
    d.p("", after=2)


def metadata_section(d, title_tag, description, og="Not defined. The site sets no Open Graph tags."):
    section(d, "Page metadata [document head]")
    d.label("<title>")
    d.copy(title_tag)
    d.label("Meta description")
    d.copy(description)
    d.label("Open Graph title")
    d.copy(og)
    d.label("Open Graph description")
    d.copy(og)


def build_front(d):
    # ---------------- Title page ----------------
    par = d.p("Energy Policy Monitor", size=11, bold=True, color=TEAL,
              before=90, after=4, align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("EPM Website Copy Deck", size=30, bold=True, color=NAVY,
        before=0, after=10, align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("Every piece of written copy currently on epm.openinsights.ca,",
        size=11.5, color=GREY, before=0, after=0, align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("laid out page by page for team review.",
        size=11.5, color=GREY, before=0, after=26, align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p(DATE, size=11, bold=True, color=NAVY, before=0, after=2,
        align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("Source: live site as of " + DATE, size=10.5, color=GREY, before=0, after=2,
        align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p(SITE, size=10.5, color=TEAL, before=0, after=10,
        align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("Last verified against the live site: " + DATE, size=10, bold=True, color=TEAL,
        before=0, after=4, align=WD_ALIGN_PARAGRAPH.CENTER)
    d.p("Update this line whenever you refresh the document.", size=9, italic=True,
        color=GREY, before=0, after=4, align=WD_ALIGN_PARAGRAPH.CENTER)

    d.page_break()

    d.box(
        "How to use this document",
        [
            "Everyone on the team has Commenter access, so every change you make is "
            "recorded as a suggestion rather than applied straight to the text. Select the "
            "copy you want changed, suggest your new wording, and add a comment if the "
            "reason is not obvious.",
            "Vanessa reviews the suggestions, approves the ones that are going ahead, and "
            "pushes the approved wording to the live site. Nothing you suggest here reaches "
            "the website on its own.",
            "Please keep suggestions inside the copy blocks (the indented text). The grey "
            "labels, section headings, URLs and file paths are there so a developer can "
            "find the copy in the code, so leave those alone.",
            "Log every approved change in the change log on the next page.",
        ],
        kind="info",
    )

    d.box(
        "Keeping this document up to date",
        [
            "This deck is a snapshot of the site as it was on the date on the title page. "
            "It does not update itself, and editing it does not change the website.",
            "When Vanessa pushes an approved change to the site, she also updates the "
            "matching copy block here and adds a row to the change log. That keeps this "
            "document usable as the current record between review rounds.",
            "Edit only the indented copy blocks. The grey labels, the section headings, "
            "the page addresses and the file paths underneath them are how a developer "
            "finds the text in the code, so leave all of those as they are.",
            "After pushing a batch of changes, go to File, then Version history, then Name "
            "current version, and name it for the date you pushed. That gives this document "
            "a timeline that matches the site.",
            "Resolve a comment once its change is live. Anything still open is still "
            "outstanding.",
            "For a big review round, start from a freshly generated deck rather than "
            "editing this one. Comments stay attached to the wording they were left on, so "
            "a new round belongs in a new document.",
        ],
        kind="info",
    )

    d.box(
        "Before you start: two things to know about this copy",
        [
            "1. Four pages of the site are linked but do not exist. The footer links to a "
            "privacy policy and a terms page, and neither has been written yet. Both are "
            "listed in this deck with the gap flagged.",
            "2. Five of the six assessment pages are fictional placeholders. They carry an "
            "\"Example\" banner on the live site. Their copy is included verbatim so you can "
            "review the page template, but the numbers and findings in them are not real. "
            "Only the Conservative Party 2021 assessment is a genuine piece of work.",
            "Anything else that looked like a typo, a placeholder or a loose end has been "
            "left exactly as it appears on the site and flagged in an amber box where it sits.",
        ],
        kind="flag",
    )

    # ---------------- Change log ----------------
    d.heading("Change log", 1)
    d.p("Fill in a row each time a change is approved and pushed to the live site.",
        size=10, color=GREY, before=2, after=8)

    headers = ["Date", "Page", "Section", "Change", "Approved by"]
    widths = [0.85, 1.15, 1.25, 2.3, 0.95]
    t = d.doc.add_table(rows=13, cols=5)
    t.style = "Table Grid"
    t.autofit = False
    for i, w in enumerate(widths):
        for row in t.rows:
            row.cells[i].width = Inches(w)
    for i, h in enumerate(headers):
        cell = t.cell(0, i)
        set_cell_shading(cell, HDR_FILL)
        par = cell.paragraphs[0]
        par.paragraph_format.space_before = Pt(3)
        par.paragraph_format.space_after = Pt(3)
        r = par.add_run(h)
        r.bold = True
        r.font.size = Pt(9.5)
        r.font.name = "Arial"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    for ri in range(1, 13):
        t.rows[ri].height = Inches(0.3)
        for ci in range(5):
            par = t.cell(ri, ci).paragraphs[0]
            par.paragraph_format.space_before = Pt(5)
            par.paragraph_format.space_after = Pt(5)
            r = par.add_run("")
            r.font.size = Pt(9.5)
            r.font.name = "Arial"

    # ---------------- Global elements ----------------
    d.heading("Global elements", 1)
    d.p("These appear on every page of the site. They are written out once here, and not "
        "repeated under each page.", size=10, color=GREY, before=2, after=4)
    d.p("Source: frontend/src/app/layout.tsx, frontend/src/components/layout/Header.tsx, "
        "frontend/src/components/layout/Footer.tsx", size=9, color=GREY, before=0, after=2)

    # Site metadata defaults
    section(d, "Site metadata defaults [document head]")
    d.label("Default <title> (used when a page sets none)")
    d.copy("Energy Policy Monitor — Open Insights")
    d.label("Title template for all other pages")
    d.copy("%s | Energy Policy Monitor")
    d.label("Default meta description")
    d.copy("Independent, data-driven assessments of Canadian energy policy. Transparent "
           "modelling, traceable findings, publicly archived.")
    d.box("Flag: no Open Graph or Twitter card copy anywhere on the site",
          ["Nothing on the site sets an Open Graph or Twitter card title, description or "
           "image. When a page is shared on LinkedIn, Bluesky, Slack or in a text message, "
           "the preview falls back to whatever the platform can scrape, and there is no "
           "preview image at all. Each page in this deck therefore shows \"Not defined\" "
           "under Open Graph. Worth writing a set, since the whole point of an assessment "
           "is that people share it."])

    # Main nav
    section(d, "Main navigation [.nav]")
    d.label("Wordmark, line 1")
    d.copy("Energy Policy Monitor")
    d.label("Wordmark, line 2")
    d.copy("Open Insights")
    d.label("Navigation links, in order (the wordmark also links to the home page)")
    d.bullets(["Home", "Assessments", "Methodology", "Team", "About"])
    d.label("Call to action link, set apart from the others [.nav-cta]")
    d.copy("Contact")
    d.label("Mobile menu button, screen reader label only [.nav-hamburger]")
    d.copy("Toggle menu")

    # Footer
    section(d, "Footer [.footer]")
    d.label("Brand name [.footer-brand-name]")
    d.copy("Energy Policy Monitor")
    d.label("Brand line 2 [.footer-brand-sub]")
    d.copy("Open Insights")
    d.label("Tagline [.footer-tagline]")
    d.copy("Independent, data-driven assessments of Canadian energy policy. Transparent "
           "modelling, traceable findings, publicly archived.")
    d.label("First link column heading [.footer-links-title]")
    d.copy("Explore")
    d.label("First link column, links")
    d.bullets(["Assessments", "Methodology"])
    d.label("Second link column heading [.footer-links-title]")
    d.copy("Organization")
    d.label("Second link column, links")
    d.bullets(["About", "Team", "Contact"])
    d.label("Copyright line [.footer-copy] (the year is generated, not typed)")
    d.copy("© 2026 Open Insights / Energy Policy Monitor. All rights reserved.")
    d.label("Icon link, shield [.social-btn]: screen reader label, then tooltip")
    d.copy("Privacy policy")
    d.copy("Privacy")
    d.label("Icon link, document [.social-btn]: screen reader label, then tooltip")
    d.copy("Terms")
    d.copy("Terms")
    d.box("Flag: both footer icon links lead to pages that do not exist",
          ["The shield icon points at /privacy and the document icon points at /terms. "
           "Neither page has been built, so both currently land on the 404 page. See the "
           "Privacy policy and Terms of use entries near the end of this deck.",
           "The two links are also icons only, with no visible words beside them, so most "
           "visitors will not know what they are. The labels above are read out by screen "
           "readers and shown on hover."])

    # Loading state
    section(d, "Loading indicator [app/loading.tsx]")
    d.p("Shown while a page is still fetching. Source: frontend/src/app/loading.tsx",
        size=9, color=GREY, before=0, after=2)
    d.label("Loading text")
    d.copy("Loading…")

    return d
