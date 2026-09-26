import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Education } from "@/types/models";

export async function getVisibleEducation(): Promise<Education[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("is_visible", true)
    .order("start_date", { ascending: false });
  if (error) throw new Error(`getVisibleEducation: ${error.message}`);
  return data ?? [];
}
