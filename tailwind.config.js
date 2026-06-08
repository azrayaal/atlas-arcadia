/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1a1a1a',
          muted: '#6b6b6b',
          light: '#f5f5f3',
          accent: '#8b7355',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.04)',
        card: '0 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
