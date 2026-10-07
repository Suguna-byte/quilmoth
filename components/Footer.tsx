import Link from "next/link";
import { site } from "@/lib/site";
import { SoundToggle } from "./SoundProvider";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.city}
        </span>
        <nav aria-label="Footer">
          <SoundToggle />
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            github ↗
          </a>
          <Link href="/contact">{site.email}</Link>
          <a href="#top">back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
