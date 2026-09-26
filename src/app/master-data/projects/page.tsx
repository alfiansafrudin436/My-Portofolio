import { PageHeader } from "@/app/master-data/components/PageHeader";
import { ProjectsTable } from "@/app/master-data/projects/components/ProjectsTable";
import { listProjects } from "@/lib/queries/admin";

export default async function MasterDataProjectsPage() {
  const projects = await listProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        description={`${projects.length} total · drafts are only visible here.`}
      />
      <ProjectsTable initialData={projects} />
    </>
  );
}
