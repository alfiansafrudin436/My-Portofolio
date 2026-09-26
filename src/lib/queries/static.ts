import "server-only";

import { createStaticClient } from "@/lib/supabase/static";

export type SitemapProject = { slug: string; updated_at: string };

/**
 * Build-time reads. These mirror the public queries but go through the
 * cookieless client, so they are safe inside generateStaticParams and
 * sitemap.ts.
 *
 * Both swallow errors: a portfolio should still build and deploy when the
 * database is briefly unreachable, just with an empty sitemap and no
 * prerendered detail pages (they render on demand instead).
 */
export async function getProjectSlugsForBuild(): Promise<string[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("is_published", true);
    if (error) throw error;
    return (data ?? []).map((row) => row.slug);
  } catch (error) {
    console.warn("getProjectSlugsForBuild: skipping prerender —", error);
    return [];
  }
}

export async function getProjectsForSitemap(): Promise<SitemapProject[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("is_published", true);
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.warn("getProjectsForSitemap: returning base routes only —", error);
    return [];
  }
}
