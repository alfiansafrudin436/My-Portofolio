"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { useProfileForm } from "@/app/master-data/profile/hooks";
import type { Profile } from "@/types/models";

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border py-8 md:grid-cols-12">
      <div className="md:col-span-4">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        {description && (
          <p className="mt-2 text-xs text-fg-muted">{description}</p>
        )}
      </div>
      <div className="space-y-6 md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const {
    form,
    errors,
    isPending,
    isDirty,
    avatarUrl,
    handleSubmit,
    reset,
    setAvatarUrl,
  } = useProfileForm(profile);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormSection
        title="Identity"
        description="Your name and the role shown in the hero."
      >
        <Field label="Full name" htmlFor="full_name" error={errors.full_name?.message} required>
          <Input id="full_name" invalid={Boolean(errors.full_name)} {...form.register("full_name")} />
        </Field>
        <Field label="Headline" htmlFor="headline" error={errors.headline?.message} required>
          <Input id="headline" placeholder="Frontend Engineer" invalid={Boolean(errors.headline)} {...form.register("headline")} />
        </Field>
        <Field
          label="Tagline"
          htmlFor="tagline"
          error={errors.tagline?.message}
          description="The large hero statement. Its last word takes the accent colour."
        >
          <Input id="tagline" {...form.register("tagline")} />
        </Field>
        <Field label="Avatar" error={errors.avatar_url?.message}>
          <FileUpload value={avatarUrl || null} onChange={setAvatarUrl} folder="profile" />
        </Field>
      </FormSection>

      <FormSection title="Bio" description="Shown in the About section.">
        <Field
          label="Bio"
          htmlFor="bio"
          error={errors.bio?.message}
          description="Blank lines separate paragraphs. The first one also appears in the hero."
        >
          <Textarea id="bio" rows={8} {...form.register("bio")} />
        </Field>
        <Field
          label="CV / resume URL"
          htmlFor="resume_url"
          error={errors.resume_url?.message}
          description="Shows a Download CV button when set."
        >
          <Input id="resume_url" type="url" placeholder="https://…" {...form.register("resume_url")} />
        </Field>
      </FormSection>

      <FormSection title="Contact" description="Used in the Contact section.">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" {...form.register("email")} />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" {...form.register("phone")} />
        </Field>
        <Field label="Location" htmlFor="location" error={errors.location?.message}>
          <Input id="location" placeholder="Jakarta, Indonesia" {...form.register("location")} />
        </Field>
      </FormSection>

      <FormSection title="Availability" description="The status dot in the hero.">
        <Checkbox
          label="Open to opportunities"
          description="Shows a green dot with the note below"
          {...form.register("available")}
        />
        <Field label="Availability note" htmlFor="available_note" error={errors.available_note?.message}>
          <Input id="available_note" placeholder="Available for new opportunities" {...form.register("available_note")} />
        </Field>
      </FormSection>

      <FormSection title="SEO" description="Falls back to sensible defaults when empty.">
        <Field label="Meta title" htmlFor="seo_title" error={errors.seo_title?.message}>
          <Input id="seo_title" {...form.register("seo_title")} />
        </Field>
        <Field label="Meta description" htmlFor="seo_description" error={errors.seo_description?.message}>
          <Textarea id="seo_description" rows={3} {...form.register("seo_description")} />
        </Field>
      </FormSection>

      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-border bg-bg py-5">
        <Button variant="ghost" onClick={reset} disabled={isPending || !isDirty}>
          Discard changes
        </Button>
        <Button type="submit" isLoading={isPending}>
          Save profile
        </Button>
      </div>
    </form>
  );
}
