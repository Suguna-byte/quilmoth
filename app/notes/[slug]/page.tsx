import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { formatDate, notes, readingMinutes } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

// Every note is pre-rendered at build time: static HTML, no server work per visit.
export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const i = notes.findIndex((n) => n.slug === slug);
  if (i === -1) notFound();
  const note = notes[i];
  const newer = notes[i - 1];
  const older = notes[i + 1];

  return (
    <>
      <PageHead
        eyebrow={note.category}
        title={note.title}
        lede={note.summary}
        labels={[`note ${String(notes.length - i).padStart(2, "0")}`, formatDate(note.date), `${readingMinutes(note)} min read`]}
      />
      <article className="wrap">
        <div className="post">
          {note.body.map((para, k) => (
            <p key={k}>{para}</p>
          ))}
          <nav className="post-nav" aria-label="More notes">
            {older ? <Link href={`/notes/${older.slug}`}>← {older.title}</Link> : <Link href="/notes">← all notes</Link>}
            {newer ? <Link href={`/notes/${newer.slug}`}>{newer.title} →</Link> : <Link href="/notes">all notes →</Link>}
          </nav>
        </div>
      </article>
    </>
  );
}
