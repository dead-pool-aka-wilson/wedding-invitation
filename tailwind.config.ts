import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06080d",
        surface: {
          DEFAULT: "#0c0f15",
          2: "#12151c",
          3: "#181c24",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.06)",
          hi: "rgba(255,255,255,0.12)",
        },
        text: {
          DEFAULT: "#c0c5cf",
          dim: "rgba(255,255,255,0.35)",
          bright: "#edf0f5",
        },
        cyan: "#00d4ff",
        pink: "#ff3d8a",
        amber: "#ffb020",
        green: "#2dda6e",
        red: "#ff4040",
        purple: "#a78bfa",
        yellow: "#ffe066",
        rose: "#e5aea9",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Instrument Sans", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
