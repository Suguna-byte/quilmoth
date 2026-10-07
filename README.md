# Quillmoth

Studio website for a fictional creative software studio in Kochi. Built with Next.js 16 (App Router), React 19 and TypeScript. No UI libraries.

The idea: **the cursor is a lamp, and Mo, an ASCII moth, flies toward it.**

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

Fonts come from Google Fonts through `next/font`, so the first build needs internet.

## Pages

| Route | What it does |
|---|---|
| `/` | Hero with the live moth, studio statement, three kinds of work, latest note |
| `/work` | Client projects as pinned "specimens" with generated cover art |
| `/projects` | Open-source tools and products, filterable by status |
| `/about` | Story, facts, services, how we work, the mascot, team cards with playable "hums" |
| `/notes`, `/notes/[slug]` | Blog, statically generated at build time |
| `/contact` | Brief form with ticket number, process steps, FAQ, copyable email |
| `/api/contact` | Server-side validation for the form, with a honeypot for bots |

Also: `sitemap.xml`, `robots.txt`, Open Graph metadata, a custom 404.

## Structure

```
app/            routes, layout, global styles, API route
components/     MothCanvas, Lamp, SoundProvider, Nav, ContactForm, ProjectJar, TeamGrid…
lib/data.ts     all content (clients, projects, team, notes, FAQs) as typed data
lib/site.ts     studio-wide facts: email, city, nav
lib/lamp.ts     shared cursor position read by the moth every frame
```

## Notes for whoever picks this up

- Content lives in `lib/data.ts`. Add a note there and its page, sitemap entry and list row appear on the next build.
- `/api/contact` validates and logs. To receive briefs, send them with an email service or save them to a database where the `TODO` is.
- Sound is off by default and remembered per browser. Team "hums" are synthesised with the Web Audio API, so there are no audio files.
- Reduced motion is respected everywhere: the moth holds still, the loader is skipped, highlights appear instantly.
