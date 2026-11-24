import { about, site } from '@/data/site';

const marks = ['DocuMind', 'graph neural networks', 'remote and freelance work'];
const re = new RegExp(`(${marks.join('|')})`, 'g');

function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(re).map((part, i) =>
        marks.includes(part) ? <span key={i} className="hl hl--static" data-hl>{part}</span> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="wrap grid about">
        <h2 id="about-h" className="about__lead" data-split="lines">{about.lead}</h2>
        <dl className="about__facts">
          <dt>Languages</dt>
          <dd>{site.languages}</dd>
          <dt>Based in</dt>
          <dd>{site.location}</dd>
        </dl>
        <article className="about__sheet" data-reveal="up">
          <header><span>About me</span><span>{site.location}</span></header>
          {about.paragraphs.map((p, i) => <p key={i}><Marked text={p} /></p>)}
        </article>
      </div>
    </section>
  );
}
