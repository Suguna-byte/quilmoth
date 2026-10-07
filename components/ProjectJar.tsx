"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/lib/data";

const FILTERS: ("all" | ProjectStatus)[] = ["all", "released", "testing", "in development"];

/** The open-source list, filterable by status. Filtering is client-side: five items need no server round-trip. */
export function ProjectJar({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projects.forEach((p) => (c[p.status] = (c[p.status] ?? 0) + 1));
    return c;
  }, [projects]);

  const shown = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button key={f} type="button" className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
            <span className="count">{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>
      <ol className="jar" aria-live="polite">
        {shown.map((p) => {
          const n = projects.indexOf(p) + 1; // specimen numbers stay fixed when filtering
          return (
            <li key={p.name} className="jar-item">
              <div>
                <p className="eyebrow">
                  specimen {String(n).padStart(2, "0")} · {p.year}
                </p>
                <p className="status" data-s={p.status}>
                  {p.status}
                </p>
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <ul className="chips" aria-label="Built with">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="jar-links">
                {p.source && (
                  <a href={p.source} target="_blank" rel="noopener noreferrer">
                    source ↗
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    demo ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
