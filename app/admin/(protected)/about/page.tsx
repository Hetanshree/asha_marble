"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiRequestError } from "../../_lib/api";
import type { About } from "../../_lib/types";
import { Banner, Button, Card, Field, Input, PageHeader, Spinner, Textarea } from "../../_components/ui";
import ImageUploader, { type UploadedImage } from "../../_components/ImageUploader";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<About>("/api/about")
      .then((res) => {
        setAbout(res.data);
        setImages(res.data.images.map((url, i) => ({ url, publicId: res.data.cloudinaryPublicIds[i] ?? "" })));
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!about) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...about,
        images: images.map((i) => i.url),
        cloudinaryPublicIds: images.map((i) => i.publicId),
      };
      const res = await api.put<About>("/api/about", payload);
      setAbout(res.data);
      setSuccess("About content updated.");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!about) {
    return <Banner kind="error" message={error ?? "Failed to load"} />;
  }

  return (
    <div>
      <PageHeader title="About Page" />
      {error && <Banner kind="error" message={error} />}
      {success && <Banner kind="success" message={success} />}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
        <Card>
          <div className="flex flex-col gap-4">
            <Field label="Title" htmlFor="title">
              <Input id="title" value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
            </Field>
            <Field label="Description" htmlFor="description">
              <Textarea
                id="description"
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
              />
            </Field>
            <Field label="Mission" htmlFor="mission">
              <Textarea id="mission" value={about.mission} onChange={(e) => setAbout({ ...about, mission: e.target.value })} className="min-h-20" />
            </Field>
            <Field label="Vision" htmlFor="vision">
              <Textarea id="vision" value={about.vision} onChange={(e) => setAbout({ ...about, vision: e.target.value })} className="min-h-20" />
            </Field>
            <Field label="Experience" htmlFor="experience">
              <Input
                id="experience"
                placeholder="e.g. 20+ Years"
                value={about.experience}
                onChange={(e) => setAbout({ ...about, experience: e.target.value })}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Images</h2>
          <ImageUploader images={images} onChange={setImages} />
        </Card>

        <div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
