/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 0.6s linear',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '12.5%': { transform: 'translateX(-2%)' },
          '25%': { transform: 'translateX(0%)' },
          '37.5%': { transform: 'translateX(-2%)' },
          '50%': { transform: 'translateX(0%)' },
          '62.5%': { transform: 'translateX(-2%)' },
          '75%': { transform: 'translateX(0%)' },
          '87.5%': { transform: 'translateX(-2%)' },
        }
      }
    },
  },
  plugins: [],
}

