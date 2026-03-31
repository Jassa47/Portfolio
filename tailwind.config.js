/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#030108',
          900: '#06020F',
          800: '#0B0520',
          700: '#110830',
          600: '#1A0E4A',
        },
        nebula: {
          purple: '#7B5EA7',
          blue: '#4A7BF7',
          teal: '#38BDF8',
          pink: '#D946EF',
          cyan: '#22D3EE',
        },
        star: {
          white: '#F8FAFC',
          warm: '#FDE68A',
          cool: '#BAE6FD',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"General Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite reverse',
        'comet': 'comet 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'counter-spin': 'counter-spin 20s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 20px rgba(123,94,167,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(123,94,167,0.6)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'counter-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        comet: {
          '0%': { transform: 'translateX(-100vw) translateY(-50vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(50vh)', opacity: '0' },
        },
        blink: { '50%': { borderColor: 'transparent' } },
        'slide-up': {
          'from': { transform: 'translateY(40px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backgroundImage: {
        'nebula-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(123,94,167,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(74,123,247,0.1) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      },
    },
  },
  plugins: [],
};