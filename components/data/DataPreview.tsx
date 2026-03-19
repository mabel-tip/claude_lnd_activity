"use client";
import { useState } from "react";
import type { DataRow } from "@/types/csv";

const PAGE_SIZE = 10;

interface DataPreviewProps {
  rows: DataRow[];
  headers: string[];
  totalRows: number;
  skippedRows: number;
  columnSearch: Record<string, string>;
  onSearchChange: (col: string, value: string) => void;
  onSearchReset: () => void;
}

export function DataPreview({ rows, headers, totalRows, skippedRows, columnSearch, onSearchChange, onSearchReset }: DataPreviewProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const visible = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const hasActiveSearch = Object.values(columnSearch).some((v) => v.trim() !== "");

  const handleSearch = (col: string, value: string) => {
    setPage(0);
    onSearchChange(col, value);
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          Data Preview{" "}
          <span className="text-[var(--text-secondary)] font-normal">
            ({rows.length < totalRows ? `${rows.length.toLocaleString()} of ${totalRows.toLocaleString()}` : totalRows.toLocaleString()} rows)
          </span>
        </h2>
        <div className="flex items-center gap-3">
          {hasActiveSearch && (
            <button
              onClick={() => { onSearchReset(); setPage(0); }}
              className="focus-ring text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              Clear filters
            </button>
          )}
          {skippedRows > 0 && (
            <span className="text-[11px] text-yellow-600 dark:text-yellow-400">
              {skippedRows} rows skipped
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            {/* Column name row */}
            <tr className="border-b border-[var(--border)] bg-[var(--bg-surface-alt)]">
              {headers.map((h) => (
                <th key={h} className="px-3 pt-2 pb-1 text-left font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
            {/* Inline search row */}
            <tr className="border-b border-[var(--border)] bg-[var(--bg-surface-alt)]">
              {headers.map((h) => (
                <th key={h} className="px-2 pb-2 pt-0">
                  <input
                    type="text"
                    value={columnSearch[h] ?? ""}
                    onChange={(e) => handleSearch(h, e.target.value)}
                    placeholder="Search…"
                    className="w-full min-w-[80px] rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1 text-[11px] font-normal text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    aria-label={`Filter ${h}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                  No rows match the current filters
                </td>
              </tr>
            ) : (
              visible.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-surface-alt)]">
                  {headers.map((h) => (
                    <td key={h} className="px-3 py-2 text-[var(--text-primary)] whitespace-nowrap max-w-[160px] truncate" title={row[h]}>
                      {row[h] || <span className="text-[var(--text-secondary)] italic">null</span>}
                    </td>
                  ))}
                </tr>
              ))
            )}
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
