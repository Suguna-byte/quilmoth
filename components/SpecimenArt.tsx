/**
 * Generated cover art for a commission, so the grid has visuals without stock screenshots.
 * A wing silhouette in the client's hue over a fine grid, like a pinned specimen on graph paper.
 * Deterministic: the same client always gets the same art.
 */
export function SpecimenArt({ hue, seed }: { hue: number; seed: number }) {
  const tilt = (seed % 5) * 6 - 12;
  const wing = `hsl(${hue} 45% 55%)`;
  const wingDark = `hsl(${hue} 40% 35%)`;
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`g${seed}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#g${seed})`} />
      <g transform={`translate(160 104) rotate(${tilt})`}>
        <path d="M0 -6 C-40 -60 -120 -50 -110 -6 C-104 22 -40 22 0 4 Z" fill={wing} opacity="0.85" />
        <path d="M0 -6 C40 -60 120 -50 110 -6 C104 22 40 22 0 4 Z" fill={wing} opacity="0.85" />
        <path d="M0 6 C-30 20 -70 50 -50 66 C-34 76 -12 50 0 20 Z" fill={wingDark} opacity="0.85" />
        <path d="M0 6 C30 20 70 50 50 66 C34 76 12 50 0 20 Z" fill={wingDark} opacity="0.85" />
        <circle cx="-62" cy="-14" r="11" fill="none" stroke="var(--lamp)" strokeWidth="4" />
        <circle cx="62" cy="-14" r="11" fill="none" stroke="var(--lamp)" strokeWidth="4" />
        <rect x="-3" y="-30" width="6" height="80" rx="3" fill="var(--ink)" />
      </g>
      <line x1="160" y1="0" x2="160" y2="40" stroke="var(--ink-soft)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}
