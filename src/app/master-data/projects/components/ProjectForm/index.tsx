"use client";

import Image from "next/image";
import { RotateCcw, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/Input";
import { TagInput } from "@/components/TagInput";
import { Textarea } from "@/components/Textarea";
import { useProjectForm } from "@/app/master-data/projects/components/ProjectForm/hooks";
import type { ProjectInput } from "@/lib/validations/project";
import type { Project } from "@/types/models";

export function ProjectForm({
  project,
  isPending,
  onCancel,
  onSubmit,
}: {
  project: Project | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: ProjectInput) => Promise<boolean>;
}) {
  const {
    form,
    errors,
    isEditing,
    coverUrl,
    gallery,
    techStack,
    handleSubmit,
    lockSlug,
    regenerateSlug,
    setCoverUrl,
    setGallery,
    setTechStack,
  } = useProjectForm({ project, onSubmit });

  const folder = `projects/${form.watch("slug") || "untitled"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" error={errors.title?.message} required>
          <Input
            id="title"
            invalid={Boolean(errors.title)}
            {...form.register("title")}
          />
        </Field>

        <Field
          label="Slug"
          htmlFor="slug"
          error={errors.slug?.message}
          description="Used in the URL. Derived from the title until you edit it."
          required
        >
          <div className="flex gap-2">
            <Input
              id="slug"
              invalid={Boolean(errors.slug)}
              {...form.register("slug", { onChange: lockSlug })}
            />
            <button
              type="button"
              onClick={regenerateSlug}
              aria-label="Regenerate slug from title"
              title="Regenerate from title"
              className="grid size-10 shrink-0 place-items-center border border-border text-fg-subtle transition-colors hover:border-border-strong hover:text-fg"
            >
              <RotateCcw className="size-3.5" aria-hidden />
            </button>
          </div>
        </Field>
      </div>

      <Field
        label="Summary"
        htmlFor="summary"
        error={errors.summary?.message}
        description="One or two lines, shown on the cards and in link previews."
      >
        <Textarea id="summary" rows={2} {...form.register("summary")} />
      </Field>

      <Field
        label="Description"
        htmlFor="description"
        error={errors.description?.message}
        description="Long form, shown on the detail page. Blank lines separate paragraphs."
      >
        <Textarea id="description" rows={6} {...form.register("description")} />
      </Field>

      <Field label="Cover image" error={errors.cover_url?.message}>
        <FileUpload
          value={coverUrl || null}
          onChange={setCoverUrl}
          folder={folder}
        />
      </Field>

      <Field label="Gallery" description="Extra images shown on the detail page.">
        <div className="space-y-3">
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((url) => (
                <div key={url} className="relative aspect-4/3 border border-border">
                  <Image src={url} alt="" fill sizes="20vw" className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setGallery(gallery.filter((item) => item !== url))}
                    aria-label="Remove gallery image"
                    className="absolute top-1 right-1 grid size-6 place-items-center border border-border bg-bg text-fg-muted transition-colors hover:text-danger"
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          )}
          <FileUpload
            value={null}
            multiple
            onChange={(url) => url && setGallery([...gallery, url])}
            folder={folder}
            label="Add a gallery image"
          />
        </div>
      </Field>

      <Field
        label="Tech stack"
        htmlFor="tech_stack"
        error={errors.tech_stack?.message}
      >
        <TagInput
          id="tech_stack"
          value={techStack}
          onChange={setTechStack}
          placeholder="React, TypeScript, Supabase…"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Role" htmlFor="role" error={errors.role?.message}>
          <Input id="role" {...form.register("role")} />
        </Field>
        <Field label="Client" htmlFor="company" error={errors.company?.message}>
          <Input id="company" {...form.register("company")} />
        </Field>
        <Field label="Year" htmlFor="year" error={errors.year?.message}>
          <Input id="year" type="number" min={1990} max={2100} {...form.register("year")} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Repository URL" htmlFor="github_url" error={errors.github_url?.message}>
          <Input id="github_url" type="url" placeholder="https://github.com/…" {...form.register("github_url")} />
        </Field>
        <Field label="Live URL" htmlFor="live_url" error={errors.live_url?.message}>
          <Input id="live_url" type="url" placeholder="https://…" {...form.register("live_url")} />
        </Field>
      </div>

      <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:items-start">
        <Checkbox
          label="Published"
          description="Visible on the public site"
          {...form.register("is_published")}
        />
        <Checkbox
          label="Featured"
          description="Shown in Selected Work"
          {...form.register("is_featured")}
        />
        <Field label="Sort order" htmlFor="sort_order" error={errors.sort_order?.message}>
          <Input id="sort_order" type="number" {...form.register("sort_order")} />
        </Field>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button variant="ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  );
}
