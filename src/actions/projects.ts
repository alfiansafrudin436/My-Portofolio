"use server";

import { createClient } from "@/lib/supabase/server";
import { isOwnStorageUrl } from "@/lib/supabase/storage";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { fail, ok, type ActionResult } from "@/lib/utils/result";
import {
  removeOrphanedImages,
  requireAdmin,
  revalidatePublic,
  toMessage,
} from "@/actions/shared";
import type { Project } from "@/types/models";

const ADMIN_PATH = "/master-data/projects";

function revalidateProject(slug?: string, previousSlug?: string) {
  const paths = [ADMIN_PATH, "/projects"];
  if (slug) paths.push(`/projects/${slug}`);
  if (previousSlug && previousSlug !== slug) {
    paths.push(`/projects/${previousSlug}`);
  }
  revalidatePublic(paths);
}

/** 23505 = unique_violation, which here can only be the slug. */
function describe(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "That slug is already in use" : error.message;
}

/** Reject URLs pointing outside our own bucket, however they got into the form. */
function checkImageOrigins(values: {
  cover_url: string | null;
  gallery_urls: string[];
}): string | null {
  const all = [values.cover_url, ...values.gallery_urls];
  return all.every(isOwnStorageUrl)
    ? null
    : "Images must be uploaded here, not linked from elsewhere";
}

export async function createProject(
  input: ProjectInput,
): Promise<ActionResult<Project>> {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  const originError = checkImageOrigins(parsed.data);
  if (originError) return fail(originError);

  try {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
      .from("projects")
      .insert(parsed.data)
      .select()
      .single();

    if (error) return fail(describe(error));

    revalidateProject(data.slug);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function updateProject(
  id: string,
  input: ProjectInput,
): Promise<ActionResult<Project>> {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  const originError = checkImageOrigins(parsed.data);
  if (originError) return fail(originError);

  try {
    const supabase = await requireAdmin();

    const { data: previous } = await supabase
      .from("projects")
      .select("slug, cover_url, gallery_urls")
      .eq("id", id)
      .maybeSingle();

    const { data, error } = await supabase
      .from("projects")
      .update(parsed.data)
      .eq("id", id)
      .select()
      .single();

    if (error) return fail(describe(error));

    if (previous) {
      const stillUsed = new Set([data.cover_url, ...data.gallery_urls]);
      const dropped = [previous.cover_url, ...previous.gallery_urls].filter(
        (url) => url && !stillUsed.has(url),
      );
      await removeOrphanedImages(dropped);
    }

    revalidateProject(data.slug, previous?.slug);
    return ok(data);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();

    const { data: existing } = await supabase
      .from("projects")
      .select("slug, cover_url, gallery_urls")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return fail(error.message);

    if (existing) {
      await removeOrphanedImages([existing.cover_url, ...existing.gallery_urls]);
    }

    revalidateProject(undefined, existing?.slug);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

export async function toggleProjectFlag(
  id: string,
  field: "is_published" | "is_featured",
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    // Built explicitly: a computed key widens to string and loses the column type.
    const patch =
      field === "is_published" ? { is_published: value } : { is_featured: value };

    const { data, error } = await supabase
      .from("projects")
      .update(patch)
      .eq("id", id)
      .select("slug")
      .single();

    if (error) return fail(error.message);

    revalidateProject(data.slug);
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

/** Swaps sort_order between two rows, driven by the up/down arrows. */
export async function swapProjectOrder(
  a: { id: string; sort_order: number },
  b: { id: string; sort_order: number },
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();

    const results = await Promise.all([
      supabase.from("projects").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("projects").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);

    const failed = results.find((result) => result.error);
    if (failed?.error) return fail(failed.error.message);

    revalidateProject();
    return ok(undefined);
  } catch (cause) {
    return fail(toMessage(cause));
  }
}

/** Used by the form to warn before a slug collision reaches the database. */
export async function isSlugAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from("projects").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data } = await query.maybeSingle();
  return data === null;
}
