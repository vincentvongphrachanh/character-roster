import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        stage: "#0c0b10",
        "stage-2": "#131219",
        chrome: "#f3f1ec",
      },
    },
  },
  plugins: [],
};

export default config;
