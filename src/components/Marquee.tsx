'use client';
// Kinetic type: the RAG pipeline as a band. Speed and direction follow scroll velocity (one clock).
import { useRef } from 'react';
import { gsap } from 'gsap';
import { onScroll, prefersReducedMotion } from '@/engine';
import { usePage } from '@/engine/next';

const words = ['Upload', 'Chunk', 'Embed', 'Retrieve', 'Cite'];

function Half() {
  return (
    <span className="marq__half">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="marq__item">
          <span className={i % 2 ? 'marq__out' : undefined}>{w}</span>
          <i className="marq__dot" />
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  usePage(() => {
    if (!track.current || prefersReducedMotion()) return;
    const loop = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 });
    const off = onScroll(({ velocity }) => {
      gsap.to(loop, {
        timeScale: (velocity < 0 ? -1 : 1) * (1 + Math.min(Math.abs(velocity) / 6, 6)),
        duration: 0.5, overwrite: true,
      });
    });
    return () => { off(); loop.kill(); };
  });

  return (
    <div className="marq" data-tone="dark" aria-hidden="true">
      <div ref={track} className="marq__track">
        <Half />
        <Half />
      </div>
    </div>
  );
}
