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
        coesa: {
          royal: "#0A5FA8",
          sky: "#1A8FE3",
          electric: "#00B4FF",
          navy: "#061B38",
          midnight: "#030D1F",
          white: "#FFFFFF",
          "off-white": "#F0F6FF",
          muted: "#8BA5C4",
          divider: "#1A3558",
          success: "#00D084",
          warning: "#FFAA00",
          error: "#FF4757",
        },
      },
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Nunito'", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 6rem)",
      },
      backgroundImage: {
        "grad-hero": "linear-gradient(135deg, #030D1F 0%, #061B38 50%, #0A5FA8 100%)",
        "grad-card": "linear-gradient(145deg, #0D2547 0%, #061B38 100%)",
        "grad-accent": "linear-gradient(90deg, #1A8FE3 0%, #00B4FF 100%)",
        "grad-glow": "radial-gradient(ellipse at center, rgba(0,180,255,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        card: "0 4px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(26, 143, 227, 0.1)",
        glow: "0 0 40px rgba(0, 180, 255, 0.25)",
        btn: "0 4px 20px rgba(0, 180, 255, 0.35)",
      },
      borderRadius: {
        sm: "4px",
        md: "10px",
        lg: "18px",
        xl: "28px",
        pill: "9999px",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      maxWidth: {
        container: "1280px",
        readable: "760px",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out forwards",
        "slide-in": "slideIn 0.2s ease-out forwards",
        "bounce-slow": "bounce 2s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 180, 255, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 180, 255, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
