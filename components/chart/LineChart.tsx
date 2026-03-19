"use client";
import {
  LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { DataRow } from "@/types/csv";

interface LineChartProps {
  rows: DataRow[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  isDark: boolean;
}

export function LineChart({ rows, xKey, yKeys, colors, isDark }: LineChartProps) {
  const data = rows.map((r) => {
    const entry: Record<string, string | number> = { [xKey]: r[xKey] ?? "" };
    for (const y of yKeys) entry[y] = parseFloat(r[y] ?? "0") || 0;
    return entry;
  });

  const axisColor = isDark ? "#94A3B8" : "#6B7280";
  const gridColor = isDark ? "#334155" : "#E9D5FF";

  return (
    <ResponsiveContainer width="100%" height={460}>
      <ReLineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey={xKey} tick={{ fill: axisColor, fontSize: 11 }} angle={-30} textAnchor="end" interval="preserveStartEnd" />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} />
        <Tooltip
          contentStyle={{ backgroundColor: isDark ? "#1E293B" : "#fff", border: `1px solid ${gridColor}`, borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: isDark ? "#F1F5F9" : "#1E1B2E" }}
        />
        {yKeys.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: axisColor }} />}
        {yKeys.map((y, i) => (
          <Line key={y} type="monotone" dataKey={y} stroke={colors[i % colors.length]} strokeWidth={2} dot={data.length < 50} />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
}
