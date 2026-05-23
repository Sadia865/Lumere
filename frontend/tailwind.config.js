/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-dark': '#EDE6D6',
        sage: '#7B8F72',
        'sage-light': '#A3B49A',
        'sage-dark': '#4E6147',
        charcoal: '#1A1A18',
        'warm-gray': '#6B6862',
        linen: '#FAF7F2',
        gold: '#C4A96B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        thin: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};