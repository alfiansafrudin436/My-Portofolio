import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectRow } from "@/app/(site)/components/ProjectRow";
import type { Project } from "@/types/models";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Proof of work"
        title="Selected projects"
        description="A few things I've built, with the role I played and the stack behind them."
        action={
          <NextLink
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
          >
            View all projects
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
