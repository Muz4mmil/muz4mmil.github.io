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
        ink: '#0B111A',
        'ink-muted': '#A9AFB8',
        body: '#56606B',
        meta: '#8A9099',
        hairline: '#E6E7EA',
        line: '#D7D9DE',
        surface: '#EFEFF1',
        'surface-2': '#F5F6F7',
        night: '#1C1C1C',
      },
      fontFamily: {
        geist: 'var(--font-geist-sans)'
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — see DESIGN.md §1.2
        'display-xl': ['clamp(2.75rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-l': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-m': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        title: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
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
        float: '0 24px 60px -24px rgba(11, 17, 26, 0.18)',
      },
      spacing: {
        section: 'clamp(80px, 12vw, 180px)',
      },
    },
  },
  plugins: [],
};
export default config;
