"use client";
import { useState } from "react";
import { useCSV } from "@/hooks/useCSV";
import { useTheme } from "@/hooks/useTheme";
import { Navbar } from "@/components/ui/Navbar";
import { Toast } from "@/components/ui/Toast";
import { Spinner } from "@/components/ui/Spinner";
import { DropZone } from "@/components/upload/DropZone";
import { PasteInput } from "@/components/upload/PasteInput";
import { ChartWorkspace } from "@/components/chart/ChartWorkspace";
import { StatsSidebar } from "@/components/data/StatsSidebar";
import { DataPreview } from "@/components/data/DataPreview";

type UploadTab = "upload" | "paste";

export function MainApp() {
  const { data, loading, error, loadFile, loadText, reset } = useCSV();
  const { theme } = useTheme();
  const [toast, setToast] = useState<string | null>(null);
  const [uploadTab, setUploadTab] = useState<UploadTab>("upload");
  const [showPreview, setShowPreview] = useState(false);

  const isDark = theme === "dark";

  const handleError = (msg: string) => setToast(msg);

  const handleFile = async (file: File) => {
    await loadFile(file);
  };

  // Surface errors via toast
  if (error && !toast) {
    setToast(error);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {!data ? (
          /* ── Upload screen ── */
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
                CSV Data Visualizer
              </h1>
              <p className="text-[var(--text-secondary)]">
                Upload a CSV file and instantly generate interactive charts
              </p>
            </div>

            {/* Tab selector */}
            <div className="flex gap-1 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-1">
              {(["upload", "paste"] as UploadTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setUploadTab(tab)}
                  aria-pressed={uploadTab === tab}
                  className={`focus-ring flex-1 rounded-lg py-2 text-sm font-medium transition-colors capitalize ${
                    uploadTab === tab
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab === "upload" ? "Upload File" : "Paste CSV"}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6">
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Spinner size="lg" />
                  <p className="text-sm text-[var(--text-secondary)]">Parsing CSV…</p>
                </div>
              ) : uploadTab === "upload" ? (
                <DropZone onFile={handleFile} loading={loading} />
              ) : (
                <PasteInput onText={loadText} loading={loading} />
              )}
            </div>

            {/* Sample hint */}
            <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
              Try a sample:{" "}
              <button
                onClick={() => loadText(SAMPLE_CSV)}
                className="focus-ring font-medium text-[var(--accent)] underline hover:no-underline"
              >
                load demo data
              </button>
            </p>
          </div>
        ) : (
          /* ── Workspace screen ── */
          <div className="flex flex-col gap-6">
            <ChartWorkspace data={data} isDark={isDark} onReset={reset} />

            {/* Stats + data preview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
              <StatsSidebar columns={data.columns} />
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Data</h2>
                  <button
                    onClick={() => setShowPreview((p) => !p)}
                    className="focus-ring text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {showPreview ? "Hide preview" : "Show preview"}
                  </button>
                </div>
                {showPreview && <DataPreview data={data} />}
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <Toast
          message={toast}
          type={toast.includes("skipped") ? "warning" : "error"}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

const SAMPLE_CSV = `month,revenue,expenses,profit,customers
Jan,42000,28000,14000,320
Feb,45000,30000,15000,345
Mar,51000,31000,20000,390
Apr,48000,29500,18500,370
May,55000,32000,23000,420
Jun,62000,34000,28000,480
Jul,58000,33000,25000,455
Aug,65000,35000,30000,510
Sep,71000,37000,34000,560
Oct,69000,36500,32500,540
Nov,74000,38000,36000,590
Dec,82000,40000,42000,650`;
