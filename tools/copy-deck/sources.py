# -*- coding: utf-8 -*-
"""Live inputs for the copy deck: assessment records, slide captions, dates.

Everything here reads the real source so a rebuild picks up changes:
  - assessment records come from the Strapi API the site itself reads
  - slide captions are parsed out of frontend/src/lib/assessment-slides.ts
"""
import json, os, re, urllib.request, urllib.parse
from datetime import datetime, timezone

try:
    from zoneinfo import ZoneInfo
    EASTERN = ZoneInfo("America/Toronto")
except Exception:
    EASTERN = None

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FRONTEND = os.path.join(REPO, "frontend")
SLIDES_TS = os.path.join(FRONTEND, "src", "lib", "assessment-slides.ts")
PROD_STRAPI = "https://cms-production-4424.up.railway.app"
FALLBACK_STRAPI = PROD_STRAPI


def today_label():
    """Canadian long date, e.g. 5 November 2026."""
    d = datetime.now()
    return "%d %s %d" % (d.day, d.strftime("%B"), d.year)


def strapi_url():
    """The CMS the deck reads.

    Pinned to production on purpose. The deck documents the LIVE site, and
    frontend/.env.local often points at a local Strapi whose records differ.
    Override only when you mean to: STRAPI_URL=... npm run copy-deck
    """
    return (os.environ.get("STRAPI_URL") or FALLBACK_STRAPI).rstrip("/")


def fetch_assessments():
    """Every assessment, newest first, exactly as /assessments orders them."""
    base = strapi_url()
    qs = urllib.parse.urlencode({
        "populate": "*",
        "sort[0]": "publishedDate:desc",
        "pagination[pageSize]": "100",
    })
    url = base + "/api/assessments?" + qs
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=45) as r:
        data = json.load(r)
    rows = data.get("data") or []
    if not rows:
        raise SystemExit(
            "No assessments came back from %s.\n"
            "The deck cannot be built without them. Check the CMS is up." % base)
    return rows


def date_label(a):
    """What the byline shows: the record's own label, else month and year.

    Mirrors formatAssessmentDate() in frontend/src/lib/strapi.ts, which parses the
    date as UTC and formats it in the viewer's zone, so the 1st of a month can show
    as the previous month.
    """
    if a.get("publishedDateLabel"):
        return a["publishedDateLabel"]
    raw = a.get("publishedDate")
    if not raw:
        return ""
    dt = datetime.fromisoformat(raw).replace(tzinfo=timezone.utc)
    if EASTERN is not None:
        dt = dt.astimezone(EASTERN)
    return dt.strftime("%B %Y")


def parse_slides():
    """Slide titles and descriptions, read out of assessment-slides.ts.

    Parsed rather than copied so captions cannot drift out of sync with the site.
    """
    if not os.path.exists(SLIDES_TS):
        raise SystemExit("Cannot find %s" % SLIDES_TS)
    src = open(SLIDES_TS, encoding="utf-8").read()

    consts = dict(re.findall(r'const\s+(SLUG_\w+)\s*=\s*"([^"]+)"', src))
    body = src[src.index("ASSESSMENT_SLIDES"):]

    slides = {}
    for m in re.finditer(r'\[(SLUG_\w+)\]:\s*\[(.*?)\n  \],', body, re.S):
        slug = consts.get(m.group(1))
        if not slug:
            continue
        entries = []
        for em in re.finditer(r'\{(.*?)\},', m.group(2), re.S):
            block = em.group(1)
            t = re.search(r'title:\s*"((?:[^"\\]|\\.)*)"', block)
            d = re.search(r'description:\s*"((?:[^"\\]|\\.)*)"', block)
            if t:
                entries.append((
                    t.group(1).replace('\\"', '"').replace("\\'", "'"),
                    d.group(1).replace('\\"', '"').replace("\\'", "'") if d else "",
                ))
        if entries:
            slides[slug] = entries
    if not slides:
        raise SystemExit(
            "Could not read any slide captions from assessment-slides.ts.\n"
            "Its shape has probably changed; update parse_slides() in sources.py.")
    return slides
