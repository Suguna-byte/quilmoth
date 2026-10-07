import type { Metadata } from "next";
import Link from "next/link";
import { CTA, PageHead } from "@/components/PageHead";
import { formatDate, notes, readingMinutes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notes",
  description: "Field notes from the Quillmoth studio: build notes, mistakes and half-formed ideas.",
};

export default function NotesPage() {
  return (
    <>
      <PageHead
        eyebrow="field notes"
        title="Notes"
        lede="Build notes and half-formed ideas from the team. We publish when something is worth writing down, not on a schedule."
        labels={["field notes", `${notes.length} ${notes.length === 1 ? "entry" : "entries"}`, "no schedule"]}
      />

      <section className="wrap" aria-label="All notes">
        <ol className="notes-list">
          {notes.map((n, i) => (
            <li key={n.slug} className="note-row">
              <Link href={`/notes/${n.slug}`}>
                <div className="eyebrow">
                  note {String(notes.length - i).padStart(2, "0")}
                  <br />
                  <time dateTime={n.date}>{formatDate(n.date)}</time> · {readingMinutes(n)} min
                </div>
                <div>
                  <h2>{n.title}</h2>
                  <p>{n.summary}</p>
                  <p className="eyebrow note-cat">{n.category}</p>
                </div>
                <span className="read">read →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <CTA eyebrow="rather talk than read?" title="Let's build it." />
    </>
  );
}
