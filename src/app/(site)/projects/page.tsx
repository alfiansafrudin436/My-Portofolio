import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { ProjectFilter } from "@/app/(site)/projects/components/ProjectFilter";
import { getPublishedProjects } from "@/lib/queries/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every published project, filterable by technology.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <Container className="py-20 md:py-28">
      <h1 className="text-4xl font-medium">Projects</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-fg-muted text-pretty">
        Everything published, newest first.
      </p>

      <div className="mt-16">
        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Published projects will appear here."
          />
        ) : (
          <ProjectFilter projects={projects} />
        )}
      </div>
    </Container>
  );
}
