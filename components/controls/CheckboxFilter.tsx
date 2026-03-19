"use client";
import type { CategoricalFilter } from "@/types/filter";

interface CheckboxFilterProps {
  filter: CategoricalFilter;
  onChange: (filter: CategoricalFilter) => void;
}

export function CheckboxFilter({ filter, onChange }: CheckboxFilterProps) {
  const toggle = (val: string) => {
    const selected = filter.selected.includes(val)
      ? filter.selected.filter((v) => v !== val)
      : [...filter.selected, val];
    onChange({ ...filter, selected });
  };

  const allSelected = filter.selected.length === 0;

  return (
    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
      <button
        onClick={() => onChange({ ...filter, selected: [] })}
        className={`focus-ring w-full text-left rounded-lg px-2 py-1 text-xs transition-colors ${
          allSelected ? "text-[var(--accent)] font-medium" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
      >
        All values
      </button>
      {filter.values.slice(0, 50).map((val) => (
        <label key={val} className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs cursor-pointer hover:bg-[var(--bg-surface-alt)]">
          <input
            type="checkbox"
            checked={filter.selected.includes(val)}
            onChange={() => toggle(val)}
            className="accent-[var(--accent)] focus-ring rounded"
          />
          <span className="text-[var(--text-primary)] truncate" title={val}>{val}</span>
        </label>
      ))}
      {filter.values.length > 50 && (
        <p className="text-[11px] text-[var(--text-secondary)] px-2">+{filter.values.length - 50} more values</p>
      )}
    </div>
  );
}
