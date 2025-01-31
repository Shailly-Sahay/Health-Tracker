/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px", // Custom breakpoint
      },
      colors: {
        muted: "var(--muted-text-color)",
      },
    },
  },

  plugins: [require("tailwindcss-primeui")],
};
