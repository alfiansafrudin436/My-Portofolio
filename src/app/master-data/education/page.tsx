import { PageHeader } from "@/app/master-data/components/PageHeader";
import { EducationTable } from "@/app/master-data/education/components/EducationTable";
import { listEducation } from "@/lib/queries/admin";

export default async function MasterDataEducationPage() {
  const education = await listEducation();

  return (
    <>
      <PageHeader
        title="Education"
        description={`${education.length} total · newest first on the public site.`}
      />
      <EducationTable initialData={education} />
    </>
  );
}
