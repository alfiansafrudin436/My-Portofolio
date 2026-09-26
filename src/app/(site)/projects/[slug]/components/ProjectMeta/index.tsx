import { ExternalLink } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import type { Project } from "@/types/models";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border py-3">
      <dt className="label text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
    </div>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="md:sticky md:top-24">
      <dl>
        {project.year && <Row label="Year" value={String(project.year)} />}
        {project.role && <Row label="Role" value={project.role} />}
        {project.company && <Row label="Client" value={project.company} />}
        {project.tech_stack.length > 0 && (
          <Row label="Stack" value={project.tech_stack.join(", ")} />
        )}
      </dl>

      {(project.github_url || project.live_url) && (
        <div className="mt-6 flex flex-col gap-2">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer noopener"
              className="label inline-flex items-center justify-between border border-border-strong px-4 py-3 text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              Live demo
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer noopener"
              className="label inline-flex items-center justify-between border border-border px-4 py-3 text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              Source
              <SocialIcon name="github" className="size-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
