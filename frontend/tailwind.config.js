const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector", // or 'media' or 'class',
  theme: {
    // fontWeight: {
    //   hairline: 100,
    //   "extra-light": 100,
    //   thin: 200,
    //   light: 300,
    //   normal: 400,
    //   medium: 400,
    //   semibold: 300,
    //   bold: 500,
    //   extrabold: 600,
    //   "extra-extrabold": 800,
    //   black: 900,
    // },
    fontFamily: {
      sans: ["Poppins", "Merriweather", "sans-serif"],

      poppins: ["Poppins", "Merriweather", "sans-serif"],
    },
    extend: {
      colors: {},
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
