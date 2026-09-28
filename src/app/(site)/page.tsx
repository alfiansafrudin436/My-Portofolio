import { Hero } from "@/app/(site)/components/Hero";
import { StatsStrip } from "@/app/(site)/components/StatsStrip";
import { SelectedWork } from "@/app/(site)/components/SelectedWork";
import { AboutSection } from "@/app/(site)/components/AboutSection";
import { SkillsGrid } from "@/app/(site)/components/SkillsGrid";
import { ExperienceSection } from "@/app/(site)/components/ExperienceSection";
import { EducationSection } from "@/app/(site)/components/EducationSection";
import { ContactSection } from "@/app/(site)/components/ContactSection";
import { getProfile, getSocialLinks } from "@/lib/queries/profile";
import { getFeaturedProjects, getPublishedProjects } from "@/lib/queries/projects";
import { getVisibleSkills } from "@/lib/queries/skills";
import { getVisibleExperiences } from "@/lib/queries/experiences";
import { getVisibleEducation } from "@/lib/queries/education";
import { computeStats } from "@/lib/utils/stats";

export default async function HomePage() {
  const [profile, featured, published, skills, experiences, education, socialLinks] =
    await Promise.all([
      getProfile(),
      getFeaturedProjects(),
      getPublishedProjects(),
      getVisibleSkills(),
      getVisibleExperiences(),
      getVisibleEducation(),
      getSocialLinks(),
    ]);

  // Nothing flagged as featured yet: fall back to the newest published work so
  // the section is never empty for no reason.
  const work = featured.length > 0 ? featured : published.slice(0, 6);
  const stats = computeStats(experiences, published, skills);

  // Recruiters scan for track record first, so experience leads the page.
  return (
    <>
      <Hero profile={profile} />
      <StatsStrip stats={stats} />
      <ExperienceSection experiences={experiences} />
      <SelectedWork projects={work} />
      <SkillsGrid skills={skills} />
      <AboutSection profile={profile} />
      <EducationSection education={education} />
      <ContactSection profile={profile} socialLinks={socialLinks} />
    </>
  );
}
