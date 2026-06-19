/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        corporate: {
          50: '#f0f5ff',
          100: '#d9e5ff',
          200: '#b3cbff',
          300: '#7da6ff',
          400: '#4777f7',
          500: '#2b5af0',
          600: '#1a42e6',
          700: '#1435bf',
          800: '#162e9b',
          900: '#182a7a',
          950: '#0f1847',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
