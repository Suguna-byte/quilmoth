// One place for studio-wide facts, so a change (email, city) never needs a hunt through pages.
export const site = {
  name: "Quillmoth",
  url: "https://quillmoth.studio",
  tagline: "We sketch. We solder. We send.",
  description:
    "Quillmoth is a creative software studio in Kochi building web and mobile products, APIs and MVPs for clients worldwide, plus open-source tools and products of our own.",
  email: "hello@quillmoth.studio",
  github: "https://github.com/quillmoth",
  city: "Kochi, India",
  coords: "9.93°N 76.27°E",
  timezone: "GMT+5:30",
  founded: 2025,
  team: 6,
} as const;

export const nav = [
  { href: "/work", label: "work" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/notes", label: "notes" },
  { href: "/contact", label: "contact" },
] as const;
