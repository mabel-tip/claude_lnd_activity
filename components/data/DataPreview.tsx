"use client";
import { useState } from "react";
import type { ParsedCSV } from "@/types/csv";

const PAGE_SIZE = 10;

interface DataPreviewProps {
  data: ParsedCSV;
}

export function DataPreview({ data }: DataPreviewProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.rows.length / PAGE_SIZE);
  const visible = data.rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          Data Preview <span className="text-[var(--text-secondary)] font-normal">({data.rows.length} rows)</span>
        </h2>
        {data.skippedRows > 0 && (
          <span className="text-[11px] text-yellow-600 dark:text-yellow-400">
            {data.skippedRows} rows skipped
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-surface-alt)]">
              {data.headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-surface-alt)]">
                {data.headers.map((h) => (
                  <td key={h} className="px-3 py-2 text-[var(--text-primary)] whitespace-nowrap max-w-[160px] truncate" title={row[h]}>
                    {row[h] || <span className="text-[var(--text-secondary)] italic">null</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)]">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="focus-ring rounded-lg px-3 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-[11px] text-[var(--text-secondary)]">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="focus-ring rounded-lg px-3 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
