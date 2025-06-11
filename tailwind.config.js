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
        secondary: '#ffffff',
        accent: '#059669',
        surface: '#ffffff',
        background: '#ffffff',
        success: '#059669',
        warning: '#059669',
        error: '#000000',
        info: '#059669',
        text: {
          primary: '#000000',
          secondary: '#059669',
          muted: '#ffffff',
          tertiary: '#ffffff'
        },
        'surface': {
          50: '#ffffff',
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#374151',
          800: '#1f2937',
          900: '#000000'
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