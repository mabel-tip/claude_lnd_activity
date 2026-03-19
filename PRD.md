# Product Requirements Document
## CSV Data Visualizer

**Version:** 1.0
**Date:** 2026-03-19
**Status:** Draft — Awaiting Approval

---

## 1. Project Overview & Goals

### Overview
CSV Data Visualizer is a browser-based tool that lets anyone upload a CSV file and instantly generate interactive, publication-quality charts — no spreadsheet software, no coding, no account required. The tool auto-detects column types, suggests appropriate visualizations, and lets users export any chart as a PNG.

### Goals
1. **Zero-friction data exploration** — go from raw CSV to a meaningful chart in under 60 seconds.
2. **Broad accessibility** — works for technical and non-technical users alike.
3. **Polished UX** — feels like a premium SaaS product, not a utility tool.
4. **Deployable and shareable** — hosted on Vercel; any chart can be saved locally.

---

## 2. Target Users & Use Cases

### Primary Users
| User Type | Description |
|-----------|-------------|
| **Data analysts** | Need quick EDA (exploratory data analysis) without spinning up Jupyter |
| **Students & researchers** | Visualizing assignment/research data without Excel expertise |
| **Business stakeholders** | Turning exported reports (sales, ops) into presentable charts |
| **Journalists & writers** | Creating charts from publicly available datasets |

### Core Use Cases
1. **Quick EDA** — Upload a dataset, scan distributions and trends without writing any code.
2. **Presentation prep** — Build a bar or line chart, export as PNG, drop into slides.
3. **Data validation** — Spot outliers and malformed entries via scatter plots.
4. **Reporting** — Summarize categorical breakdowns as pie charts.

---

## 3. Full Feature List

### Core Features
| # | Feature | Description |
|---|---------|-------------|
| C1 | **CSV Upload** | Drag-and-drop or file-picker upload; validates file type and size |
| C2 | **Column Type Detection** | Auto-detects numeric, categorical, date, and boolean columns |
| C3 | **Bar Chart** | Categorical x-axis, numeric y-axis; grouped or stacked |
| C4 | **Line Chart** | Date or ordered numeric x-axis, one or more numeric y-series |
| C5 | **Pie / Donut Chart** | Categorical slices with numeric value; toggle donut mode |
| C6 | **Scatter Plot** | Any two numeric columns as X/Y axes |
| C7 | **Column Selector** | UI to pick which columns map to which chart axes/dimensions |
| C8 | **Per-Column Filtering** | Range sliders for numeric columns; checkbox lists for categoricals; date pickers for dates |
| C9 | **PNG Export** | One-click download of the current chart as a high-resolution PNG |
| C10 | **Dark / Light Mode** | Toggle with system-preference default; persisted in localStorage |

### Bonus Features
| # | Feature | Description |
|---|---------|-------------|
| B1 | **Chart Type Suggestions** | Recommend chart types based on detected column types |
| B2 | **Data Preview Table** | Paginated raw data view alongside the chart |
| B3 | **Summary Statistics** | Min, max, mean, median, null count per column shown in sidebar |
| B4 | **CSV Paste Input** | Paste raw CSV text directly instead of uploading a file |
| B5 | **Responsive Layout** | Full functionality on tablet; graceful degradation on mobile |

---

## 4. User Flows

### Flow 1 — Primary: Upload → Visualize → Export
```
Landing page
  └─> [Upload CSV] (drag-drop or file picker)
        └─> File validation (type, size)
              ├─> ✗ Error state: toast message, re-upload prompt
              └─> ✓ Parse CSV → detect column types
                    └─> Chart workspace appears
                          ├─> Auto-select suggested chart type
                          ├─> Column Selector panel (axes, color dimension)
                          ├─> Filter panel (per-column controls)
                          ├─> Chart renders interactively
                          └─> [Export PNG] → file download
```

### Flow 2 — Bonus: Paste CSV Text
```
Landing page
  └─> [Paste CSV] tab
        └─> Textarea input
              └─> [Visualize] button → same parse/render flow as Flow 1
```

### Flow 3 — Dark/Light Mode
```
Any page state
  └─> [Theme toggle] in navbar
        └─> Immediate visual switch
              └─> Preference written to localStorage
                    └─> Persists across page refreshes
```

### Flow 4 — Change Chart Type
```
Chart workspace (active chart displayed)
  └─> [Chart type selector] (bar / line / pie / scatter tabs)
        └─> Column Selector updates to reflect new chart's axis requirements
              └─> Chart re-renders with same data, new type
```

---

## 5. Design System

### Principles
- Clean, minimal chrome — data and chart are the hero.
- Consistent 8px spacing grid.
- All interactive elements have visible focus rings (accessibility).
- Smooth transitions (150–200ms ease) on theme switch and panel open/close.

