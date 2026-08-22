"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiRequestError } from "../../_lib/api";
import type { TeamMember } from "../../_lib/types";
import { Banner, Button, Card, PageHeader, Spinner, Toggle } from "../../_components/ui";

export default function TeamListPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<TeamMember[]>("/api/team")
      .then((res) => {
        setMembers(res.data);
        setError(null);
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load team members"))
      .finally(() => setLoading(false));
  }, []);

  function refetch() {
    api
      .get<TeamMember[]>("/api/team")
      .then((res) => setMembers(res.data))
      .catch(() => undefined);
  }

  async function toggleActive(member: TeamMember) {
    try {
      await api.put(`/api/team/${member._id}`, { active: !member.active });
      setMembers((prev) => prev.map((m) => (m._id === member._id ? { ...m, active: !m.active } : m)));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to update team member");
    }
  }

  async function remove(member: TeamMember) {
    if (!confirm(`Delete "${member.name}"? This also removes their photo from Cloudinary.`)) return;
    try {
      await api.delete(`/api/team/${member._id}`);
      setMembers((prev) => prev.filter((m) => m._id !== member._id));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete team member");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= members.length) return;

    const next = [...members];
    [next[index], next[target]] = [next[target], next[index]];
    setMembers(next);

    setReordering(true);
    try {
      await api.put("/api/team/reorder", { ids: next.map((m) => m._id) });
      setError(null);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to reorder team members");
      refetch();
    } finally {
      setReordering(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Our Team"
        action={
          <Link href="/admin/team/new">
            <Button>+ New Team Member</Button>
          </Link>
        }
      />

      {error && <Banner kind="error" message={error} />}

      <Card className="mt-4 p-0">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : members.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">No team members yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {members.map((member, index) => (
                  <tr key={member._id}>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0 || reordering}
                          aria-label="Move up"
                          className="rounded text-neutral-400 hover:text-neutral-800 disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === members.length - 1 || reordering}
                          aria-label="Move down"
                          className="rounded text-neutral-400 hover:text-neutral-800 disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {member.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-neutral-200" />
                        )}
                        <span className="font-medium text-neutral-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{member.designation}</td>
                    <td className="px-4 py-3">
                      <Toggle checked={member.active} onChange={() => toggleActive(member)} label="" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/team/${member._id}`}>
                          <Button variant="ghost">Edit</Button>
                        </Link>
                        <Button variant="danger" onClick={() => remove(member)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
