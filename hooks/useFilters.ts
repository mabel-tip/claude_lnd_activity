"use client";
import { useState, useMemo } from "react";
import type { ColumnMeta } from "@/types/csv";
import type { FilterState, ColumnFilter } from "@/types/filter";

export function useFilters(columns: ColumnMeta[]) {
  const [filters, setFilters] = useState<FilterState>({});

  const defaultFilters = useMemo<FilterState>(() => {
    const f: FilterState = {};
    for (const col of columns) {
      if (col.type === "numeric" && col.min !== undefined && col.max !== undefined) {
        f[col.name] = { type: "numeric", min: col.min, max: col.max, currentMin: col.min, currentMax: col.max };
      } else if (col.type === "categorical" || col.type === "boolean") {
        f[col.name] = { type: "categorical", values: col.uniqueValues ?? [], selected: [] };
      } else if (col.type === "date") {
        f[col.name] = { type: "date", from: "", to: "" };
      }
    }
    return f;
  }, [columns]);

  function updateFilter(colName: string, filter: ColumnFilter) {
    setFilters((prev) => ({ ...prev, [colName]: filter }));
  }

  function resetFilters() {
    setFilters({});
  }

  const activeFilters: FilterState = { ...defaultFilters, ...filters };

  return { filters: activeFilters, updateFilter, resetFilters };
}
