# Commands

## Rebuild the Word version

```bash
python3 -m venv tmp/docs/venv
tmp/docs/venv/bin/pip install python-docx
tmp/docs/venv/bin/python scripts/export_thesis_docx.py
```

## Render the Word version for inspection

```bash
soffice --headless --convert-to pdf --outdir output/doc output/doc/bookstore_thesis.docx
pdftoppm -png -f 1 -l 8 output/doc/bookstore_thesis.pdf output/doc/render/page
```

## Typical inspection targets

- Page 1: cover page
- Early pages: TOC and chapter opening pages
- Chapter 3 pages: architecture and ER diagrams
- Chapter 4 pages: homepage, list page, detail page, order/admin screenshots

## Notes

- If diagrams look cropped, replace the source PNG in `thesis_assets/diagrams/` and rerun the export.
- If the Word output styling regresses, patch `scripts/export_thesis_docx.py` instead of hand-fixing the `.docx`.
