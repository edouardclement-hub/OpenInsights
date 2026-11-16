# -*- coding: utf-8 -*-
"""Per-assessment flags and the remaining site pages."""
from front_matter import section, page_head, metadata_section
from deckkit import GREY

ASSESSMENT_FLAGS = {
 "powering-canada-strong-financing-the-build": [
  ("Flag: a named colleague is quoted at length on a fictional assessment",
   ["The pull quote in the sidebar is attributed to \"Aaron Hoyle, Director of Energy "
    "Policy Monitor\" and reads as a real statement about real modelling results. The "
    "assessment carrying it is marked as a fictional example. Either the quote is real "
    "work that is being shown as fiction, or a real person is being quoted saying "
    "something he did not say. Worth resolving before the gate comes off the site."]),
  ("Flag: placeholder text left inside the citation",
   ["The citation ends \"DOI: [not available - fictional]\", square brackets and all. It "
    "sits directly above a Copy citation button, so anyone clicking that button copies "
    "the placeholder."]),
  ("Flag: dated September 2026, which reads as the current month",
   ["This page is dated September 2026 and describes a federal budget. It is the newest "
    "item on the site and the first card a visitor sees on the home page, which makes the "
    "fictional example the most prominent thing on the site."]),
 ],
 "bc-building-electrification-standard-2026-implementation": [
  ("Flag: a promised date that has passed, written in US format",
   ["The finding reads \"Assessment in progress. Results expected by July 28, 2025.\" That "
    "date is well past. The date is also written month-first, which is the US order; "
    "everywhere else the site uses a month and a year only."]),
  ("Flag: holding copy in place of findings",
   ["Both the modelled value and the executive summary open with \"Assessment in "
    "progress\", and the two key findings are holding text rather than findings. The page "
    "is live and reachable in this state."]),
 ],
 "federal-clean-electricity-regulations-draft-framework": [
  ("Flag: placeholder DOI in the citation",
   ["The citation ends \"https://doi.org/10.5281/zenodo.XXXXXXX\". The same placeholder "
    "appears on the Alberta and NDP assessments. All three sit above a Copy citation "
    "button."]),
 ],
 "alberta-emissions-reduction-and-energy-development-plan": [
  ("Flag: placeholder DOI in the citation",
   ["The citation ends \"https://doi.org/10.5281/zenodo.XXXXXXX\", the same placeholder "
    "used on two other assessments."]),
 ],
 "ndp-federal-election-platform-energy-climate-chapter": [
  ("Flag: placeholder DOI, and a numbering scheme only some assessments use",
   ["The citation ends \"https://doi.org/10.5281/zenodo.XXXXXXX\". It also calls this \"EPM "
    "Assessment #003\". Four of the six assessments are numbered this way and two are not, "
    "so the numbers imply a sequence the site does not actually keep."]),
 ],
 "conservative-party-federal-election-platform-2021-energy-climate": [
  ("Flag: the only real assessment, and its first slide is an internal note",
   ["Slide 1 is titled \"For the EPM team\" and described as a \"Mock-up of what this deck "
    "could look like at release\". That is a note to colleagues sitting on the opening "
    "slide of the one genuine assessment on the site, where every visitor sees it first."]),
  ("Flag: the claim and the finding use the same figure for opposite things",
   ["The claim says emissions reach \"440 Mt CO₂e by 2030, representing a 35% fall from "
    "current levels\". The finding says EPM estimates a 6% decline \"versus the 35% "
    "decrease by 2030 the Paris Agreement target requires\". So 35% is presented once as "
    "what the platform claims and once as what Paris requires. Readers comparing the two "
    "lines will assume one of them is wrong."]),
  ("Flag: published in 2021, cited as 2026",
   ["The byline reads \"Summer 2021\" and the citation reads \"Open Insights. (2026)\". One "
    "of the two needs changing."]),
 ],
}


def build_assessment_flags(d, slug):
    for title, lines in ASSESSMENT_FLAGS.get(slug, []):
        d.box(title, lines)


