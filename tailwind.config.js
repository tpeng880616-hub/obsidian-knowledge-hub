/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0d0d0d',
          'bg-secondary': '#1a1a2e',
          primary: '#00fff5',
          secondary: '#ff00ff',
          text: '#e0e0e0',
          accent: '#ffff00',
          'border': '#333355'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00fff5, 0 0 10px #00fff5, 0 0 20px #00fff5',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00fff5, 0 0 10px #00fff5' },
          '100%': { boxShadow: '0 0 10px #00fff5, 0 0 20px #00fff5, 0 0 30px #00fff5' },
        }
      }
    },
  },
  plugins: [],
}
