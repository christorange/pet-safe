/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#e3f8d3',
          200: '#65ac59',
          DEFAULT: '#e3f8d3'
        },
        brand2: {
          100: '#c1b3e9',
          200: '#5b4c99',
          DEFAULT: '#5b4c99'
        }
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: false,
    styled: true,
    logs: false
  }
}

