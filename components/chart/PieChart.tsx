"use client";
import { useState } from "react";
import {
  PieChart as RePieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { DataRow } from "@/types/csv";

interface PieChartProps {
  rows: DataRow[];
  categoryKey: string;
  valueKey: string;
  colors: string[];
  isDark: boolean;
}

export function PieChart({ rows, categoryKey, valueKey, colors, isDark }: PieChartProps) {
  const [donut, setDonut] = useState(false);

  const aggregated: Record<string, number> = {};
  for (const row of rows) {
    const cat = row[categoryKey] ?? "Other";
    aggregated[cat] = (aggregated[cat] ?? 0) + (parseFloat(row[valueKey] ?? "0") || 0);
  }

  const data = Object.entries(aggregated)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);

  const tooltipStyle = {
    backgroundColor: isDark ? "#1E293B" : "#fff",
    border: `1px solid ${isDark ? "#334155" : "#E9D5FF"}`,
    borderRadius: 12,
    fontSize: 12,
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setDonut((d) => !d)}
          className="focus-ring rounded-xl border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
        >
          {donut ? "Pie mode" : "Donut mode"}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={donut ? 60 : 0}
            paddingAngle={2}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: isDark ? "#94A3B8" : "#6B7280" }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, color: isDark ? "#94A3B8" : "#6B7280" }} />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}
