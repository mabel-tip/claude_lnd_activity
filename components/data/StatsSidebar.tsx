import type { ColumnMeta } from "@/types/csv";
import { Badge } from "@/components/ui/Badge";

interface StatsSidebarProps {
  columns: ColumnMeta[];
}

export function StatsSidebar({ columns }: StatsSidebarProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Column Summary</h2>
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {columns.map((col) => (
          <div key={col.name} className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface-alt)] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-medium text-[var(--text-primary)] truncate" title={col.name}>
                {col.name}
              </span>
              <Badge type={col.type} />
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] space-y-0.5">
              <div>Nulls: <span className="font-medium">{col.nullCount}</span> / {col.totalCount}</div>
              {col.type === "numeric" && col.min !== undefined && (
                <>
                  <div>Min: <span className="font-medium">{col.min.toLocaleString()}</span></div>
                  <div>Max: <span className="font-medium">{col.max?.toLocaleString()}</span></div>
                </>
              )}
              {(col.type === "categorical" || col.type === "boolean") && col.uniqueValues && (
                <div>Unique: <span className="font-medium">{col.uniqueValues.length}</span></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
