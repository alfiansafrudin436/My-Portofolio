import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { MasterDataShell } from "@/app/master-data/components/MasterDataShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Master Data",
  robots: { index: false, follow: false },
};

export default async function MasterDataLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This is the authorization boundary. src/proxy.ts also redirects, but that
  // is an optimistic UX layer — this check runs no matter what matched.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/master-data");

  return <MasterDataShell email={user.email ?? ""}>{children}</MasterDataShell>;
}
