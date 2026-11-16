# -*- coding: utf-8 -*-
"""Build EPM_Website_Copy_Deck.docx from the live site's sources.

  python3 tools/copy-deck/build_deck.py [output.docx]

Reads assessment records from the production CMS and slide captions from
frontend/src/lib/assessment-slides.ts. Page copy is transcribed inside the
pages_*.py modules, so check_drift.py runs afterwards to report anything in the
code that no longer matches.
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))

from deckkit import Deck, set_modern_compat
from sources import fetch_assessments, strapi_url
from front_matter import build_front, DATE
from assessment_template import build_assessment_template
from pages_core import build_home, build_assessments_list, build_assessment
from pages_methodology import build_assessment_flags, build_methodology
from pages_rest import (build_team, build_about, build_contact,
                        build_privacy_and_terms, build_login, build_404,
                        build_unused)

DEFAULT_OUT = os.path.join(REPO, "EPM_Website_Copy_Deck.docx")


def main():
    out = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUT

    print("Copy deck")
    print("  date        %s" % DATE)
    print("  CMS         %s" % strapi_url())
    assessments = fetch_assessments()
    print("  assessments %d" % len(assessments))

    d = Deck(out)
    build_front(d)
    build_assessment_template(d)
    build_home(d)
    build_assessments_list(d)
    # Newest first, the order /assessments itself uses.
    for i, a in enumerate(assessments):
        build_assessment(d, a, first=(i == 0))
        build_assessment_flags(d, a["slug"])
    build_methodology(d)
    build_team(d)
    build_about(d)
    build_contact(d)
    build_privacy_and_terms(d)
    build_login(d)
    build_404(d)
    build_unused(d)
    d.save()
    set_modern_compat(out)

    doc = d.doc
    pages = sum(1 for p in doc.paragraphs if p.style.name == "Heading 1")
    secs = sum(1 for p in doc.paragraphs if p.style.name == "Heading 2")
    flags = sum(1 for t in doc.tables
                if len(t.rows) == 1 and len(t.columns) == 1
                and t.cell(0, 0).paragraphs[0].text.startswith("Flag"))
    print("\n  wrote %s" % out)
    print("  %d entries, %d sections, %d flags" % (pages, secs, flags))

    try:
        from check_drift import report
        report()
    except Exception as e:
        print("\n  (drift check skipped: %s)" % e)


if __name__ == "__main__":
    main()
