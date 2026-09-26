"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { skillSchema, type SkillInput } from "@/lib/validations/skill";
import {
  PROFICIENCY_LABELS,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/lib/constants";
import type { Proficiency, Skill } from "@/types/models";

const CATEGORY_OPTIONS = SKILL_CATEGORY_ORDER.map((category) => ({
  value: category,
  label: SKILL_CATEGORY_LABELS[category],
}));

const LEVEL_OPTIONS = (
  ["beginner", "intermediate", "advanced", "expert"] as Proficiency[]
).map((level) => ({ value: level, label: PROFICIENCY_LABELS[level] }));

function toFormValues(skill: Skill | null): SkillInput {
  return {
    name: skill?.name ?? "",
    category: skill?.category ?? "other",
    level: skill?.level ?? "",
    icon: skill?.icon ?? "",
    years: skill?.years ?? "",
    is_featured: skill?.is_featured ?? false,
    is_visible: skill?.is_visible ?? true,
    sort_order: skill?.sort_order ?? 0,
  };
}

export function SkillForm({
  skill,
  isPending,
  onCancel,
  onSubmit,
}: {
  skill: Skill | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: SkillInput) => Promise<boolean>;
}) {
  const form = useForm<SkillInput>({
    resolver: zodResolver(skillSchema) as never,
    defaultValues: toFormValues(skill),
  });
  const { errors } = form.formState;

  useEffect(() => {
    form.reset(toFormValues(skill));
  }, [form, skill]);

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" invalid={Boolean(errors.name)} {...form.register("name")} />
        </Field>

        <Field label="Category" htmlFor="category" error={errors.category?.message}>
          <Select id="category" options={CATEGORY_OPTIONS} {...form.register("category")} />
        </Field>

        <Field label="Level" htmlFor="level" error={errors.level?.message}>
          <Select
            id="level"
            options={LEVEL_OPTIONS}
            placeholder="Not specified"
            {...form.register("level")}
          />
        </Field>

        <Field
          label="Years of experience"
          htmlFor="years"
          error={errors.years?.message}
        >
          <Input id="years" type="number" step="0.5" min={0} {...form.register("years")} />
        </Field>
      </div>

      <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:items-start">
        <Checkbox
          label="Visible"
          description="Shown in Capabilities"
          {...form.register("is_visible")}
        />
        <Checkbox
          label="Featured"
          description="Highlighted skill"
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
          {skill ? "Save changes" : "Create skill"}
        </Button>
      </div>
    </form>
  );
}
