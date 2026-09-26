"use server";

import {
  experienceSchema,
  type ExperienceInput,
} from "@/lib/validations/experience";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import { requireAdmin, revalidatePublic, toMessage } from "@/actions/shared";
import type { Experience } from "@/types/models";

const ADMIN_PATH = "/master-data/experience";

export async function createExperience(
  input: ExperienceInput,
): Promise<ActionResult<Experience>> {
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("experiences")
      .insert(parsed.data)
      .select()
      .single();

    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function updateExperience(
  id: string,
  input: ExperienceInput,
): Promise<ActionResult<Experience>> {
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("experiences")
      .update(parsed.data)
      .eq("id", id)
      .select()
      .single();

    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function toggleExperienceVisibility(
  id: string,
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("experiences")
      .update({ is_visible: value })
      .eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}
