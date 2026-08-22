import TeamMemberForm from "../../../_components/TeamMemberForm";
import { PageHeader } from "../../../_components/ui";

export default function NewTeamMemberPage() {
  return (
    <div>
      <PageHeader title="New Team Member" />
      <TeamMemberForm />
    </div>
  );
}
