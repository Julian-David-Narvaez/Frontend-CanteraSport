/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#00262f",
        secundary:"#307ef8",
        tertiary:{
          100:"#f7f7f7",
          900:"#ffffff",
        },
        cuartary:{
          "100":"#21222d",
          "900":"#171821",
        }
        

      }
    },
  },
  plugins: [],
}