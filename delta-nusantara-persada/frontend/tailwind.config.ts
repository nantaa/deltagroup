/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007a91',
          50: '#e0f7fb',
          100: '#b2ecf5',
          200: '#7fdeed',
          300: '#4dd0e4',
          400: '#26c5de',
          500: '#00bbd8',
          600: '#00aac4',
          700: '#007a91',   // dark primary (replaces #1a3a6b)
          800: '#005f72',
          900: '#003d4a',
        },
        dnp: {
          navy: '#08315F',
          teal: '#005E86',
          cyan: '#00D9FF',
          wave: '#2A9FBC',
          silver: '#DEE0E1',
        },
        accent: '#ffd60a',  // golden yellow (replaces #2563EB)
        gold: '#ffd60a',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        heading: ['var(--font-figtree)', 'sans-serif'],
        figtree: ['var(--font-figtree)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
