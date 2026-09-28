import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProfile, getSocialLinks } from "@/lib/queries/profile";
import { SITE } from "@/lib/constants";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [profile, socialLinks] = await Promise.all([
    getProfile(),
    getSocialLinks(),
  ]);

  const name = profile?.full_name ?? SITE.name;

  return (
    <>
      <SiteHeader name={name} resumeUrl={profile?.resume_url} />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter name={name} socialLinks={socialLinks} />
    </>
  );
}
