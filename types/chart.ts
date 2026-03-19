export type ChartType = "bar" | "line" | "pie" | "scatter";

export interface AxisConfig {
  xKey: string;
  yKeys: string[];
  colorKey?: string;
}

export interface ScatterConfig {
  xKey: string;
  yKey: string;
}
