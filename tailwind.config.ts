import type { Config } from "tailwindcss";

// Design tokens are specified in docs/DESIGN.md — keep the two in sync.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        ink: '#000000',
        // Display-size text only: 3.1:1 on paper, which passes for large text
        // but not for anything under ~24px. Use `meta` for small grey text.
        'ink-muted': '#8D939C',
        body: '#56606B',
        meta: '#6B7280',
        hairline: '#E6E7EA',
        // Outlined pill / chip / icon-button border (Tailwind neutral-400).
        line: '#A3A3A3',
        surface: '#EFEFF1',
        'surface-2': '#F5F6F7',
        night: '#1C1C1C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — see DESIGN.md §1.2
        'display-xl': ['clamp(3rem, 7.5vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-l': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-m': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        heading: ['clamp(1.5rem, 2.4vw, 1.875rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        title: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        eyebrow: ['1.0625rem', { lineHeight: '1.4' }],
        'body-l': ['1.125rem', { lineHeight: '1.55' }],
        caps: ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.06em' }],
      },
      borderRadius: {
        media: '24px',
        panel: '16px',
      },
      boxShadow: {
        // The only permitted shadow — for mockups that float free of a card.
        float: '0 24px 60px -24px rgba(0, 0, 0, 0.18)',
      },
      spacing: {
        section: 'clamp(80px, 12vw, 180px)',
      },
    },
  },
  plugins: [],
};
export default config;
