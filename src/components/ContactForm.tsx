'use client';
// No backend yet: the form opens the visitor's email app with the message ready (honest, works everywhere).
import { useState } from 'react';
import { site } from '@/data/site';

export function ContactForm() {
  const [note, setNote] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get('name') || '');
    const email = String(d.get('email') || '');
    const message = String(d.get('message') || '');
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    setNote('Your email app should open with the message ready.');
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact__form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">What would you like to ask?</label>
        <textarea id="cf-msg" name="message" required />
      </div>
      <div>
        <button type="submit" className="btn btn--solid" data-magnetic="0.25">Send message</button>
      </div>
      <p className="form__note" role="status">{note}</p>
    </form>
  );
}
