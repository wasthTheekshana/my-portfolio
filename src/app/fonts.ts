import { DM_Serif_Display, Geist, Geist_Mono, Noto_Sans_Sinhala } from 'next/font/google';

// Body and UI: Geist, a neutral grotesk (the sans used on ebuka.marketing).
export const display = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Headings, the name, big numerals and the marquee: a high-contrast serif, set large and tight.
export const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

// Data voice: citation chips, source labels, the query line.
export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Script coverage for the Sinhala name.
export const sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['500', '700'],
  variable: '--font-sinhala',
  display: 'swap',
  preload: false,
});
