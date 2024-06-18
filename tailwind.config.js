/** @type {import('tailwindcss').Config} */
export default {
    content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
      extend: {
        colors:{
          voilet:("hsl(279, 39%, 43%)"),
          blue:("hsl(188, 64%, 55%)"),
          red:("hsl(0, 100%, 62%)"),
          yellow:("hsl(51, 100%, 58%)"),
        }
      },
    },
    plugins: [],
  }
  