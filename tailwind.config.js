/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-var': 'var(--color-primary-variant)',
        secondary: 'var(--color-secondary)',
        'secondary-var': 'var(--color-secondary-variant)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle .1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
