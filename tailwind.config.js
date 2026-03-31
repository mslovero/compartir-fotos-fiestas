/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        greatvibes: ['var(--font-greatvibes)', 'cursive'],
        sans: ['var(--font-opensans)', 'sans-serif'],
      },
      colors: {
        'dusty-rose': {
          50: '#F9F9F9',
          100: '#F4F1EA',
          200: '#e8dfd5',
          300: '#d4c4b5',
          400: '#b7ac8f',
          500: '#a39086',
          600: '#b28f8a',
          700: '#8f7269',
          800: '#6d5852',
          900: '#4a3e3a',
          950: '#2d2522',
        },
        'purple-accent': {
          50: '#f5f0f4',
          100: '#ebe4ea',
          200: '#d9cfd8',
          300: '#c4a1bf',
          400: '#b487af',
          500: '#a06d9f',
          600: '#8b5889',
          700: '#724771',
          800: '#5e3c5e',
          900: '#4d324d',
        },
        'rose-gold': '#b28f8a',
        'champagne': '#F4F1EA',
        'cream': '#f9f9f9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
