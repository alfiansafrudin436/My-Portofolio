import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/models";

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false });
  if (error) throw new Error(`getPublishedProjects: ${error.message}`);
  return data ?? [];
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw new Error(`getFeaturedProjects: ${error.message}`);
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(`getProjectBySlug: ${error.message}`);
  return data;
}
