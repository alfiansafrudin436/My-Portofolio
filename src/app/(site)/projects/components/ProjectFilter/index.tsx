"use client";

import { EmptyState } from "@/components/EmptyState";
import { ProjectRow } from "@/app/(site)/components/ProjectRow";
import { useProjectFilter } from "@/app/(site)/projects/components/ProjectFilter/hooks";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/types/models";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const { techs, active, filtered, hasFilter, toggle, reset } =
    useProjectFilter(projects);

  return (
    <>
      {techs.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-fg-subtle">Filter</span>
          {techs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => toggle(tech)}
              aria-pressed={active.includes(tech)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                active.includes(tech)
                  ? "border-accent bg-accent-subtle text-accent"
                  : "border-border text-fg-muted hover:border-fg-subtle hover:text-fg",
              )}
            >
              {tech}
            </button>
          ))}
          {hasFilter && (
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-sm text-accent underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching projects"
          description="Try removing one of the filters."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
