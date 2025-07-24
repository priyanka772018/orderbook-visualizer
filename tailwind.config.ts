import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          100: "#f3f4f6",
          900: "#1f2937",
          800: "#2d3748",
          700: "#374151",
          600: "#4b5563",
        },
        bid: "#22c55e", // green-500
        ask: "#ef4444", // red-500
        primary: "#3b82f6", // blue-500
      },
    },
  },
  plugins: [],
};

export default config;
