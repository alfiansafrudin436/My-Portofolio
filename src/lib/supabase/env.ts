/**
 * NEXT_PUBLIC_* values are inlined at build time. If they are missing the app
 * builds fine and then fails with an opaque error at runtime, so fail loudly
 * with a message that names the fix instead.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill it in ` +
        `(and pass it as a --build-arg when building the Docker image).`,
    );
  }
  return value;
}

/**
 * The dashboard shows several URLs that look alike: the project URL, and the
 * REST, Auth and Storage endpoints under it. supabase-js appends those paths
 * itself, so pasting an endpoint doubles them up and every request fails with
 * "Invalid path specified in request URL". Reduce whatever was pasted to the
 * bare origin so that mistake cannot take the site down.
 */
export function normalizeSupabaseUrl(value: string): string {
  try {
    return new URL(value.trim()).origin;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SUPABASE_URL is not a valid URL: "${value}". ` +
        `Use the Project URL from Project Settings > API, ` +
        `e.g. https://<ref>.supabase.co`,
    );
  }
}

export function supabaseUrl(): string {
  return normalizeSupabaseUrl(
    required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
  );
}

export function supabaseAnonKey(): string {
  return required(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
