import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#000000",
          cream: "#F5F2ED",
          gold: "#C9A96E"
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};

export default config;
