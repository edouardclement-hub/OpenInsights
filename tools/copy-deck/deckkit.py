"""Shared helpers for building the EPM copy deck."""
import re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

NAVY = RGBColor(0x0D, 0x1B, 0x2A)
TEAL = RGBColor(0x0C, 0x7A, 0x7A)
GREY = RGBColor(0x60, 0x6A, 0x72)
DARK = RGBColor(0x1A, 0x1A, 0x1A)
FLAG_BORDER = "C9963B"
FLAG_FILL = "FDF4E3"
INFO_FILL = "E8F2F2"
HDR_FILL = "0D1B2A"

def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)

def set_cell_shading(cell, hexfill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hexfill)
    tcPr.append(shd)

def set_table_borders(table, hexcolor, sz=8):
    tbl = table._tbl
    tblPr = tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), hexcolor)
        borders.append(el)
    tblPr.append(borders)

def keep_with_next(par):
    par.paragraph_format.keep_with_next = True

class Deck:
    def __init__(self, path):
        self.doc = Document()
        self.path = path
        self._setup()

    def _setup(self):
        doc = self.doc
        sec = doc.sections[0]
        sec.page_width = Inches(8.5)
        sec.page_height = Inches(11)
        for attr in ("top_margin", "bottom_margin"):
            setattr(sec, attr, Inches(0.9))
        sec.left_margin = Inches(1.0)
        sec.right_margin = Inches(1.0)

        def font(style, name="Arial", size=None, bold=None, color=None):
            f = style.font
            f.name = name
            rpr = style.element.get_or_add_rPr()
            rf = rpr.find(qn("w:rFonts"))
            if rf is None:
                rf = OxmlElement("w:rFonts")
                rpr.append(rf)
            for a in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
                rf.set(qn(a), name)
            if size:
                f.size = Pt(size)
            if bold is not None:
                f.bold = bold
            if color is not None:
                f.color.rgb = color

        st = doc.styles
        font(st["Normal"], size=10.5, color=DARK)
        st["Normal"].paragraph_format.space_after = Pt(4)
        st["Normal"].paragraph_format.line_spacing = 1.15

        h1 = st["Heading 1"]
        font(h1, size=19, bold=True, color=NAVY)
        h1.paragraph_format.space_before = Pt(0)
        h1.paragraph_format.space_after = Pt(2)
        h1.paragraph_format.keep_with_next = True

        h2 = st["Heading 2"]
        font(h2, size=13.5, bold=True, color=TEAL)
        h2.paragraph_format.space_before = Pt(18)
        h2.paragraph_format.space_after = Pt(2)
        h2.paragraph_format.keep_with_next = True

        h3 = st["Heading 3"]
        font(h3, size=11.5, bold=True, color=NAVY)
        h3.paragraph_format.space_before = Pt(12)
        h3.paragraph_format.space_after = Pt(2)
        h3.paragraph_format.keep_with_next = True

        for name in ("Title", "Subtitle", "List Bullet", "Table Grid", "Caption"):
            try:
                font(st[name])
            except KeyError:
                pass

    # ---- primitives ----
    def p(self, text="", size=10.5, bold=False, italic=False, color=None,
          indent=0.0, before=0, after=4, style=None, align=None):
        par = self.doc.add_paragraph(style=style)
        if align is not None:
            par.alignment = align
        pf = par.paragraph_format
        pf.left_indent = Inches(indent)
        pf.space_before = Pt(before)
        pf.space_after = Pt(after)
        if text:
            r = par.add_run(text)
            r.font.size = Pt(size)
            r.bold = bold
            r.italic = italic
            r.font.name = "Arial"
            if color is not None:
                r.font.color.rgb = color
        return par

    def heading(self, text, level):
        par = self.doc.add_heading(text, level=level)
        for r in par.runs:
            r.font.name = "Arial"
        if level == 1:
            # Set on the paragraph, not the style: Google Docs drops style-level breaks.
            par.paragraph_format.page_break_before = True
        return par

    def page_break(self):
        par = self.doc.add_paragraph()
        par.paragraph_format.space_before = Pt(0)
        par.paragraph_format.space_after = Pt(0)
        par.add_run().add_break(WD_BREAK.PAGE)
        return par

    def label(self, text):
        par = self.p(text.upper(), size=8.5, bold=True, color=GREY,
                     before=8, after=1)
        par.paragraph_format.keep_with_next = True
        return par

    def copy(self, text, indent=0.26):
        return self.p(text, size=10.5, indent=indent, after=3)

    def bullets(self, items, indent=0.26):
        for it in items:
            par = self.doc.add_paragraph(style="List Bullet")
            pf = par.paragraph_format
            pf.left_indent = Inches(indent + 0.22)
            pf.space_before = Pt(0)
            pf.space_after = Pt(1)
            r = par.add_run(it)
            r.font.size = Pt(10.5)
            r.font.name = "Arial"

    def box(self, title, lines, kind="flag"):
        fill = FLAG_FILL if kind == "flag" else INFO_FILL
        border = FLAG_BORDER if kind == "flag" else "0C7A7A"
        t = self.doc.add_table(rows=1, cols=1)
        t.alignment = WD_TABLE_ALIGNMENT.LEFT
        t.autofit = False
        t.columns[0].width = Inches(6.5)
        trPr = t.rows[0]._tr.get_or_add_trPr()
        cant = OxmlElement("w:cantSplit")
        trPr.append(cant)
        cell = t.cell(0, 0)
        cell.width = Inches(6.5)
        set_cell_shading(cell, fill)
        set_table_borders(t, border, sz=8)
        first = cell.paragraphs[0]
        first.paragraph_format.space_before = Pt(3)
        first.paragraph_format.space_after = Pt(2)
        r = first.add_run(title)
        r.bold = True
        r.font.size = Pt(10)
        r.font.name = "Arial"
        r.font.color.rgb = NAVY
        for i, line in enumerate(lines):
            par = cell.add_paragraph()
            par.paragraph_format.space_before = Pt(0)
            par.paragraph_format.space_after = Pt(4 if i == len(lines) - 1 else 2)
            rr = par.add_run(line)
            rr.font.size = Pt(10)
            rr.font.name = "Arial"
        self.p("", after=2)
        return t

    def save(self):
        self.doc.save(self.path)


def set_modern_compat(path):
    """Clear Word's Compatibility Mode banner (compatibilityMode 14 -> 15)."""
    import zipfile, shutil, os
    tmp = path + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/settings.xml":
                data = data.replace(
                    b'<w:compatSetting w:name="compatibilityMode" '
                    b'w:uri="http://schemas.microsoft.com/office/word" w:val="14"/>',
                    b'<w:compatSetting w:name="compatibilityMode" '
                    b'w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>')
            zout.writestr(item, data)
    os.replace(tmp, path)
