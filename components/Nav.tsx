"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SoundToggle } from "./SoundProvider";
import { nav } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" aria-label="Quillmoth home">
          <Logo />
          Quillmoth
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "close" : "menu"}
        </button>
        <ul id="site-menu" className="nav-links" data-open={open}>
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href} className={item.href === "/contact" ? "say-hi" : undefined}>
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {item.href === "/contact" ? "say hello →" : item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <SoundToggle />
          </li>
        </ul>
      </div>
    </header>
  );
}
