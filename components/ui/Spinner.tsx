export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? "h-4 w-4" : size === "md" ? "h-8 w-8" : "h-12 w-12";
  return (
    <div
      className={`${s} animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]`}
      role="status"
      aria-label="Loading"
    />
  );
}
