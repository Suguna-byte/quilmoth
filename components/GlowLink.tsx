"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { useSound } from "./SoundProvider";

/** A link card that lights up under the cursor (the lamp) and ticks when sound is on. */
export function GlowLink({
  href,
  className,
  pitch = 1200,
  children,
}: {
  href: string;
  className: string;
  pitch?: number;
  children: React.ReactNode;
}) {
  const { blip } = useSound();

  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };
  const leave = (e: PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty("--cx", "-300px");
    e.currentTarget.style.setProperty("--cy", "-300px");
  };

  return (
    <Link
      href={href}
      className={className}
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerEnter={() => blip(pitch)}
    >
      {children}
    </Link>
  );
}
