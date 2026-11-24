import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { display, mono, serif, sinhala } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.first} ${site.last} | Senior Software Engineer`, template: `%s | ${site.first} ${site.last}` },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: `${site.first} ${site.last}`, locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: '#f2f4f5' };

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

const website = {
  '@type': 'WebSite',
  name: `${site.first} ${site.last}`,
  url: site.url,
  inLanguage: 'en',
};

const person = {
  '@type': 'Person',
  name: `${site.first} ${site.last}`,
  alternateName: 'Wasath',
  jobTitle: 'Senior Software Engineer',
  worksFor: { '@type': 'Organization', name: 'DOK Solutions Lanka (Pvt) Ltd' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Birmingham' },
    { '@type': 'CollegeOrUniversity', name: 'University of Sri Jayewardenepura' },
  ],
  knowsAbout: ['Software architecture', 'Backend development', 'DevOps', 'Google Cloud', 'Python', 'Java', 'TypeScript'],
  knowsLanguage: ['English', 'Sinhala'],
  url: site.url,
  sameAs: site.socials.map((s) => s.href),
};

const jsonLd = { '@context': 'https://schema.org', '@graph': [website, person] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable} ${sinhala.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div id="curtain" aria-hidden="true"><div className="curtain__panel" /></div>
        <div id="cursor" aria-hidden="true"><span data-cursor-label /></div>
        <div id="loader" role="status" aria-label="Loading">
          <div className="loader__inner">
            <p className="loader__line" data-loader-out>
              <span className="loader__mark" data-loader-bar aria-hidden="true" />
              <span className="loader__name">TH</span>
            </p>
            <p className="loader__meta" data-loader-out>
              <span>Senior Software Engineer</span>
              <span className="loader__count" data-loader-count>000</span>
            </p>
          </div>
        </div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
