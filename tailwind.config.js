/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'avatar-white': '#fffeff', // Custom background color
      },
    },
  },
  plugins: [],
}