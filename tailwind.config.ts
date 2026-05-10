import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4ddb2',
          300: '#edc481',
          400: '#e4a24e',
          500: '#db8a2c',  // Primary gold
          600: '#c97220',
          700: '#a7581b',
          800: '#86461d',
          900: '#6d3a1a',
          950: '#3b1d0b',
        },
        surface: {
          50:  '#f9f7f5',
          100: '#f0ece7',
          200: '#e0d8cf',
          300: '#cbbdb0',
          400: '#b49c8c',
          500: '#9d806e',
          600: '#8a6a58',
          700: '#72564a',
          800: '#5e4840',
          900: '#503f39',
          950: '#2a201c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-playfair)', ...fontFamily.serif],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 4px 16px -2px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 8px 0 rgb(0 0 0 / 0.10), 0 12px 32px -4px rgb(0 0 0 / 0.14)',
        'cta': '0 0 0 3px rgb(219 138 44 / 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 1.6s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '100%': { backgroundPosition: '-200% 0' } },
      },
    },
  },
  plugins: [],
};

export default config;
