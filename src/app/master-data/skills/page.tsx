import { PageHeader } from "@/app/master-data/components/PageHeader";
import { SkillsTable } from "@/app/master-data/skills/components/SkillsTable";
import { listSkills } from "@/lib/queries/admin";

export default async function MasterDataSkillsPage() {
  const skills = await listSkills();

  return (
    <>
      <PageHeader
        title="Skills"
        description={`${skills.length} total · grouped by category on the public site.`}
      />
      <SkillsTable initialData={skills} />
    </>
  );
}
