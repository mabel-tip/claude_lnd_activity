import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          "bg-primary": "#FFF8F6",
          "bg-surface": "#FFFFFF",
          "bg-surface-alt": "#F5F0FF",
          "accent-pink": "#F9A8D4",
          "accent-lavender": "#C4B5FD",
          "accent-mint": "#A7F3D0",
          "accent-peach": "#FDBA74",
          "text-primary": "#1E1B2E",
          "text-secondary": "#6B7280",
          border: "#E9D5FF",
        },
        dark: {
          "bg-primary": "#0F172A",
          "bg-surface": "#1E293B",
          "bg-surface-alt": "#1A2744",
          "accent-blue": "#3B82F6",
          "accent-indigo": "#6366F1",
          "accent-teal": "#2DD4BF",
          "accent-slate": "#94A3B8",
          "text-primary": "#F1F5F9",
          "text-secondary": "#94A3B8",
          border: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
