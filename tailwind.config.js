/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "ancient": {
          50: "#e0f0f3",
          100: "#c5dfe5",
          200: "#b4d0d7",
          300: "#a6c2c9",
          400: "#9ab6bd",
          500: "#92acb3",
          600: "#8aa2a9",
          700: "#7b9197",
          800: "#7a9096",
          900: "#768b90"
        }
      }
    }
  },
  plugins: [
    require("flowbite/plugin"),
    require("tw-elements/dist/plugin.cjs")
  ],
}