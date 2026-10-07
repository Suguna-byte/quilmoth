import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { MothCanvas } from "@/components/MothCanvas";
import { faqs } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Quillmoth what you need built. A founder replies within a working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="say hello"
        title="Let's build."
        lede="Skip the sales call. Tell us what you need, and a founder will reply within a working day."
        labels={[site.city.toLowerCase(), site.coords, site.timezone, "replies < 1 day"]}
      />

      <section className="wrap contact-grid">
        <ContactForm />

        <aside className="side">
          <MothCanvas follow={false} className="moth-canvas small" label="Mo the moth, waiting for your message" />

          <div>
            <h2>What happens next</h2>
            <ol className="steps">
              <li>You send a brief, as rough as you like.</li>
              <li>We reply within a working day with questions, not a quote.</li>
              <li>One call to agree scope, deliverables and a timeline.</li>
            </ol>
          </div>

          <div>
            <h2>Rather email?</h2>
            <CopyEmail email={site.email} />
            <p className="reach">
              <span>
                github · <a href={site.github} target="_blank" rel="noopener noreferrer">{site.github.replace("https://", "")} ↗</a>
              </span>
            </p>
          </div>

          <div className="faq">
            <h2>Quick answers</h2>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
