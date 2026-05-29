/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        museum: {
          bg: '#080706',
          'bg-alt': '#11100E',
          'bg-section': '#0C0B09',
          'wall-1': '#4A120E',
          'wall-2': '#6B2418',
          'wall-3': '#A76A35',
          pedestal: '#050505',
          'pedestal-rim': '#1A1A1A',
          'text-primary': '#F4EBDD',
          'text-muted': '#CBBBA0',
          accent: '#C9A45C',
          'accent-bright': '#D8B76A',
          'accent-dim': '#7E5B35',
        },
      },
      fontFamily: {
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

