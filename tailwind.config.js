/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#E9D5FF',
          DEFAULT: '#A855F7',
          dark: '#6B21A8',
        },
      },
    },
  },
  plugins: [],
}

