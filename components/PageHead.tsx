import Link from "next/link";

/** Shared header for inner pages: eyebrow, big title, one-line lede, and a specimen-style label line. */
export function PageHead({
  eyebrow,
  title,
  lede,
  labels,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  labels: string[];
}) {
  return (
    <header className="wrap page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      <p className="label-line" aria-label="Page details">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </p>
    </header>
  );
}

/** The closing call to action every page ends on. */
export function CTA({ eyebrow, title, action = "start a project →" }: { eyebrow: string; title: string; action?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <Link className="btn" href="/contact">
          {action}
        </Link>
      </div>
    </section>
  );
}
