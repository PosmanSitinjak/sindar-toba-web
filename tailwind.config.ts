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
        toba: {
          lake: "#1A3A34",
          "lake-dark": "#122A25",
          "lake-light": "#254F47",
          gold: "#C29D59",
          "gold-light": "#D4B373",
          amber: "#B8653A",
          teal: "#3D6B75",
          cream: "#FAF8F5",
          "cream-dark": "#F2EDE5",
          sand: "#F8F6F2",
          border: "#E8E2D9",
          slate: "#575E5B",
          charcoal: "#2C3531",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        newsreader: ["var(--font-newsreader)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
