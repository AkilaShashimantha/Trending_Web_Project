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
        parchment: {
          DEFAULT: "#FBFBF9",
          50: "#FFFFFF",
          100: "#FBFBF9",
          200: "#F4F4F0",
          300: "#EAEAE3",
          400: "#DCDCD2",
        },
        spruce: {
          DEFAULT: "#0F382C",
          50: "#E8F4F0",
          100: "#D1EADF",
          200: "#A3D4C0",
          700: "#16503E",
          800: "#0F382C",
          900: "#0A261E",
          950: "#061A14",
        },
        emeraldTactile: {
          DEFAULT: "#059669",
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        amberWarm: {
          DEFAULT: "#D97706",
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
