# -*- coding: utf-8 -*-
"""Site pages for the EPM copy deck."""
import json
from front_matter import section, page_head, metadata_section
from deckkit import GREY, strip_tags
from sources import parse_slides, date_label

DEFAULT_DESC = ("Independent, data-driven assessments of Canadian energy policy. "
                "Transparent modelling, traceable findings, publicly archived.")

SLIDES = parse_slides()



# ------------------------------------------------------------------ Home
def build_home(d):
    page_head(d, "Home", "/", ["frontend/src/app/page.tsx"])
    metadata_section(d, "Energy Policy Monitor — Open Insights", DEFAULT_DESC)

    section(d, "Hero [.hero]")
    d.label("Eyebrow [.hero-eyebrow]")
    d.copy("Independent assessment")
    d.label("Heading [h1]")
    d.copy("Canadian energy policy insights, independently assessed.")
    d.label("Body [.hero-sub]: the words Open Insights are a link to openinsights.ca")
    d.copy("The Energy Policy Monitor delivers independent, timely analysis of Canada's "
           "major energy and climate policy developments. Led by the Open Insights team, "
           "EPM cuts through complexity to provide clear, evidence-based assessments of "
           "what new policies mean for emissions trajectories, energy systems, and "
           "economic outcomes.")
    d.label("Primary button [.btn-primary], links to /assessments")
    d.copy("Explore assessments")
    d.label("Secondary button [.btn-ghost], links to /methodology")
    d.copy("How it works")

    section(d, "Platform at a glance [.hero-stats]")
    d.label("Panel heading [.hero-stats-title]")
    d.copy("Platform at a glance")
    d.label("First row, label / value / note [.stat-row]")
    d.copy("Independence")
    d.copy("All policies and jurisdictions")
    d.copy("One integrated modelling platform, applied consistently on major Canadian "
           "energy and climate policy announcements.")
    d.label("Second row, label / value / note [.stat-row]")
    d.copy("Transparency")
    d.copy("Open-source")
    d.copy("Code, data, assumptions. All public and free.")

    section(d, "Our commitment, three pillars [.pillars]")
    d.label("Section label [.section-label]")
    d.copy("Our commitment")
    d.label("Section heading [.section-title]: set over two lines on the page")
    d.copy("Standardizing transparency")
    d.copy("in energy policy analysis.")
    d.label("First pillar [.pillar-card]: title / claim / description")
    d.copy("Independent")
    d.copy("One methodology, applied consistently on major Canadian energy and climate "
           "policy announcements.")
    d.copy("A standardized methodology is applied to every policy evaluated, regardless of "
           "the organization or jurisdiction it applies to.")
    d.label("Second pillar [.pillar-card]: title / claim / description")
    d.copy("Timely")
    d.copy("Assessments are published shortly after major energy policy announcements.")
    d.copy("EPM delivers assessments shortly after major energy policies are announced, so "
           "modelling results are useful while debates and public discourse are still active.")
    d.label("Third pillar [.pillar-card]: title / claim / description")
    d.copy("Credible")
    d.copy("Every finding is backed by a publicly archived audit trail, from assumptions to "
           "final outputs.")
    d.copy("Every EPM brief is Zenodo-archived, QAQC-validated by independent experts, and "
           "published with full documentation: code, assumptions, data, and results — all "
           "available for public review and replication.")
    d.box("Flag: the home page and the about page say different things about funding and tone",
          ["This pillar says assessments are \"QAQC-validated by independent experts\". The "
           "methodology page says the same. Nothing here is wrong, but the three pillars on "
           "this page and the three commitment cards on the about page cover the same ground "
           "in different words (Independent, Timely, Credible on both). If one set changes, "
           "the other needs the same edit."])

    section(d, "Latest work, featured assessments [.assessments-section]")
    d.label("Section label [.section-label]")
    d.copy("Latest work")
    d.label("Section heading [.section-title]")
    d.copy("Assessments")
    d.label("Link to the full list [.link-all]")
    d.copy("View all assessments →")
    d.p("The three cards below the heading are pulled from the assessment database. Their "
        "wording is reviewed on each assessment's own page in this deck. Card labels and "
        "buttons are in the next section.",
        size=10, color=GREY, before=4, after=4)

    section(d, "Assessment card [.assessment-card]")
    d.p("Used on this page and on the assessments list. Source: "
        "frontend/src/components/blocks/AssessmentCard.tsx",
        size=9, color=GREY, before=0, after=2)
    d.label("Banner on the five example assessments [.card-example-banner]")
    d.copy("Example")
    d.label("Finding label above the summary line [.card-finding-label]")
    d.copy("EPM Finding")
    d.label("Button [.btn-card-primary]")
    d.copy("View full assessment")
    d.label("Policy status badges [.badge-policy-*]: one per card, taken from the record")
    d.bullets(["Enacted", "Proposed", "Election Platform"])
    d.label("Fallback shown in place of a missing card image [.card-visual-label]")
    d.copy("Image · Cross-cutting")

    section(d, "Empty state, shown if the assessment database cannot be reached [.empty-state]")
    d.label("Body")
    d.copy("No assessments published yet. Add them via the Strapi admin.")
    d.box("Flag: this message is written for a developer, not for a visitor",
          ["If the assessment database is down, the home page tells whoever is looking at it "
           "to \"Add them via the Strapi admin\", and the words Strapi admin link to "
           "http://localhost:1337/admin, an address that only works on a developer's own "
           "laptop. A visitor would see a broken link and an instruction aimed at someone "
           "else. Needs replacing with a plain apology and a way back."])


