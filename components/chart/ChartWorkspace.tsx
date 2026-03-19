"use client";
import { useMemo, useState } from "react";
import type { ParsedCSV, DataRow } from "@/types/csv";
import type { ChartType } from "@/types/chart";
import type { FilterState, ColumnFilter } from "@/types/filter";
import { suggestChartTypes } from "@/lib/suggestions";
import { LIGHT_COLORS, DARK_COLORS } from "@/lib/chartColors";
import { ChartTypeSelector } from "./ChartTypeSelector";
import { ExportButton } from "./ExportButton";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";
import { ColumnSelector } from "@/components/controls/ColumnSelector";
import { FilterPanel } from "@/components/controls/FilterPanel";
import { StatsSidebar } from "@/components/data/StatsSidebar";

const CHART_ID = "chart-export-target";

interface ChartWorkspaceProps {
  data: ParsedCSV;
  filteredRows: DataRow[];
  filters: FilterState;
  onFilterChange: (col: string, filter: ColumnFilter) => void;
  onFilterReset: () => void;
  isDark: boolean;
  onReset: () => void;
}

export function ChartWorkspace({ data, filteredRows, filters, onFilterChange, onFilterReset, isDark, onReset }: ChartWorkspaceProps) {
  const suggestions = useMemo(() => suggestChartTypes(data.columns), [data.columns]);
  const [chartType, setChartType] = useState<ChartType>(suggestions[0] ?? "bar");

  const numeric = data.columns.filter((c) => c.type === "numeric");
  const categorical = data.columns.filter((c) => c.type === "categorical" || c.type === "boolean");
  const dateCol = data.columns.find((c) => c.type === "date");

  const defaultX = (() => {
    if (chartType === "scatter") return numeric[0]?.name ?? data.headers[0];
    if (chartType === "pie") return categorical[0]?.name ?? data.headers[0];
    return dateCol?.name ?? categorical[0]?.name ?? data.headers[0];
  })();
  const defaultY = numeric[0]?.name ?? data.headers[1] ?? data.headers[0];

  const [xKey, setXKey] = useState(defaultX);
  const [yKeys, setYKeys] = useState<string[]>([defaultY]);
  const [scatterYKey, setScatterYKey] = useState(numeric[1]?.name ?? defaultY);

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
    if (type === "scatter") {
      setXKey(numeric[0]?.name ?? data.headers[0]);
      setScatterYKey(numeric[1]?.name ?? numeric[0]?.name ?? data.headers[0]);
    } else if (type === "pie") {
      setXKey(categorical[0]?.name ?? data.headers[0]);
      setYKeys([numeric[0]?.name ?? data.headers[1] ?? data.headers[0]]);
    } else {
      setXKey(dateCol?.name ?? categorical[0]?.name ?? data.headers[0]);
      setYKeys([numeric[0]?.name ?? data.headers[1] ?? data.headers[0]]);
    }
  };

  const renderChart = () => {
    if (filteredRows.length === 0) {
      return (
        <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)]">
          <p className="text-sm text-[var(--text-secondary)]">No data matches the current filters</p>
        </div>
      );
    }

    const commonProps = { isDark, colors };

    if (chartType === "bar") return <BarChart rows={filteredRows} xKey={xKey} yKeys={yKeys} {...commonProps} />;
    if (chartType === "line") return <LineChart rows={filteredRows} xKey={xKey} yKeys={yKeys} {...commonProps} />;
    if (chartType === "pie") return <PieChart rows={filteredRows} categoryKey={xKey} valueKey={yKeys[0] ?? ""} {...commonProps} />;
    if (chartType === "scatter") return <ScatterChart rows={filteredRows} xKey={xKey} yKey={scatterYKey} {...commonProps} />;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {data.rows.length.toLocaleString()} rows · {data.columns.length} columns
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {filteredRows.length < data.rows.length && (
              <span className="text-[var(--accent)] font-medium">{filteredRows.length.toLocaleString()} shown after filters · </span>
            )}
            {data.skippedRows > 0 && <span className="text-yellow-500">{data.skippedRows} rows skipped · </span>}
            <button onClick={onReset} className="focus-ring underline hover:no-underline">Upload new file</button>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <ChartTypeSelector selected={chartType} onChange={handleChartTypeChange} suggested={suggestions} />
          <ExportButton chartId={CHART_ID} />
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr_260px] items-start">
        {/* Left: column summary */}
        <div>
          <StatsSidebar columns={data.columns} />
        </div>

        {/* Centre: chart */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
          <div className="mb-4">
            <ColumnSelector
              columns={data.columns}
              chartType={chartType}
              xKey={xKey}
              yKeys={yKeys}
              scatterYKey={scatterYKey}
              onXChange={setXKey}
              onYChange={setYKeys}
              onScatterYChange={setScatterYKey}
            />
          </div>
          <div id={CHART_ID} className="bg-[var(--bg-surface)] rounded-xl p-2">
            {renderChart()}
          </div>
        </div>

        {/* Right: filters */}
        <div>
          <FilterPanel
            columns={data.columns}
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onFilterReset}
          />
        </div>
      </div>
    </div>
  );
}
