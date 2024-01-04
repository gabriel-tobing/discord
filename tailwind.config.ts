import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "hsl(223 calc(1 * 6.7%) 20.6% / 1)",
        secondary: "hsl(220 calc(1 * 6.5%) 18% / 1)",
        tertiary: "hsl(225 calc(1 * 6.3%) 12.5% / 1)",
        "brand-experiment": "hsl(235 calc(1 * 85.6%) 64.7% / 1)",
        "brand-experiment-560": "hsl(235 calc(1 * 51.4%) 52.4% / 1)",
        "modifier-hover": "hsl(228 calc(1 * 6%) 32.5% / 0.3)",
        muted: "hsl(214 calc(1 * 8.1%) 61.2% / 1)",
      },
      boxShadow: {
        "elevation-high": "0 2px 10px 0 hsl(0 calc(1 * 0%) 0% / 0.2)",
        modifier:
          "linear-gradient(to top, transparent, transparent 1px, transparent 1px, transparent calc(1px + 1px), transparent calc(1px + 1px))",
      }, // hsl(235 calc(1 * 86.1%) 71.8% / 1)
      colors: {
        tertiary: "hsl(225 calc(1 * 6.3%) 12.5% / 1)",
        muted: "hsl(214 calc(1 * 8.1%) 61.2% / 1)",
        normal: "hsl(210 calc(1 * 9.1%) 87.1% / 1",
        link: "hsl(200 calc(1 * 100%) 49.4% / 1)",
        danger: "hsl(358 calc(1 * 92.9%) 72.4% / 1)",
        positive: "hsl(146 calc(1 * 63.1%) 47.8% / 1)",
        "white-500": "hsl(0 calc(1 * 0%) 100% / 1)",
        "header-primary": "hsl(220 calc(1 * 13%) 95.5% / 1)",
        "status-danger": "hsl(359 calc(1 * 87.3%) 59.8% / 1)",
        "interactive-normal": "hsl(215 calc(1 * 8.8%) 73.3% / 1)",
        "primary-400": "hsl(223 calc(1 * 5.8%) 52.9% / 1)",
        "brand-experiment-400": "hsl(235 calc(1 * 86.1%) 71.8% / 1)",
      },
      animation: {
        "grow-dot": "grow 4.4s infinite ease-in-out",
      },
      keyframes: {
        grow: {
          "0%": { transform: "scale(0)" },
          "25%": { transform: "scale(1)" },
          "50%": { transform: "scale(0)" },
          "75%": { transform: "scale(1)", background: "hsl(0 calc(1 * 0%) 100% / 1)" },
          "100%": { transform: "scale(0)", background: "hsl(0 calc(1 * 0%) 100% / 1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
