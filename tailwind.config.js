/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderShade: "rgba(255, 255, 255, 0.1)",
        lightSlate: colors.slate[700],
        mediumSlate: colors.slate[800],
        deepSlate: colors.slate[900],
      },
      screens: {
        xm: "320px",
      },
    },
  },
  plugins: [],
};
