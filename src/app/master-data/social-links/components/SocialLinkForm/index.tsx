"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { SOCIAL_ICON_NAMES, SocialIcon } from "@/components/SocialIcon";
import {
  socialLinkSchema,
  type SocialLinkInput,
} from "@/lib/validations/social-link";
import type { SocialLink } from "@/types/models";

const ICON_OPTIONS = SOCIAL_ICON_NAMES.map((name) => ({
  value: name,
  label: name.charAt(0).toUpperCase() + name.slice(1),
}));

function toFormValues(link: SocialLink | null): SocialLinkInput {
  return {
    label: link?.label ?? "",
    url: link?.url ?? "",
    icon: link?.icon ?? "link",
    is_visible: link?.is_visible ?? true,
    sort_order: link?.sort_order ?? 0,
  };
}

export function SocialLinkForm({
  link,
  isPending,
  onCancel,
  onSubmit,
}: {
  link: SocialLink | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: SocialLinkInput) => Promise<boolean>;
}) {
  const form = useForm<SocialLinkInput>({
    resolver: zodResolver(socialLinkSchema) as never,
    defaultValues: toFormValues(link),
  });
  const { errors } = form.formState;

  useEffect(() => {
    form.reset(toFormValues(link));
  }, [form, link]);

  const icon = form.watch("icon") ?? "link";

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
      noValidate
    >
      <Field label="Label" htmlFor="label" error={errors.label?.message} required>
        <Input id="label" invalid={Boolean(errors.label)} {...form.register("label")} />
      </Field>

      <Field
        label="URL"
        htmlFor="url"
        error={errors.url?.message}
        description="Accepts https://, mailto: and tel:"
        required
      >
        <Input
          id="url"
          placeholder="https://github.com/…"
          invalid={Boolean(errors.url)}
          {...form.register("url")}
        />
      </Field>

      <Field label="Icon" htmlFor="icon" error={errors.icon?.message}>
        <div className="flex items-center gap-3">
          <Select id="icon" options={ICON_OPTIONS} className="flex-1" {...form.register("icon")} />
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-fg">
            <SocialIcon name={icon} className="size-4" />
          </span>
        </div>
      </Field>

      <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2 sm:items-start">
        <Checkbox
          label="Visible"
          description="Shown in the footer and Contact"
          {...form.register("is_visible")}
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
          {link ? "Save changes" : "Create link"}
        </Button>
      </div>
    </form>
  );
}
