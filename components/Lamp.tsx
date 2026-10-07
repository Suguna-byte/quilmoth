"use client";

import { useEffect } from "react";
import { lamp } from "@/lib/lamp";

/** Tracks the pointer once for the whole site and paints the soft glow behind content. */
export function Lamp() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      lamp.x = e.clientX;
      lamp.y = e.clientY;
      lamp.lastMove = performance.now();
      // Batch CSS variable writes into one per frame.
      if (!frame) {
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--lx", `${lamp.x}px`);
          root.style.setProperty("--ly", `${lamp.y}px`);
          frame = 0;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="lamp-glow" aria-hidden="true" />;
}
