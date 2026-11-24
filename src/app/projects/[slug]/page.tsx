import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HowItWorks } from '@/components/HowItWorks';
import { projects, site } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.title} | Case study` },
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: 'article', title: p.title, description: p.summary, url: `/projects/${p.slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${site.first} ${site.last}, ${p.short}` }],
    },
    twitter: { card: 'summary_large_image', title: p.title, description: p.summary, images: ['/opengraph-image'] },
  };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const url = `${site.url}/projects/${p.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/#projects` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: p.title,
        description: p.summary,
        url,
        mainEntityOfPage: url,
        keywords: p.stack.join(', '),
        author: { '@type': 'Person', name: `${site.first} ${site.last}`, url: site.url },
      },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className="case__hero">
        <div className="case__top">
          <Link href="/#projects" className="case__back mk">All projects</Link>
          <span className="row__n mono">Source {p.n} of {projects.length}</span>
        </div>
        <h1 className="case__title">{p.title}</h1>
        <p className="case__sum">{p.summary}</p>
        <dl className="case__meta">
          <div><dt>My role</dt><dd>{p.role}</dd></div>
          <div><dt>Tech stack</dt><dd><ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
        </dl>
      </header>

      <section className="block" aria-labelledby="problem-h">
        <div className="wrap grid">
          <h2 id="problem-h" className="block__h">Problem</h2>
          <div className="block__b"><p className="block__lead" data-split="lines">{p.problem}</p></div>
        </div>
      </section>

      <section className="block" aria-labelledby="how-h">
        <div className="wrap">
          <h2 id="how-h" className="block__h" style={{ marginBottom: '2.5rem' }}>How it works</h2>
          <HowItWorks project={p} />
        </div>
      </section>

      <section className="block" aria-labelledby="chal-h">
        <div className="wrap grid two">
          <div>
            <h2 id="chal-h">Key challenges and how they were solved</h2>
            {p.challenges.map((c) => (
              <div key={c.title} className="challenge" data-reveal="up">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div>
            {p.apps ? (
              <>
                <h2>Apps hosted</h2>
                <ul className="tags">{p.apps.map((a) => <li key={a}>{a}</li>)}</ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="res-h2">
        <div className="wrap">
          <h2 id="res-h2" className="block__h" style={{ marginBottom: '2.5rem' }}>Results</h2>
          {p.results.length > 0 && (
            <div className="results">
              {p.results.map((r) => (
                <div key={r.label} data-reveal="up">
                  <p className="result__v">{r.value}</p>
                  <p className="result__l">{r.label}</p>
                </div>
              ))}
            </div>
          )}
          {p.outcome && <p className="block__lead" style={{ marginTop: p.results.length ? '3rem' : 0 }} data-split="lines">{p.outcome}</p>}
        </div>
      </section>

      <section className="block" aria-label="Next project">
        <div className="wrap">
          <Link href={`/projects/${next.slug}`} className="next" data-cursor="Read">
            <p className="next__k">Next source, {next.n} of {projects.length}</p>
            <p className="next__t"><span className="hl">{next.title}</span></p>
          </Link>
        </div>
      </section>
    </article>
  );
}
