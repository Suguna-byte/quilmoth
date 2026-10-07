import Link from "next/link";
import { MothCanvas } from "@/components/MothCanvas";

export default function NotFound() {
  return (
    <section className="wrap lost">
      <p className="eyebrow">404 · nothing under this lamp</p>
      <h1>This page flew off.</h1>
      <p>Mo looked everywhere. Follow the light back home.</p>
      <MothCanvas className="moth-canvas small" label="Mo the moth, searching for the missing page" />
      <Link className="btn" href="/">
        back home →
      </Link>
    </section>
  );
}
