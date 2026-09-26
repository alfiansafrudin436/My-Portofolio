import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/models";

/**
 * A full-bleed editorial row rather than a card: index, title, year, tech.
 * The cover appears inline on small screens and as a hover reveal from md up.
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <NextLink
      href={`/projects/${project.slug}`}
      className="group block border-t border-border py-8 transition-colors hover:border-border-strong"
    >
      <div className="grid gap-4 md:grid-cols-12 md:items-baseline">
        <span className="label text-fg-subtle md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-2xl font-medium text-fg transition-colors group-hover:text-accent md:col-span-5">
          {project.title}
        </h3>

        <span className="label text-fg-muted md:col-span-1">
          {project.year ?? ""}
        </span>

        <div className="flex flex-wrap gap-x-3 gap-y-1 md:col-span-4">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span key={tech} className="label text-fg-subtle">
              {tech}
            </span>
          ))}
        </div>

        <ArrowRight
          className="size-4 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:justify-self-end"
          aria-hidden
        />
      </div>

      {project.summary && (
        <p className="mt-3 max-w-[60ch] text-sm text-fg-muted md:ml-[8.333%] md:pl-4">
          {project.summary}
        </p>
      )}

      {project.cover_url && (
        <div className="relative mt-6 aspect-16/9 w-full overflow-hidden border border-border md:mt-0 md:ml-[8.333%] md:h-0 md:opacity-0 md:transition-all md:duration-500 md:group-hover:mt-6 md:group-hover:h-auto md:group-hover:aspect-21/9 md:group-hover:opacity-100">
          <Image
            src={project.cover_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      )}
    </NextLink>
  );
}
