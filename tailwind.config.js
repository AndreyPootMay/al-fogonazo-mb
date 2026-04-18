/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#F97316',
        darkBg: '#0B0B0B',
        darkCard: '#18181B',
      },
      fontFamily: {
        sans: ['Kodchasan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
