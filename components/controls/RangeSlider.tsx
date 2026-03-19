"use client";
import type { NumericFilter } from "@/types/filter";

interface RangeSliderProps {
  filter: NumericFilter;
  onChange: (filter: NumericFilter) => void;
}

export function RangeSlider({ filter, onChange }: RangeSliderProps) {
  const range = filter.max - filter.min || 1;
  const isInteger = Number.isInteger(filter.min) && Number.isInteger(filter.max);
  const step = isInteger ? 1 : range / 100;

  const fmt = (v: number) =>
    isInteger ? Math.round(v).toLocaleString() : v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] text-[var(--text-secondary)]">
        <span>{fmt(filter.currentMin)}</span>
        <span>{fmt(filter.currentMax)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full bg-[var(--border)]" />
        <div
          className="absolute h-1.5 rounded-full bg-[var(--accent)]"
          style={{
            left: `${((filter.currentMin - filter.min) / range) * 100}%`,
            right: `${((filter.max - filter.currentMax) / range) * 100}%`,
          }}
        />
        <input
          type="range"
          min={filter.min}
          max={filter.max}
          step={step}
          value={filter.currentMin}
          onChange={(e) => onChange({ ...filter, currentMin: Math.min(Number(e.target.value), filter.currentMax) })}
          className="absolute w-full h-1.5 opacity-0 cursor-pointer"
          aria-label="Minimum value"
        />
        <input
          type="range"
          min={filter.min}
          max={filter.max}
          step={step}
          value={filter.currentMax}
          onChange={(e) => onChange({ ...filter, currentMax: Math.max(Number(e.target.value), filter.currentMin) })}
          className="absolute w-full h-1.5 opacity-0 cursor-pointer"
          aria-label="Maximum value"
        />
      </div>
    </div>
  );
}
