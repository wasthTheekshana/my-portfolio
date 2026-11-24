// Global motion for this site. Runs once on the client, before the first page initializes.
// Verb: highlight. The loader is a marker reading the name, the page transition is a marker swipe,
// and any [data-hl] phrase sweeps in when it is scrolled to.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, onScroll, prefersReducedMotion, setLoaderExit, setLoaderFormat, setTransition } from '@/engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));

  // Loader exit: the marker wipes out to the right, the name lifts, the sheet peels up.
  setLoaderExit((root) => {
    const bar = root.querySelector('[data-loader-bar]');
    const outs = root.querySelectorAll('[data-loader-out]');
    return gsap
      .timeline()
      .to(bar, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.35, ease: ease.inOut })
      .to(outs, { yPercent: -110, duration: 0.45, ease: ease.inOut, stagger: 0.04 }, '-=0.15')
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: ease.inOut }, '-=0.3');
  });

  // Page transition: a marker swipe, left to right, then off to the right.
  setTransition({
    leave: (c) =>
      gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(
          c.querySelector('.curtain__panel'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: ease.inOut },
        ),
    enter: (c) =>
      gsap
        .timeline()
        .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.8, ease: ease.inOut })
        .set(c, { autoAlpha: 0 }),
  });

  // The frame steps aside: header slides away on scroll down, returns on scroll up.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 6) return;
    document.documentElement.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });

  // Scroll-in highlights on phrases marked with data-hl.
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-hl]').forEach((el) => {
      gsap.fromTo(
        el,
        { '--sw': '100%' },
        {
          '--sw': '0%',
          duration: 1.1,
          ease: ease.out,
          delay: parseFloat(el.dataset.delay || '0'),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    });
  });
}
