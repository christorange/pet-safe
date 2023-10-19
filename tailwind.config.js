/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#ADCD93',
      'secondry': '#5B4C99',
      'background': '#FEFCED',
      'text': '#505433',
      'text-button': '#000',
      'error': '#FB4B88',
      'map-point':'#835DD3',
      'primary-dark': '#7CB872',
      'secondry-dark': '#C1B3E9',
      'background-dark': '#141411',
      'text-dark': '#D0CAB5',
      'text-button-dark': '#5C5C4C',
      'error-dark': '#FF264E',
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: false,
    styled: true,
  }
}

