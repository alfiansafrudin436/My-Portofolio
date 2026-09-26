"use client";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { slugify } from "@/lib/utils/slug";
import type { Project } from "@/types/models";

function toFormValues(project: Project | null): ProjectInput {
  if (!project) {
    return {
      title: "",
      slug: "",
      summary: "",
      description: "",
      cover_url: "",
      gallery_urls: [],
      tech_stack: [],
      role: "",
      company: "",
      year: "",
      github_url: "",
      live_url: "",
      is_featured: false,
      is_published: false,
      sort_order: 0,
    };
  }

  return {
    title: project.title,
    slug: project.slug,
    summary: project.summary ?? "",
    description: project.description ?? "",
    cover_url: project.cover_url ?? "",
    gallery_urls: project.gallery_urls,
    tech_stack: project.tech_stack,
    role: project.role ?? "",
    company: project.company ?? "",
    year: project.year ?? "",
    github_url: project.github_url ?? "",
    live_url: project.live_url ?? "",
    is_featured: project.is_featured,
    is_published: project.is_published,
    sort_order: project.sort_order,
  };
}

export function useProjectForm({
  project,
  onSubmit,
}: {
  project: Project | null;
  onSubmit: (values: ProjectInput) => Promise<boolean>;
}) {
  const form = useForm<ProjectInput>({
    // The resolver validates the input shape; the action re-validates on the
    // server, so a direct POST cannot bypass this.
    resolver: zodResolver(projectSchema) as never,
    defaultValues: toFormValues(project),
  });

  // Once the slug is edited by hand, stop deriving it from the title.
  const slugLocked = useRef(project !== null);

  useEffect(() => {
    form.reset(toFormValues(project));
    slugLocked.current = project !== null;
  }, [form, project]);

  const title = form.watch("title");

  useEffect(() => {
    if (slugLocked.current) return;
    form.setValue("slug", slugify(title ?? ""), { shouldValidate: false });
  }, [form, title]);

  const lockSlug = useCallback(() => {
    slugLocked.current = true;
  }, []);

  const regenerateSlug = useCallback(() => {
    slugLocked.current = false;
    form.setValue("slug", slugify(form.getValues("title") ?? ""), {
      shouldValidate: true,
    });
  }, [form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return {
    // data
    form,
    errors: form.formState.errors,
    isEditing: project !== null,
    coverUrl: form.watch("cover_url") ?? "",
    gallery: form.watch("gallery_urls") ?? [],
    techStack: form.watch("tech_stack") ?? [],
    isSlugLocked: slugLocked.current,
    // methods
    handleSubmit,
    lockSlug,
    regenerateSlug,
    setCoverUrl: (url: string | null) => form.setValue("cover_url", url ?? ""),
    setGallery: (urls: string[]) => form.setValue("gallery_urls", urls),
    setTechStack: (tags: string[]) => form.setValue("tech_stack", tags),
  };
}
