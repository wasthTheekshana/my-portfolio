import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-h">
      <p className="nf__q">Query: the page you asked for</p>
      <h1 id="nf-h" className="nf__t">
        No source <span className="hl is-on">retrieved</span>.
      </h1>
      <p style={{ maxWidth: '30rem' }}>
        Nothing on this site matches that address. The projects are a better place to start.
      </p>
      <div className="hero__cta">
        <Link href="/#projects" className="btn btn--solid">View projects</Link>
        <Link href="/" className="btn">Back home</Link>
      </div>
    </section>
  );
}
