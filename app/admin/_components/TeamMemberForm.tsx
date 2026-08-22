"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api, ApiRequestError } from "../_lib/api";
import type { TeamMember } from "../_lib/types";
import { Banner, Button, Card, Field, Input, Textarea, Toggle } from "./ui";
import ImageUploader, { type UploadedImage } from "./ImageUploader";

export default function TeamMemberForm({ initialMember }: { initialMember?: TeamMember }) {
  const router = useRouter();
  const isEdit = Boolean(initialMember);

  const [name, setName] = useState(initialMember?.name ?? "");
  const [designation, setDesignation] = useState(initialMember?.designation ?? "");
  const [bio, setBio] = useState(initialMember?.bio ?? "");
  const [active, setActive] = useState(initialMember?.active ?? true);
  const [photo, setPhoto] = useState<UploadedImage[]>(
    initialMember?.photo ? [{ url: initialMember.photo, publicId: initialMember.photoPublicId }] : []
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const payload = {
      name,
      designation,
      bio,
      active,
      photo: photo[0]?.url ?? "",
      photoPublicId: photo[0]?.publicId ?? "",
    };

    try {
      if (isEdit) {
        await api.put(`/api/team/${initialMember!._id}`, payload);
      } else {
        await api.post("/api/team", payload);
      }
      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
        setFieldErrors(err.errors ?? {});
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && <Banner kind="error" message={error} />}

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" error={fieldErrors.name?.[0]}>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Designation" htmlFor="designation" error={fieldErrors.designation?.[0]}>
            <Input
              id="designation"
              required
              placeholder="e.g. Founder & CEO"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Bio" htmlFor="bio" error={fieldErrors.bio?.[0]}>
            <Textarea
              id="bio"
              placeholder="A short description of their role and experience"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-24"
            />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Profile Photo</h2>
        <ImageUploader images={photo} onChange={setPhoto} multiple={false} />
      </Card>

      <Card>
        <Toggle checked={active} onChange={setActive} label="Active (visible on the website)" />
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Team Member"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/team")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
