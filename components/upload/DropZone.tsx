"use client";
import { useCallback, useState } from "react";
import clsx from "clsx";

interface DropZoneProps {
  onFile: (file: File) => void;
  loading: boolean;
}

export function DropZone({ onFile, loading }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    onFile(file);
  }, [onFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={clsx(
        "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-all duration-150",
        dragging
          ? "border-[var(--accent)] bg-[var(--accent)]/10 scale-[1.01]"
          : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5",
        loading && "pointer-events-none opacity-60"
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-surface-alt)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-[var(--accent)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <div>
        <p className="text-base font-semibold text-[var(--text-primary)]">
          {dragging ? "Drop it here!" : "Drop your CSV here"}
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          or <span className="font-medium text-[var(--accent)]">browse files</span> — max 10 MB
        </p>
      </div>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={onFileInput}
        className="sr-only"
        aria-label="Upload CSV file"
        disabled={loading}
      />
    </label>
  );
}
