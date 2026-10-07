import type { Metadata } from "next";
import { CTA, PageHead } from "@/components/PageHead";
import { SpecimenArt } from "@/components/SpecimenArt";
import { commissions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Client work Quillmoth has shipped: web, mobile and APIs for businesses in Kerala and beyond.",
};

export default function WorkPage() {
  return (
    <>
      <PageHead
        eyebrow="clients · shipped"
        title="Work"
        lede="Your product, our problem. Here's what we've built for people who trusted us with theirs."
        labels={[`specimen drawer`, `${commissions.length} pinned`, "night collection", "kochi"]}
      />

      <section className="wrap intro-split">
        <p className="eyebrow">what we can show</p>
        <div>
          <h2>Only the work we&apos;re free to name.</h2>
          <p>
            Some of our best projects sit under NDAs, so they stay out of this drawer. Everything here is live, and every
            link goes to the real thing.
          </p>
        </div>
      </section>

      <section className="wrap drawer" aria-label="Client projects">
        {commissions.map((c, i) => (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="specimen">
            <div className="specimen-art">
              <SpecimenArt hue={c.hue} seed={i} />
              <span className="pin">specimen {String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="specimen-body">
              <div className="specimen-meta eyebrow">
                <span>{c.field}</span>
                <span>wingspan {c.wingspan}</span>
              </div>
              <h2>{c.name}</h2>
              <p>{c.line}</p>
              <span className="visit">visit ↗</span>
            </div>
          </a>
        ))}
      </section>

      <CTA eyebrow="comparing studios?" title="Tell us what to ship." action="get in touch →" />
    </>
  );
}
