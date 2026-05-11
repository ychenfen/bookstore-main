---
name: bookstore-thesis-delivery
description: Maintain and deliver the bookstore project's thesis assets, screenshots, diagrams, PDF, and Word export. Use when working on thesis_assets, exporting the bookstore thesis to docx, refreshing figures, or preparing submission-ready thesis deliverables for this repository.
---

# Bookstore Thesis Delivery

Use this skill for thesis work inside this repository.

## Key locations

- Thesis source: `thesis_assets/thesis.tex`
- LaTeX build output: `thesis_assets/build/`
- Diagrams: `thesis_assets/diagrams/`
- UI screenshots: `thesis_assets/screenshots/`
- Figure usage notes: `thesis_assets/THESIS_FIGURE_GUIDE.md`
- DOCX export script: `scripts/export_thesis_docx.py`
- DOCX output: `output/doc/bookstore_thesis.docx`
- DOCX preview PDF: `output/doc/bookstore_thesis.pdf`

## Repo-specific workflow

1. Update `thesis_assets/thesis.tex`.
2. Keep referenced figures in `thesis_assets/diagrams/` as full-size PNG exports.
3. Keep referenced system screenshots in `thesis_assets/screenshots/`.
4. Export the Word version with `scripts/export_thesis_docx.py`.
5. Convert the generated `.docx` to PDF and inspect representative pages.

## Important project findings

- The thesis Word export should use the existing `scripts/export_thesis_docx.py` script rather than trying Pandoc first.
- For this repo, a manual TOC works better than an automatic field in headless conversion.
- Diagram PNGs in `thesis_assets/diagrams/` are the corrected non-cropped versions and should be preferred for Word export.
- The current reliable delivery pair is:
  - `output/doc/bookstore_thesis.docx`
  - `output/doc/bookstore_thesis.pdf`

Read [references/commands.md](references/commands.md) when you need the exact command sequence.
