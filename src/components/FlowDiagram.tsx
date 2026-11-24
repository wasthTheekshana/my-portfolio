'use client';
// Architecture figure drawn as SVG from the "how it works" steps. Honest and generated: no fake screenshots.
// The active node is set by a parent via data-on on `.node`; `cycle` walks the nodes at rest (one clock).
import { useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { prefersReducedMotion } from '@/engine';
import type { FlowNode } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

type Pos = { x: number; y: number; w: number; h: number };
const NH = 60;

function wrap(text: string, max: number) {
  if (text.length <= max || !text.includes(' ')) return [text];
  const words = text.split(' ');
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length);
    if (d < diff) { diff = d; best = i; }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
}

function layout(k: number, branch: boolean) {
  const pos: Pos[] = [];
  let H = 160;
  if (branch) {
    const cols = k + 1, w = 108, gx = (600 - cols * w) / (cols - 1);
    for (let i = 0; i < k; i++) pos.push({ x: 20 + i * (w + gx), y: 80, w, h: NH });
    const bx = 20 + k * (w + gx);
    pos.push({ x: bx, y: 20, w, h: NH }, { x: bx, y: 140, w, h: NH });
    H = 230;
  } else if (k === 4) {
    const w = 250, gx = 100;
    for (let i = 0; i < k; i++) {
      const row = Math.floor(i / 2), c = i % 2, col = row % 2 ? 1 - c : c;
      pos.push({ x: 20 + col * (w + gx), y: 30 + row * (NH + 80), w, h: NH });
    }
    H = 30 + NH + 80 + NH + 50;
  } else if (k <= 4) {
    const w = k === 4 ? 124 : 150, gx = (600 - k * w) / Math.max(1, k - 1);
    for (let i = 0; i < k; i++) pos.push({ x: 20 + i * (w + gx), y: 40, w, h: NH });
    H = 170;
  } else {
    const w = 150, gx = 75;
    for (let i = 0; i < k; i++) {
      const row = Math.floor(i / 3), c = i % 3, col = row % 2 ? 2 - c : c;
      pos.push({ x: 20 + col * (w + gx), y: 30 + row * (NH + 80), w, h: NH });
    }
    H = 30 + NH + 80 + NH + 50;
  }
  return { pos, H };
}

export function FlowDiagram({
  nodes, branch, label, cycle = false,
}: { nodes: FlowNode[]; branch?: [string, string]; label: string; cycle?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const mid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const k = nodes.length;
  const { pos, H } = layout(k, !!branch);
  const all: FlowNode[] = [...nodes, ...(branch ? branch.map((b) => ({ label: b })) : [])];

  // Edges between consecutive main nodes; the packet follows the main chain.
  const route: [number, number][] = [];
  const edges: string[] = [];
  for (let i = 0; i < k - 1; i++) {
    const a = pos[i], b = pos[i + 1];
    let x1: number, y1: number, x2: number, y2: number;
    if (a.y === b.y) {
      const rtl = b.x < a.x;
      x1 = rtl ? a.x : a.x + a.w; x2 = rtl ? b.x + b.w : b.x; y1 = y2 = a.y + a.h / 2;
    } else { x1 = x2 = a.x + a.w / 2; y1 = a.y + a.h; y2 = b.y; }
    edges.push(`M${x1} ${y1} L${x2} ${y2}`);
    if (i === 0) route.push([x1, y1]);
    route.push([x2, y2]);
  }
  if (branch) {
    const a = pos[k - 1];
    const x1 = a.x + a.w, y1 = a.y + a.h / 2;
    for (const b of [pos[k], pos[k + 1]]) {
      const x2 = b.x, y2 = b.y + b.h / 2, mx = (x1 + x2) / 2;
      edges.push(`M${x1} ${y1} H${mx} V${y2} H${x2}`);
    }
    if (k === 1) route.push([x1, y1]);
  }
  const routeD = route.length > 1 ? 'M' + route.map((p) => p.join(' ')).join(' L') : '';

  usePage(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const packet = svg.querySelector<SVGCircleElement>('.packet');
    const path = svg.querySelector<SVGPathElement>('.route');
    const sheet = svg.closest('.sheet');
    const tweens: gsap.core.Animation[] = [];
    if (packet && path && routeD) {
      const len = path.getTotalLength();
      const o = { p: 0 };
      packet.setAttribute('r', '4.5');
      const tw = gsap.to(o, {
        p: 1, duration: Math.max(3, k * 1.1), ease: 'none', repeat: -1, paused: true,
        onUpdate: () => { const pt = path.getPointAtLength(o.p * len); packet.setAttribute('cx', String(pt.x)); packet.setAttribute('cy', String(pt.y)); },
      });
      tweens.push(tw);
    }
    let idx = 0;
    const nodeEls = [...svg.querySelectorAll<SVGGElement>('.node')];
    const step = gsap.delayedCall(1.3, function tick() {
      if (!sheet || sheet.hasAttribute('data-on')) {
        nodeEls.forEach((n, i) => n.toggleAttribute('data-on', i === idx));
        idx = (idx + 1) % nodeEls.length;
      }
      step.restart(true);
    });
    if (cycle) tweens.push(step); else step.kill();
    const st = ScrollTrigger.create({
      trigger: svg, start: 'top bottom', end: 'bottom top',
      onToggle: (s) => tweens.forEach((t) => (s.isActive ? t.play() : t.pause())),
    });
    return () => { st.kill(); tweens.forEach((t) => t.kill()); };
  });

  return (
    <svg ref={ref} className="flow" viewBox={`0 0 640 ${H}`} role="img" aria-label={label}>
      <defs>
        <marker id={`a${mid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 1 L10 5 L0 9 z" className="arrow" />
        </marker>
      </defs>
      {edges.map((d, i) => <path key={i} d={d} className="edge" markerEnd={`url(#a${mid})`} />)}
      {routeD && <path className="route" d={routeD} fill="none" stroke="none" />}
      {all.map((n, i) => {
        const p = pos[i];
        const lines = wrap(n.label, 11);
        const notes = n.note ? wrap(n.note, 20) : [];
        const cy = p.y + p.h / 2;
        // A note under a node would sit on the connector when the next arrow goes down: put it above instead.
        const above = i < k - 1 && pos[i + 1].y > p.y;
        const noteY = (j: number) => (above ? p.y - 10 - (notes.length - 1 - j) * 12 : p.y + p.h + 16 + j * 12);
        return (
          <g key={i} className="node" data-i={i}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} />
            {lines.map((l, j) => (
              <text key={j} x={p.x + p.w / 2} y={cy + (lines.length === 1 ? 5 : j === 0 ? -3 : 14)} textAnchor="middle">{l}</text>
            ))}
            {notes.map((l, j) => (
              <text key={j} className="note" x={p.x + p.w / 2} y={noteY(j)} textAnchor="middle">{l}</text>
            ))}
          </g>
        );
      })}
      <circle className="packet" cx="-20" cy="-20" r="0" aria-hidden="true" />
    </svg>
  );
}
