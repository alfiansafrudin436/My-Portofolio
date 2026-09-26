import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Experience } from "@/types/models";

export async function getVisibleExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("is_visible", true)
    .order("start_date", { ascending: false });
  if (error) throw new Error(`getVisibleExperiences: ${error.message}`);
  return data ?? [];
}
