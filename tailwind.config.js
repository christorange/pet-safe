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
        },
      },
      boxShadow: {
        100: '0px 8px 40px 0px rgba(0, 0, 61, 0.05), 0px 12px 32px -16px rgba(0, 0, 0, 0.05)',
        200: '0px 12px 60px 0px rgba(1, 1, 45, 0.05), 0px 12px 32px -16px rgba(0, 0, 0, 0.13)',
        300: '0px 16px 64px 0px rgba(1, 6, 45, 0.17), 0px 16px 36px -20px rgba(1, 6, 45, 0.17)'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: ["light"],
    styled: true,
    logs: false
  }
}

