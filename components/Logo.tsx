/** Two pairs of wings split by a yellow quill: a moth that is also a pen. */
export function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 6 C10 4 3 7 3 13 C3 18 9 19 15 15 Z" fill="var(--ink)" />
      <path d="M16 6 C22 4 29 7 29 13 C29 18 23 19 17 15 Z" fill="var(--ink)" />
      <path d="M15 16 C10 19 7 24 10 26 C12 27 14 23 15.4 19 Z" fill="var(--ink)" />
      <path d="M17 16 C22 19 25 24 22 26 C20 27 18 23 16.6 19 Z" fill="var(--ink)" />
      <path d="M16 5 L16 29" stroke="var(--lamp)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9" cy="11" r="2" fill="var(--lamp)" />
      <circle cx="23" cy="11" r="2" fill="var(--lamp)" />
    </svg>
  );
}