# ------------------------------------------------------- Methodology
def build_methodology(d):
    page_head(d, "Methodology", "/methodology",
              ["frontend/src/app/methodology/page.tsx",
               "frontend/src/components/blocks/M3PlatformSchematic.tsx"])
    metadata_section(d, "Methodology | Energy Policy Monitor",
                     "How every EPM assessment is built — a standardized, reproducible "
                     "process from policy announcement to published results.")

    section(d, "Page header [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("Technical framework")
    d.label("Heading [h1]")
    d.copy("How every assessment is built")
    d.label("Body")
    d.copy("A standardized, reproducible process from policy announcement to published "
           "results.")

    section(d, "Introduction [.method-intro]")
    d.label("Body: M3 Platform is a link to m3.cme-emh.ca")
    d.copy("Every EPM assessment is produced using the M3 Platform, a suite of "
           "energy-economy models capable of evaluating policy and regulatory proposals at "
           "federal, provincial, and regional resolutions.")

    section(d, "M3 Platform diagram [M3PlatformSchematic]")
    d.p("An interactive diagram. The five model boxes in the middle row expand when "
        "clicked. Screen reader label for the whole diagram: \"M3 Platform capabilities "
        "schematic\".", size=10, color=GREY, before=0, after=3)
    d.label("Diagram title")
    d.copy("M3 Platform")
    d.label("First tier heading, a link to m3.cme-emh.ca")
    d.copy("Open Data: CODERS")
    d.label("First tier boxes: title, then sub-line")
    d.copy("Policy Scenarios")
    d.copy("Carbon pricing, regulations")
    d.copy("Economic & Energy Data")
    d.copy("GDP, fuel prices, trade flows")
    d.copy("Technology Assumptions")
    d.copy("Cost curves, learning rates")
    d.label("Second tier heading, a link to m3.cme-emh.ca")
    d.copy("Open Code: MODELS")

    d.heading("Model boxes, collapsed titles [.ModelCard]", 3)
    d.bullets(["Energy System Models", "Power System Models",
               "Economic & Labour Models", "Sectoral & Technology Models",
               "Integrated Models"])

    d.heading("Model boxes, expanded contents", 3)
    models = [
      ("Energy System Models",
       ["Whole-economy emissions pathways",
        "Oil & gas, buildings, transport, industry",
        "Net-zero scenarios to 2050",
        "Hydrogen pathways & technology mix"],
       ["MESSAGEix-Canada", "CIMS", "EnergyABM"]),
      ("Power System Models",
       ["Least-cost grid configuration",
        "Hourly dispatch & reliability (8,760 hrs)",
        "Interprovincial transmission planning",
        "Wind, solar, storage, SMR, gas + CCS"],
       ["COPPER", "SILVER"]),
      ("Economic & Labour Models",
       ["GDP & household budget impacts",
        "Jobs by sector, occupation & province",
        "Trade flows & tariff analysis",
        "All 10 provinces, 50+ sectors"],
       ["M3 Macromodel", "LabourABM"]),
      ("Sectoral & Technology Models",
       ["Building decarbonization pathways",
        "Clean tech cost forecasts",
        "Solar, wind, EVs, heat pumps, H₂",
        "Uncertainty quantification"],
       ["BDA-OSM", "Tech cost models"]),
      ("Integrated Models",
       ["Demand + supply in one workflow",
        "Electricity price feedbacks",
        "8,760-hour grid feasibility check",
        "Consistent cross-sector scenarios"],
       ["CIMS-COPPER-SILVER"]),
    ]
    for name, caps, tags in models:
        d.label(name + ": capabilities")
        d.bullets(caps)
        d.label(name + ": model name tags")
        d.bullets(tags)
    d.label("Link at the foot of every expanded box")
    d.copy("View model details")

    d.heading("Lower tiers of the diagram", 3)
    d.label("Third tier heading")
    d.copy("Model Outputs")
    d.label("Third tier boxes: title, then sub-line")
    d.copy("Abatement Cost Curves")
    d.copy("Cheapest path to emissions targets")
    d.copy("Grid & Power Flows")
    d.copy("Reliability & dispatch analysis")
    d.copy("Jobs & Economy")
    d.copy("Provincial employment shifts")
    d.copy("Investment & Technology")
    d.copy("Capital flows, cost curves")
    d.label("Fourth tier heading, a link to m3.cme-emh.ca")
    d.copy("Open Visualization: IDEA")
    d.label("Fourth tier box: title, then sub-line")
    d.copy("IDEA Visualization Dashboard")
    d.copy("Explore model inputs, outputs & scenarios interactively")
    d.label("Footer strip label")
    d.copy("Open Source")
    d.label("Footer strip badges, all three link out to m3.cme-emh.ca")
    d.bullets(["Models", "Data (CODERS)", "Visualization (IDEA)"])
    d.box("Flag: the diagram labels data as CODERS in one place and models in another",
          ["The top tier is headed \"Open Data: CODERS\" and the footer badge for data says "
           "\"Data (CODERS)\", but that badge is coloured and bordered to match the models "
           "tier rather than the data tier. A reader following the colours will pair the "
           "wrong label with the wrong tier."])

    section(d, "The EPM assessment process [.timeline]")
    d.label("Heading [.timeline-title]")
    d.copy("The EPM assessment process")
    steps = [
      ("00", "Policy announced", "Phase 0",
       "A major energy or climate policy announcement triggers an EPM scope review."),
      ("01", "Policy encoding", "Phase 1",
       "The EPM team parses and encodes the policy measures using the standardized Policy "
       "Encoding framework."),
      ("02", "Baseline validation", "Phase 2",
       "Baseline data is validated against the Assumptions Database. Scope and sector "
       "coverage are confirmed."),
      ("03", "Model runs", "Phase 3",
       "M3 Platform optimization runs produce emissions, energy system, and socio-economic "
       "results."),
      ("04", "Review & publish", "Phase 4",
       "External QAQC validation, 2-page brief authoring, Zenodo archiving, and public "
       "release."),
    ]
    for n, t, ph, desc in steps:
        d.label("Step " + n + ": number, title, phase, description")
        d.copy(n)
        d.copy(t)
        d.copy(ph)
        d.copy(desc)

    section(d, "Service comparison [.comparison-table]")
    d.label("Left column header: tier, then name [.comparison-col.featured]")
    d.copy("Standard service")
    d.copy("EPM Core")
    d.label("Left column list items")
    d.bullets(["Rapid turnaround from announcement",
               "2-page neutral summary of key findings",
               "Full Policy Encoding Sheet (CSV)",
               "Complete results dataset (ZIP)",
               "Public GitHub repository with code & assumptions",
               "Zenodo archiving with permanent DOI",
               "QAQC validated by independent experts",
               "Model results will be hosted on a dedicated portion of IDEA"])
    d.p("IDEA in the last item is a link to m3.cme-emh.ca.", size=9, color=GREY,
        before=0, after=2)
    d.label("Right column header: tier, name, then note [.comparison-col]")
    d.copy("Expert extension")
    d.copy("EPM+")
    d.copy("Released after EPM Core")
    d.label("Right column body")
    d.copy("EPM+ is an independent academic response to EPM Core. Written by an external "
           "contributor, it explores what the policy means in practice — beyond the neutral "
           "2-page summary.")
    d.label("Right column list heading")
    d.copy("EPM+ briefs include:")
    d.label("Right column list items")
    d.bullets(["Policy sensitivity analysis", "Regional and distributional implications"])
    d.box("Flag: one EPM Core item is written in the future tense",
          ["\"Model results will be hosted on a dedicated portion of IDEA\" sits in a list "
           "of things EPM Core delivers today. Two assessments already link to an IDEA "
           "dashboard, so either the promise has been met and the tense should change, or "
           "it has not and the item does not belong in a list of inclusions."])

    section(d, "Quality assurance [.section-title]")
    d.label("Section label [.section-label]")
    d.copy("Quality assurance")
    d.label("Heading [.section-title]")
    d.copy("Every assessment is QAQC validated")
    d.label("Body")
    d.copy("Before publication, each EPM Core brief passes through an independent "
           "validation process — covering policy encoding accuracy, baseline data currency, "
           "model parameter selection, and results interpretation. Validation status is "
           "published alongside every brief. Contested assumptions or encoding decisions "
           "are disclosed in the technical appendix.")
    d.box("Flag: two promises here are not kept anywhere on the site",
          ["This paragraph says validation status is \"published alongside every brief\" and "
           "that contested decisions are \"disclosed in the technical appendix\". No "
           "assessment page shows a validation status, and there is no technical appendix "
           "on the site. Every assessment does carry a \"QAQC validated\" badge, but that "
           "badge is fixed text on the template rather than a status read from the record, "
           "so it appears on the five fictional assessments too."])
