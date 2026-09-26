"use client";

import { useCallback, useMemo, useState } from "react";
import type { Project } from "@/types/models";

export function useProjectFilter(projects: Project[]) {
  const [active, setActive] = useState<string[]>([]);

  /** Derived from the rows already on the page — no extra query. */
  const techs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.tech_stack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tech]) => tech);
  }, [projects]);

  /** A project must match every selected tech, not just one. */
  const filtered = useMemo(() => {
    if (active.length === 0) return projects;
    return projects.filter((project) =>
      active.every((tech) => project.tech_stack.includes(tech)),
    );
  }, [active, projects]);

  const toggle = useCallback((tech: string) => {
    setActive((current) =>
      current.includes(tech)
        ? current.filter((item) => item !== tech)
        : [...current, tech],
    );
  }, []);

  const reset = useCallback(() => setActive([]), []);

  return {
    // data
    techs,
    active,
    filtered,
    hasFilter: active.length > 0,
    // methods
    toggle,
    reset,
  };
}
