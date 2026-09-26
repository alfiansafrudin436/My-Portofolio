import { PageHeader } from "@/app/master-data/components/PageHeader";
import { SocialLinksTable } from "@/app/master-data/social-links/components/SocialLinksTable";
import { listSocialLinks } from "@/lib/queries/admin";

export default async function MasterDataSocialLinksPage() {
  const links = await listSocialLinks();

  return (
    <>
      <PageHeader
        title="Social Links"
        description={`${links.length} total · shown in the footer and Contact section.`}
      />
      <SocialLinksTable initialData={links} />
    </>
  );
}
