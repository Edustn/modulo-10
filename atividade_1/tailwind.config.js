/** @type {import('tailwindcss').Config} */
import { colors } from "./assets/styles/colors.js"


module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js, tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors
    },
  },
  plugins: [],
}