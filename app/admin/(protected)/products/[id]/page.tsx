"use client";

import { use, useEffect, useState } from "react";
import { api, ApiRequestError } from "../../../_lib/api";
import type { Product } from "../../../_lib/types";
import ProductForm from "../../../_components/ProductForm";
import { Banner, PageHeader, Spinner } from "../../../_components/ui";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Product>(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load product"));
  }, [id]);

  return (
    <div>
      <PageHeader title="Edit Product" />
      {error && <Banner kind="error" message={error} />}
      {!product && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {product && <ProductForm initialProduct={product} />}
    </div>
  );
}
