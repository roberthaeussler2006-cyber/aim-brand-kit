"""Build every logo file in brand/logo/ from one source.

Maintainer script. Marketing users never need to run it.
Needs: python3 with fonttools (pip install fonttools), rsvg-convert (brew install librsvg).

The AIM letterform comes from the potrace trace used on the website
(components/Logo.tsx in the AIM-Club repo). The subline "AI IN MANAGEMENT CLUB"
is set in Geist Regular with 0.32em tracking, exactly like the website, and
converted to outlines so the SVG looks the same on every machine.
"""

from pathlib import Path
import subprocess

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "brand" / "logo"
PNG = LOGO / "png"
FONT = ROOT / "brand" / "fonts" / "Geist-VF.ttf"

INK = "#0F1115"
PAPER = "#FAFAF8"

# Tight bounding box of the trace, same as the website's viewBox="45 21 230 48".
MARK_X, MARK_Y, MARK_W, MARK_H = 45, 21, 230, 48
MARK_PATHS = [
    "M677 568 c-40 -71 -227 -425 -227 -430 0 -8 63 1 71 10 4 4 51 90 104 192 53 102 100 189 104 193 4 4 54 -83 111 -193 57 -110 109 -200 115 -200 5 0 20 -3 33 -6 13 -4 22 -2 22 5 0 7 -55 115 -122 241 -121 226 -123 230 -155 230 -27 0 -36 -6 -56 -42z",
    "M1540 375 l0 -235 30 0 30 0 0 235 0 235 -30 0 -30 0 0 -235z",
    "M2122 373 l3 -237 30 0 30 0 5 189 5 188 116 -121 c65 -67 121 -122 127 -122 5 0 60 54 122 120 61 66 115 120 118 120 4 0 6 -83 4 -185 l-3 -185 36 0 35 0 0 235 0 235 -34 0 c-31 0 -47 -13 -158 -126 l-123 -126 -123 126 c-111 114 -126 126 -158 126 l-34 0 2 -237z",
]

# Website proportions: subline font-size = 4.2% of logo width, gap = 6% of width.
SUB_TEXT = "AI IN MANAGEMENT CLUB"
SUB_SIZE = 0.042 * MARK_W
SUB_GAP = 0.06 * MARK_W
SUB_TRACK = 0.32  # em


def mark_group() -> str:
    paths = "".join(f'<path d="{d}"/>' for d in MARK_PATHS)
    return (
        f'<g transform="translate({-MARK_X},{-MARK_Y})">'
        f'<g transform="translate(0,82) scale(0.1,-0.1)">{paths}</g></g>'
    )


def subline_path() -> tuple[str, float, float]:
    """Return (svg path data, width, cap height) for the outlined subline at origin."""
    font = TTFont(FONT)
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": 400})
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight
    scale = SUB_SIZE / upm
    track = SUB_TRACK * upm

    pen = SVGPathPen(glyphs)
    x = 0.0
    names = [cmap[ord(c)] for c in SUB_TEXT]
    for i, name in enumerate(names):
        # Flip y and scale; glyph baseline sits at y = cap height so the top is y=0.
        tpen = TransformPen(pen, (scale, 0, 0, -scale, x * scale, cap * scale))
        glyphs[name].draw(tpen)
        x += glyphs[name].width
        if i < len(names) - 1:
            x += track
    return pen.getCommands(), x * scale, cap * scale


def svg(viewbox_w: float, viewbox_h: float, body: str, fill: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {viewbox_w:.2f} {viewbox_h:.2f}" '
        f'fill="{fill}" role="img" aria-label="AIM, AI in Management Club">{body}</svg>\n'
    )


def build() -> None:
    LOGO.mkdir(parents=True, exist_ok=True)
    PNG.mkdir(parents=True, exist_ok=True)

    sub_d, sub_w, sub_h = subline_path()
    word_h = MARK_H + SUB_GAP + sub_h
    sub_x = (MARK_W - sub_w) / 2
    word_body = (
        mark_group()
        + f'<path transform="translate({sub_x:.3f},{MARK_H + SUB_GAP:.3f})" d="{sub_d}"/>'
    )

    variants = {"": "currentColor", "-light": PAPER, "-dark": INK}
    files = []
    for suffix, fill in variants.items():
        for name, w, h, body in (
            ("aim-mark", MARK_W, MARK_H, mark_group()),
            ("aim-wordmark", MARK_W, word_h, word_body),
        ):
            out = LOGO / f"{name}{suffix}.svg"
            out.write_text(svg(w, h, body, fill))
            if suffix:
                files.append(out)

    # Print-quality transparent PNGs, 4000 px wide.
    for f in files:
        target = PNG / f"{f.stem}-4000.png"
        subprocess.run(["rsvg-convert", "-w", "4000", "-o", str(target), str(f)], check=True)
    print("logos written to", LOGO)


if __name__ == "__main__":
    build()
