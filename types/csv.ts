export type ColumnType = "numeric" | "categorical" | "date" | "boolean" | "unknown";

export interface ColumnMeta {
  name: string;
  type: ColumnType;
  uniqueValues?: string[];      // for categorical / boolean
  min?: number;                 // for numeric
  max?: number;                 // for numeric
  nullCount: number;
  totalCount: number;
}

export type DataRow = Record<string, string>;

export interface ParsedCSV {
  headers: string[];
  rows: DataRow[];
  columns: ColumnMeta[];
  skippedRows: number;
}
