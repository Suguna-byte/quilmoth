"use client";

import { useState } from "react";
import type { Person } from "@/lib/data";
import { useSound } from "./SoundProvider";

/** Team cards. Each person has a five-note "signature hum" synthesised in the browser: no audio files. */
export function TeamGrid({ people }: { people: Person[] }) {
  const { hum } = useSound();
  const [playing, setPlaying] = useState<string | null>(null);

  const play = async (p: Person) => {
    if (playing) return;
    setPlaying(p.name);
    await hum(p.hum.notes);
    setPlaying(null);
  };

  return (
    <div className="team">
      {people.map((p) => {
        const initials = p.name.slice(0, 2).toLowerCase();
        return (
          <article key={p.name} className="person">
            <div className="person-top">
              <span className="avatar" aria-hidden="true">
                {initials}
              </span>
              <div>
                <h3>{p.name}</h3>
                <p className="eyebrow">
                  {p.role} · {p.city}
                </p>
              </div>
            </div>
            <p>{p.bio}</p>
            <div className="hum">
              <button
                type="button"
                onClick={() => play(p)}
                data-playing={playing === p.name}
                aria-label={`Play ${p.name}'s signature hum, ${p.hum.title}`}
              >
                {playing === p.name ? "♪" : "▶"}
              </button>
              <span>“{p.hum.title}”</span>
            </div>
            {p.links.length > 0 && (
              <div className="socials">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
