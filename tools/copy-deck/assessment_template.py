# -*- coding: utf-8 -*-
"""Assessment detail page template: the chrome shared by all six assessment pages."""
from front_matter import section
from deckkit import GREY


def build_assessment_template(d):
    d.heading("Assessment detail page template", 1)
    d.p("Every assessment page is built from one template. The labels, buttons, notices "
        "and boilerplate below are identical on all six, so they are written out once "
        "here. Each assessment then gets its own entry in this deck carrying only the "
        "copy written for that policy.", size=10, color=GREY, before=2, after=4)
    d.p("Source: frontend/src/app/assessments/[slug]/page.tsx, "
        "frontend/src/components/blocks/AssessmentSlideshow.tsx, "
        "frontend/src/components/blocks/AssessmentDisclosure.tsx, "
        "frontend/src/components/blocks/CopyCitation.tsx",
        size=9, color=GREY, before=0, after=2)

    section(d, "Page metadata fallbacks [document head]")
    d.p("Used when an assessment address does not match a record, or the database cannot "
        "be reached.", size=9, color=GREY, before=0, after=2)
    d.label("<title> when no record matches the address")
    d.copy("Assessment not found")
    d.label("<title> when the database cannot be reached")
    d.copy("Assessment")
    d.box("Flag: a missing assessment gives two different pages",
          ["If the address does not match a record the visitor gets the standard 404 page, "
           "whose wording is under Page not found, but the browser tab says \"Assessment "
           "not found\". If the database is unreachable the tab just says \"Assessment\". "
           "Neither phrase appears anywhere the visitor can actually see, so both are "
           "invisible in practice and only show up in a tab, a bookmark or a search result."])

    section(d, "Dark page header [.detail-hero]")
    d.label("Breadcrumb trail [.detail-breadcrumb]")
    d.bullets(["Home", "Assessments", "(the assessment title, not a link)"])
    d.label("Byline labels, which sit around the record values [.detail-byline]")
    d.bullets(["Published", "Sector:", "Lead:"])
    d.label("Lead value when the record leaves it blank")
    d.copy("Open Insights")
    d.label("Trust badges [.trust-badge]")
    d.bullets(["QAQC validated", "Open source", "Zenodo citable"])

    section(d, "Example assessment notice [.example-notice]")
    d.p("Shown on any assessment that is not marked as real. Five of the six carry it.",
        size=9, color=GREY, before=0, after=2)
    d.label("Label")
    d.copy("Example assessment")
    d.label("Body")
    d.copy("This is a fictional example assessment. It was created for demonstration "
           "purposes only and does not represent a real policy evaluation, real modelled "
           "findings, or the views of any organization.")

    section(d, "Section headings in the main column [.detail-content]")
    d.label("Headings, in the order they appear")
    d.bullets(["Executive summary", "Key findings", "Summaries",
               "Limitations and uncertainty", "Methodology"])
    d.label("Collapsible sub-headings inside Summaries [.disclosure-trigger]")
    d.bullets(["Methodology summary", "Assumptions summary"])

    section(d, "Slideshow [.slideshow]")
    d.p("Only two assessments have slides. The other four show the placeholder below.",
        size=9, color=GREY, before=0, after=2)
    d.label("Expand button, visible label [.slideshow-expand-badge]")
    d.copy("Expand")
    d.label("Expand button, tooltip")
    d.copy("Click to expand")
    d.label("Expand button, screen reader label")
    d.copy("Expand slide 1 of 8 to full screen")
    d.label("Arrow buttons, screen reader labels [.slideshow-nav]")
    d.bullets(["Previous slide", "Next slide"])
    d.label("Dots, screen reader label [.slideshow-dots]")
    d.copy("Go to slide 1")
    d.label("Full screen view, close button, screen reader label [.lightbox-close]")
    d.copy("Close full screen (Escape)")
    d.label("Full screen view, screen reader label for the whole panel [.lightbox]")
    d.copy("Budget 2026. Slide 1 of 8.")
    d.label("Full screen slide counter [.lightbox-caption]")
    d.copy("1 / 8")

    section(d, "Charts placeholder [.charts-placeholder]")
    d.p("Stands in for the slideshow on the four assessments that have no slides.",
        size=9, color=GREY, before=0, after=2)
    d.label("Label")
    d.copy("Charts & visualizations")
    d.label("Sub-label")
    d.copy("Reserved for upcoming slides · 16:9")
    d.label("Screen reader label for the block")
    d.copy("Charts and visualizations placeholder")

    section(d, "Citation block [.cite-block]")
    d.label("Label")
    d.copy("How to cite this assessment")
    d.label("Copy button, before and after clicking [.btn-copy-cite]")
    d.bullets(["Copy citation", "Copied!"])
    d.label("Warning shown on the five example assessments [.cite-do-not-cite]")
    d.copy("This is a fictional example. Do not cite.")

    section(d, "EPM+ block [.epm-plus-section]")
    d.p("Shown on the two assessments flagged as having an EPM+ brief.",
        size=9, color=GREY, before=0, after=2)
    d.label("Badge")
    d.copy("EPM+")
    d.label("Heading")
    d.copy("Expert interpretive brief available")
    d.label("Body")
    d.copy("An academic partner has published an interpretive brief on this assessment.")

    section(d, "Methodology boilerplate at the foot of every assessment")
    d.label("Body (the model name is taken from the record and is M3 Platform on all six)")
    d.copy("This assessment was produced using the M3 Platform, a suite of energy-economy "
           "models maintained by the Energy Modelling Hub and supported by Open Insights "
           "and academic partners. Policy measures were encoded using the standardized EPM "
           "Policy Encoding framework, run against the EMH Assumptions Database baseline, "
           "and validated through independent QAQC review.")
    d.label("Link out")
    d.copy("View full methodology →")

    section(d, "Quick facts sidebar [.quick-facts]")
    d.label("Heading")
    d.copy("Quick facts")
    d.label("Row labels, in order [.qf-label]")
    d.bullets(["Emissions claim", "Modelled value", "Jurisdiction", "Sector",
               "Policy status"])

    section(d, "Download and link buttons [.quick-facts]")
    d.label("Available, primary buttons [.download-btn-primary]: label, then tag")
    d.bullets(["Zenodo 2-page brief  /  PDF", "IDEA dashboard  /  INTERACTIVE"])
    d.label("Available, secondary buttons [.download-btn]")
    d.bullets(["Results dataset", "Policy encoding sheet", "View source code",
               "Assumptions", "CODERS data list"])
    d.label("Unavailable states, shown when the record has no link for that item")
    d.bullets(["Zenodo brief - not available",
               "Results dataset — coming soon",
               "Policy encoding sheet — coming soon",
               "View source code — coming soon",
               "Assumptions — coming soon"])
    d.label("Tooltip on all four secondary download buttons [.download-tooltip]")
    d.copy("Technical modelling expertise required to replicate results.")
    d.label("Tooltip on the CODERS button [.download-tooltip]")
    d.copy("Historical Canadian capacity, demand, and renewable-resource data used by COPPER.")
    d.box("Flag: the unavailable Zenodo button is worded differently from the other four",
          ["Four of the five say \"— coming soon\" with an em dash. The Zenodo one says "
           "\"- not available\" with a hyphen. Worth settling on one wording and one dash, "
           "since a visitor can see all five side by side."])

    section(d, "Image alt text [.detail-photo, .card-visual]")
    d.label("Lead image on the assessment page")
    d.copy("Falls back to the assessment title when the record carries no alt text. All six "
           "records currently carry none, so the title is what screen readers hear.")
    d.label("Card image on the assessments list and home page")
    d.copy("Falls back to the sector name plus the word sector, for example "
           "\"Cross-cutting sector\". All six records currently carry no alt text.")
    d.box("Flag: no assessment has real alt text",
          ["Every assessment image is described either by the page title or by a phrase "
           "built from the sector, because no record has alt text of its own. These are "
           "photographs and charts, so a sighted visitor gets information a screen reader "
           "user does not. A sentence of alt text per image would close that gap."])

    return d
