"use client";

import { use, useEffect, useState } from "react";
import { api, ApiRequestError } from "../../../_lib/api";
import type { TeamMember } from "../../../_lib/types";
import TeamMemberForm from "../../../_components/TeamMemberForm";
import { Banner, PageHeader, Spinner } from "../../../_components/ui";

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<TeamMember>(`/api/team/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load team member"));
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Team Member" />
      {error && <Banner kind="error" message={error} />}
      {!member && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {member && <TeamMemberForm initialMember={member} />}
    </div>
  );
}
