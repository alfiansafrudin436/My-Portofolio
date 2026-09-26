import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectRow } from "@/app/(site)/components/ProjectRow";
import type { Project } from "@/types/models";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <Section id="work">
      <SectionHeading
        index="01"
        title="Selected Work"
        action={
          <NextLink
            href="/projects"
            className="label group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-accent"
          >
            View all projects
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </NextLink>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Published projects will appear here."
        />
      ) : (
        <div className="border-b border-border">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </Section>
  );
}
