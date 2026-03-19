"use client";
import clsx from "clsx";
import type { ChartType } from "@/types/chart";

const CHART_TYPES: { type: ChartType; label: string; icon: string }[] = [
  { type: "bar", label: "Bar", icon: "▊" },
  { type: "line", label: "Line", icon: "╱" },
  { type: "pie", label: "Pie", icon: "◕" },
  { type: "scatter", label: "Scatter", icon: "⠿" },
];

interface ChartTypeSelectorProps {
  selected: ChartType;
  onChange: (type: ChartType) => void;
  suggested?: ChartType[];
}

export function ChartTypeSelector({ selected, onChange, suggested = [] }: ChartTypeSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CHART_TYPES.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          aria-pressed={selected === type}
          className={clsx(
            "focus-ring relative flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]",
            selected === type
              ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
              : "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]"
          )}
        >
          <span aria-hidden="true">{icon}</span>
          {label}
          {suggested.includes(type) && selected !== type && (
            <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)]" title="Suggested" />
          )}
        </button>
      ))}
    </div>
  );
}
