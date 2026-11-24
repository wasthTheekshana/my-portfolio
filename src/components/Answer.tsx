'use client';
// The hero statement: one clear sentence, with the key phrases picked out by the lime marker.
// The marker sweeps across each phrase once on load. No cycling, no popovers.
import { useRef } from 'react';
import { gsap } from 'gsap';
import { usePage } from '@/engine/next';
import { ease, prefersReducedMotion } from '@/engine';

export function Answer() {
  const ref = useRef<HTMLParagraphElement>(null);

  usePage(({ intro }) => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const spans = [...root.querySelectorAll<HTMLElement>('.hl')];
    intro.add(gsap.fromTo(spans, { '--sw': '100%' }, { '--sw': '0%', duration: 0.9, stagger: 0.18, ease: ease.out }), 0.55);
  });

  return (
    <p ref={ref} className="answer">
      I design, build and run <span className="hl is-on">software systems</span> end to end, from architecture and code
      to <span className="hl is-on">production on the cloud</span>.
    </p>
  );
}
