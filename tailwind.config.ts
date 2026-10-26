import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  safelist: ["light", "dark"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#090b0e",
          900: "#0e1117",
          850: "#131720",
          800: "#1a202c",
          700: "#242d3d",
          600: "#374151",
          500: "#4b5563",
        },
        cyan: {
          DEFAULT: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.35)",
          muted: "#0891b2",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.35)",
          muted: "#6d28d9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "subtle-glow": "0 0 25px rgba(0, 240, 255, 0.08), 0 0 50px rgba(139, 92, 246, 0.05)",
        "card-glass": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        "cyan-border": "0 0 15px rgba(0, 240, 255, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
