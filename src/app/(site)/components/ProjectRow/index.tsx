import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import type { Project } from "@/types/models";

/**
 * Project card: cover always visible, role/company/year up front, tech chips
 * and quick links to the live site and source.
 */
export function ProjectRow({ project }: { project: Project }) {
  const meta = [project.role, project.company, project.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-soft transition-all hover:-translate-y-1 hover:border-fg-subtle">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-bg-subtle">
        {project.cover_url && (
          <Image
            src={project.cover_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {meta && <p className="text-xs font-medium text-fg-subtle">{meta}</p>}

        <h3 className="mt-2 text-xl font-semibold text-fg">
          {/* Stretched link makes the whole card clickable. */}
          <NextLink
            href={`/projects/${project.slug}`}
            className="transition-colors group-hover:text-accent after:absolute after:inset-0"
          >
            {project.title}
          </NextLink>
        </h3>

        {project.summary && (
          <p className="mt-2 text-sm text-fg-muted text-pretty">{project.summary}</p>
        )}

        {project.tech_stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <Badge key={tech} tone="muted">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(project.live_url || project.github_url) && (
          <div className="relative z-10 mt-auto flex gap-4 pt-5 text-sm font-medium">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-fg hover:text-accent"
              >
                Live <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-fg-muted hover:text-accent"
              >
                <Code2 className="size-3.5" aria-hidden /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