### Light Mode — Pastel Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FFF8F6` | Page background |
| `bg-surface` | `#FFFFFF` | Cards, panels |
| `bg-surface-alt` | `#F5F0FF` | Sidebar, alternate sections |
| `accent-pink` | `#F9A8D4` | Primary CTA buttons, highlights |
| `accent-lavender` | `#C4B5FD` | Secondary actions, tags |
| `accent-mint` | `#A7F3D0` | Success states, positive indicators |
| `accent-peach` | `#FDBA74` | Warnings, chart accent color |
| `text-primary` | `#1E1B2E` | Body text |
| `text-secondary` | `#6B7280` | Labels, captions |
| `border` | `#E9D5FF` | Dividers, input borders |

### Dark Mode — Cool Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0F172A` | Page background |
| `bg-surface` | `#1E293B` | Cards, panels |
| `bg-surface-alt` | `#1A2744` | Sidebar, alternate sections |
| `accent-blue` | `#3B82F6` | Primary CTA buttons, highlights |
| `accent-indigo` | `#6366F1` | Secondary actions, tags |
| `accent-teal` | `#2DD4BF` | Success states, chart accent |
| `accent-slate` | `#94A3B8` | Muted labels |
| `text-primary` | `#F1F5F9` | Body text |
| `text-secondary` | `#94A3B8` | Labels, captions |
| `border` | `#334155` | Dividers, input borders |

### Typography
- **Font:** Inter (Google Fonts) — weights 400, 500, 600
- **Scale:** 12px caption / 14px body / 16px body-lg / 20px h3 / 24px h2 / 32px h1
- **Chart labels:** 11px, color-coordinated with palette

### Chart Color Sequences
- **Light mode series:** `#F9A8D4`, `#C4B5FD`, `#A7F3D0`, `#FDBA74`, `#93C5FD`, `#FCA5A5`
- **Dark mode series:** `#3B82F6`, `#2DD4BF`, `#6366F1`, `#F59E0B`, `#10B981`, `#EC4899`

### Component Aesthetics
- Cards: `rounded-2xl`, subtle shadow (`shadow-sm` light / `shadow-lg` dark)
- Buttons: `rounded-xl`, hover scale `1.02`, active scale `0.98`
- Inputs: `rounded-lg`, focus ring using accent color
- Drag-and-drop zone: dashed border, accent color on hover/active

---

## 6. Tech Stack Decisions

| Layer | Choice | Justification |
|-------|--------|---------------|
| **Framework** | Next.js 14 (App Router) | File-based routing, RSC support, first-class Vercel deployment, strong ecosystem |
| **Language** | TypeScript | Type safety for CSV parsing edge cases and chart config objects |
| **Styling** | Tailwind CSS v3 + custom theme | Utility-first, dark mode via `class` strategy, design tokens in `tailwind.config.ts` |
| **Charts** | Recharts | React-native (not a wrapper), composable API, built-in animation, good TypeScript types; easier to customize than Chart.js in a React context |
| **CSV Parsing** | PapaParse | Battle-tested, streaming support, handles quoted fields, BOM, encoding edge cases |
| **PNG Export** | html2canvas | Captures the chart DOM node; no server required |
| **State** | React `useState` / `useReducer` (no external store) | App is single-page, data flows are local — Redux/Zustand would be overkill |
| **Deployment** | Vercel | Zero-config for Next.js, automatic preview deployments, CDN edge network |

### Why Not Alternatives
- **Vite + React (no Next.js):** Loses Vercel optimization and would require manual routing.
- **Chart.js:** Canvas-based; harder to integrate with React lifecycle and theming.
- **D3.js:** Powerful but very low-level; 10× implementation time for this scope.
- **Redux/Zustand:** Unnecessary complexity for a single-view app.

---

## 7. Component Architecture

```
/app
  layout.tsx          — root layout, ThemeProvider, Inter font
  page.tsx            — landing / main workspace page
  globals.css         — Tailwind base + CSS variables for theme tokens

/components
  /upload
    DropZone.tsx      — drag-and-drop + file-picker upload UI
    PasteInput.tsx    — textarea CSV paste (bonus B4)
  /data
    DataPreview.tsx   — paginated raw data table (bonus B2)
    StatsSidebar.tsx  — summary statistics per column (bonus B3)
  /chart
    ChartWorkspace.tsx — orchestrator: holds chart + controls
    ChartTypeSelector.tsx — tab bar: bar / line / pie / scatter
    BarChart.tsx      — Recharts BarChart wrapper
    LineChart.tsx     — Recharts LineChart wrapper
    PieChart.tsx      — Recharts PieChart wrapper (donut toggle)
    ScatterChart.tsx  — Recharts ScatterChart wrapper
    ExportButton.tsx  — html2canvas PNG export trigger
  /controls
    ColumnSelector.tsx — axis/dimension assignment dropdowns
    FilterPanel.tsx   — per-column filter controls
    RangeSlider.tsx   — numeric range filter
    CheckboxFilter.tsx — categorical multi-select filter
    DateRangeFilter.tsx — date column filter
  /ui
    ThemeToggle.tsx   — sun/moon icon button, writes to localStorage
    Navbar.tsx        — app header with logo + theme toggle
    Toast.tsx         — error/success notification
    Spinner.tsx       — loading indicator
    Badge.tsx         — column type badge (numeric / categorical / date / boolean)

/lib
  csvParser.ts        — PapaParse wrapper, returns ParsedCSV type
  typeDetector.ts     — column type inference logic
  chartConfig.ts      — builds Recharts-compatible data/config from ParsedCSV + selections
  exportChart.ts      — html2canvas invocation + download trigger
  filterEngine.ts     — applies active filters to parsed rows
  suggestions.ts      — chart type recommendation logic (bonus B1)

/hooks
  useCSV.ts           — manages parse state, exposes parsed data + loading/error
  useTheme.ts         — reads/writes theme to localStorage, syncs with system pref
  useFilters.ts       — filter state per column
  useChartConfig.ts   — derives Recharts props from column selections + filtered data

/types
  csv.ts              — ParsedCSV, ColumnMeta, ColumnType, DataRow types
  chart.ts            — ChartType, AxisConfig, ChartProps types
  filter.ts           — FilterState, NumericFilter, CategoricalFilter, DateFilter types
```

