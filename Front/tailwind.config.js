/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".my-flex-ja": { "@apply flex justify-center items-center": {} },
        ".my-flex-jac": {
          "@apply flex justify-center items-center flex-col": {},
        },
        ".my-animate": {
          animation: "bounce 1s infinite",
        },
        ".page-title": {
          "font-size": "20px",
          "font-weight": 600,
        },
        ".page-header": {
          display: "flex",
          "justify-content": "space-between",
          padding: "18px 18px 18px 24px",
        },
      });
    }),
  ],
};
