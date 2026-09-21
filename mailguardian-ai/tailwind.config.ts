import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import animate from 'tailwindcss-animate';

const withAlpha = (variable: string) => `hsl(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        border: withAlpha('--border'),
        input: withAlpha('--input'),
        ring: withAlpha('--ring'),
        background: withAlpha('--background'),
        foreground: withAlpha('--foreground'),
        primary: { DEFAULT: withAlpha('--primary'), foreground: withAlpha('--primary-foreground') },
        secondary: { DEFAULT: withAlpha('--secondary'), foreground: withAlpha('--secondary-foreground') },
        muted: { DEFAULT: withAlpha('--muted'), foreground: withAlpha('--muted-foreground') },
        accent: { DEFAULT: withAlpha('--accent'), foreground: withAlpha('--accent-foreground') },
        destructive: { DEFAULT: withAlpha('--destructive'), foreground: withAlpha('--destructive-foreground') },
        card: { DEFAULT: withAlpha('--card'), foreground: withAlpha('--card-foreground') },
        popover: { DEFAULT: withAlpha('--popover'), foreground: withAlpha('--popover-foreground') },
        success: withAlpha('--success'),
        warning: withAlpha('--warning'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        flash: {
          '0%': { backgroundColor: 'hsl(var(--primary) / 0.22)' },
          '100%': { backgroundColor: 'transparent' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 48s linear infinite',
        flash: 'flash 1.6s ease-out',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
