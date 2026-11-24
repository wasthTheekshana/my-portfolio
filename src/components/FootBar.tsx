'use client';
import { useEffect, useState } from 'react';
import { scrollToTarget } from '@/engine';
import { site } from '@/data/site';

export function FootBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="foot__row">
      <span>&copy; 2026 {site.first} {site.last}</span>
      <span>Colombo{time ? `, ${time} local time` : ''}</span>
      <span>Set in DM Serif Display and Geist</span>
      <button type="button" className="mk" onClick={() => scrollToTarget(0)} style={{ minHeight: '2.5rem' }}>Back to top</button>
    </div>
  );
}
