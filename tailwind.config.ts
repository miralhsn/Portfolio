import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg:       "#060811",
        primary:  "#6366f1",
        accent:   "#22d3ee",
        violet:   "#a855f7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
