/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': {
          50: '#E8F0FF',
          100: '#C8DAFF',
          200: '#9CB9FF',
          300: '#6F98FF',
          400: '#3E7CFF',
          500: '#1E63F5',
          600: '#174FC0',
          700: '#123B92',
          800: '#0F2B6D',
          900: '#0B1B44',
        },
        purple: {
          400: '#A855F7',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
      boxShadow: {
        glow: '0 0 25px rgba(139, 92, 246, 0.35)',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floaty: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 12s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

