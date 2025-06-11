/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
colors: {
        primary: '#1d4ed8',
        secondary: '#f1f5f9',
        accent: '#0d9488',
        surface: '#ffffff',
        background: '#f8fafc',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        info: '#2563eb',
text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
          tertiary: '#94a3b8'
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