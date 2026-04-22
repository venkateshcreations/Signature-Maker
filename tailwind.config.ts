import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        base: "#0A0B0F",
        panel: "#111318",
        card: "#1A1D25",
        surface: "#222633",
        "surface-hover": "#2A3045",
        border: "#1E2330",
        "border-light": "#2E3650",
        accent: {
          DEFAULT: "#6366F1",
          hover: "#4F52D4",
          glow: "#818CF8",
          muted: "#6366F120",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          muted: "#22D3EE20",
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#475569",
          placeholder: "#334155",
        },
        preview: {
          bg: "#F8FAFC",
          border: "#E2E8F0",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.4)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        preview: "0 8px 48px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent":
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 100%)",
        "gradient-panel":
          "linear-gradient(180deg, #111318 0%, #0D0F15 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(99,102,241,0.6)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
