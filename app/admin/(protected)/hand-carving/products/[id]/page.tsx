"use client";

import { use, useEffect, useState } from "react";
import { api, ApiRequestError } from "../../../../_lib/api";
import type { HandCarvingProduct } from "../../../../_lib/types";
import HandCarvingProductForm from "../../../../_components/HandCarvingProductForm";
import { Banner, PageHeader, Spinner } from "../../../../_components/ui";

export default function EditHandCarvingProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<HandCarvingProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<HandCarvingProduct>(`/api/hand-carving/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load product"));
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Carving Product" />
      {error && <Banner kind="error" message={error} />}
      {!product && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {product && <HandCarvingProductForm initialProduct={product} />}
    </div>
  );
}
