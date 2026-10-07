/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          950: '#09030c',
          900: '#120718',
          800: '#1d0b26',
          700: '#2c123b',
          600: '#421a57',
        },
        roseGold: {
          50: '#fdf7f7',
          100: '#f9edee',
          200: '#f4d9dc',
          300: '#ebb9c0',
          400: '#dc8d99',
          500: '#c86475',
          600: '#b1495c',
          700: '#943849',
          800: '#7b313f',
          900: '#672e39',
        },
        champagne: {
          100: '#fef9ee',
          200: '#fcf0d5',
          300: '#f9e1b0',
          400: '#f4cb80',
          500: '#eeb053',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
        script: ['"Playfair Display"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
