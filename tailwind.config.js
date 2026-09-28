/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: '#14532D',
          primary: '#166534',
          emerald: '#059669',
          success: '#16A34A',
          medium: '#22C55E',
          light: '#DCFCE7',
          veryLight: '#F0FDF4',
        },
        neutral: {
          app: '#F7FAF8',
          card: '#FFFFFF',
          primary: '#17201A',
          secondary: '#526057',
          muted: '#7A8780',
          border: '#DDE7E0',
          hover: '#F1F7F3',
        },
        semantic: {
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
