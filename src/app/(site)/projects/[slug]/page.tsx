import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { ProjectMeta } from "@/app/(site)/projects/[slug]/components/ProjectMeta";
import { ProjectGallery } from "@/app/(site)/projects/[slug]/components/ProjectGallery";
import { getProjectBySlug } from "@/lib/queries/projects";
import { getProjectSlugsForBuild } from "@/lib/queries/static";

// params is a Promise in Next.js 16 and must be awaited.
type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugsForBuild();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary ?? undefined,
    openGraph: {
      title: project.title,
      description: project.summary ?? undefined,
      images: project.cover_url ? [{ url: project.cover_url }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="pb-24">
      {project.cover_url && (
        <div className="relative aspect-21/9 w-full border-b border-border">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <Container className="pt-12">
        <NextLink
          href="/projects"
          className="label group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-accent"
        >
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-1"
            aria-hidden
          />
          All projects
        </NextLink>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <ProjectMeta project={project} />
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <h1 className="text-4xl font-medium text-balance">{project.title}</h1>

            {project.summary && (
              <p className="mt-6 max-w-[56ch] text-xl text-fg-muted text-pretty">
                {project.summary}
              </p>
            )}

            {project.description && (
              <div className="mt-10">
                <Prose text={project.description} />
              </div>
            )}

            <ProjectGallery
              images={project.gallery_urls}
              title={project.title}
            />
          </div>
        </div>
      </Container>
    </article>
  );
}
