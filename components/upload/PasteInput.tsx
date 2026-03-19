"use client";
import { useState } from "react";

interface PasteInputProps {
  onText: (text: string) => void;
  loading: boolean;
}

export function PasteInput({ onText, loading }: PasteInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onText(text);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Paste CSV text here...\n\nname,age,score\nAlice,30,95\nBob,25,82"}
        rows={8}
        disabled={loading}
        className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none focus:outline-none"
        aria-label="Paste CSV text"
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="focus-ring self-end rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
      >
        Visualize
      </button>
    </form>
  );
}
