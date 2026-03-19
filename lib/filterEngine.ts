import type { DataRow } from "@/types/csv";
import type { FilterState, ColumnFilter } from "@/types/filter";

function passesFilter(value: string, filter: ColumnFilter): boolean {
  if (filter.type === "numeric") {
    const n = parseFloat(value);
    if (isNaN(n)) return false;
    return n >= filter.currentMin && n <= filter.currentMax;
  }
  if (filter.type === "categorical") {
    if (filter.selected.length === 0) return true;
    return filter.selected.includes(value);
  }
  if (filter.type === "date") {
    const d = new Date(value).getTime();
    const from = filter.from ? new Date(filter.from).getTime() : -Infinity;
    const to = filter.to ? new Date(filter.to).getTime() : Infinity;
    return d >= from && d <= to;
  }
  return true;
}

export function applyFilters(rows: DataRow[], filters: FilterState): DataRow[] {
  const activeFilters = Object.entries(filters);
  if (activeFilters.length === 0) return rows;
  return rows.filter((row) =>
    activeFilters.every(([col, filter]) => passesFilter((row[col] ?? "").trim(), filter))
  );
}
