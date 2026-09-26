import { PageHeader } from "@/app/master-data/components/PageHeader";
import { ExperienceTable } from "@/app/master-data/experience/components/ExperienceTable";
import { listExperiences } from "@/lib/queries/admin";

export default async function MasterDataExperiencePage() {
  const experiences = await listExperiences();

  return (
    <>
      <PageHeader
        title="Experience"
        description={`${experiences.length} total · newest first on the public site.`}
      />
      <ExperienceTable initialData={experiences} />
    </>
  );
}
