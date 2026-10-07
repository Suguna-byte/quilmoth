"use client";

import { useEffect, useState } from "react";

/**
 * "warming the lamp…" counter. Shown once per browser session, not on every page change.
 * The fade-out is a CSS animation, so the page is never stuck behind the loader even if JS fails.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("quillmoth:seen")) {
        setSkip(true);
        return;
      }
      sessionStorage.setItem("quillmoth:seen", "1");
    } catch {}
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader" data-skip={skip} aria-hidden="true">
      <p>
        warming the lamp… <b>{pct}</b>%
      </p>
    </div>
  );
}
