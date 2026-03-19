"use client";
import { useState } from "react";
import type { ColumnMeta } from "@/types/csv";
import type { FilterState, ColumnFilter } from "@/types/filter";
import { RangeSlider } from "./RangeSlider";
import { CheckboxFilter } from "./CheckboxFilter";
import { DateRangeFilter } from "./DateRangeFilter";

interface FilterPanelProps {
  columns: ColumnMeta[];
  filters: FilterState;
  onFilterChange: (col: string, filter: ColumnFilter) => void;
  onReset: () => void;
}

export function FilterPanel({ columns, filters, onFilterChange, onReset }: FilterPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => setExpanded((p) => ({ ...p, [name]: !p[name] }));

  const filterableCols = columns.filter((c) => c.type !== "unknown");

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Filters</h2>
        <button
          onClick={onReset}
          className="focus-ring text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          Reset all
        </button>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {filterableCols.map((col) => {
          const filter = filters[col.name];
          if (!filter) return null;
          const open = expanded[col.name] ?? false;

          return (
            <div key={col.name} className="rounded-xl border border-[var(--border)] overflow-hidden">
              <button
                onClick={() => toggle(col.name)}
                className="focus-ring flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-[var(--bg-surface-alt)] transition-colors"
                aria-expanded={open}
              >
                <span className="text-xs font-medium text-[var(--text-primary)] truncate">{col.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`h-3.5 w-3.5 text-[var(--text-secondary)] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="px-3 pb-3 pt-1 border-t border-[var(--border)] bg-[var(--bg-surface-alt)]">
                  {filter.type === "numeric" && (
                    <RangeSlider filter={filter} onChange={(f) => onFilterChange(col.name, f)} />
                  )}
                  {filter.type === "categorical" && (
                    <CheckboxFilter filter={filter} onChange={(f) => onFilterChange(col.name, f)} />
                  )}
                  {filter.type === "date" && (
                    <DateRangeFilter filter={filter} onChange={(f) => onFilterChange(col.name, f)} />
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filterableCols.length === 0 && (
          <p className="text-xs text-[var(--text-secondary)] text-center py-4">No filterable columns</p>
        )}
      </div>
    </div>
  );
}
