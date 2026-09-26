import { PageHeader } from "@/app/master-data/components/PageHeader";
import { ProfileForm } from "@/app/master-data/profile/components/ProfileForm";
import { getProfileForAdmin } from "@/lib/queries/admin";

export default async function MasterDataProfilePage() {
  const profile = await getProfileForAdmin();

  return (
    <>
      <PageHeader
        title="Profile"
        description="A single record. Everything here feeds the hero, About and Contact."
      />
      <ProfileForm profile={profile} />
    </>
  );
}
