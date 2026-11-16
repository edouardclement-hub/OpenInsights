# -*- coding: utf-8 -*-
"""Team, About, Contact, Privacy, Terms, Login and 404 pages."""
from front_matter import section, page_head, metadata_section
from deckkit import GREY


def build_team(d):
    page_head(d, "Team", "/team", ["frontend/src/app/team/page.tsx"])
    metadata_section(d, "Team | Energy Policy Monitor",
                     "Who produces the EPM — Open Insights team, EPM leadership, and the "
                     "steering committee.")

    section(d, "Page header [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("The people")
    d.label("Heading [h1]")
    d.copy("Who produces the EPM")
    d.label("Body")
    d.copy("A collaboration between the Open Insights team, the Energy Modelling Hub, and "
           "university research partners.")

    section(d, "Open Insights Team [.team-group]")
    d.label("Group heading [.team-group-title]")
    d.copy("Open Insights Team")
    d.label("Group description [.team-group-desc]")
    d.copy("Project leadership and strategic communications.")
    members = [
      ("Deven Azevedo", "Project Director, Open Insights",
       "Leads the Open Insights initiative and oversees strategy for the EPM and "
       "modelling platforms."),
      ("Dr. Madeleine McPherson",
       "Principal Investigator, SESIT Group — Associate Professor, University of Victoria",
       "Leads the EPM initiative, overseeing various phases of the EPM analysis and "
       "validation process."),
      ("Aaron Hoyle", "Director of EPM",
       "Leads the EPM initiative, overseeing various phases of the EPM process and "
       "technical framework."),
    ]
    for name, role, bio in members:
        d.label(name + ": name, role, bio [.team-card]")
        d.copy(name)
        d.copy(role)
        d.copy(bio)
    d.label("Photo alt text and link label for each card, built from the name")
    d.copy("Deven Azevedo — LinkedIn profile")
    d.box("Flag: two bios open with the same sentence, and one title is inconsistent",
          ["Dr. McPherson's bio and Aaron Hoyle's bio both begin \"Leads the EPM "
           "initiative, overseeing various phases of the EPM\", and only the last few words "
           "differ. Read side by side it looks like a copy-and-paste that was not finished.",
           "Aaron Hoyle is \"Director of EPM\" here, but the pull quote on the Budget 2026 "
           "assessment calls him \"Director of Energy Policy Monitor\". Pick one.",
           "His photo file is named dr-aaron-hoyle.jpg while the page calls him Aaron "
           "Hoyle with no title. Only the page wording is visible to visitors, but if the "
           "doctorate belongs in his name it is missing, and if it does not the file name "
           "should change."])

    section(d, "Steering Committee [.team-group]")
    d.label("Group heading [.team-group-title]")
    d.copy("Steering Committee")
    d.label("Group description [.team-group-desc]")
    d.copy("Institutional leadership and strategic oversight.")
    d.label("Michael Bernstein: name, then role (no bio on this card)")
    d.copy("Michael Bernstein")
    d.copy("Executive Director, Clean Prosperity Foundation")
    d.box("Flag: a steering committee of one, and the page header promises more",
          ["The header says the EPM is \"A collaboration between the Open Insights team, "
           "the Energy Modelling Hub, and university research partners\", but the page "
           "lists three Open Insights people and one steering committee member, and names "
           "no Energy Modelling Hub staff. The single committee card also sits alone in a "
           "grid built for several, which reads as unfinished."])

    section(d, "Media and inquiries [.team-cta]")
    d.label("Section label [.section-label]")
    d.copy("Media & Inquiries")
    d.label("Body")
    d.copy("For media inquiries, research collaboration requests, or technical questions, "
           "contact the Open Insights team directly.")
    d.label("Button [.btn-primary], links to /contact")
    d.copy("Contact Us")
    d.box("Flag: button capitalisation does not match the rest of the site",
          ["This button says \"Contact Us\" with a capital U. Every other button on the "
           "site uses sentence case: \"Explore assessments\", \"Send message\", \"View full "
           "assessment\", \"Back to home\". The navigation link is simply \"Contact\"."])


def build_about(d):
    page_head(d, "About", "/about",
              ["frontend/src/app/about/page.tsx",
               "frontend/src/components/blocks/FaqAccordion.tsx"])
    metadata_section(d, "About | Energy Policy Monitor",
                     "About the Energy Policy Monitor — independent assessment "
                     "infrastructure for Canadian energy and climate policy.")

    section(d, "Page header [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("About EPM")
    d.label("Heading [h1]")
    d.copy("About the Energy Policy Monitor")
    d.label("Body")
    d.copy("Independent assessment infrastructure for Canadian energy and climate policy.")

    section(d, "What is Open Insights? [.about-main]")
    d.label("Heading [h2]")
    d.copy("What is Open Insights?")
    d.label("First paragraph: Open Insights, SESIT-UVic and Energy Modelling Hub are links")
    d.copy("The Energy Policy Monitor (EPM) is an Open Insights initiative, led by "
           "SESIT-UVic and enabled by Energy Modelling Hub‘s operational support. Open "
           "Insights is a shared framework for transparent energy modelling, providing "
           "open-source data and models and publishing outputs in a consistent and "
           "accessible way. We welcome model development contributions and collaborations "
           "with other academic and non-academic partners.")
    d.box("Flag: wrong apostrophe in \"Energy Modelling Hub‘s\"",
          ["The possessive uses a left single quotation mark (‘) instead of an apostrophe "
           "(’), so it reads \"Hub‘s\" with the mark curling the wrong way. Kept verbatim "
           "above. It is a one-character fix in the code."])
    d.label("Second paragraph: M3 Platform, SESIT-UVic and Energy Modelling Hub are links")
    d.copy("The EPM is Open Insights' flagship assessment service, providing independent, "
           "timely, and credible evaluation of major Canadian energy and climate policy "
           "announcements. Every EPM assessment is powered by the M3 Platform, developed by "
           "SESIT-UVic and maintained by the Energy Modelling Hub.")

    section(d, "Our commitment, three cards [.commitment-cards]")
    d.label("Heading [h2]")
    d.copy("Our commitment")
    cards = [
      ("Timely",
       "Assessments are completed shortly after major energy policy announcements or "
       "election platform releases. Results are published while the policy is still being "
       "actively discussed."),
      ("Independent",
       "The same methodology is applied consistently to every policy and jurisdiction. EPM "
       "assessments are non-partisan reviews committed to sharing modelled outcomes "
       "openly, without advocacy."),
      ("Credible",
       "The full open-source audit trail (code, data, assumptions) is published to a public "
       "repository. Every assessment carries a Zenodo DOI for citation."),
    ]
    for t, b in cards:
        d.label(t + ": card heading, then body [h4]")
        d.copy(t)
        d.copy(b)
    d.box("Flag: the Credible card promises a DOI that five assessments do not have",
          ["\"Every assessment carries a Zenodo DOI for citation\" is true of one of the "
           "six. Three citations carry the placeholder zenodo.XXXXXXX, one says the DOI is "
           "not available, and one says the assessment is still in progress. The claim and "
           "the assessments pages contradict each other."])

    section(d, "How assessments are selected [.about-main]")
    d.label("Heading [h2]")
    d.copy("How assessments are selected")
    d.label("Body: the word major is bold on the page")
    d.copy("The EPM evaluates major Canadian federal or provincial energy or climate policy "
           "announcements, regardless of party or ideology. A policy qualifies for "
           "assessment if it includes specific, modellable energy or emissions measures. "
           "Assessments are not commissioned by governments, parties, or funders.")

    section(d, "Frequently asked questions [.faq-section]")
    d.label("Heading [h2]")
    d.copy("Frequently asked questions")
    d.p("Six questions, each collapsed until clicked.", size=9, color=GREY,
        before=0, after=2)
    faqs = [
      ("What is the EPM?",
       "The Energy Policy Monitor (EPM) is an independent, timely, and credible assessment "
       "framework for major Canadian energy and climate policy. Each assessment evaluates a "
       "proposed policy or announcement's projected impact on emissions, energy systems, "
       "and socio-economic indicators using open-source modelling infrastructure. All "
       "results, code, data, and assumptions are published publicly for public review and "
       "replication."),
      ("What's the difference between EPM Core and EPM+?",
       "EPM Core is the standard rapid-response assessment: a 2-page neutral summary, full "
       "data package, and public audit trail. EPM+ is an additional follow-on brief "
       "authored by an academic partner, offering expert interpretation, policy sensitivity "
       "analysis, and regional implications. EPM+ is published on a variable timeline after "
       "EPM Core concludes."),
      ("How long does an assessment take?",
       "EPM Core assessments are typically completed within a few weeks of a policy "
       "announcement. The process moves through four phases: policy encoding, baseline "
       "validation, model runs, and results review and publication. EPM+ briefs are "
       "published on a variable schedule following EPM Core."),
      ("Who can request an assessment?",
       "Assessment requests are open to any individual, organization, or institution. All "
       "requests are reviewed against EPM's scope criteria: the policy must include "
       "specific, modellable energy or emissions measures. The same methodology applies "
       "regardless of who submitted the request."),
      ("How do I cite an EPM assessment in my research?",
       "Each assessment detail page includes a pre-formatted citation. Click \"Copy "
       "citation\" on any assessment page to get the full citation. All assessments are "
       "archived on Zenodo and carry permanent DOIs."),
      ("How is the EPM funded?",
       "EPM is a collaborative effort between Open Insights and its funders. EPM does not "
       "accept direct funding from governments, political parties, or industry bodies."),
    ]
    for i, (q, a) in enumerate(faqs, 1):
        d.label("Question %d: question, then answer [.faq-item]" % i)
        d.copy(q)
        d.copy(a)
    d.box("Flag: three FAQ answers do not match the site or each other",
          ["\"How long does an assessment take?\" says the process has four phases. The "
           "methodology page shows five, numbered 00 to 04. The four named here are phases "
           "1 to 4, so phase 0 is missing rather than the count being wrong, but a reader "
           "comparing the two pages will see a mismatch.",
           "\"Who can request an assessment?\" says requests are open to anyone, but there "
           "is no way to submit one. The contact form has a free-text subject field and "
           "nothing that mentions assessment requests.",
           "\"How is the EPM funded?\" says EPM \"is a collaborative effort between Open "
           "Insights and its funders\" without naming a single funder, while the same "
           "sentence rules out three categories of funder. For a project whose whole claim "
           "is independence, this is the answer most likely to be pressed on."])

    section(d, "Institutional structure, sidebar [.institution-diagram]")
    d.label("Heading [h3]")
    d.copy("Institutional structure")
    d.label("First node: name, then role")
    d.copy("Academic partners")
    d.copy("Build open-source modelling tools.")
    d.label("Joining symbol between the two nodes [.institution-plus]")
    d.copy("+")
    d.label("Second node: name, then role")
    d.copy("Energy Modelling Hub")
    d.copy("Operates and hosts the open-source infrastructure that EPM relies on.")
    d.label("Equals symbol, drawn in by styling rather than typed [.institution-equals]")
    d.copy("=")
    d.label("Result [.institution-result]")
    d.copy("Open Insights publishes transparent assessments and documentation for the "
           "public.")


def build_contact(d):
    page_head(d, "Contact", "/contact",
              ["frontend/src/app/contact/page.tsx",
               "frontend/src/components/blocks/ContactForm.tsx"])
    metadata_section(d, "Contact | Energy Policy Monitor",
                     "Get in touch with the Energy Policy Monitor team at Open Insights.")

    section(d, "Page header [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("Get in touch")
    d.label("Heading [h1]")
    d.copy("Contact the EPM team")
    d.label("Body")
    d.copy("Have a question, a policy to flag, or an academic partnership in mind? Reach "
           "out.")

    section(d, "Message form [.contact-form-section]")
    d.label("Heading [h2]")
    d.copy("Send us a message")
    d.label("Body")
    d.copy("We read everything and respond within a few business days.")
    d.label("Field labels, in order: Organization is the only optional one")
    d.bullets(["Name", "Email", "Organization", "Subject", "Message"])
    d.p("No field has placeholder text or help text. Required fields are not marked as "
        "required in words.", size=9, color=GREY, before=2, after=2)
    d.label("Submit button, at rest then while sending [.btn-primary]")
    d.bullets(["Send message", "Sending…"])
    d.label("Confirmation after a successful send: heading, then body [.form-confirmed]")
    d.copy("Message received.")
    d.copy("Thanks — we'll get back to you by email shortly.")
    d.box("Flag: the error message shown to visitors is raw technical text",
          ["If the form fails to send, the page prints whatever the error was, for example "
           "\"Submit failed: 500\". There is no written error message for a visitor, and no "
           "suggestion to email instead. Worth writing one line of plain copy for this, "
           "since the form failing is exactly when someone needs the email address."])
    d.box("Flag: the form promises a reply, the confirmation promises a different one",
          ["The intro says \"we read everything and respond within a few business days\" "
           "and the confirmation says \"we'll get back to you by email shortly\". Shortly "
           "and a few business days are not the same promise."])

    section(d, "Other ways to reach us [.contact-info]")
    d.label("Heading [h2]")
    d.copy("Other ways to reach us")
    d.label("Body")
    d.copy("Prefer email or social? Here's where to find the EPM team.")
    d.label("Email channel: label, value, note [.contact-channel]")
    d.copy("Email")
    d.copy("deven@openinsights.ca")
    d.copy("For media, research, and partnership inquiries.")
    d.label("Location channel: label, value, note [.contact-channel]")
    d.copy("Location")
    d.copy("Ottawa, ON · Canada")
    d.copy("Remote-first team across Canada.")
    d.box("Flag: the sidebar offers social channels that are not there",
          ["The intro asks \"Prefer email or social?\" and the sidebar then lists an email "
           "address and a location. There are no social links on this page, and none "
           "anywhere else on the site. Either add them or drop the word social.",
           "The footer also has a block styled as social buttons [.footer-social] that "
           "holds the privacy and terms icons instead. Nothing a visitor sees is wrong, but "
           "a developer reading the code will expect social links there."])


def build_privacy_and_terms(d):
    page_head(d, "Privacy policy", "/privacy", ["No source file. This page does not exist."])
    section(d, "Whole page", status="Not live. No page has been built.")
    d.box("Flag: linked from every page, but the page was never written",
          ["The shield icon in the footer links to /privacy on every page of the site. "
           "There is no privacy page in the repository, so the link lands on the 404 page.",
           "There is no copy to review yet. The site does set a cookie when someone enters "
           "the access password, and the contact form collects a name, an email address, an "
           "organization and a message, so there is something to describe once the page is "
           "written.",
           "Nothing is published here, so this entry is a placeholder for the team to draft "
           "into rather than copy to edit."])

    page_head(d, "Terms of use", "/terms", ["No source file. This page does not exist."])
    section(d, "Whole page", status="Not live. No page has been built.")
    d.box("Flag: linked from every page, but the page was never written",
          ["The document icon in the footer links to /terms on every page of the site. "
           "There is no terms page in the repository, so the link lands on the 404 page.",
           "The footer already asserts \"All rights reserved\" while the assessments are "
           "published as open source with Zenodo DOIs, so the terms page is where those two "
           "positions need reconciling.",
           "Nothing is published here, so this entry is a placeholder for the team to draft "
           "into rather than copy to edit."])


def build_login(d):
    page_head(d, "Access password", "/login",
              ["frontend/src/app/login/page.tsx", "frontend/src/middleware.ts"])
    d.p("This is the first page anyone sees. The whole site sits behind it while the site "
        "is in private review.", size=10, color=GREY, before=0, after=4)
    metadata_section(d, "Energy Policy Monitor — Open Insights", DEFAULT_DESC_LOGIN)

    section(d, "Password card [.login-card]")
    d.label("Eyebrow [.login-eyebrow]")
    d.copy("Energy Policy Monitor")
    d.label("Heading [h1]")
    d.copy("Site under preview")
    d.label("Body")
    d.copy("This site is in private review. Enter the access password to continue.")
    d.label("Password field: screen reader label, then placeholder")
    d.copy("Password")
    d.copy("Password")
    d.label("Button, at rest then while checking")
    d.bullets(["Enter", "Checking…"])
    d.label("Error messages [.login-error]")
    d.bullets(["Incorrect password.", "Something went wrong. Try again."])
    d.label("Footer line [.login-footer]: the address is a mailto link")
    d.copy("For access, contact deven@openinsights.ca.")
    d.label("Fallback shown while the card loads")
    d.copy("Loading…")
    d.box("Flag: this page carries the whole site's title and description",
          ["The login page sets no page metadata of its own, so its tab title is \"Energy "
           "Policy Monitor — Open Insights\" and its description is the site-wide one about "
           "assessments and transparent modelling. For a page that only asks for a "
           "password, both are misleading, and the description would be what a search "
           "engine or a link preview shows for the entire site while the gate is up."])


DEFAULT_DESC_LOGIN = ("Independent, data-driven assessments of Canadian energy policy. "
                      "Transparent modelling, traceable findings, publicly archived.")


def build_404(d):
    page_head(d, "Page not found (404)", "/404", ["frontend/src/app/not-found.tsx"])
    d.p("Shown for any address that does not exist, including the privacy and terms links "
        "in the footer.", size=10, color=GREY, before=0, after=4)
    metadata_section(d, "Energy Policy Monitor — Open Insights", DEFAULT_DESC_LOGIN)

    section(d, "Message [.page-header]")
    d.label("Section label [.section-label]")
    d.copy("404")
    d.label("Heading [h1]")
    d.copy("Page not found")
    d.label("Body")
    d.copy("The page you're looking for doesn't exist or has been moved.")
    d.label("Button [.btn-primary], links to the home page")
    d.copy("Back to home")


def build_unused(d):
    d.heading("Copy in the code that nothing displays", 1)
    d.p("Found while going through the source. None of this is on the site. It is listed so "
        "the team knows it exists and can decide whether to remove it.",
        size=10, color=GREY, before=2, after=4)

    section(d, "Logo picker label [.logo-option.selected]",
            status="Not live. Styling exists, nothing uses it.")
    d.label("Text")
    d.copy("✓ Selected")
    d.box("Flag: left over from a logo chooser that is no longer on the site",
          ["frontend/src/app/epm.css still styles a set of selectable logo options and "
           "writes the words \"✓ Selected\" onto the chosen one. No page uses those styles. "
           "Safe to delete, and worth deleting so nobody tries to review copy for a feature "
           "that was removed."])
