'use client';
// The hero answer, written the way DocuMind answers: each claim carries a citation chip that opens its source.
// Driver: one active-claim index. It lights the claim, its chips and the popover, and cycles at rest.
import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { ease, prefersReducedMotion } from '@/engine';
import { projects } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

const claims = [
  { text: 'AI-powered document systems', cites: [1, 2] },
  { text: 'RAG search', cites: [1] },
  { text: 'OCR', cites: [4] },
  { text: 'workflow automation', cites: [3] },
  { text: 'production on cloud', cites: [5] },
];
const parts: ({ t: string } | { c: number })[] = [
  { t: 'I build ' }, { c: 0 }, { t: ': ' }, { c: 1 }, { t: ', ' }, { c: 2 }, { t: ' and ' }, { c: 3 },
  { t: ', from prototype to ' }, { c: 4 }, { t: '.' },
];
const source = (n: number) => projects.find((p) => p.n === n)!;
const STEP = 2.6;

export function Answer() {
  const ref = useRef<HTMLParagraphElement>(null);

  usePage(({ intro }) => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const spans = [...root.querySelectorAll<HTMLElement>('.hl')];
    const chips = [...root.querySelectorAll<HTMLElement>('.chip')];
    const set = (i: number) => {
      spans.forEach((s, k) => s.classList.toggle('is-on', k === i));
      chips.forEach((c) => c.classList.toggle('is-on', Number(c.dataset.claim) === i));
    };

    // Intro: the marker sweeps across each claim in turn.
    intro.add(gsap.fromTo(spans, { '--sw': '100%' }, { '--sw': '0%', duration: 0.9, stagger: 0.14, ease: ease.out }), 0.55);

    // Idle: the retrieval cycles through the claims on the one clock.
    const tl = gsap.timeline({ repeat: -1, paused: true });
    claims.forEach((_, i) => tl.call(set, [i], i * STEP));
    tl.set({}, {}, claims.length * STEP);
    let started = false, visible = true, held = false;
    const sync = () => { if (started && visible && !held) tl.play(); else tl.pause(); };
    intro.add(() => { started = true; tl.time(STEP); sync(); }, 2.3);
    const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: (s) => { visible = s.isActive; sync(); } });

    const over = (e: Event) => {
      const chip = (e.target as HTMLElement).closest<HTMLElement>('.chip');
      if (chip) { held = true; set(Number(chip.dataset.claim)); sync(); }
    };
    const out = () => { held = false; sync(); };
    root.addEventListener('pointerover', over);
    root.addEventListener('focusin', over);
    root.addEventListener('pointerleave', out);
    root.addEventListener('focusout', out);
    return () => {
      st.kill(); tl.kill();
      root.removeEventListener('pointerover', over);
      root.removeEventListener('focusin', over);
      root.removeEventListener('pointerleave', out);
      root.removeEventListener('focusout', out);
    };
  });

  return (
    <p ref={ref} className="answer">
      {parts.map((p, k) => {
        if ('t' in p) return <span key={k}>{p.t}</span>;
        const c = claims[p.c];
        return (
          <span key={k}>
            <span className={`hl${p.c === 0 ? ' is-on' : ''}`}>{c.text}</span>
            {c.cites.map((n) => {
              const s = source(n);
              return (
                <Link
                  key={n} href={`/projects/${s.slug}`} className={`chip${p.c === 0 ? ' is-on' : ''}`}
                  data-claim={p.c} aria-label={`Source ${s.n}: ${s.title}`}
                >
                  {s.n}
                  <span className="pop" data-side={[0, 3, 4].includes(p.c) ? 'r' : undefined} aria-hidden="true">
                    <span className="pop__k">Source {s.n} of {projects.length}</span>
                    <span className="pop__t">{s.short}</span>
                    <span className="pop__r">{s.headline}</span>
                  </span>
                </Link>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
