export const STORAGE_BUCKET = "portfolio";

const PUBLIC_PREFIX = `/storage/v1/object/public/${STORAGE_BUCKET}/`;

/**
 * Turns a public Storage URL back into its object key, or null when the URL
 * points somewhere else. Used before deleting so we never issue a remove()
 * for a URL that was typed in by hand.
 */
export function objectKeyFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { pathname, origin } = new URL(url);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const expected = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin;
      if (origin !== expected) return null;
    }
    if (!pathname.startsWith(PUBLIC_PREFIX)) return null;
    return decodeURIComponent(pathname.slice(PUBLIC_PREFIX.length)) || null;
  } catch {
    return null;
  }
}

/** True when the URL is empty, or lives in our own bucket. */
export function isOwnStorageUrl(url: string | null | undefined): boolean {
  if (!url) return true;
  return objectKeyFromUrl(url) !== null;
}

export function fileExtension(fileName: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(fileName);
  return match ? match[1].toLowerCase() : "bin";
}

/** projects/<slug>/<random>.<ext> — see migration 0007. */
export function buildObjectKey(folder: string, fileName: string): string {
  const ext = fileExtension(fileName);
  return `${folder}/${crypto.randomUUID()}.${ext}`;
}
