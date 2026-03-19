"use client";
import { useState } from "react";
import { exportChartAsPNG } from "@/lib/exportChart";

interface ExportButtonProps {
  chartId: string;
}

export function ExportButton({ chartId }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportChartAsPNG(chartId, "chart-export.png");
    } catch {
      // silently fail — chart element may not be rendered
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      aria-label="Export chart as PNG"
      className="focus-ring flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-150"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      {exporting ? "Exporting…" : "Export PNG"}
    </button>
  );
}
