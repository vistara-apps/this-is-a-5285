/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 10%, 4%)',
        text: 'hsl(0, 0%, 98%)',
        textMuted: 'hsl(240, 5%, 64%)',
        surface: 'hsl(240, 8%, 8%)',
        surfaceHover: 'hsl(240, 7%, 12%)',
        border: 'hsl(240, 6%, 16%)',
        primary: 'hsl(262, 83%, 58%)',
        primaryHover: 'hsl(262, 83%, 52%)',
        accent: 'hsl(171, 77%, 48%)',
        success: 'hsl(142, 71%, 45%)',
        warning: 'hsl(38, 92%, 50%)',
        error: 'hsl(0, 72%, 51%)',
        impactLow: 'hsl(171, 77%, 48%)',
        impactMedium: 'hsl(38, 92%, 50%)',
        impactHigh: 'hsl(25, 95%, 53%)',
        impactCritical: 'hsl(0, 72%, 51%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(240, 10%, 3%, 0.12)',
        'cardHover': '0 12px 32px hsla(240, 10%, 3%, 0.18)',
        'dropdown': '0 12px 40px hsla(240, 10%, 3%, 0.24)',
        'glow': '0 0 32px hsla(262, 83%, 58%, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}