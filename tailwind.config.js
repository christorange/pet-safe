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
        },
        text: {
          100: '#D0CAB5',
          200: '#505433',
          DEFAULT: '#505433'
        },
        pink: '#ffcadc',
        park: {
          100: '#46c1dc',
          200: '#1e6e80',
          DEFAULT: '#46c1dc'
        },
        background: {
          100: '#fefced',
          200: '#141411'
        },
        error: {
          100: '#fb4b88',
          200: '#ff264e'
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