---

## 8. Edge Cases & Error Handling

| Scenario | Detection | Handling |
|----------|-----------|----------|
| **Non-CSV file** | File extension + MIME type check | Toast: "Please upload a valid .csv file" |
| **File > 10 MB** | `file.size > 10_485_760` before parsing | Toast: "File too large (max 10 MB)" |
| **Empty CSV** | PapaParse returns 0 rows | Toast: "CSV appears to be empty" |
| **Header-only CSV** | 0 data rows after parse | Toast: "No data rows found" |
| **Single-column file** | `columns.length === 1` | Disable chart types requiring 2+ columns; show message |
| **All-null column** | All values are empty string | Mark column as "unknown", exclude from suggestions |
| **Malformed rows** | Row field count ≠ header count | PapaParse `skipEmptyLines: true`, show count of skipped rows |
| **Mixed types in column** | >20% values don't match detected type | Fall back to categorical; show warning badge |
| **Very wide CSV (>100 cols)** | Column count check | Warn user; truncate display to first 100 columns |
| **Date parsing failure** | `isNaN(Date.parse(value))` | Fall back to categorical |
| **Numeric overflow** | Values > `Number.MAX_SAFE_INTEGER` | Parse as string, warn |
| **Chart with 0 filtered rows** | `filteredRows.length === 0` | Show "No data matches current filters" in chart area |

---

## 9. Non-Functional Requirements

### Performance
- CSV parsing must complete in < 2 s for a 5 MB file.
- Chart re-render on filter change must be < 200 ms (use `useMemo` for derived data).
- Initial page load (LCP) < 2.5 s on a 4G connection.
- Bundle size: keep chart library code-split; lazy-load individual chart components.

### Responsiveness
- **Desktop (≥1024px):** Side-by-side chart + controls layout.
- **Tablet (768–1023px):** Stacked layout; controls collapse to drawer.
- **Mobile (<768px):** Upload and data preview functional; chart displayed at reduced size with pan/zoom gesture.

### Accessibility
- WCAG 2.1 AA compliance.
- All interactive elements keyboard-navigable.
- Focus rings visible in both themes.
- Chart color sequences maintain ≥ 3:1 contrast ratio against their backgrounds.
- ARIA labels on all icon-only buttons.
- `role="status"` on loading/error toasts.

### Browser Support
- Chrome, Firefox, Safari, Edge — latest two major versions.
- No IE11 support required.

---

## 10. Out of Scope (v1.0)

The following will NOT be included in this version:

- **User accounts / authentication** — no login, no saved sessions.
- **Cloud storage of uploaded files** — files never leave the browser.
- **Multiple file upload / join** — one CSV at a time.
- **Server-side processing** — all parsing and rendering is client-side.
- **Sharing / permalink to chart** — no shareable URL.
- **Custom chart styling** — no font/color picker beyond the design system.
- **Excel / Google Sheets import** — CSV only.
- **Real-time / streaming data** — static file upload only.
- **Embeddable iframe widget** — no embed mode.
- **Annotation / drawing tools** — no markup on charts.

---

## 11. Success Criteria

The product is considered complete when:

| # | Criterion | Measure |
|---|-----------|---------|
| S1 | All 10 core features ship and are functional | Manual QA checklist passes |
| S2 | All 5 bonus features ship | Manual QA checklist passes |
| S3 | Zero TypeScript errors | `tsc --noEmit` exits 0 |
| S4 | Zero build errors | `next build` exits 0 |
| S5 | Vercel deployment live | Preview URL accessible |
| S6 | Light and dark mode render correctly | Visual QA in both modes |
| S7 | All error/edge cases handled gracefully | Edge case checklist (§8) manually tested |
| S8 | Responsive on desktop and tablet | Tested at 1280px, 768px viewports |
| S9 | PNG export produces a valid image file | Downloaded PNG opens correctly |
| S10 | Lighthouse accessibility score ≥ 85 | `lighthouse --only-categories=accessibility` |
