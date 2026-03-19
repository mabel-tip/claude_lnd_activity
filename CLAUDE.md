# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build (must pass before deploy)
npm run typecheck  # tsc --noEmit — run after any TypeScript change
npm run lint       # ESLint via next lint
```

## Architecture

**Next.js 14 App Router** single-page CSV visualizer. All processing is client-side — no server routes.

### Data flow
1. `useCSV` hook → `lib/csvParser.ts` (PapaParse) → `lib/typeDetector.ts` → `ParsedCSV`
2. `useFilters` hook → `lib/filterEngine.ts` → filtered `DataRow[]`
3. `ChartWorkspace` derives chart props and passes filtered rows to the active chart component

### Key directories
- `lib/` — pure functions: CSV parsing, type detection, filter engine, chart color palettes, PNG export (`html2canvas`), chart type suggestions
- `hooks/` — `useCSV`, `useFilters`, `useTheme` (localStorage + `prefers-color-scheme`)
- `components/chart/` — Recharts wrappers (Bar, Line, Pie, Scatter) + `ChartWorkspace` orchestrator
- `components/controls/` — column selector, filter panel, range slider, checkbox filter, date filter
- `components/upload/` — drag-and-drop `DropZone`, `PasteInput`
- `components/data/` — paginated `DataPreview`, `StatsSidebar`
- `types/` — shared TypeScript types: `csv.ts`, `chart.ts`, `filter.ts`

### Theming
Dark/light mode via Tailwind `darkMode: "class"`. CSS custom properties (`--bg-primary`, `--accent`, etc.) are defined in `app/globals.css` for both `:root` and `.dark`. Charts read `isDark` prop and switch color palettes from `lib/chartColors.ts`.

### Chart export
`lib/exportChart.ts` dynamically imports `html2canvas` and captures `#chart-export-target`. The div wrapping the active Recharts component has that id (set in `ChartWorkspace`).
