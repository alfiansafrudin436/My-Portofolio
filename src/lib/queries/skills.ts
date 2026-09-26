import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Skill } from "@/types/models";

export async function getVisibleSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("is_visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getVisibleSkills: ${error.message}`);
  return data ?? [];
}
