import NextLink from "next/link";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/app/master-data/components/PageHeader";
import {
  getMasterDataCounts,
  getProfileForAdmin,
  listExperiences,
  listProjects,
  listSkills,
} from "@/lib/queries/admin";

const TILE =
  "group flex flex-col justify-between rounded-lg border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-fg-subtle";

function StatTile({
  label,
  total,
  drafts,
  draftLabel,
  href,
}: {
  label: string;
  total: number;
  drafts: number;
  draftLabel: string;
  href: string;
}) {
  return (
    <NextLink href={href} className={TILE}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-medium text-fg-muted">{label}</span>
        <ArrowUpRight
          className="size-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
      <p className="mt-8 text-3xl font-semibold tracking-tight text-fg">{total}</p>
      <p className="mt-1 text-xs text-fg-muted">
        {drafts > 0 ? `${drafts} ${draftLabel}` : "All public"}
      </p>
    </NextLink>
  );
}

type Check = { label: string; done: boolean; href: string; hint: string };

function Readiness({ checks }: { checks: Check[] }) {
  const doneCount = checks.filter((check) => check.done).length;
  const percent = Math.round((doneCount / checks.length) * 100);

  return (
    <section
      aria-labelledby="readiness-title"
      className="mb-8 rounded-lg border border-border bg-surface p-6 shadow-soft"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="readiness-title" className="text-lg font-semibold text-fg">
            Recruiter readiness
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            What a recruiter looks for in the first ten seconds.
          </p>
        </div>
        <p className="text-sm font-medium text-fg">
          {doneCount}/{checks.length} · {percent}%
        </p>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-bg-subtle"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Recruiter readiness"
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {checks.map((check) => (
          <li key={check.label}>
            <NextLink
              href={check.href}
              className="flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-bg-subtle"
            >
              {check.done ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              ) : (
                <Circle className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden />
              )}
              <span>
                <span className={check.done ? "text-sm text-fg-muted" : "text-sm font-medium text-fg"}>
                  {check.label}
                </span>
                {!check.done && (
                  <span className="block text-xs text-fg-subtle">{check.hint}</span>
                )}
              </span>
            </NextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function MasterDataDashboard() {
  const [counts, profile, projects, skills, experiences] = await Promise.all([
    getMasterDataCounts(),
    getProfileForAdmin(),
    listProjects(),
    listSkills(),
    listExperiences(),
  ]);

  const published = projects.filter((project) => project.is_published);
  const checks: Check[] = [
    {
      label: "Headline and tagline",
      done: Boolean(profile?.headline && profile?.tagline),
      href: "/master-data/profile",
      hint: "Say who you are and what you do in one line.",
    },
    {
      label: "Profile photo",
      done: Boolean(profile?.avatar_url),
      href: "/master-data/profile",
      hint: "A face makes the page feel human.",
    },
    {
      label: "CV / resume link",
      done: Boolean(profile?.resume_url),
      href: "/master-data/profile",
      hint: "Powers the Download CV buttons.",
    },
    {
      label: "Contact email",
      done: Boolean(profile?.email),
      href: "/master-data/profile",
      hint: "Powers the Hire me and contact buttons.",
    },
    {
      label: "Open to opportunities",
      done: Boolean(profile?.available),
      href: "/master-data/profile",
      hint: "Shows the green availability badge.",
    },
    {
      label: "Experience with quantified highlights",
      done: experiences.some(
        (experience) => experience.is_visible && experience.highlights.length > 0,
      ),
      href: "/master-data/experience",
      hint: "Add highlights with numbers, e.g. 'cut load time by 40%'.",
    },
    {
      label: "Three or more published projects",
      done: published.length >= 3,
      href: "/master-data/projects",
      hint: `${published.length} published so far.`,
    },
    {
      label: "Projects with cover, role and live link",
      done: published.some(
        (project) => project.cover_url && project.role && project.live_url,
      ),
      href: "/master-data/projects",
      hint: "Covers and links make cards worth clicking.",
    },
    {
      label: "Core stack marked as featured",
      done: skills.some((skill) => skill.is_featured && skill.is_visible),
      href: "/master-data/skills",
      hint: "Featured skills are highlighted at the top.",
    },
    {
      label: "SEO title and description",
      done: Boolean(profile?.seo_title && profile?.seo_description),
      href: "/master-data/profile",
      hint: "Controls how the site looks in search results.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Everything the public site reads lives here."
      />

      <Readiness checks={checks} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile
          label="Projects"
          total={counts.projects.total}
          drafts={counts.projects.drafts}
          draftLabel="draft"
          href="/master-data/projects"
        />
        <StatTile
          label="Skills"
          total={counts.skills.total}
          drafts={counts.skills.drafts}
          draftLabel="hidden"
          href="/master-data/skills"
        />
        <StatTile
          label="Experience"
          total={counts.experiences.total}
          drafts={counts.experiences.drafts}
          draftLabel="hidden"
          href="/master-data/experience"
        />
        <StatTile
          label="Education"
          total={counts.education.total}
          drafts={counts.education.drafts}
          draftLabel="hidden"
          href="/master-data/education"
        />
        <StatTile
          label="Social Links"
          total={counts.socialLinks.total}
          drafts={counts.socialLinks.drafts}
          draftLabel="hidden"
          href="/master-data/social-links"
        />
        <NextLink href="/master-data/profile" className={TILE}>
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-medium text-fg-muted">Profile</span>
            <ArrowUpRight
              className="size-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </div>
          <p className="mt-8 text-sm text-fg">
            Name, headline, bio, availability and SEO.
          </p>
        </NextLink>
      </div>
    </>
  );
}
