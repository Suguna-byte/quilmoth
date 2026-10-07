// All page content lives here as typed data. Pages only decide layout.
// Every client, tool, person and post below is fictional.

export type Commission = {
  name: string;
  field: string;
  line: string;
  url: string;
  wingspan: string; // the "aspect" of the preview, labelled like a specimen measurement
  hue: number; // drives the generated preview art
};

export const commissions: Commission[] = [
  { name: "Kayal Fisheries", field: "Seafood & Export", line: "Catch-to-container traceability. Every crate gets a QR that tells you which boat, which morning.", url: "https://example.com/kayal", wingspan: "16/10", hue: 190 },
  { name: "Ammini Ayurveda", field: "Health & Wellness", line: "Booking and therapist rostering for four clinics. Patients pick a slot on WhatsApp, no app needed.", url: "https://example.com/ammini", wingspan: "16/10", hue: 95 },
  { name: "Periyar Freight", field: "Logistics", line: "A rate-quote API that answers in under 200ms, replacing a spreadsheet and three phone calls.", url: "https://example.com/periyar", wingspan: "4/3", hue: 30 },
  { name: "Tharangam FM", field: "Media", line: "Live radio app with offline replays for listeners on patchy hill-station networks.", url: "https://example.com/tharangam", wingspan: "9/16", hue: 330 },
  { name: "Chembu Ceramics", field: "E-commerce", line: "A storefront where every mug is one of a kind, so stock is always exactly one.", url: "https://example.com/chembu", wingspan: "1/1", hue: 15 },
];

export type ProjectStatus = "released" | "in development" | "testing";

export type Project = {
  name: string;
  year: number;
  status: ProjectStatus;
  line: string;
  tags: string[];
  source?: string;
  demo?: string;
};

export const projects: Project[] = [
  { name: "lantern", year: 2026, status: "released", line: "Env vars without .env files. Secrets live encrypted in your repo and unlock with your SSH key.", tags: ["Rust", "age", "SSH"], source: "https://github.com/quillmoth/lantern" },
  { name: "cocoon", year: 2026, status: "in development", line: "Forms that keep working offline and sync when the signal comes back. Built for field teams.", tags: ["TypeScript", "IndexedDB", "React"], demo: "https://example.com/cocoon", source: "https://github.com/quillmoth/cocoon" },
  { name: "Nilavu", year: 2026, status: "testing", line: "A quiet journaling app. One prompt a night, no streaks, no badges, no feed.", tags: ["Next.js", "Postgres", "Django"], demo: "https://example.com/nilavu" },
  { name: "mothball", year: 2025, status: "released", line: "Snapshot tests for API responses that ignore the fields you expect to change.", tags: ["Python", "pytest"], source: "https://github.com/quillmoth/mothball" },
  { name: "wick", year: 2025, status: "released", line: "A 1kb CSS reset with sensible dark-mode defaults and nothing else.", tags: ["CSS"], demo: "https://example.com/wick", source: "https://github.com/quillmoth/wick" },
];

export type Person = {
  name: string;
  role: string;
  city: string;
  bio: string;
  hum: { title: string; notes: number[] }; // a five-note "signature hum", played with WebAudio
  links: { label: string; href: string }[];
};

export const team: Person[] = [
  { name: "Nandana", role: "Founder · full-stack", city: "Kochi", bio: "Writes the React and the Django, then argues with both. Will rename a variable four times before shipping.", hum: { title: "the deploy hum", notes: [60, 64, 67, 72, 67] }, links: [{ label: "github", href: "https://github.com" }, { label: "linkedin", href: "https://linkedin.com" }] },
  { name: "Arjun", role: "Mobile", city: "Kochi", bio: "Makes apps that open fast on a three-year-old phone. Keeps a drawer of test devices like a museum.", hum: { title: "cold start", notes: [62, 62, 69, 67, 65] }, links: [{ label: "github", href: "https://github.com" }] },
  { name: "Meera", role: "Design", city: "Thrissur", bio: "Draws the thing before anyone builds it. Believes every screen deserves one moment of delight.", hum: { title: "pixel lullaby", notes: [67, 71, 74, 71, 79] }, links: [{ label: "instagram", href: "https://instagram.com" }, { label: "linkedin", href: "https://linkedin.com" }] },
  { name: "Faisal", role: "Backend & infra", city: "Kochi", bio: "Owns the servers and, as a result, the pager. Happiest when nothing happens.", hum: { title: "quiet night", notes: [55, 59, 62, 59, 55] }, links: [{ label: "github", href: "https://github.com" }] },
  { name: "Anjali", role: "Product & QA", city: "Bengaluru", bio: "Finds the bug you were sure wasn't there. Writes the release notes people actually read.", hum: { title: "regression waltz", notes: [64, 67, 64, 60, 62] }, links: [{ label: "linkedin", href: "https://linkedin.com" }] },
  { name: "Rahul", role: "Frontend", city: "Kochi", bio: "Turns Meera's drawings into components that don't break at 320px. Has opinions about easing curves.", hum: { title: "ease-out", notes: [69, 72, 76, 74, 72] }, links: [{ label: "github", href: "https://github.com" }, { label: "linkedin", href: "https://linkedin.com" }] },
  { name: "Mo", role: "Mascot", city: "the lamp", bio: "An ASCII moth with no job description. Follows your cursor everywhere. Not a bug, technically.", hum: { title: "flutter", notes: [84, 86, 84, 88, 91] }, links: [] },
];

export type Note = {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  summary: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "why-a-moth",
    title: "Why our mascot is a moth",
    date: "2026-09-12",
    category: "studio · brand",
    summary: "We wanted a mascot that does something. Moths go toward light, so the visitor became the lamp.",
    body: [
      "Most studio mascots stand still and smile. We wanted ours to react to the person looking at it, because that's what good software does.",
      "Moths fly toward light. That gave us the whole site in one sentence: your cursor is the lamp, and Mo follows it. The yellow on every page is that lamp, so we only use it for things that are lit up or need your attention.",
      "Mo is drawn with text characters on a canvas. There is no image file. Each frame, the code works out how far every character cell is inside the moth's wings and picks a denser character for cells deeper inside. It costs almost nothing to draw and it reminds people that we write code for a living.",
    ],
  },
  {
    slug: "keeping-field-notes",
    title: "Why we're keeping field notes",
    date: "2026-07-20",
    category: "studio · notes",
    summary: "Most of what we learn stays in chat threads. This is where some of it gets written down.",
    body: [
      "Every project teaches us something we forget by the next one. A Django query that was slow for a silly reason. A form that confused every user over sixty. A deploy step we skipped once and regretted.",
      "These notes are where we write those things down. No schedule, no newsletter funnel. When something is worth keeping, it goes here.",
    ],
  },
];

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const readingMinutes = (n: Note) =>
  Math.max(1, Math.round(n.body.join(" ").split(/\s+/).length / 200));

export const faqs = [
  { q: "How quickly do you reply?", a: "Within a working day, usually sooner. We're on GMT+5:30, so a message sent in your evening often has an answer by your morning." },
  { q: "Will you sign an NDA?", a: "Yes. Mention it in your first message and we'll send ours, or sign yours, before you share details." },
  { q: "Do you work with clients outside India?", a: "Most of our clients are. We work remotely by default and overlap with European mornings and US evenings." },
  { q: "What do you build?", a: "Web and mobile apps, APIs, internal tools and first versions of new products. We also design them, if you need that." },
];
