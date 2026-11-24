import { site } from '@/data/site';
import { ContactForm } from './ContactForm';
import { FootBar } from './FootBar';

export function Contact() {
  return (
    <section id="contact" className="section contact" data-tone="dark" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="grid contact__grid">
          <h2 id="contact-h" className="contact__title" data-split="lines">Ask a follow-up.</h2>
          <p className="contact__sub" data-reveal="up">Questions about a project, a role or a collaboration are all welcome.</p>
          <ContactForm />
          <ul className="contact__links" data-reveal="up">
            <li><small>Email</small><a className="mk" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><small>Phone</small><a className="mk" href={site.phoneHref}>{site.phone}</a></li>
            {site.socials.map((s) => (
              <li key={s.label}><small>{s.label}</small><a className="mk" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
            <li><small>Resume</small><a className="mk" href="/resume.pdf" download>Download CV</a></li>
          </ul>
        </div>
        <div className="foot">
          <p className="foot__name" aria-hidden="true">{site.first} {site.last}</p>
          <FootBar />
        </div>
      </div>
    </section>
  );
}
