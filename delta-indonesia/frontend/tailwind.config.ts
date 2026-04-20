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
          DEFAULT: '#1a3a6b',
          50: '#e8eef7',
          100: '#c5d3eb',
          200: '#9fb5db',
          300: '#7897cb',
          400: '#5b80bf',
          500: '#3d69b3',
          600: '#2d5499',
          700: '#1a3a6b',
          800: '#132e5a',
          900: '#0c2248',
        },
        accent: '#2563EB',
        gold: '#f59e0b',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
