"use server";

import {
  educationSchema,
  type EducationInput,
} from "@/lib/validations/education";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import { requireAdmin, revalidatePublic, toMessage } from "@/actions/shared";
import type { Education } from "@/types/models";

const ADMIN_PATH = "/master-data/education";

export async function createEducation(
  input: EducationInput,
): Promise<ActionResult<Education>> {
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("education")
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

export async function updateEducation(
  id: string,
  input: EducationInput,
): Promise<ActionResult<Education>> {
  const parsed = educationSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("education")
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

export async function deleteEducation(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function toggleEducationVisibility(
  id: string,
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("education")
      .update({ is_visible: value })
      .eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}
