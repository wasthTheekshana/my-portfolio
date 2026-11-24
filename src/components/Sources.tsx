'use client';
// Projects as sources. A sticky stack of source sheets swaps as the rows pass; the matching result is highlighted.
// Driver: one active-row index (scroll position, hover or focus).
import { useRef } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { projects } from '@/data/site';
import { FlowDiagram } from './FlowDiagram';

export function Sources() {
  const root = useRef<HTMLElement>(null);
  const total = projects.length;

  usePage(() => {
    const el = root.current;
    if (!el) return;
    const rows = [...el.querySelectorAll<HTMLElement>('.row')];
    const sheets = [...el.querySelectorAll<HTMLElement>('.src__stage .sheet')];
    const set = (i: number) => {
      rows.forEach((r, k) => r.querySelector('.hl')?.classList.toggle('is-on', k === i));
      sheets.forEach((s, k) => {
        s.toggleAttribute('data-on', k === i);
        s.querySelector('.hl')?.classList.toggle('is-on', k === i);
      });
    };
    set(0);
    const cleanups: (() => void)[] = [];
    const triggers = rows.map((row, i) => {
      const enter = () => set(i);
      row.addEventListener('pointerenter', enter);
      row.addEventListener('focusin', enter);
      cleanups.push(() => { row.removeEventListener('pointerenter', enter); row.removeEventListener('focusin', enter); });
      return ScrollTrigger.create({ trigger: row, start: 'top 58%', end: 'bottom 58%', onToggle: (s) => { if (s.isActive) set(i); } });
    });
    return () => { triggers.forEach((t) => t.kill()); cleanups.forEach((c) => c()); };
  });

  return (
    <section id="projects" ref={root} className="section" data-tone="dark" aria-labelledby="src-h">
      <div className="wrap">
        <div className="src__head">
          <h2 id="src-h" className="src__title" data-split="lines">Ten projects, each one a source.</h2>
          <p className="src__lede" data-reveal="up">Strongest first. Each one opens a case study with the problem, how it works and the result.</p>
        </div>
        <div className="grid src">
          <div className="src__stage" aria-hidden="true">
            {projects.map((p, i) => (
              <div key={p.slug} className="sheet" data-on={i === 0 ? '' : undefined}>
                <div>
                  <div className="sheet__top"><span>Source {p.n} of {total}</span><span>{p.tags.slice(0, 2).join(', ')}</span></div>
                  <p className="sheet__title">{p.short}</p>
                </div>
                <div className="sheet__fig">
                  <FlowDiagram nodes={p.diagram.nodes} branch={p.diagram.branch} label={`${p.short} architecture`} cycle />
                </div>
                <p className="sheet__foot"><small>Result</small><span className={`hl${i === 0 ? ' is-on' : ''}`}>{p.headline}</span></p>
              </div>
            ))}
          </div>
          <div className="src__list">
            {projects.map((p, i) => (
              <article key={p.slug} className="row" data-cursor="Read" data-reveal="fade">
                <div className="sheet sheet--inline">
                  <div className="sheet__fig">
                    <FlowDiagram nodes={p.diagram.nodes} branch={p.diagram.branch} label={`${p.short} architecture`} />
                  </div>
                </div>
                <p className="row__tags"><span className="row__n">{p.n}</span>{p.tags.join(', ')}</p>
                <h3 className="row__title"><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
                <p className="row__sum">{p.summary}</p>
                <p className="row__res"><span className={`hl${i === 0 ? ' is-on' : ''}`}>{p.headline}</span></p>
                <span className="row__cta mk" aria-hidden="true">Read case study</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
