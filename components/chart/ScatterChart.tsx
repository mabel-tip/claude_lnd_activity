"use client";
import {
  ScatterChart as ReScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from "recharts";
import type { DataRow } from "@/types/csv";

interface ScatterChartProps {
  rows: DataRow[];
  xKey: string;
  yKey: string;
  colors: string[];
  isDark: boolean;
}

export function ScatterChart({ rows, xKey, yKey, colors, isDark }: ScatterChartProps) {
  const data = rows
    .map((r) => ({ x: parseFloat(r[xKey] ?? ""), y: parseFloat(r[yKey] ?? "") }))
    .filter((p) => !isNaN(p.x) && !isNaN(p.y));

  const axisColor = isDark ? "#94A3B8" : "#6B7280";
  const gridColor = isDark ? "#334155" : "#E9D5FF";

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ReScatterChart margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis type="number" dataKey="x" name={xKey} tick={{ fill: axisColor, fontSize: 11 }} label={{ value: xKey, position: "insideBottom", offset: -4, fill: axisColor, fontSize: 11 }} />
        <YAxis type="number" dataKey="y" name={yKey} tick={{ fill: axisColor, fontSize: 11 }} label={{ value: yKey, angle: -90, position: "insideLeft", fill: axisColor, fontSize: 11 }} />
        <ZAxis range={[30, 30]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3", stroke: gridColor }}
          contentStyle={{ backgroundColor: isDark ? "#1E293B" : "#fff", border: `1px solid ${gridColor}`, borderRadius: 12, fontSize: 12 }}
          formatter={(val: number, name: string) => [val, name === "x" ? xKey : yKey]}
        />
        <Scatter data={data} fill={colors[0]} fillOpacity={0.75} />
      </ReScatterChart>
    </ResponsiveContainer>
  );
}
