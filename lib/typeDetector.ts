import type { ColumnMeta, ColumnType, DataRow } from "@/types/csv";

const BOOLEAN_VALUES = new Set(["true", "false", "yes", "no", "1", "0", "y", "n"]);

function isNumeric(val: string): boolean {
  if (val === "") return false;
  return !isNaN(Number(val)) && !isNaN(parseFloat(val));
}

function isDate(val: string): boolean {
  if (val === "") return false;
  const d = new Date(val);
  return !isNaN(d.getTime()) && val.length > 4;
}

function isBoolean(val: string): boolean {
  return BOOLEAN_VALUES.has(val.toLowerCase());
}

function detectType(values: string[]): ColumnType {
  const nonEmpty = values.filter((v) => v !== "");
  if (nonEmpty.length === 0) return "unknown";

  const sample = nonEmpty.slice(0, Math.min(200, nonEmpty.length));

  const boolCount = sample.filter(isBoolean).length;
  if (boolCount / sample.length > 0.8) return "boolean";

  const numCount = sample.filter(isNumeric).length;
  if (numCount / sample.length > 0.8) return "numeric";

  const dateCount = sample.filter(isDate).length;
  if (dateCount / sample.length > 0.8) return "date";

  return "categorical";
}

export function detectColumnTypes(headers: string[], rows: DataRow[]): ColumnMeta[] {
  if (headers.length > 100) headers = headers.slice(0, 100);

  return headers.map((name) => {
    const values = rows.map((r) => (r[name] ?? "").trim());
    const nullCount = values.filter((v) => v === "").length;
    const type = detectType(values);

    const meta: ColumnMeta = { name, type, nullCount, totalCount: rows.length };

    if (type === "numeric") {
      const nums = values.filter(isNumeric).map(Number);
      meta.min = Math.min(...nums);
      meta.max = Math.max(...nums);
    }

    if (type === "categorical" || type === "boolean") {
      meta.uniqueValues = Array.from(new Set(values.filter((v) => v !== ""))).slice(0, 200);
    }

    return meta;
  });
}
