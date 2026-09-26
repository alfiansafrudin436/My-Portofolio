"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveProfile } from "@/actions/profile";
import { useToast } from "@/components/Toast/hooks";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";
import type { Profile } from "@/types/models";

function toFormValues(profile: Profile | null): ProfileInput {
  return {
    full_name: profile?.full_name ?? "",
    headline: profile?.headline ?? "",
    tagline: profile?.tagline ?? "",
    bio: profile?.bio ?? "",
    avatar_url: profile?.avatar_url ?? "",
    resume_url: profile?.resume_url ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    location: profile?.location ?? "",
    available: profile?.available ?? true,
    available_note: profile?.available_note ?? "",
    seo_title: profile?.seo_title ?? "",
    seo_description: profile?.seo_description ?? "",
  };
}

/**
 * The profile is a singleton, so this is a single long-lived form rather than
 * a table with a modal.
 */
export function useProfileForm(profile: Profile | null) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema) as never,
    defaultValues: toFormValues(profile),
  });

  useEffect(() => {
    form.reset(toFormValues(profile));
  }, [form, profile]);

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveProfile(values);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Profile saved");
      router.refresh();
    });
  });

  return {
    // data
    form,
    errors: form.formState.errors,
    isPending,
    isDirty: form.formState.isDirty,
    avatarUrl: form.watch("avatar_url") ?? "",
    // methods
    handleSubmit,
    reset: () => form.reset(toFormValues(profile)),
    setAvatarUrl: (url: string | null) => form.setValue("avatar_url", url ?? ""),
  };
}
