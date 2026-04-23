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
          dark: '#050505',
          green: '#1b4a2e',
          lightGreen: '#238b36',
          brightGreen: '#2ec551',
          card: '#0a0f0d',
          border: '#1b3a24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'glow': '0 0 15px rgba(46, 197, 81, 0.3)',
      }
    },
  },
  plugins: [],
}