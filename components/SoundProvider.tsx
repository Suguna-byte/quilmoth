"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Sound = {
  on: boolean;
  toggle: () => void;
  blip: (freq?: number) => void;
  /** Plays MIDI note numbers in sequence. Resolves when finished. */
  hum: (notes: number[]) => Promise<void>;
};

const SoundContext = createContext<Sound | null>(null);
const KEY = "quillmoth:sound";
const midiToHz = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Off by default: a site should never make noise the visitor didn't ask for.
  const [on, setOn] = useState(false);
  const ctx = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "on") setOn(true);
    } catch {}
  }, []);

  // Browsers only allow audio after a user gesture, so the context is created lazily inside one.
  const audio = useCallback(() => {
    if (!ctx.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx.current = new AC();
    }
    if (ctx.current.state === "suspended") void ctx.current.resume();
    return ctx.current;
  }, []);

  const tone = useCallback((ac: AudioContext, freq: number, start: number, dur: number, vol: number) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g).connect(ac.destination);
    o.start(start);
    o.stop(start + dur + 0.02);
  }, []);

  const blip = useCallback(
    (freq = 1400) => {
      if (!on) return;
      const ac = audio();
      if (ac) tone(ac, freq, ac.currentTime, 0.05, 0.03);
    },
    [on, audio, tone],
  );

  const hum = useCallback(
    async (notes: number[]) => {
      // The hum buttons are an explicit request for sound, so they play even when ambient sound is off.
      const ac = audio();
      if (!ac) return;
      const step = 0.18;
      notes.forEach((n, i) => tone(ac, midiToHz(n), ac.currentTime + i * step, step * 1.6, 0.06));
      await new Promise((r) => setTimeout(r, notes.length * step * 1000 + 250));
    },
    [audio, tone],
  );

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEY, next ? "on" : "off");
      } catch {}
      if (next) {
        const ac = audio();
        if (ac) {
          tone(ac, 880, ac.currentTime, 0.07, 0.04);
          tone(ac, 1320, ac.currentTime + 0.08, 0.07, 0.04);
        }
      }
      return next;
    });
  }, [audio, tone]);

  return <SoundContext.Provider value={{ on, toggle, blip, hum }}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const s = useContext(SoundContext);
  if (!s) throw new Error("useSound must be used inside <SoundProvider>");
  return s;
}

export function SoundToggle() {
  const { on, toggle } = useSound();
  return (
    <button type="button" className="btn-text" aria-pressed={on} onClick={toggle}>
      sound — {on ? "on" : "off"}
    </button>
  );
}
