/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // borderShade: {
        //   DEFAULT: "rgba(0, 0, 0, 0.1)",
        //   dark: "rgba(255, 255, 255, 0.1)",
        // },
        // lightSlate: {
        //   DEFAULT: colors.slate[50],
        //   dark: colors.slate[700],
        // },
        // mediumSlate: {
        //   DEFAULT: colors.slate[200],
        //   dark: colors.slate[800],
        // },
        // deepSlate: {
        //   DEFAULT: colors.slate[400],
        //   dark: colors.slate[900],
        // },
        // darkViolet: {
        //   DEFAULT: colors.violet[800],
        //   dark: colors.violet[900],
        // },
        // textViolet: {
        //   DEFAULT: colors.violet[800],
        //   dark: colors.violet[500],
        // },
        // lightViolet: {
        //   DEFAULT: colors.violet[600],
        //   dark: colors.violet[700],
        // },

        // Background colors
        bgPrimary: {
          DEFAULT: colors.white,
          dark: colors.slate[900],
        },

        bgSecondary: {
          DEFAULT: colors.slate[100],
          dark: colors.slate[800],
        },

        bgSecondaryDim: {
          DEFAULT: colors.slate[200],
          dark: colors.slate[950],
        },

        bgTertiary: colors.slate[800],

        bgAccent: {
          DEFAULT: colors.violet[600],
          dark: colors.violet[900],
        },

        bgAccentDim: {
          DEFAULT: colors.violet[900],
          dark: colors.violet[950],
        },

        // Text colors
        textAccent: {
          DEFAULT: colors.violet[600],
          dark: colors.violet[700],
        },

        textAccentDim: {
          DEFAULT: colors.violet[800],
          dark: colors.violet[500],
        },

        textPrimary: {
          DEFAULT: colors.black,
          dark: colors.white,
        },

        LightGray: {
          DEFAULT: colors.slate[500],
          dark: colors.slate[400],
        },

        // Always use opacity manually in the element to manipulate it.
        LightShade: colors.slate[500],

        RedError: colors.red[500],
      },
      screens: {
        xm: "320px",
      },

      height: {
        "screen-safe": ["100vh", "100dvh", "100svh"],
      },
      width: {
        "screen-safe": ["100vw", "100dvw", "100svw"],
      },
      minHeight: {
        "screen-safe": ["100vh", "100dvh", "100svh"],
      },
      minWidth: {
        "screen-safe": ["100vw", "100dvw", "100svw"],
      },
    },
  },
  plugins: [],
};
