"use client";
import type { ColumnMeta } from "@/types/csv";
import type { ChartType } from "@/types/chart";

interface ColumnSelectorProps {
  columns: ColumnMeta[];
  chartType: ChartType;
  xKey: string;
  yKeys: string[];
  scatterYKey: string;
  onXChange: (key: string) => void;
  onYChange: (keys: string[]) => void;
  onScatterYChange: (key: string) => void;
}

export function ColumnSelector({
  columns, chartType, xKey, yKeys, scatterYKey,
  onXChange, onYChange, onScatterYChange,
}: ColumnSelectorProps) {
  const numeric = columns.filter((c) => c.type === "numeric");
  const allCols = columns;

  const selectClass = "focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none";
  const labelClass = "block mb-1 text-xs font-medium text-[var(--text-secondary)]";

  const toggleY = (key: string) => {
    if (yKeys.includes(key)) {
      if (yKeys.length > 1) onYChange(yKeys.filter((k) => k !== key));
    } else {
      onYChange([...yKeys, key]);
    }
  };

  if (chartType === "scatter") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>X Axis (numeric)</label>
          <select value={xKey} onChange={(e) => onXChange(e.target.value)} className={selectClass}>
            {numeric.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Y Axis (numeric)</label>
          <select value={scatterYKey} onChange={(e) => onScatterYChange(e.target.value)} className={selectClass}>
            {numeric.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>
    );
  }

  if (chartType === "pie") {
    const catCols = columns.filter((c) => c.type === "categorical" || c.type === "boolean");
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Category</label>
          <select value={xKey} onChange={(e) => onXChange(e.target.value)} className={selectClass}>
            {catCols.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            {catCols.length === 0 && allCols.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Value (numeric)</label>
          <select value={yKeys[0] ?? ""} onChange={(e) => onYChange([e.target.value])} className={selectClass}>
            {numeric.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>X Axis</label>
        <select value={xKey} onChange={(e) => onXChange(e.target.value)} className={selectClass}>
          {allCols.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Y Axis (numeric) — select multiple</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {numeric.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleY(c.name)}
              aria-pressed={yKeys.includes(c.name)}
              className={`focus-ring rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
                yKeys.includes(c.name)
                  ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
