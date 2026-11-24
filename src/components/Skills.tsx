import { skills } from '@/data/site';

export function Skills() {
  return (
    <section id="skills" className="section" data-tone="mark" aria-labelledby="skills-h">
      <div className="wrap">
        <h2 id="skills-h" className="skills__title" data-split="lines">What I work with, grouped by the job it does.</h2>
        <div>
          {skills.map((g) => (
            <div key={g.group} className="skill" data-reveal="up">
              <h3>{g.group}</h3>
              <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
