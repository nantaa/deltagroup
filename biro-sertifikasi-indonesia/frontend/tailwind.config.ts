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
          DEFAULT: '#1e7322',
          50: '#f0fdf1',
          100: '#dcfce0',
          200: '#b9f9c2',
          300: '#7ef093',
          400: '#41e05f',
          500: '#1abe3a',
          600: '#109a2d',
          700: '#1e7322',
          800: '#1a5e1d',
          900: '#174e19',
        },
        accent: '#ffd60a',
        gold: '#ffd60a',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        heading: ['Gotham', 'var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
