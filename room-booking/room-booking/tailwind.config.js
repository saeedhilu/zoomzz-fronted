/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custome_violet: "#9691e9",
        custome_dis_violet: "#5443a3",
        },
    },
  },
  plugins: [],
}