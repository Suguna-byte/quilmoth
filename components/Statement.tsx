"use client";

import { useEffect, useRef } from "react";

/**
 * Highlights the lead phrases like a marker pen when they scroll into view.
 * The text is readable from the start; only the yellow underlay animates.
 */
export function Statement({ lit, rest }: { lit: string[]; rest: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".hl");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      spans.forEach((s) => s.classList.add("lit"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lit");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.6 },
    );
    spans.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <p className="statement" ref={ref}>
      {lit.map((phrase, i) => (
        <span key={phrase}>
          <span className="hl" style={{ transitionDelay: `${i * 0.15}s` }}>
            {phrase}
          </span>{" "}
        </span>
      ))}
      <span className="rest">{rest}</span>
    </p>
  );
}
