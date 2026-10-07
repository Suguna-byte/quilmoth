"use client";

import { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";

type Errors = Partial<Record<"name" | "contact" | "message" | "form", string>>;

/** The "field card": a brief form that posts to /api/contact and shows the ticket number it gets back. */
export function ContactForm() {
  const [ticket, setTicket] = useState("—");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const { blip } = useSound();

  // Generated after mount so server and client HTML match (no hydration mismatch).
  useEffect(() => setTicket(`QM-${Math.floor(100 + Math.random() * 900)}`), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    // Check on the client for instant feedback; the API route checks again, because clients can lie.
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Add your name so we know who to reply to.";
    if (!data.contact?.trim()) next.contact = "Add an email or handle we can reach you on.";
    if ((data.message?.trim().length ?? 0) < 20) next.message = "Tell us a little more: at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ticket }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? { form: "That didn't go through. Try again, or email us directly." });
        setState("idle");
        return;
      }
      setTicket(json.ticket);
      setState("sent");
      blip(1500);
    } catch {
      setErrors({ form: "No connection. Check your internet and send it again." });
      setState("idle");
    }
  }

  return (
    <div className="field-card">
      <div className="field-card-head">
        <span className="eyebrow">field card · new brief</span>
        <span className="eyebrow mono">nº {ticket}</span>
      </div>

      {state === "sent" ? (
        <div className="sent" role="status">
          <h2>Pinned. Thank you.</h2>
          <p>
            Your brief is ticket <b className="mono">{ticket}</b>. A founder reads every one and will reply within a
            working day.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="cf-name">your name</label>
            <input id="cf-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="cf-name-err" />
            {errors.name && <span id="cf-name-err" className="field-error">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="cf-contact">email or handle</label>
            <input id="cf-contact" name="contact" autoComplete="email" aria-invalid={!!errors.contact} aria-describedby="cf-contact-err" />
            {errors.contact && <span id="cf-contact-err" className="field-error">{errors.contact}</span>}
          </div>
          <div className="field">
            <label htmlFor="cf-message">what do you need built?</label>
            <textarea id="cf-message" name="message" aria-invalid={!!errors.message} aria-describedby="cf-message-err" />
            {errors.message && <span id="cf-message-err" className="field-error">{errors.message}</span>}
          </div>
          {/* Honeypot: invisible to people, tempting to bots. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="cf-website">website</label>
            <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form-foot">
            <span className="eyebrow">read by a founder, not a sales team</span>
            <button className="btn" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "sending…" : "send it →"}
            </button>
          </div>
          {errors.form && <p className="field-error" role="alert">{errors.form}</p>}
        </form>
      )}
    </div>
  );
}
