"use client";

import { useRef, useState } from "react";
import { api, ApiRequestError } from "../_lib/api";

export type UploadedImage = { url: string; publicId: string };

export default function ImageUploader({
  images,
  onChange,
  multiple = true,
}: {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  multiple?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.post<UploadedImage>("/api/admin/upload", formData);
        uploaded.push(res.data);
      }
      onChange(multiple ? [...images, ...uploaded] : uploaded);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function removeImage(image: UploadedImage) {
    onChange(images.filter((img) => img.publicId !== image.publicId));
    await api.delete("/api/admin/upload", { publicId: image.publicId }).catch(() => undefined);
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-3">
        {images.map((image) => (
          <div key={image.publicId || image.url} className="group relative h-24 w-24 overflow-hidden rounded-md border border-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(image)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white opacity-0 transition group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="mt-2 text-xs text-neutral-500">Uploading...</p>}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
