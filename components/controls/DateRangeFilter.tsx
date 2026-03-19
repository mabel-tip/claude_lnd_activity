"use client";
import type { DateFilter } from "@/types/filter";

interface DateRangeFilterProps {
  filter: DateFilter;
  onChange: (filter: DateFilter) => void;
}

export function DateRangeFilter({ filter, onChange }: DateRangeFilterProps) {
  const inputClass = "focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none";

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-[11px] text-[var(--text-secondary)] mb-1">From</label>
        <input type="date" value={filter.from} onChange={(e) => onChange({ ...filter, from: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="block text-[11px] text-[var(--text-secondary)] mb-1">To</label>
        <input type="date" value={filter.to} onChange={(e) => onChange({ ...filter, to: e.target.value })} className={inputClass} />
      </div>
    </div>
  );
}
