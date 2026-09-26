"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";
import { fail, ok, type ActionResult } from "@/lib/utils/result";

/** Only allow relative paths, so ?next= cannot become an open redirect. */
function safeNext(next: string | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/master-data";
  }
  return next;
}

export async function signIn(
  input: SignInInput,
  next?: string,
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return fail("Check the form", parsed.error.flatten().fieldErrors);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // Deliberately vague: do not reveal whether the email exists.
    return fail("Incorrect email or password");
  }

  revalidatePath("/master-data", "layout");
  return ok({ redirectTo: safeNext(next) });
}

export async function signOut(): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
