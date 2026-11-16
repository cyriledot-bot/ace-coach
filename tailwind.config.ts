import type { Config } from "tailwindcss";

// Couleurs relevées dans la feuille compilée de la version du 25/10 :
// ball-300 #e8ff5a · ball-400 #d4f22e · ball-500 #c6ea11 · ink-950 #070b1a
// court-400 #3b82f6 · court-500 #2563eb.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ball: { 200: "#f3ff9c", 300: "#e8ff5a", 400: "#d4f22e", 500: "#c6ea11" },
        ink: { 900: "#111a44", 950: "#070b1a" },
        court: { 400: "#3b82f6", 500: "#2563eb" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px #d6f22e59, 0 10px 40px -10px #d6f22e73",
      },
      keyframes: {
        pop: { "0%": { opacity: "0", transform: "scale(.9)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
      animation: { pop: ".35s ease-out both pop" },
    },
  },
  plugins: [],
} satisfies Config;
