import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  Education,
  Experience,
  Profile,
  Project,
  Skill,
  SocialLink,
} from "@/types/models";

/**
 * Master-data reads. These deliberately omit the is_published / is_visible
 * filters: the RLS policies in migration 0006 already let an authenticated
 * admin — and only an admin — see draft rows.
 */

export async function listProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(`listProjects: ${error.message}`);
  return data ?? [];
}

export async function listSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`listSkills: ${error.message}`);
  return data ?? [];
}

export async function listExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });
  if (error) throw new Error(`listExperiences: ${error.message}`);
  return data ?? [];
}

export async function listEducation(): Promise<Education[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false });
  if (error) throw new Error(`listEducation: ${error.message}`);
  return data ?? [];
}

export async function listSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`listSocialLinks: ${error.message}`);
  return data ?? [];
}

export async function getProfileForAdmin(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").maybeSingle();
  if (error) throw new Error(`getProfileForAdmin: ${error.message}`);
  return data;
}

export type MasterDataCounts = {
  projects: { total: number; drafts: number };
  skills: { total: number; drafts: number };
  experiences: { total: number; drafts: number };
  education: { total: number; drafts: number };
  socialLinks: { total: number; drafts: number };
};

/** Powers the dashboard tiles: total rows plus how many are not public yet. */
export async function getMasterDataCounts(): Promise<MasterDataCounts> {
  const supabase = await createClient();
  const head = { count: "exact" as const, head: true };

  // Each pair is built inline rather than through a table-name parameter:
  // the "public" column differs per table, and a union of table names would
  // narrow .eq() to the columns they have in common.
  const [projects, skills, experiences, education, socialLinks] =
    await Promise.all([
      pair(
        supabase.from("projects").select("*", head),
        supabase.from("projects").select("*", head).eq("is_published", true),
      ),
      pair(
        supabase.from("skills").select("*", head),
        supabase.from("skills").select("*", head).eq("is_visible", true),
      ),
      pair(
        supabase.from("experiences").select("*", head),
        supabase.from("experiences").select("*", head).eq("is_visible", true),
      ),
      pair(
        supabase.from("education").select("*", head),
        supabase.from("education").select("*", head).eq("is_visible", true),
      ),
      pair(
        supabase.from("social_links").select("*", head),
        supabase.from("social_links").select("*", head).eq("is_visible", true),
      ),
    ]);

  return { projects, skills, experiences, education, socialLinks };
}

type CountQuery = PromiseLike<{ count: number | null }>;

async function pair(allRows: CountQuery, liveRows: CountQuery) {
  const [all, live] = await Promise.all([allRows, liveRows]);
  const total = all.count ?? 0;
  return { total, drafts: total - (live.count ?? 0) };
}
