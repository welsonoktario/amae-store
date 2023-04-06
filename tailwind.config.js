const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
      colors: {
        'primary-1': '#dff2d7',
        'primary-2': '#b8e3a8',
        'primary-3': '#92d378',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('prettier-plugin-tailwindcss'),
  ],
  daisyui: {
    themes: false,
    logs: false,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#5EBF39',
        },
      },
    ],
  },
};
