"use server";

import {
  socialLinkSchema,
  type SocialLinkInput,
} from "@/lib/validations/social-link";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import { requireAdmin, revalidatePublic, toMessage } from "@/actions/shared";
import type { SocialLink } from "@/types/models";

const ADMIN_PATH = "/master-data/social-links";

export async function createSocialLink(
  input: SocialLinkInput,
): Promise<ActionResult<SocialLink>> {
  const parsed = socialLinkSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("social_links")
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

export async function updateSocialLink(
  id: string,
  input: SocialLinkInput,
): Promise<ActionResult<SocialLink>> {
  const parsed = socialLinkSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("social_links")
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

export async function deleteSocialLink(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function toggleSocialLinkVisibility(
  id: string,
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("social_links")
      .update({ is_visible: value })
      .eq("id", id);
    if (error) return fail(error.message);

    revalidatePublic([ADMIN_PATH]);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}
