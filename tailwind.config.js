/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        muted: "var(--muted-text-color)",
      },
    },
  },

  plugins: [require("tailwindcss-primeui")],
};
