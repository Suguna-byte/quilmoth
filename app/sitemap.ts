import type { MetadataRoute } from "next";
import { notes } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/projects", "/about", "/notes", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const posts = notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: n.date, priority: 0.5 }));
  return [...pages, ...posts];
}
