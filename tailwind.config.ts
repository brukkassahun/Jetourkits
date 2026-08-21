import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Coda-inspired showroom — warm paper, near-black, bold accent blocks
        cream: "#FAF9F6",
        paper: "#FFFFFF",
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#1F1F1F",
        },
        charcoal: "#141414",
        muted: "#6B6B6B",
        faint: "#A0A0A0",
        line: "#E8E6E1",
        lineDark: "#2A2A2A",
        // Bold Coda accent palette
        accent: {
          DEFAULT: "#0E7A3D",      // forest green (primary CTA)
          strong: "#0A5C2E",
          dim: "#E8F5E9",
        },
        navy: {
          DEFAULT: "#1A2744",
          light: "#2A3E60",
        },
        sky: {
          DEFAULT: "#B8D4E3",
          soft: "#DDEEF5",
        },
        sage: {
          DEFAULT: "#A3B18A",
          soft: "#D4DCC9",
        },
        // Signal orange for deal flags
        flare: {
          DEFAULT: "#E0571F",
          strong: "#C94A14",
          dim: "#FBE6DA",
        },
        success: "#0E7A3D",
      },
      fontFamily: {
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cream-radial":
          "radial-gradient(80% 60% at 50% 0%, rgba(20,20,20,0.04) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
