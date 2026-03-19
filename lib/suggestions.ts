import type { ColumnMeta } from "@/types/csv";
import type { ChartType } from "@/types/chart";

export function suggestChartTypes(columns: ColumnMeta[]): ChartType[] {
  const types = columns.map((c) => c.type);
  const hasNumeric = types.includes("numeric");
  const hasDate = types.includes("date");
  const hasCategorical = types.includes("categorical") || types.includes("boolean");
  const numericCount = types.filter((t) => t === "numeric").length;

  const suggestions: ChartType[] = [];

  if (hasDate && hasNumeric) suggestions.push("line");
  if (hasCategorical && hasNumeric) suggestions.push("bar");
  if (hasCategorical && hasNumeric) suggestions.push("pie");
  if (numericCount >= 2) suggestions.push("scatter");
  if (!suggestions.includes("bar")) suggestions.push("bar");

  return Array.from(new Set(suggestions));
}
