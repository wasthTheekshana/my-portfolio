'use client';
// The real numbers from the plan, counted up on scroll. Each one cites the project it came from.
import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { ease, prefersReducedMotion } from '@/engine';
import { projects } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { v: 60, s: '%', label: 'faster insurance PDF processing, with zero data corruption', cite: 2 },
  { v: 30, s: '%', label: 'better sales forecast accuracy in the SaaS CRM', cite: 6 },
  { v: 35, s: '%', label: 'less manual tracking for the sales team', cite: 6 },
  { v: 0, s: '', label: 'public ports exposed on the shared production server', cite: 5 },
];

export function Proof() {
  const root = useRef<HTMLElement>(null);

  usePage(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    el.querySelectorAll<HTMLElement>('[data-count]').forEach((n) => {
      const end = Number(n.dataset.count);
      if (!end) return;
      const o = { v: 0 };
      n.textContent = '0';
      gsap.to(o, {
        v: end, duration: 1.8, ease: ease.out,
        onUpdate: () => { n.textContent = String(Math.round(o.v)); },
        scrollTrigger: { trigger: n, start: 'top 88%', once: true },
      });
    });
  });

  return (
    <section ref={root} className="section proof" aria-label="Results in numbers">
      <div className="wrap proof__grid">
        {stats.map((s) => {
          const p = projects.find((x) => x.n === s.cite)!;
          return (
            <div key={s.label} className="proof__item" data-reveal="up">
              <p className="proof__v">
                <span className="hl hl--static" data-hl><span data-count={s.v}>{s.v}</span>{s.s}</span>
              </p>
              <p className="proof__l">
                {s.label}
                <Link href={`/projects/${p.slug}`} className="chip" aria-label={`Source ${p.n}: ${p.title}`}>{p.n}</Link>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
