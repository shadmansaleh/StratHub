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
      colors: {
        // "blue-200": "#CAD2E3",
      },
      transitionProperty: {
        // width: "width",
        // "min-width": "min-width",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "strathub-light": {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#384D6C",
          "primary-content": "white",
          secondary: "#A3C0E9",
          "secondary-content": "black",
          accent: "#1A83E4",
          "accent-content": "black",
          "base-100": "#DFEAFE",
          "base-200": "#B6C8EA",
          "base-300": "#95ACD7",
          "base-content": "black",
          neutral: "#ff9d66",
          "neutral-content": "black",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "1.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "2px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        "strathub-dark": {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "oklch(65.69% 0.196 275.75)",
          secondary: "oklch(74.8% 0.26 342.55)",
          accent: "oklch(74.51% 0.167 183.61)",
          neutral: "#2a323c",
          "neutral-content": "#A6ADBB",

          // "base-100": "#1d232a",
          "base-100": "#242930",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "1.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "2px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        "strathub-shadman": {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2F27CE",
          "primary-content": "#FBFBFE",
          secondary: "#DEDCFF",
          "secondary-content": "black",
          accent: "#433BFF",
          "accent-content": "black",
          "base-100": "#FBFBFE",
          "base-content": "black",
          neutral: "#F7F4E9",
          "neutral-content": "black",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "1.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "2px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      // "light",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      // "lemonade",
      // "night",
      // "coffee",
      // "winter",
      // "dim",
      // "nord",
      // "sunset",
    ],
  },
};
