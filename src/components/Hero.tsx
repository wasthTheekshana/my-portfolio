import Link from 'next/link';
import { site } from '@/data/site';
import { Answer } from './Answer';
import { Portrait } from './Portrait';

export function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <Answer />
      <Portrait />

      <div className="hero__base">
        <h1 className="hero__name" data-split="lines" data-intro>
          <span className="hero__first">{site.first}</span>
          <span className="hero__last">{site.last}</span>
        </h1>
        <div className="hero__meta" data-reveal="up" data-intro data-delay="0.45">
          <div className="hero__id">
            <p className="hero__sin" lang="si">{site.sinhala}</p>
            <p className="hero__role">{site.role}</p>
          </div>
          <ul className="badges" aria-label="Highlights">
            {site.badges.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <div className="hero__act">
            <div className="hero__cta">
              <Link href="/#projects" className="btn btn--solid" data-magnetic="0.3">View projects</Link>
              <a href="/resume.pdf" className="btn" download>Download CV</a>
              <Link href="/#contact" className="btn">Contact me</Link>
            </div>
            <p className="avail"><i aria-hidden="true" />Available for freelance work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
