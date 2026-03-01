# Batch Image OCR

Browser-based tool for extracting text from multiple images at once. Upload a batch of images, run OCR in the browser, and export results as CSV.

## What it does

- Batch OCR on many images in one run
- Multi-language recognition (English, Traditional/Simplified Chinese, Japanese, Korean)
- Drag-and-drop or file picker upload
- Progress bar and per-file status while processing
- Results table with CSV download (UTF-8 with BOM)

## Quick start

No build step required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Edge, or Firefox recommended).
3. Select one or more OCR languages.
4. Upload images (drag-and-drop or file input).
5. Click **Process Images**.
6. Download results via **Download CSV** when finished.

## Supported languages

| Language            | Tesseract code |
| ------------------- | -------------- |
| English             | `eng`          |
| Traditional Chinese | `chi_tra`      |
| Simplified Chinese  | `chi_sim`      |
| Japanese            | `jpn`          |
| Korean              | `kor`          |

You can select multiple languages; accuracy may vary when mixing languages on the same image.

## How it works

Processing runs entirely in the browser via [Tesseract.js](https://github.com/naptha/tesseract.js). Images are not uploaded to a server.

1. Selected files are queued locally.
2. Each image is passed to Tesseract with your chosen language pack(s).
3. Extracted text and filenames are shown in a DataTable.
4. CSV export includes a UTF-8 BOM for correct display in Excel.

## Tech stack

- HTML / CSS / JavaScript
- [Bootstrap 5](https://getbootstrap.com/) — layout and UI
- [jQuery](https://jquery.com/) — DOM and events
- [Tesseract.js](https://github.com/naptha/tesseract.js) — OCR engine
- [DataTables](https://datatables.net/) — results table and CSV export

## Project structure

```
batch-img-ocr/
├── index.html   # UI
├── script.js    # OCR logic and table handling
├── style.css    # Custom styles
└── README.md
```

## Tips

- Use clear, high-contrast images for better accuracy.
- For mixed-language documents, try a single language first, then refine.
- First run may be slower while language data loads in the browser.

## License

Use and modify as needed for personal or educational projects.
