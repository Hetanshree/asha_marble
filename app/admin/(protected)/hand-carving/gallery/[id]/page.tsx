"use client";

import { use, useEffect, useState } from "react";
import { api, ApiRequestError } from "../../../../_lib/api";
import type { HandCarvingGalleryItem } from "../../../../_lib/types";
import HandCarvingGalleryForm from "../../../../_components/HandCarvingGalleryForm";
import { Banner, PageHeader, Spinner } from "../../../../_components/ui";

export default function EditHandCarvingGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [item, setItem] = useState<HandCarvingGalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<HandCarvingGalleryItem>(`/api/hand-carving/gallery/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load photo"));
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Carving Photo" />
      {error && <Banner kind="error" message={error} />}
      {!item && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {item && <HandCarvingGalleryForm initialItem={item} />}
    </div>
  );
}
