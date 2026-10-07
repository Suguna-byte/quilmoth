"use client";

import { useEffect, useRef } from "react";
import { lamp } from "@/lib/lamp";

const RAMP = " .,:;-=+*#%@"; // light → dense

type Props = {
  /** Chase the cursor (hero) or hover in place and flap gently (about / contact). */
  follow?: boolean;
  className?: string;
  label?: string;
};

// A soft ellipse: 1 at its centre, fading to 0 at its edge.
function blob(u: number, v: number, cu: number, cv: number, rx: number, ry: number, rot: number) {
  const c = Math.cos(rot), s = Math.sin(rot);
  const x = u - cu, y = v - cv;
  const xr = x * c + y * s, yr = -x * s + y * c;
  const d = Math.hypot(xr / rx, yr / ry);
  return d < 1 ? 1 - d : 0;
}

// The moth is pure maths: wings, eye spots, body and antennae, mirrored left/right.
// f is the flap amount (1 = wings fully open).
function shape(u: number, v: number, f: number) {
  const au = Math.abs(u);
  let val = Math.max(
    blob(au, v, 0.42 * f, -0.12, 0.46 * f, 0.32, -0.35) * 0.85, // upper wings
    blob(au, v, 0.28 * f, 0.26, 0.3 * f, 0.22, 0.45) * 0.75, // lower wings
  );
  const spot = Math.hypot(au - 0.5 * f, v + 0.14);
  if (val > 0 && spot < 0.1) val = spot > 0.055 ? 1 : 0.15; // eye spots: a lit ring
  val = Math.max(val, blob(u, v, 0, 0.04, 0.075, 0.44, 0) * 1.2); // body
  if (v < -0.38 && v > -0.78) {
    const a = 0.04 + (-0.38 - v) * 0.55; // antennae curve outwards
    if (Math.abs(au - a) < 0.028) val = Math.max(val, 0.55);
  }
  return Math.min(val, 1);
}

export function MothCanvas({ follow = true, className = "moth-canvas", label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, cw = 9, ch = 14, cols = 0, rows = 0;
    let ink = "#000", soft = "#888", lampC = "#fc0";
    const moth = { x: 0, y: 0, vx: 0, vy: 0 };
    let visible = true;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = cs.getPropertyValue("--ink").trim();
      soft = cs.getPropertyValue("--ink-soft").trim();
      lampC = cs.getPropertyValue("--lamp").trim();
    };

    const size = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = W < 520 ? 7 : 9;
      ch = Math.round(cw * 1.55);
      cols = Math.ceil(W / cw);
      rows = Math.ceil(H / ch);
      const fontFamily = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";
      ctx.font = `${ch}px ${fontFamily}, ui-monospace, monospace`;
      ctx.textBaseline = "top";
      if (!moth.x) {
        moth.x = W / 2;
        moth.y = H / 2;
      }
      readColors();
      if (reduce) draw(1, -9999, -9999);
    };

    const draw = (f: number, lx: number, ly: number) => {
      ctx.clearRect(0, 0, W, H);
      const S = Math.min(W, H) * 0.42;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = i * cw + cw / 2, py = j * ch + ch / 2;
          const v = shape((px - moth.x) / S, (py - moth.y) / S, f);
          if (v > 0.03) {
            ctx.fillStyle = v > 0.97 ? lampC : ink;
            ctx.fillText(RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(v * (RAMP.length - 1)))], i * cw, j * ch);
            continue;
          }
          const g = 1 - Math.hypot(px - lx, py - ly) / 150; // lamplight falling on the background grid
          if (g > 0) {
            ctx.globalAlpha = g * 0.9;
            ctx.fillStyle = lampC;
            ctx.fillText(g > 0.7 ? "*" : g > 0.4 ? ":" : ".", i * cw, j * ch);
            ctx.globalAlpha = 1;
          } else if ((i * 7 + j * 13) % 29 === 0) {
            ctx.globalAlpha = 0.35; // faint starfield so the canvas never looks empty
            ctx.fillStyle = soft;
            ctx.fillText(".", i * cw, j * ch);
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    let t = 0, last = performance.now(), raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (visible) {
        const r = cv.getBoundingClientRect();
        let tx = lamp.x - r.left, ty = lamp.y - r.top;
        const idle = now - lamp.lastMove > 2200;
        const away = tx < -80 || ty < -80 || tx > W + 80 || ty > H + 80;
        if (!follow || idle || away) {
          // No lamp nearby: drift in a lazy figure-eight (or a small hover when not following).
          const k = follow ? 1 : 0.25;
          tx = W / 2 + Math.sin(t * 0.6) * W * 0.22 * k;
          ty = H / 2 + Math.sin(t * 1.2) * H * 0.14 * k;
        }
        tx = Math.max(W * 0.2, Math.min(W * 0.8, tx));
        ty = Math.max(H * 0.25, Math.min(H * 0.75, ty));
        // Spring toward the target, plus flutter, minus friction: it overshoots like a real moth.
        moth.vx += ((tx - moth.x) * 2.2 + Math.sin(t * 7.3) * 40) * dt;
        moth.vy += ((ty - moth.y) * 2.2 + Math.cos(t * 5.1) * 40) * dt;
        moth.vx *= 0.92;
        moth.vy *= 0.92;
        moth.x += moth.vx * dt * 4;
        moth.y += moth.vy * dt * 4;
        const flap = follow ? 0.5 + 0.5 * Math.abs(Math.sin(t * 7)) : 0.65 + 0.35 * Math.abs(Math.sin(t * 3));
        draw(flap, follow ? lamp.x - r.left : -9999, follow ? lamp.y - r.top : -9999);
      }
      raf = requestAnimationFrame(frame);
    };

    size();
    // Only animate while on screen: saves battery when the hero is scrolled away.
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", readColors);
    document.fonts?.ready.then(size);

    // Reduced motion: size() already drew one still frame with wings open.
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", readColors);
    };
  }, [follow]);

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label={label ?? "Mo, a moth drawn in text characters, flying toward your cursor"}
    />
  );
}
