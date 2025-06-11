/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
colors: {
        primary: '#059669',
        secondary: '#f1f5f9',
        accent: '#10b981',
        surface: '#ffffff',
        background: '#f0fdf4',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        info: '#22c55e',
text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#475569',
          tertiary: '#64748b'
        },
        'surface': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}