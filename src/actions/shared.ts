import "server-only";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKET, objectKeyFromUrl } from "@/lib/supabase/storage";

/**
 * Server functions are reachable by direct POST, not only through the UI, so
 * every mutation calls this first. RLS is still the real enforcement — this
 * exists to return a clean message instead of an opaque policy violation.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return supabase;
}

export function toMessage(cause: unknown): string {
  if (cause instanceof Error) {
    return cause.message === "UNAUTHORIZED"
      ? "You are not signed in"
      : cause.message;
  }
  return "Unexpected error";
}

/** Public pages that read the master data, refreshed after every write. */
export function revalidatePublic(extra: string[] = []) {
  revalidatePath("/", "layout");
  for (const path of extra) revalidatePath(path);
}

/**
 * Best-effort cleanup of storage objects a row no longer references. A failure
 * leaves an orphan in the bucket, which is preferable to failing the mutation
 * the user actually asked for.
 */
export async function removeOrphanedImages(urls: (string | null)[]) {
  const keys = urls
    .map((url) => objectKeyFromUrl(url))
    .filter((key): key is string => key !== null);

  if (keys.length === 0) return;

  try {
    const supabase = await createClient();
    await supabase.storage.from(STORAGE_BUCKET).remove(keys);
  } catch (cause) {
    console.warn("removeOrphanedImages:", cause);
  }
}
