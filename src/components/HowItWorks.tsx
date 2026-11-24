'use client';
// Case page: the diagram on the left, the steps on the right. The step in view lights its node.
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import type { Project } from '@/data/site';
import { FlowDiagram } from './FlowDiagram';

export function HowItWorks({ project: p }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);

  usePage(() => {
    const el = root.current;
    if (!el) return;
    const steps = [...el.querySelectorAll<HTMLElement>('.step')];
    const nodes = [...el.querySelectorAll<SVGGElement>('.node')];
    const S = steps.length, N = nodes.length;
    const set = (i: number) => {
      steps.forEach((s, k) => s.querySelector('.hl')?.classList.toggle('is-on', k === i));
      const ni = S > 1 ? Math.round((i * (N - 1)) / (S - 1)) : 0;
      nodes.forEach((n, k) => n.toggleAttribute('data-on', k === ni));
    };
    set(0);
    const triggers = steps.map((s, i) =>
      ScrollTrigger.create({ trigger: s, start: 'top 60%', end: 'bottom 60%', onToggle: (t) => { if (t.isActive) set(i); } }),
    );
    return () => triggers.forEach((t) => t.kill());
  });

  return (
    <div ref={root} className="grid how">
      <div className="how__stage">
        <FlowDiagram nodes={p.diagram.nodes} branch={p.diagram.branch} label={`${p.short} architecture`} />
      </div>
      <ol className="how__steps">
        {p.how.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step__k">Step {i + 1} of {p.how.length}</span>
            <h3 className="step__t"><span className={`hl${i === 0 ? ' is-on' : ''}`}>{s.title}</span></h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
