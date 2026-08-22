"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api, ApiRequestError } from "../_lib/api";
import type { HandCarvingGalleryItem } from "../_lib/types";
import { Banner, Button, Card, Field, Input, Textarea, Toggle } from "./ui";
import ImageUploader, { type UploadedImage } from "./ImageUploader";

export default function HandCarvingGalleryForm({ initialItem }: { initialItem?: HandCarvingGalleryItem }) {
  const router = useRouter();
  const isEdit = Boolean(initialItem);

  const [title, setTitle] = useState(initialItem?.title ?? "");
  const [description, setDescription] = useState(initialItem?.description ?? "");
  const [active, setActive] = useState(initialItem?.active ?? true);
  const [image, setImage] = useState<UploadedImage[]>(
    initialItem?.image ? [{ url: initialItem.image, publicId: initialItem.imagePublicId }] : []
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (image.length === 0) {
      setError("Please upload a photo before saving.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      description,
      active,
      image: image[0].url,
      imagePublicId: image[0].publicId,
    };

    try {
      if (isEdit) {
        await api.put(`/api/hand-carving/gallery/${initialItem!._id}`, payload);
      } else {
        await api.post("/api/hand-carving/gallery", payload);
      }
      router.push("/admin/hand-carving/gallery");
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
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Photo</h2>
        <ImageUploader images={image} onChange={setImage} multiple={false} />
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Details</h2>
        <div className="flex flex-col gap-4">
          <Field label="Title" htmlFor="title" error={fieldErrors.title?.[0]}>
            <Input id="title" placeholder="e.g. Hand-Carved Marble Jali" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Description" htmlFor="description" error={fieldErrors.description?.[0]}>
            <Textarea
              id="description"
              placeholder="A short description of the craftsmanship shown"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20"
            />
          </Field>
        </div>
      </Card>

      <Card>
        <Toggle checked={active} onChange={setActive} label="Active (visible on the website)" />
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Photo"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/hand-carving/gallery")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
