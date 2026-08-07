"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api, ApiRequestError } from "../_lib/api";
import type { Availability, Product } from "../_lib/types";
import { Banner, Button, Card, Field, Input, Select, Textarea, Toggle } from "./ui";

type UploadedImage = { url: string; publicId: string };

export default function ProductForm({ initialProduct }: { initialProduct?: Product }) {
  const router = useRouter();
  const isEdit = Boolean(initialProduct);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [category, setCategory] = useState(initialProduct?.category ?? "");
  const [price, setPrice] = useState(initialProduct?.price ?? "");
  const [unit, setUnit] = useState(initialProduct?.unit ?? "");
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [seoTitle, setSeoTitle] = useState(initialProduct?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initialProduct?.seoDescription ?? "");
  const [availability, setAvailability] = useState<Availability>(initialProduct?.availability ?? "available");
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);
  const [active, setActive] = useState(initialProduct?.active ?? true);
  const [images, setImages] = useState<UploadedImage[]>(
    (initialProduct?.images ?? []).map((url, i) => ({ url, publicId: initialProduct?.cloudinaryPublicIds[i] ?? "" }))
  );

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const originalPublicIds = new Set(initialProduct?.cloudinaryPublicIds ?? []);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.post<UploadedImage>("/api/admin/upload", formData);
        setImages((prev) => [...prev, res.data]);
      }
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function removeImage(image: UploadedImage) {
    setImages((prev) => prev.filter((img) => img.publicId !== image.publicId));
    try {
      if (isEdit && originalPublicIds.has(image.publicId)) {
        await api.delete(`/api/products/${initialProduct!._id}/images`, { publicId: image.publicId });
      } else {
        await api.delete("/api/admin/upload", { publicId: image.publicId });
      }
    } catch {
      // Image removed from the form; a stray Cloudinary asset here does not block the workflow.
    }
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const payload = {
      name,
      category,
      price,
      unit,
      shortDescription,
      description,
      seoTitle,
      seoDescription,
      availability,
      featured,
      active,
      images: images.map((i) => i.url),
      cloudinaryPublicIds: images.map((i) => i.publicId),
    };

    try {
      if (isEdit) {
        await api.put(`/api/products/${initialProduct!._id}`, payload);
      } else {
        await api.post("/api/products", payload);
      }
      router.push("/admin/products");
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
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Basic Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" error={fieldErrors.name?.[0]}>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Category" htmlFor="category" error={fieldErrors.category?.[0]}>
            <Input id="category" required value={category} onChange={(e) => setCategory(e.target.value)} />
          </Field>
          <Field label="Price" htmlFor="price" error={fieldErrors.price?.[0]}>
            <Input id="price" required placeholder="e.g. ₹85 or On Request" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Field>
          <Field label="Unit" htmlFor="unit" error={fieldErrors.unit?.[0]}>
            <Input id="unit" required placeholder="e.g. per sq. ft." value={unit} onChange={(e) => setUnit(e.target.value)} />
          </Field>
          <Field label="Availability" htmlFor="availability">
            <Select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value as Availability)}>
              <option value="available">Available</option>
              <option value="limited">Limited Stock</option>
              <option value="on-request">On Request</option>
            </Select>
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Description</h2>
        <div className="flex flex-col gap-4">
          <Field label="Short Description" htmlFor="shortDescription" error={fieldErrors.shortDescription?.[0]}>
            <Textarea
              id="shortDescription"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="min-h-16"
            />
          </Field>
          <Field label="Full Description" htmlFor="description" error={fieldErrors.description?.[0]}>
            <Textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Images</h2>
        <div className="mb-4 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div key={image.publicId || image.url} className="group relative h-24 w-24 overflow-hidden rounded-md border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 opacity-0 transition group-hover:opacity-100">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    className="rounded bg-white/90 px-1.5 text-xs disabled:opacity-40"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === images.length - 1}
                    className="rounded bg-white/90 px-1.5 text-xs disabled:opacity-40"
                  >
                    →
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="rounded bg-red-600 px-1.5 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="mt-2 text-xs text-neutral-500">Uploading...</p>}
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">SEO</h2>
        <div className="flex flex-col gap-4">
          <Field label="SEO Title" htmlFor="seoTitle">
            <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </Field>
          <Field label="SEO Description" htmlFor="seoDescription">
            <Textarea id="seoDescription" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className="min-h-16" />
          </Field>
        </div>
      </Card>

      <Card>
        <div className="flex gap-8">
          <Toggle checked={featured} onChange={setFeatured} label="Featured" />
          <Toggle checked={active} onChange={setActive} label="Active" />
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
