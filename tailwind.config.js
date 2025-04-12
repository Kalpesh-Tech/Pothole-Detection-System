/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d1538',
        secondary: '#121c45',
        tertiary: '#162052',
      },
    },
  },
  plugins: [],
};