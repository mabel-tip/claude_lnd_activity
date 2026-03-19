"use client";
import { useState } from "react";
import type { ParsedCSV } from "@/types/csv";
import { parseCSVFile, parseCSVText } from "@/lib/csvParser";

export function useCSV() {
  const [data, setData] = useState<ParsedCSV | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadFile(file: File) {
    setLoading(true);
    setError(null);
    try {
      const parsed = await parseCSVFile(file);
      setData(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse CSV");
    } finally {
      setLoading(false);
    }
  }

  function loadText(text: string) {
    setLoading(true);
    setError(null);
    try {
      if (!text.trim()) throw new Error("CSV appears to be empty");
      const parsed = parseCSVText(text);
      if (parsed.rows.length === 0) throw new Error("No data rows found");
      setData(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse CSV");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setData(null);
    setError(null);
  }

  return { data, loading, error, loadFile, loadText, reset };
}
