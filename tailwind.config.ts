import type { Config } from "tailwindcss";

/**
 * tailwind.config.ts — Link Zero Landing Page
 *
 * NOTE: This project uses Tailwind CSS v4, where most token configuration
 * lives in globals.css via @theme. This file still satisfies the project
 * requirement and can be used for content scanning and plugin loading.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /**
       * All design tokens (colors, shadows, animations, fonts) are defined
       * in app/globals.css via Tailwind v4's @theme directive for full
       * CSS-native access. The values below are mirrored here for
       * IDE autocomplete / reference.
       */
      colors: {
        void:    "#050505",
        "void-soft":  "#0d0d0d",
        "void-muted": "#111111",
        "led-white":  "#f5f5ff",
        "led-cold":   "#e8eeff",
      },
      fontFamily: {
        inter:    ["Inter", "system-ui", "sans-serif"],
        jetbrains: ["JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "glow-xs": "0 0 8px  rgba(245,245,255,0.25)",
        "glow-sm": "0 0 16px rgba(245,245,255,0.35)",
        "glow-md": "0 0 32px rgba(245,245,255,0.4)",
        "glow-lg": "0 0 64px rgba(245,245,255,0.5), 0 0 128px rgba(245,245,255,0.2)",
      },
      animation: {
        "pulse-glow":     "pulse-glow 2.4s ease-in-out infinite",
        "particle-float": "particle-float 3s ease-in-out infinite",
        "draw-line":      "draw-line 1s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(245,245,255,0.3), 0 0 32px rgba(245,245,255,0.15)" },
          "50%":       { boxShadow: "0 0 28px rgba(245,245,255,0.7), 0 0 72px rgba(245,245,255,0.35)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0px) scale(1)", opacity: "0.8" },
          "50%":      { transform: "translateY(-6px) scale(1.2)", opacity: "1" },
        },
        "draw-line": {
          from: { strokeDashoffset: "300", opacity: "0" },
          to:   { strokeDashoffset: "0", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
