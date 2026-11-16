# -*- coding: utf-8 -*-
"""Report copy that is in the site's code but not in the generated deck.

Assessment records and slide captions are read live, so they never drift. Page
copy lives in .tsx files and is transcribed inside the pages_*.py modules, so it
CAN drift once someone edits a page. This walks the .tsx files, pulls out the
strings a visitor would see, and lists any that are missing from the deck.

False positives are possible; treat the output as "look at these", not "these
are broken".
"""
import html as htmllib
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
SRC = os.path.join(REPO, "frontend", "src")
DEFAULT_DOCX = os.path.join(REPO, "EPM_Website_Copy_Deck.docx")

# Object keys whose string values end up on screen.
PROP_KEYS = ("aria-label", "placeholder", "title", "alt", "label", "question",
             "answer", "desc", "sub", "bio", "role", "name", "text", "eyebrow",
             "phase")

# Anything matching these is code that happened to sit between > and <.
CODE_HINTS = ("=>", "{", "}", "===", "!==", "const ", "let ", "useState",
              "useRef", "return", "React.", "props.", "=> (", "||", "&&",
              "import ", "export ", "function ", ".map(", ".filter(", ": string",
              "number", "boolean", "null);", "(null)", "async ", "await ")


def norm(s):
    return re.sub(r"\s+", " ", htmllib.unescape(s)).strip()


def looks_like_copy(s):
    if len(s) < 3 or len(s) > 600:
        return False
    if not re.search(r"[A-Za-z]{2}", s):
        return False
    if any(h in s for h in CODE_HINTS):
        return False
    if s.startswith(("http", "/", ".", "#", "(", "[", ",", ":", ";")):
        return False
    # code-ish fragments such as "45) (dx" or "3] = foo"
    if re.match(r"^\d+\s*[)\]]", s):
        return False
    if re.fullmatch(r"[\W\d\s]+", s):
        return False
    # bare identifiers / enum-ish values
    if s.lower() in ("true", "false", "null", "button", "submit", "text", "email",
                     "password", "dialog", "tablist", "tab", "note", "carousel"):
        return False
    return True


def site_strings():
    found = {}
    for root, _, files in os.walk(SRC):
        if os.sep + "api" + os.sep in root + os.sep:
            continue
        for fn in sorted(files):
            if not fn.endswith((".tsx", ".ts")):
                continue
            path = os.path.join(root, fn)
            rel = os.path.relpath(path, REPO)
            src = open(path, encoding="utf-8").read()
            cands = set()
            for m in re.finditer(r">([^<>{}\n][^<>{}]{2,})<", src):
                cands.add(norm(m.group(1)))
            keys = "|".join(re.escape(k) for k in PROP_KEYS)
            for m in re.finditer(r'(?:%s)\s*[:=]\s*"((?:[^"\\]|\\.){3,})"' % keys, src):
                cands.add(norm(m.group(1).replace('\\"', '"')))
            for c in cands:
                if looks_like_copy(c):
                    found.setdefault(c, rel)
    return found


def deck_text(docx_path):
    from docx import Document
    d = Document(docx_path)
    parts = [p.text for p in d.paragraphs]
    for t in d.tables:
        for row in t.rows:
            for cell in row.cells:
                parts.extend(p.text for p in cell.paragraphs)
    return norm(" \n ".join(parts))


def report(docx_path=None):
    docx_path = docx_path or DEFAULT_DOCX
    if not os.path.exists(docx_path):
        print("\nDrift check skipped: %s not found" % docx_path)
        return []
    blob = deck_text(docx_path)
    missing = [(f, s) for s, f in sorted(site_strings().items(), key=lambda kv: kv[1])
               if s not in blob]
    print("\nDrift check")
    if not missing:
        print("  Clean. Every visible string in the page code appears in the deck.")
        return []
    print("  %d string(s) in the code are not in the deck." % len(missing))
    print("  Page copy is transcribed in tools/copy-deck/pages_*.py; update it there.")
    for f, s in missing:
        print("    %-46s %s" % (f, s if len(s) <= 90 else s[:87] + "..."))
    return missing


if __name__ == "__main__":
    sys.exit(1 if report(sys.argv[1] if len(sys.argv) > 1 else None) else 0)
