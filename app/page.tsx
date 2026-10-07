import { MothCanvas } from "@/components/MothCanvas";
import { Statement } from "@/components/Statement";
import { GlowLink } from "@/components/GlowLink";
import { CTA } from "@/components/PageHead";
import { commissions, formatDate, notes, projects } from "@/lib/data";
import { site } from "@/lib/site";

const appetites = [
  {
    who: "you",
    title: "Commissions",
    line: "Web, mobile, APIs and first versions. We scope it plainly, ship it on the date we said, then look after it like our own.",
    items: commissions.slice(0, 4).map((c) => c.name),
    href: "/work",
    more: "see the work →",
  },
  {
    who: "everyone",
    title: "Free tools",
    line: "Small, sharp things we built for ourselves and couldn't keep in a drawer. MIT licensed, issues answered.",
    items: projects.filter((p) => p.source).map((p) => p.name),
    href: "/projects",
    more: "open the jar →",
  },
  {
    who: "us",
    title: "Our own bets",
    line: "Software we design, run and grow ourselves, because building for clients teaches you what you'd do differently.",
    items: ["Nilavu"],
    href: "/projects",
    more: "see what's brewing →",
  },
];

export default function Home() {
  const latest = notes[0];
  return (
    <>
      <section>
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">creative software studio · {site.city.toLowerCase()}</p>
            <h1 className="hero-title">
              Quill<span>moth</span>
            </h1>
            <p className="tagline">
              We sketch.
              <br />
              We solder.
              <br />
              We <span className="lit-word">send.</span>
            </p>
            <p className="hint eyebrow">
              <i aria-hidden="true" />
              Move your cursor. You&apos;re the lamp.
            </p>
          </div>
          <MothCanvas />
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">the studio</p>
          <Statement
            lit={["Six people.", "One lamp.", "Three things we keep circling."]}
            rest="Work people pay us to ship, tools we give away, and products we bet our own money on."
          />
        </div>
      </section>

      <section aria-label="What we do">
        <div className="wrap section-pad">
          <div className="appetites">
            {appetites.map((a, i) => (
              <GlowLink key={a.title} href={a.href} className="appetite" pitch={1100 + i * 220}>
                <span className="who eyebrow">
                  <span>for</span>
                  <b>{a.who}</b>
                </span>
                <h2>{a.title}</h2>
                <p>{a.line}</p>
                <ul>
                  {a.items.map((it) => (
                    <li key={it} className="chip">
                      {it}
                    </li>
                  ))}
                  {a.who === "us" && <li className="chip chip-dashed">two more in the cocoon</li>}
                </ul>
                <span className="more">{a.more}</span>
              </GlowLink>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">latest field note</p>
          <div>
            <GlowLink href={`/notes/${latest.slug}`} className="appetite solo" pitch={900}>
              <span className="who eyebrow">
                <span>{latest.category}</span>
                <b>{formatDate(latest.date)}</b>
              </span>
              <h2>{latest.title}</h2>
              <p>{latest.summary}</p>
              <span className="more">read →</span>
            </GlowLink>
          </div>
        </div>
      </section>

      <CTA eyebrow="your turn" title="Bring us something bright." action="say hello →" />
    </>
  );
}
