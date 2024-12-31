import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        progress: "progress 2s infinite ease-in-out",
      },
      keyframes: {
        progress: {
          "0%, 100%": { width: "0%" },
          "50%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
