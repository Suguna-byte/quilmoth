"use client";

import { useRef, useState } from "react";
import { useSound } from "./SoundProvider";

/** Shows the address as selectable text with a copy button. mailto: links often do nothing on desktop. */
export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("copy");
  const codeRef = useRef<HTMLElement>(null);
  const { blip } = useSound();

  const selectText = () => {
    const el = codeRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel("selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("copied ✓");
      blip(1600);
      setTimeout(() => setLabel("copy"), 1600);
    } catch {
      selectText();
    }
  };

  return (
    <div className="copy-row">
      <code ref={codeRef}>{email}</code>
      <button type="button" onClick={copy}>
        {label}
      </button>
    </div>
  );
}
