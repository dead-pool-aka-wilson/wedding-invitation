import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#06080d',
        surface: '#0c0f15',
        'surface-2': '#12151c',
        'surface-3': '#181c24',
        border: 'rgba(255,255,255,0.06)',
        'border-hi': 'rgba(255,255,255,0.12)',
        text: '#c0c5cf',
        dim: 'rgba(255,255,255,0.35)',
        bright: '#edf0f5',
        cyan: '#00d4ff',
        pink: '#ff3d8a',
        amber: '#ffb020',
        green: '#2dda6e',
        red: '#ff4040',
        purple: '#a78bfa',
        yellow: '#ffe066',
        rose: '#e5aea9',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Instrument Sans', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
