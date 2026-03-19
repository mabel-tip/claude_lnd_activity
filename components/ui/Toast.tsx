"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "warning";
  onDismiss: () => void;
}

export function Toast({ message, type = "error", onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 200);
    }, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl px-5 py-4 shadow-lg text-sm font-medium transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        type === "error" && "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        type === "success" && "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
        type === "warning" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex-1">{message}</span>
        <button
          onClick={() => { setVisible(false); setTimeout(onDismiss, 200); }}
          className="focus-ring rounded-lg opacity-60 hover:opacity-100"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
