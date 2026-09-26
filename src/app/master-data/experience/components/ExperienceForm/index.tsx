"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TagInput } from "@/components/TagInput";
import { Textarea } from "@/components/Textarea";
import {
  experienceSchema,
  type ExperienceInput,
} from "@/lib/validations/experience";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/constants";
import type { EmploymentType, Experience } from "@/types/models";

const TYPE_OPTIONS = (
  Object.keys(EMPLOYMENT_TYPE_LABELS) as EmploymentType[]
).map((type) => ({ value: type, label: EMPLOYMENT_TYPE_LABELS[type] }));

function toFormValues(experience: Experience | null): ExperienceInput {
  return {
    company: experience?.company ?? "",
    company_url: experience?.company_url ?? "",
    position: experience?.position ?? "",
    employment_type: experience?.employment_type ?? "full_time",
    location: experience?.location ?? "",
    description: experience?.description ?? "",
    highlights: experience?.highlights ?? [],
    tech_stack: experience?.tech_stack ?? [],
    start_date: experience?.start_date ?? "",
    end_date: experience?.end_date ?? "",
    is_current: experience?.is_current ?? false,
    is_visible: experience?.is_visible ?? true,
    sort_order: experience?.sort_order ?? 0,
  };
}

export function ExperienceForm({
  experience,
  isPending,
  onCancel,
  onSubmit,
}: {
  experience: Experience | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: ExperienceInput) => Promise<boolean>;
}) {
  const form = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema) as never,
    defaultValues: toFormValues(experience),
  });
  const { errors } = form.formState;

  useEffect(() => {
    form.reset(toFormValues(experience));
  }, [form, experience]);

  const isCurrent = form.watch("is_current");
  const highlights = form.watch("highlights") ?? [];
  const techStack = form.watch("tech_stack") ?? [];

  // The database rejects an end date on a current role; clear it here so the
  // user sees the field empty rather than a constraint error on submit.
  useEffect(() => {
    if (isCurrent) form.setValue("end_date", "");
  }, [form, isCurrent]);

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Position" htmlFor="position" error={errors.position?.message} required>
          <Input id="position" invalid={Boolean(errors.position)} {...form.register("position")} />
        </Field>
        <Field label="Company" htmlFor="company" error={errors.company?.message} required>
          <Input id="company" invalid={Boolean(errors.company)} {...form.register("company")} />
        </Field>
        <Field label="Company URL" htmlFor="company_url" error={errors.company_url?.message}>
          <Input id="company_url" type="url" placeholder="https://…" {...form.register("company_url")} />
        </Field>
        <Field label="Employment type" htmlFor="employment_type" error={errors.employment_type?.message}>
          <Select id="employment_type" options={TYPE_OPTIONS} {...form.register("employment_type")} />
        </Field>
        <Field label="Location" htmlFor="location" error={errors.location?.message}>
          <Input id="location" placeholder="Jakarta · Remote" {...form.register("location")} />
        </Field>
        <Field label="Sort order" htmlFor="sort_order" error={errors.sort_order?.message}>
          <Input id="sort_order" type="number" {...form.register("sort_order")} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Start date" htmlFor="start_date" error={errors.start_date?.message} required>
          <Input id="start_date" type="date" invalid={Boolean(errors.start_date)} {...form.register("start_date")} />
        </Field>
        <Field
          label="End date"
          htmlFor="end_date"
          error={errors.end_date?.message}
          description={isCurrent ? "Disabled while this is your current role." : undefined}
        >
          <Input id="end_date" type="date" disabled={isCurrent} {...form.register("end_date")} />
        </Field>
      </div>

      <Field label="Description" htmlFor="description" error={errors.description?.message}>
        <Textarea id="description" rows={3} {...form.register("description")} />
      </Field>

      <Field
        label="Highlights"
        htmlFor="highlights"
        description="One achievement per entry. Press Enter to add."
      >
        <TagInput
          id="highlights"
          value={highlights}
          onChange={(next) => form.setValue("highlights", next)}
          placeholder="Cut page load time by 40%…"
        />
      </Field>

      <Field label="Tech stack" htmlFor="tech_stack">
        <TagInput
          id="tech_stack"
          value={techStack}
          onChange={(next) => form.setValue("tech_stack", next)}
          placeholder="React, TypeScript…"
        />
      </Field>

      <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
        <Checkbox label="Current role" {...form.register("is_current")} />
        <Checkbox
          label="Visible"
          description="Shown in the Experience timeline"
          {...form.register("is_visible")}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button variant="ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {experience ? "Save changes" : "Create experience"}
        </Button>
      </div>
    </form>
  );
}
