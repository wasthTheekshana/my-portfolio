'use client';
// The portrait as a scanned source: yellow duotone at rest, natural colour inside a "scan lens".
// The lens orbits on its own and follows the pointer. OCR-style layout boxes label what was recognised.
import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { prefersReducedMotion } from '@/engine';

gsap.registerPlugin(ScrollTrigger);

export function Portrait() {
  const ref = useRef<HTMLElement>(null);

  usePage(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const frame = el.querySelector<HTMLElement>('.portrait__img')!;
    const scan = el.querySelector<HTMLElement>('.portrait__scan')!;
    const lx = gsap.quickTo(frame, '--lx', { duration: 0.7, ease: 'power3.out' });
    const ly = gsap.quickTo(frame, '--ly', { duration: 0.7, ease: 'power3.out' });
    const lr = gsap.quickTo(frame, '--lr', { duration: 0.6, ease: 'power3.out' });

    let hover = false;
    const t = { a: 0 };
    const orbit = gsap.to(t, {
      a: Math.PI * 2, duration: 11, ease: 'none', repeat: -1,
      onUpdate: () => { if (!hover) { lx(50 + 18 * Math.cos(t.a)); ly(30 + 14 * Math.sin(t.a * 2)); } },
    });
    const sweep = gsap.fromTo(scan, { y: 0 }, {
      y: () => frame.clientHeight, duration: 3.2, ease: 'power1.inOut', repeat: -1, yoyo: true, repeatDelay: 0.8,
    });

    const move = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      hover = true;
      lx(((e.clientX - r.left) / r.width) * 100);
      ly(((e.clientY - r.top) / r.height) * 100);
      lr(27);
    };
    const leave = () => { hover = false; lr(21); };
    frame.addEventListener('pointermove', move);
    frame.addEventListener('pointerleave', leave);

    const st = ScrollTrigger.create({
      trigger: el, start: 'top bottom', end: 'bottom top',
      onRefresh: () => sweep.invalidate(),
      onToggle: (s) => [orbit, sweep].forEach((a) => (s.isActive ? a.play() : a.pause())),
    });
    return () => {
      st.kill(); orbit.kill(); sweep.kill();
      frame.removeEventListener('pointermove', move);
      frame.removeEventListener('pointerleave', leave);
    };
  });

  return (
    <figure ref={ref} className="portrait" data-reveal="clip" data-intro data-delay="0.35">
      <div className="portrait__img">
        <div className="portrait__base">
          <Image src="/me.jpg" alt="Portrait of Theekshana Harischandra, Senior Software Engineer" width={1254} height={1254} sizes="(max-width: 880px) 100vw, 66vw" priority quality={80} />
        </div>
        <Image className="portrait__color" src="/me.jpg" alt="" aria-hidden="true" width={1254} height={1254} sizes="(max-width: 880px) 100vw, 66vw" quality={80} />
        <span className="portrait__box portrait__box--face" aria-hidden="true"><b>name</b></span>
        <span className="portrait__scan" aria-hidden="true" />
      </div>
    </figure>
  );
}
