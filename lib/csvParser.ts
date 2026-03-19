import Papa from "papaparse";
import type { ParsedCSV, DataRow } from "@/types/csv";
import { detectColumnTypes } from "./typeDetector";

export function parseCSVText(text: string): ParsedCSV {
  const result = Papa.parse<DataRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  const rows = result.data as DataRow[];
  const headers = result.meta.fields ?? [];
  const skippedRows = result.errors.length;
  const columns = detectColumnTypes(headers, rows);

  return { headers, rows, columns, skippedRows };
}

export async function parseCSVFile(file: File): Promise<ParsedCSV> {
  return new Promise((resolve, reject) => {
    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
      reject(new Error("Please upload a valid .csv file"));
      return;
    }
    if (file.size > 10_485_760) {
      reject(new Error("File too large (max 10 MB)"));
      return;
    }

    Papa.parse<DataRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        const rows = result.data as DataRow[];
        const headers = result.meta.fields ?? [];
        const skippedRows = result.errors.length;

        if (headers.length === 0) {
          reject(new Error("CSV appears to be empty"));
          return;
        }
        if (rows.length === 0) {
          reject(new Error("No data rows found"));
          return;
        }

        const columns = detectColumnTypes(headers, rows);
        resolve({ headers, rows, columns, skippedRows });
      },
      error: (err) => reject(new Error(err.message)),
    });
  });
}
