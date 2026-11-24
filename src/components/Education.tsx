import { education } from '@/data/site';

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="edu-h">
      <div className="wrap grid edu">
        <h2 id="edu-h" className="edu__title" data-split="lines">Education</h2>
        <div className="edu__list">
          {education.map((e) => (
            <div key={e.q} className="edu__row" data-reveal="up">
              <h3 className="edu__q">{e.q}</h3>
              <p className="edu__w">{e.where}</p>
              <p className="edu__y">{e.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
