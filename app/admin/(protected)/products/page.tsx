"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiRequestError } from "../../_lib/api";
import type { Pagination, Product } from "../../_lib/types";
import { Banner, Button, Card, Input, PageHeader, Spinner, Toggle } from "../../_components/ui";

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);

    api
      .get<Product[]>(`/api/products?${params.toString()}`)
      .then((res) => {
        setProducts(res.data);
        setPagination((res.meta?.pagination as Pagination) ?? null);
        setError(null);
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load products"))
      .finally(() => setLoading(false));
  }, [page, search]);

  async function toggleActive(product: Product) {
    try {
      await api.put(`/api/products/${product._id}`, { active: !product.active });
      setProducts((prev) => prev.map((p) => (p._id === product._id ? { ...p, active: !p.active } : p)));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to update product");
    }
  }

  async function remove(product: Product) {
    if (!confirm(`Delete "${product.name}"? This also removes its images from Cloudinary.`)) return;
    try {
      await api.delete(`/api/products/${product._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete product");
    }
  }

  return (
    <div>
      <PageHeader
        title="Products"
        action={
          <Link href="/admin/products/new">
            <Button>+ New Product</Button>
          </Link>
        }
      />

      <div className="mb-4 flex gap-3">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="max-w-sm"
        />
      </div>

      {error && <Banner kind="error" message={error} />}

      <Card className="mt-4 p-0">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : products.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">No products found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.images[0]} alt="" className="h-10 w-10 rounded object-cover" />
                      )}
                      <span className="font-medium text-neutral-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {product.price} <span className="text-xs text-neutral-400">/ {product.unit}</span>
                  </td>
                  <td className="px-4 py-3">{product.featured ? "★" : ""}</td>
                  <td className="px-4 py-3">
                    <Toggle checked={product.active} onChange={() => toggleActive(product)} label="" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product._id}`}>
                        <Button variant="ghost">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => remove(product)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-neutral-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button variant="ghost" disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
