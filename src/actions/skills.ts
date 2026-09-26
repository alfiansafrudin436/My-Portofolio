"use server";

import { skillSchema, type SkillInput } from "@/lib/validations/skill";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import { requireAdmin, revalidatePublic, toMessage } from "@/actions/shared";
import type { Skill } from "@/types/models";

const ADMIN_PATH = "/master-data/skills";

function describe(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "That skill already exists" : error.message;
}

export async function createSkill(input: SkillInput): Promise<ActionResult<Skill>> {
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("skills")
      .insert(parsed.data)
      .select()
      .single();

    if (error) return fail(describe(error));

    revalidatePublic([ADMIN_PATH]);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function updateSkill(
  id: string,
  input: SkillInput,
): Promise<ActionResult<Skill>> {
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("skills")
      .update(parsed.data)
      .eq("id", id)
      .select()
      .single();

    if (error) return fail(describe(error));

    revalidatePublic([ADMIN_PATH]);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function toggleSkillVisibility(
  id: string,
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("skills")
      .update({ is_visible: value })
      .eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}