# ------------------------------------------------- Assessments list
def build_assessments_list(d):
    page_head(d, "Assessments", "/assessments",
              ["frontend/src/app/assessments/page.tsx",
               "frontend/src/components/blocks/AssessmentsResults.tsx"])
    metadata_section(d, "Assessments | Energy Policy Monitor",
                     "Independent, reproducible assessments of Canadian energy and climate "
                     "policy. Full database.")

    section(d, "Page header [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("EPM database")
    d.label("Heading [h1]")
    d.copy("Assessment results")
    d.label("Body")
    d.copy("Major Canadian energy policy announcements are assessed with the same "
           "open-source methodology. All code, data, and assumptions are published, "
           "traceable, and replicable.")

    section(d, "Filter and search bar [.filters-bar]")
    d.label("Jurisdiction menu, first option [.filter-select]")
    d.copy("All Jurisdictions")
    d.label("Jurisdiction menu, remaining options in order")
    d.bullets(["Federal", "Alberta", "British Columbia", "Manitoba", "New Brunswick",
               "Newfoundland and Labrador", "Nova Scotia", "Ontario",
               "Prince Edward Island", "Quebec", "Saskatchewan",
               "Northwest Territories", "Nunavut", "Yukon"])
    d.label("Search box placeholder [.filter-search]")
    d.copy("Search assessments...")
    d.label("Result count [.filter-count]: the number and the plural s are generated")
    d.copy("Showing 6 assessments")

    section(d, "No results state [.no-results]")
    d.label("Body")
    d.copy("No assessments match your search. Try different keywords or clear a filter.")

    section(d, "Results grid [.results-grid]")
    d.p("Six assessment cards, newest first. Card labels and buttons are listed under the "
        "home page. Each assessment's own wording is reviewed on its own page in this deck.",
        size=10, color=GREY, before=0, after=4)
    d.box("Flag: five of the six assessments on this page are fictional",
          ["Only the Conservative Party 2021 assessment is real work. The other five are "
           "placeholders carrying an \"Example\" banner, including the Budget 2026 one, "
           "which is dated September 2026 and reads as current. Anyone landing on this page "
           "sees a database of six that is really a database of one.",
           "Four of the five placeholders are also marked up slightly differently in the "
           "database from the fifth: their example flag is left empty rather than set to "
           "yes. The banner still shows, because the page treats anything other than an "
           "explicit no as an example, but it is worth setting the flag properly so the "
           "banner cannot disappear by accident."])
    d.box("Flag: some wording is stored in the database but never shown on the site",
          ["Each assessment record carries a party, a short name, a claimed value, an "
           "instrument type and a status that no page displays. For example the Conservative "
           "record stores a claimed value of \"633 Mt CO₂e by 2030\" while the claim shown on "
           "the page says \"440 Mt CO₂e by 2030\". Both are in the database, only one is on "
           "the site, and they do not agree. None of this unused wording is reproduced in "
           "this deck, since the deck covers what is on the site, but it is worth either "
           "showing those fields or clearing them out."])


# --------------------------------------------- Assessment details
def build_assessment(d, a, first=False):
    slug = a["slug"]
    title = a["title"]
    d.heading(title, 1)
    url = "https://epm.openinsights.ca/assessments/" + slug
    par = d.p(url, size=9.5, color=(0x0C, 0x7A, 0x7A) and None, before=0, after=0)
    for r in par.runs:
        from deckkit import TEAL
        r.font.color.rgb = TEAL
    src = "Assessment record in the CMS (Strapi), fetched by " \
          "frontend/src/app/assessments/[slug]/page.tsx"
    if slug == "conservative-party-federal-election-platform-2021-energy-climate":
        src += "; the record itself is written in cms/src/index.ts → CONSERVATIVE_2021"
    d.p("Source: " + src, size=9, color=GREY, before=0, after=0)
    if slug in SLIDES:
        d.p("Slide captions: frontend/src/lib/assessment-slides.ts", size=9, color=GREY,
            before=0, after=0)
    d.p("Shared template copy for this page (trust badges, button labels, boilerplate) is "
        "under Assessment detail page template.", size=9, italic=True, color=GREY,
        before=4, after=2)

    metadata_section(d, title + " | Energy Policy Monitor", a["claim"])

    section(d, "Page header [.detail-hero]")
    d.label("Jurisdiction badge [.badge-jurisdiction]")
    d.copy(a["jurisdiction"])
    d.label("Heading [.detail-title]")
    d.copy(title)
    d.label("Byline [.detail-byline]: published date, sector, lead")
    d.copy(date_label(a))
    d.copy(a["sector"])
    d.copy(a.get("lead") or "Open Insights")

    if a.get("isExample") is not False:
        section(d, "Example assessment notice [.example-notice]")
        d.p("Shown on this page. Wording is under Assessment detail page template.",
            size=10, color=GREY, before=0, after=2)

    if a.get("execSummary"):
        section(d, "Executive summary [.detail-exec-summary]")
        d.label("Heading")
        d.copy("Executive summary")
        d.label("Body")
        d.copy(a["execSummary"])

    if slug in SLIDES:
        section(d, "Slideshow captions [.slideshow]")
        d.p("One title and one description per slide, shown under the slide in full screen. "
            "The slides themselves are images and their on-slide wording is not in this deck.",
            size=10, color=GREY, before=0, after=3)
        for i, (st, sd) in enumerate(SLIDES[slug], 1):
            d.label("Slide %d of %d: title, then description" % (i, len(SLIDES[slug])))
            d.copy(st)
            d.copy(sd)
    else:
        section(d, "Charts placeholder [.charts-placeholder]")
        d.p("This assessment has no slides, so the placeholder shows instead. Wording is "
            "under Assessment detail page template.", size=10, color=GREY, before=0, after=2)

    if a.get("findings"):
        section(d, "Key findings [.findings-list]")
        d.label("Heading")
        d.copy("Key findings")
        for i, f in enumerate(a["findings"], 1):
            d.label("Finding %d" % i)
            d.copy(strip_tags(f["text"]))
        if first:
            d.box("Flag: the findings are stored with formatting tags inside the text",
                  ["In the database, each finding is one long line with HTML bold tags "
                   "inside it, which is how the headline phrase and the number come out "
                   "bold on the page. The wording above is reproduced without those tags. "
                   "If you suggest a change to a finding, suggest the words only and leave "
                   "the bolding to whoever applies the edit. This applies to all six "
                   "assessments."])

    if a.get("methodologySummary") or a.get("assumptionsSummary"):
        section(d, "Summaries [.detail-section]")
        d.label("Heading")
        d.copy("Summaries")
        if a.get("methodologySummary"):
            d.heading("Methodology summary [.disclosure]", 3)
            d.p("Collapsed until the visitor clicks it.", size=9, color=GREY,
                before=0, after=2)
            for blk in [b.strip() for b in a["methodologySummary"].split("\n\n") if b.strip()]:
                if blk.startswith("## "):
                    d.label("Sub-heading")
                    d.copy(blk[3:])
                else:
                    d.copy(blk)
        if a.get("assumptionsSummary"):
            d.heading("Assumptions summary [.disclosure]", 3)
            d.p("Collapsed until the visitor clicks it.", size=9, color=GREY,
                before=0, after=2)
            for blk in [b.strip() for b in a["assumptionsSummary"].split("\n\n") if b.strip()]:
                if blk.startswith("## "):
                    d.label("Sub-heading")
                    d.copy(blk[3:])
                else:
                    d.copy(blk)

    if a.get("limitations"):
        section(d, "Limitations and uncertainty [.limitations-section]")
        d.label("Heading")
        d.copy("Limitations and uncertainty")
        for blk in [b.strip() for b in a["limitations"].split("\n\n") if b.strip()]:
            if blk.startswith("## "):
                d.label("Sub-heading [.limitations-heading]")
                d.copy(blk[3:])
            else:
                d.copy(blk)

    if a.get("citation"):
        section(d, "Citation [.cite-block]")
        d.label("Citation text [.cite-text]")
        d.copy(a["citation"])

    if a.get("epmPlus"):
        section(d, "EPM+ block [.epm-plus-section]")
        d.p("Shown on this page. Wording is under Assessment detail page template.",
            size=10, color=GREY, before=0, after=2)

    section(d, "Quick facts sidebar [.quick-facts]")
    if a.get("quote"):
        d.label("Pull quote [.qf-quote]: shown in quotation marks on the page")
        d.copy(a["quote"])
        d.label("Quote attribution [figcaption]")
        d.copy(a["quoteAttribution"])
    d.label("Emissions claim")
    d.copy(a["claim"])
    if a.get("modelledValue"):
        d.label("Modelled value")
        d.copy(a["modelledValue"])
    d.label("Jurisdiction / Sector / Policy status")
    d.copy(a["jurisdiction"])
    d.copy(a["sector"])
    d.copy(a["policyStatus"])

    section(d, "Card summary, shown on the home page and the assessments list [.assessment-card]")
    d.label("EPM Finding [.card-finding-text]")
    d.copy(a["finding"])
    if a.get("tags"):
        d.label("Tags [.tag]: the first five show on the card")
        d.bullets(list(a["tags"]))
