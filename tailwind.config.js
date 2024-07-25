/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#113A3A',
        primary_button: '#1d4141',
        secondary: '#FED0CE',
        secondary_hovered: '#CBA6A4',
        secondary_active: ' #FEE2E1'
      },
    },
  },
  plugins: [],
}

