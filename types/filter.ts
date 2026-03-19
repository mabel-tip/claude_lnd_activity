export interface NumericFilter {
  type: "numeric";
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
}

export interface CategoricalFilter {
  type: "categorical";
  values: string[];
  selected: string[];
}

export interface DateFilter {
  type: "date";
  from: string;
  to: string;
}

export type ColumnFilter = NumericFilter | CategoricalFilter | DateFilter;

export type FilterState = Record<string, ColumnFilter>;
