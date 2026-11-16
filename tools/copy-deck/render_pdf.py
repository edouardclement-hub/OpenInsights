# -*- coding: utf-8 -*-
"""Render a .docx to PDF by reading its real OOXML formatting, then printing via Chrome.
Covers what this deck actually uses: runs (size/bold/italic/colour/font), paragraph
indent, spacing, alignment, page-break-before, bullets, and tables with cell shading,
borders and fixed widths."""
import sys, os, subprocess, html, tempfile, shutil
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH

EMU_IN = 914400
ALIGN = {WD_ALIGN_PARAGRAPH.CENTER: "center", WD_ALIGN_PARAGRAPH.RIGHT: "right",
         WD_ALIGN_PARAGRAPH.JUSTIFY: "justify"}

def esc(s):
    return html.escape(s).replace("  ", " &nbsp;")

def run_html(r):
    st = []
    f = r.font
    if f.size: st.append("font-size:%.2fpt" % f.size.pt)
    if f.name: st.append("font-family:%s,Helvetica,sans-serif" % f.name)
    if r.bold: st.append("font-weight:700")
    if r.italic: st.append("font-style:italic")
    try:
        if f.color is not None and f.color.rgb is not None:
            st.append("color:#%s" % str(f.color.rgb))
    except Exception:
        pass
    t = esc(r.text)
    return '<span style="%s">%s</span>' % (";".join(st), t) if st else t

def style_defaults(p):
    """Size/colour inherited from the paragraph style, since runs may not set them."""
    st = []
    s = p.style
    try:
        if s.font.size: st.append("font-size:%.2fpt" % s.font.size.pt)
        if s.font.bold: st.append("font-weight:700")
        if s.font.color is not None and s.font.color.rgb is not None:
            st.append("color:#%s" % str(s.font.color.rgb))
    except Exception:
        pass
    return st

def para_html(p, in_cell=False):
    pf = p.paragraph_format
    st = style_defaults(p)
    st.append("font-family:Arial,Helvetica,sans-serif")
    if pf.left_indent: st.append("margin-left:%.3fin" % (pf.left_indent.emu / EMU_IN))
    st.append("margin-top:%.2fpt" % (pf.space_before.pt if pf.space_before else 0))
    st.append("margin-bottom:%.2fpt" % (pf.space_after.pt if pf.space_after else 0))
    if pf.alignment in ALIGN: st.append("text-align:%s" % ALIGN[pf.alignment])
    if pf.line_spacing and isinstance(pf.line_spacing, float):
        st.append("line-height:%.2f" % pf.line_spacing)
    else:
        st.append("line-height:1.15")
    if pf.keep_with_next: st.append("break-after:avoid")
    brk = ""
    has_break_run = any(
        ch.tag.endswith("}br") and ch.get(
            "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}type") == "page"
        for r in p.runs for ch in r._r)
    if (pf.page_break_before or has_break_run) and not in_cell:
        brk = "break-before:page;"
    body = "".join(run_html(r) for r in p.runs) or "&nbsp;"
    bullet = p.style.name == "List Bullet"
    if bullet:
        return '<div style="%s%s;display:list-item;list-style:disc;margin-left:%.3fin">%s</div>' % (
            brk, ";".join(st), (pf.left_indent.emu / EMU_IN if pf.left_indent else 0) + 0.18, body)
    return '<p style="%s%s">%s</p>' % (brk, ";".join(st), body)

def cell_fill(cell):
    tcPr = cell._tc.tcPr
    if tcPr is None: return None
    for child in tcPr:
        if child.tag.endswith("}shd"):
            v = child.get("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fill")
            if v and v.lower() not in ("auto", "ffffff"): return v
    return None

def table_border_colour(tbl):
    tblPr = tbl._tbl.tblPr
    for child in tblPr:
        if child.tag.endswith("}tblBorders"):
            for e in child:
                c = e.get("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}color")
                if c and c != "auto": return c
    return "999999"

def table_html(t):
    bc = table_border_colour(t)
    out = ['<table style="border-collapse:collapse;table-layout:fixed;'
           'margin:4pt 0 6pt;border:1px solid #%s">' % bc]
    for row in t.rows:
        out.append('<tr style="break-inside:avoid">')
        for cell in row.cells:
            w = (cell.width.emu / EMU_IN) if cell.width else 1.3
            fill = cell_fill(cell)
            sty = "border:1px solid #%s;padding:3pt 6pt;vertical-align:top;width:%.3fin" % (bc, w)
            if fill: sty += ";background:#%s" % fill
            out.append('<td style="%s">%s</td>' % (
                sty, "".join(para_html(p, in_cell=True) for p in cell.paragraphs)))
        out.append("</tr>")
    out.append("</table>")
    return "".join(out)

def main(docx_path, out_pdf):
    d = Document(docx_path)
    sec = d.sections[0]
    body = []
    for child in d.element.body:
        tag = child.tag.split("}")[-1]
        if tag == "p":
            from docx.text.paragraph import Paragraph
            body.append(para_html(Paragraph(child, d)))
        elif tag == "tbl":
            from docx.table import Table
            body.append(table_html(Table(child, d)))
    page = """<!doctype html><html><head><meta charset="utf-8"><style>
@page {{ size: {w:.2f}in {h:.2f}in; margin: {mt:.2f}in {mr:.2f}in {mb:.2f}in {ml:.2f}in; }}
html,body {{ margin:0; padding:0; font-family:Arial,Helvetica,sans-serif;
             font-size:10.5pt; color:#1a1a1a; }}
p,div {{ orphans:2; widows:2; }}
</style></head><body>{body}</body></html>""".format(
        w=sec.page_width.emu / EMU_IN, h=sec.page_height.emu / EMU_IN,
        mt=sec.top_margin.emu / EMU_IN, mr=sec.right_margin.emu / EMU_IN,
        mb=sec.bottom_margin.emu / EMU_IN, ml=sec.left_margin.emu / EMU_IN,
        body="".join(body))
    hp = out_pdf.replace(".pdf", ".html")
    open(hp, "w", encoding="utf-8").write(page)
    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if not os.path.exists(chrome):
        raise SystemExit("Google Chrome is needed for the PDF render and was not found at\n  " + chrome)
    profile = tempfile.mkdtemp(prefix="copydeck-chrome-")
    try:
        subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-first-run",
                        "--user-data-dir=" + profile,
                        "--no-pdf-header-footer", "--print-to-pdf=" + out_pdf,
                        "file://" + hp], check=True, timeout=300,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    finally:
        shutil.rmtree(profile, ignore_errors=True)
        try:
            os.remove(hp)
        except OSError:
            pass
    print("wrote", out_pdf)

if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    repo = os.path.abspath(os.path.join(here, "..", ".."))
    docx_in = sys.argv[1] if len(sys.argv) > 1 else os.path.join(repo, "EPM_Website_Copy_Deck.docx")
    pdf_out = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(docx_in)[0] + ".pdf"
    main(docx_in, pdf_out)
