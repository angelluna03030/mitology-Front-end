const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      black : "#000000",
        "blue-600" : "#2563eb",
      "gray-300" :"#D1D5DB",
      "colorprimary": "#F2E6D6",
      "gray-200" : "#e5e7eb",
      "stroke-red-700" : "#DC2626",
      "gray-400": "#a1a1aa"
    },
  },
  plugins: [],
  darkMode: "class",
  plugins: [nextui()]
}