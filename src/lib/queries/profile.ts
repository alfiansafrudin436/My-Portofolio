import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Profile, SocialLink } from "@/types/models";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").maybeSingle();
  if (error) throw new Error(`getProfile: ${error.message}`);
  return data;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getSocialLinks: ${error.message}`);
  return data ?? [];
}
