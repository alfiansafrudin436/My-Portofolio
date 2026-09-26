import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/app/master-data/components/PageHeader";
import { getMasterDataCounts } from "@/lib/queries/admin";

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
    <NextLink
      href={href}
      className="group flex flex-col justify-between border border-border p-6 transition-colors hover:border-border-strong"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label text-fg-muted">{label}</span>
        <ArrowUpRight
          className="size-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
      <p className="mt-8 text-3xl font-medium text-fg">{total}</p>
      <p className="mt-1 text-xs text-fg-muted">
        {drafts > 0 ? `${drafts} ${draftLabel}` : "All public"}
      </p>
    </NextLink>
  );
}

export default async function MasterDataDashboard() {
  const counts = await getMasterDataCounts();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Everything the public site reads lives here."
      />

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
        <NextLink
          href="/master-data/profile"
          className="group flex flex-col justify-between border border-border p-6 transition-colors hover:border-border-strong"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="label text-fg-muted">Profile</span>
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
