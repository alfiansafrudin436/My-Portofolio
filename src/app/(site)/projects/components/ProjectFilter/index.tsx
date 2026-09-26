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
        <div className="mb-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4">
          <span className="label text-fg-subtle">Filter</span>
          {techs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => toggle(tech)}
              aria-pressed={active.includes(tech)}
              className={cn(
                "label border-b-2 py-1 transition-colors",
                active.includes(tech)
                  ? "border-accent text-fg"
                  : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {tech}
            </button>
          ))}
          {hasFilter && (
            <button
              type="button"
              onClick={reset}
              className="label ml-auto text-accent underline underline-offset-4"
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
        <div className="border-b border-border">
          {filtered.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
