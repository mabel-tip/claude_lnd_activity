import clsx from "clsx";
import type { ColumnType } from "@/types/csv";

const styles: Record<ColumnType, string> = {
  numeric: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  categorical: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  date: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  boolean: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  unknown: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export function Badge({ type }: { type: ColumnType }) {
  return (
    <span className={clsx("text-[11px] font-medium px-2 py-0.5 rounded-full", styles[type])}>
      {type}
    </span>
  );
}
