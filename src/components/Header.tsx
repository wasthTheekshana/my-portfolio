'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nav } from '@/data/site';
import { onScroll } from '@/engine';
import { usePage } from '@/engine/next';

const ids = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];

export function Header() {
  const path = usePathname();
  const [cur, setCur] = useState('');
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(path);
  // Close the menu when the route changes (adjusting state during render, not in an effect).
  if (lastPath !== path) { setLastPath(path); setOpen(false); }
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  usePage(() => {
    const triggers = ids.map((id) => {
      const el = document.getElementById(id);
      return el
        ? ScrollTrigger.create({
            trigger: el, start: 'top 55%', end: 'bottom 55%',
            onToggle: (s) => { if (s.isActive) setCur(id === 'hero' || id === 'education' ? '' : id); },
          })
        : null;
    });
    const off = onScroll(({ y }) => setSolid(y > 40));
    return () => { triggers.forEach((t) => t?.kill()); off(); };
  });

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
      if (e.key === 'Tab') {
        const items = [...(menu.current?.querySelectorAll('a') ?? [])] as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); btn.current?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); btn.current?.focus(); }
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const section = path.startsWith('/projects/') ? 'projects' : cur;
  const links = nav.slice(0, -1);
  const contact = nav[nav.length - 1];

  return (
    <>
      <header className={`hdr${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
        <Link href="/#hero" className="hdr__brand mk" aria-label="Theekshana H., home">
          <Image className="hdr__logo" src="/logo.png" alt="" width={32} height={32} />
          Theekshana H.
        </Link>
        <nav className="hdr__nav" aria-label="Primary">
          {links.map((n) => {
            const id = n.href.split('#')[1];
            const on = section === id;
            return (
              <Link key={n.href} href={n.href} className="mk" aria-current={on ? (path.startsWith('/projects/') ? 'page' : 'true') : undefined}>
                {n.label}
              </Link>
            );
          })}
          <Link href={contact.href} className="btn btn--solid hdr__cta" data-magnetic="0.25">{contact.label}</Link>
        </nav>
        <button
          ref={btn} type="button" className="hdr__menu" aria-expanded={open} aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div id="menu" ref={menu} className="menu" data-open={open} inert={!open} role="dialog" aria-modal="true" aria-label="Menu">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        <a className="menu__foot ul" href="/resume.pdf" download>Download CV</a>
      </div>
    </>
  );
}
