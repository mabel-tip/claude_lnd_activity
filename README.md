# CSV Data Visualizer

A browser-based tool to upload a CSV file and instantly generate interactive charts — no account, no server, no code required.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Recharts](https://img.shields.io/badge/Recharts-2-22c55e)

## Features

- **Upload or paste** a CSV file (max 10 MB)
- **Auto-detects** column types — numeric, categorical, date, boolean
- **4 chart types** — bar, line, pie/donut, scatter
- **Column selector** — choose which columns map to each axis
- **Per-column filters** — range sliders, checkbox lists, date pickers
- **Export as PNG** — one-click high-resolution download
- **Dark / light mode** — respects system preference, persisted across sessions
- **Summary statistics** — min, max, null count per column
- **Data preview** — paginated raw data table

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| CSV Parsing | PapaParse |
| PNG Export | html2canvas |
| Deployment | Vercel |

## Deployment

Push to GitHub and import the repo at [vercel.com](https://vercel.com). Vercel auto-detects Next.js — no configuration needed.
