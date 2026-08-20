import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Bright showroom — warm paper base, airy and welcoming
        void: "#F6F4EE", // page background (warm ivory)
        panel: "#FFFFFF", // surfaces / cards
        card: "#FFFFFF",
        elevated: "#EFEBE1", // inputs / subtle fills
        line: "#E7E2D4", // hairlines
        // Primary text — deep warm charcoal (was light-on-dark)
        ink: {
          DEFAULT: "#171814",
          soft: "#33352B",
        },
        foreground: "#171814",
        muted: "#5C604F",
        faint: "#8B8F7A",
        // Racing green accent — bright on paper, reads as premium/energetic
        accent: {
          DEFAULT: "#0E7A3D",
          strong: "#0B9A4E",
          dim: "#DCEDE0",
        },
        // Signal orange for deal flags only
        flare: {
          DEFAULT: "#E0571F",
          strong: "#C94A14",
          dim: "#FBE6DA",
        },
        success: "#0E7A3D",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(70% 90% at 80% 10%, rgba(14,122,61,0.10) 0%, transparent 55%)",
        blueprint:
          "repeating-linear-gradient(90deg, rgba(14,122,61,0.05) 0 1px, transparent 1px 90px)",
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
