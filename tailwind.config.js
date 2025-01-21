module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ["var(--font-space-mono)", "monospace"],
        lekton: ["var(--font-lekton)", "sans-serif"],
        baskervville: ["var(--font-baskervville)", "serif"],
        caveat: ["var(--font-caveat)", "cursive"],
        "permanent-marker": ["var(--font-permanent-marker)", "cursive"],
        "square-peg": ["var(--font-square-peg)", "cursive"],
        "swanky-and-moo-moo": ["var(--font-swanky-and-moo-moo)", "cursive"],
        autoscape: ['"Autoscape Round LL Trial"', "sans-serif"],
        superstudio: ['"Superstudio Trial"', "sans-serif"],
        cobra: ['"Cobra LL VIP Trial"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
      },
      keyframes: {
        "pulse-out": {
          "0%": { transform: "scale(0.95)", opacity: "0.1" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "scale(1.05)", opacity: "0" },
        },
        "radial-pulse": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { opacity: "0.2" },
          "100%": { opacity: "0", transform: "scale(1.2)" },
        },
      },
      animation: {
        "pulse-out": "pulse-out 4s infinite",
        "radial-pulse": "radial-pulse 3s ease-out infinite",
      },
    },
  },
}

