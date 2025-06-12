// tailwind.config.js
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#eebb7a",
        secondary: "#415564",
        tertiary: "#d3e3eb",
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        comfortaa: ["Comfortaa", "sans-serif"],
        poiretOne: ["PoiretOne-Regular", "cursive"],
      },
    },
  },
  plugins: [],
};
