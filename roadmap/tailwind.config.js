/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F1117",
        surface: "#161B27",
        "surface-hover": "#1C2333",
        border: "#252D3D",
        "border-light": "#1E2535",
        text: "#E2E8F0",
        "text-mid": "#94A3B8",
        "text-dim": "#475569",
        "text-faint": "#65738b",
      },
      fontFamily: {
        mono: ["'DM Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
