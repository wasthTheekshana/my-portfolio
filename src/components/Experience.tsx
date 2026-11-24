import { experience } from '@/data/site';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-h">
      <div className="wrap grid exp">
        <div className="exp__head">
          <h2 id="exp-h" className="exp__title" data-split="lines">Experience</h2>
        </div>
        <div className="exp__list">
          {experience.map((j) => (
            <article key={`${j.org}-${j.when}`} className="job" data-reveal="up">
              <h3 className="job__role">{j.role}</h3>
              <p className="job__org"><span>{j.org}</span><span>{j.when}</span></p>
              <ul>{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
