/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
