"use server";

import { isOwnStorageUrl } from "@/lib/supabase/storage";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import {
  removeOrphanedImages,
  requireAdmin,
  revalidatePublic,
  toMessage,
} from "@/actions/shared";
import type { Profile } from "@/types/models";

const ADMIN_PATH = "/master-data/profile";

/**
 * The profile is a singleton guarded by a unique constraint, so this upserts:
 * it updates the existing row, or inserts the first one on a fresh database.
 */
export async function saveProfile(
  input: ProfileInput,
): Promise<ActionResult<Profile>> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  if (!isOwnStorageUrl(parsed.data.avatar_url)) {
    return fail("The avatar must be uploaded here, not linked from elsewhere");
  }

  try {
    const supabase = await requireAdmin();

    const { data: existing } = await supabase
      .from("profile")
      .select("id, avatar_url")
      .maybeSingle();

    const { data, error } = existing
      ? await supabase
          .from("profile")
          .update(parsed.data)
          .eq("id", existing.id)
          .select()
          .single()
      : await supabase.from("profile").insert(parsed.data).select().single();

    if (error) return fail(error.message);

    if (existing?.avatar_url && existing.avatar_url !== data.avatar_url) {
      await removeOrphanedImages([existing.avatar_url]);
    }

    revalidatePublic([ADMIN_PATH]);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}
