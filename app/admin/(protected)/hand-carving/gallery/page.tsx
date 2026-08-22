"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiRequestError } from "../../../_lib/api";
import type { HandCarvingGalleryItem } from "../../../_lib/types";
import { Banner, Button, Card, PageHeader, Spinner, Toggle } from "../../../_components/ui";

export default function HandCarvingGalleryListPage() {
  const [items, setItems] = useState<HandCarvingGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<HandCarvingGalleryItem[]>("/api/hand-carving/gallery")
      .then((res) => {
        setItems(res.data);
        setError(null);
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load gallery"))
      .finally(() => setLoading(false));
  }, []);

  function refetch() {
    api
      .get<HandCarvingGalleryItem[]>("/api/hand-carving/gallery")
      .then((res) => setItems(res.data))
      .catch(() => undefined);
  }

  async function toggleActive(item: HandCarvingGalleryItem) {
    try {
      await api.put(`/api/hand-carving/gallery/${item._id}`, { active: !item.active });
      setItems((prev) => prev.map((i) => (i._id === item._id ? { ...i, active: !i.active } : i)));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to update photo");
    }
  }

  async function remove(item: HandCarvingGalleryItem) {
    if (!confirm(`Delete "${item.title || "this photo"}"? This also removes it from Cloudinary.`)) return;
    try {
      await api.delete(`/api/hand-carving/gallery/${item._id}`);
      setItems((prev) => prev.filter((i) => i._id !== item._id));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete photo");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    setReordering(true);
    try {
      await api.put("/api/hand-carving/gallery/reorder", { ids: next.map((i) => i._id) });
      setError(null);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to reorder gallery");
      refetch();
    } finally {
      setReordering(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Carving Gallery"
        action={
          <Link href="/admin/hand-carving/gallery/new">
            <Button>+ Add Photo</Button>
          </Link>
        }
      />

      {error && <Banner kind="error" message={error} />}

      <Card className="mt-4 p-0">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">No gallery photos yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((item, index) => (
                  <tr key={item._id}>
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
                          disabled={index === items.length - 1 || reordering}
                          aria-label="Move down"
                          className="rounded text-neutral-400 hover:text-neutral-800 disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image} alt="" className="h-10 w-10 rounded object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-neutral-200" />
                        )}
                        <span className="font-medium text-neutral-900">{item.title || "Untitled"}</span>
                      </div>
                    </td>
                    <td className="max-w-[240px] truncate px-4 py-3 text-neutral-600">{item.description || "—"}</td>
                    <td className="px-4 py-3">
                      <Toggle checked={item.active} onChange={() => toggleActive(item)} label="" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/hand-carving/gallery/${item._id}`}>
                          <Button variant="ghost">Edit</Button>
                        </Link>
                        <Button variant="danger" onClick={() => remove(item)}>
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
