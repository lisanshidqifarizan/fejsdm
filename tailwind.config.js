/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '0px', // Breakpoint custom untuk layar kecil (min-width: 480px)
        'xs': '423px', // Breakpoint custom untuk layar kecil (min-width: 480px)
        's': '596px', // Breakpoint custom untuk layar kecil (min-width: 480px)
        'normal': '613px',
        '3xl': '1920px', // Breakpoint custom untuk layar sangat besar (min-width: 1920px)
        'tall': {
          'raw': '(min-height: 800px)'
        }, // Media query berdasarkan tinggi layar
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}