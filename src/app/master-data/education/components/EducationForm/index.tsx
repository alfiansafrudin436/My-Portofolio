"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { educationSchema, type EducationInput } from "@/lib/validations/education";
import type { Education } from "@/types/models";

function toFormValues(education: Education | null): EducationInput {
  return {
    institution: education?.institution ?? "",
    institution_url: education?.institution_url ?? "",
    degree: education?.degree ?? "",
    field_of_study: education?.field_of_study ?? "",
    location: education?.location ?? "",
    grade: education?.grade ?? "",
    description: education?.description ?? "",
    start_date: education?.start_date ?? "",
    end_date: education?.end_date ?? "",
    is_current: education?.is_current ?? false,
    is_visible: education?.is_visible ?? true,
    sort_order: education?.sort_order ?? 0,
  };
}

export function EducationForm({
  education,
  isPending,
  onCancel,
  onSubmit,
}: {
  education: Education | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: EducationInput) => Promise<boolean>;
}) {
  const form = useForm<EducationInput>({
    resolver: zodResolver(educationSchema) as never,
    defaultValues: toFormValues(education),
  });
  const { errors } = form.formState;

  useEffect(() => {
    form.reset(toFormValues(education));
  }, [form, education]);

  const isCurrent = form.watch("is_current");

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
        <Field label="Institution" htmlFor="institution" error={errors.institution?.message} required>
          <Input id="institution" invalid={Boolean(errors.institution)} {...form.register("institution")} />
        </Field>
        <Field label="Institution URL" htmlFor="institution_url" error={errors.institution_url?.message}>
          <Input id="institution_url" type="url" placeholder="https://…" {...form.register("institution_url")} />
        </Field>
        <Field label="Degree" htmlFor="degree" error={errors.degree?.message} required>
          <Input id="degree" placeholder="S1 / Bachelor" invalid={Boolean(errors.degree)} {...form.register("degree")} />
        </Field>
        <Field label="Field of study" htmlFor="field_of_study" error={errors.field_of_study?.message}>
          <Input id="field_of_study" placeholder="Informatics" {...form.register("field_of_study")} />
        </Field>
        <Field label="Location" htmlFor="location" error={errors.location?.message}>
          <Input id="location" {...form.register("location")} />
        </Field>
        <Field label="Grade" htmlFor="grade" error={errors.grade?.message} description="GPA or predicate.">
          <Input id="grade" placeholder="3.70 / Cum Laude" {...form.register("grade")} />
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
          description={isCurrent ? "Disabled while this study is ongoing." : undefined}
        >
          <Input id="end_date" type="date" disabled={isCurrent} {...form.register("end_date")} />
        </Field>
      </div>

      <Field label="Description" htmlFor="description" error={errors.description?.message}>
        <Textarea id="description" rows={3} {...form.register("description")} />
      </Field>

      <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:items-start">
        <Checkbox label="Currently studying" {...form.register("is_current")} />
        <Checkbox label="Visible" description="Shown under Education" {...form.register("is_visible")} />
        <Field label="Sort order" htmlFor="sort_order" error={errors.sort_order?.message}>
          <Input id="sort_order" type="number" {...form.register("sort_order")} />
        </Field>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button variant="ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {education ? "Save changes" : "Create entry"}
        </Button>
      </div>
    </form>
  );
}
