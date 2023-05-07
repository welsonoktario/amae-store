const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi)', ...fontFamily.sans],
      },
      colors: {
        'primary-1': '#dff2d7',
        'primary-2': '#b8e3a8',
        'primary-3': '#92d378',
      },
      keyframes: {
        slideUpEnter: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 100,
            transform: 'translateY(0px)',
          },
        },
        slideUpLeave: {
          '0%': {
            opacity: 100,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
        },
      },
      animation: {
        slideUpEnter: 'slideUpEnter .3s ease-in-out',
        slideUpLeave: 'slideUpLeave .3s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('prettier-plugin-tailwindcss'),
  ],
  daisyui: {
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
