import type { Metadata } from "next";
import { CTA, PageHead } from "@/components/PageHead";
import { MothCanvas } from "@/components/MothCanvas";
import { TeamGrid } from "@/components/TeamGrid";
import { team } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Quillmoth is six people in Kerala building software for clients, for the open-source community and for ourselves.",
};

const services = [
  { title: "Product engineering", line: "Web and mobile apps from first sketch to app-store listing, built to be handed over or kept running by us." },
  { title: "Business platforms", line: "CRMs, inventory, HR and invoicing tools shaped around how your team already works, not the other way round." },
  { title: "AI-assisted systems", line: "Search, summaries and automations added where they save real time, with a plain fallback when they don't." },
];

export default function AboutPage() {
  const humans = team.filter((p) => p.role !== "Mascot").length;
  return (
    <>
      <PageHead
        eyebrow={`the studio · est. ${site.founded}`}
        title="The Studio"
        lede="Six people, one lamp, three things we keep circling: client work, open source, and products of our own."
        labels={[`est. ${site.founded}`, `${humans} humans + 1 moth`, site.city.toLowerCase(), "bootstrapped"]}
      />

      <section className="wrap intro-split">
        <p className="eyebrow">why we exist</p>
        <div>
          <h2>We wanted a studio where the people who build it also talk to you.</h2>
          <p>
            Quillmoth started as three friends trading weekend side-projects: an offline form library, a secrets tool, a
            journaling app nobody asked for. Clients started asking for the same care on their projects, so we made it a
            studio.
          </p>
          <p>No account managers, no handoffs. The person on your call is the person writing your code.</p>
          <div className="facts">
            <div className="fact"><span className="eyebrow">founded</span><b>{site.founded}</b></div>
            <div className="fact"><span className="eyebrow">team</span><b>{humans} people</b></div>
            <div className="fact"><span className="eyebrow">based</span><b>Kochi</b></div>
            <div className="fact"><span className="eyebrow">model</span><b>Bootstrapped</b></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">what we deliver</p>
          <div className="services">
            {services.map((s) => (
              <div key={s.title} className="service">
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">how we work</p>
          <div>
            <p className="statement narrow">
              Small team, short loops, <span className="lit-word">working software every week.</span>
            </p>
            <div className="two-lists">
              <div>
                <h3>Why we&apos;re quick</h3>
                <ol>
                  <li>You see a working build every Friday, not a status report.</li>
                  <li>Decisions happen in one call, because the builders are on it.</li>
                  <li>We reuse our own open-source tools instead of starting from zero.</li>
                </ol>
              </div>
              <div>
                <h3>What we&apos;re building toward</h3>
                <ol>
                  <li>Two products of our own that pay the studio&apos;s rent.</li>
                  <li>A tool library other small studios rely on.</li>
                  <li>Clients who come back for version two.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">the mascot</p>
          <div className="mascot">
            <div>
              <h2>Meet Mo.</h2>
              <p>
                Mo is a moth made of text characters. It has no job description, follows your cursor everywhere, and is
                drawn fresh about sixty times a second. Technically not a bug.
              </p>
            </div>
            <MothCanvas follow={false} className="moth-canvas small" label="Mo the moth, hovering in place" />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <p className="eyebrow">the team</p>
          <div>
            <h2 className="section-title">Six people, one workshop.</h2>
            <TeamGrid people={team} />
          </div>
        </div>
      </section>

      <CTA eyebrow="let's build together" title="Work with the studio." action="say hello →" />
    </>
  );
}
