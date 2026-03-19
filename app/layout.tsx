import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSV Data Visualizer",
  description: "Upload a CSV and instantly generate interactive charts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
