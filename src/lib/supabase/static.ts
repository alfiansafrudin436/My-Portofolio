import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

/**
 * A cookieless anon client for code that runs without an HTTP request —
 * generateStaticParams and sitemap.ts. The request-bound client in server.ts
 * calls cookies(), which throws in those contexts.
 *
 * Because there is no session, RLS treats this as `anon`: published and
 * visible rows only, which is exactly what a sitemap should contain.
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
