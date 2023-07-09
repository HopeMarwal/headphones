/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'dark-product': 'url("../public/images/bg.svg"), linear-gradient(90deg, rgba(31,31,31,1) 0%, rgba(60,60,60,1) 100%)',
        'dark-banner': 'url("../public/images/bg.svg"), linear-gradient(90deg, rgba(57,0,0,1) 0%, rgba(93,0,33,1) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-red': '#FF4948',
        'secondary-gray': '#180202',
        'primary-white': '#E5E5E5'
      },
      width: {
        '33pr' : '33%'
      }
    },
  },
  plugins: [],
}
