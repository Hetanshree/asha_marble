"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiRequestError } from "../_lib/api";
import type { DashboardStats } from "../_lib/types";
import { Banner, Card, PageHeader, Spinner } from "../_components/ui";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<DashboardStats>("/api/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load dashboard"));
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" />

      {error && <Banner kind="error" message={error} />}

      {!stats && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total Products" value={stats.totalProducts} />
            <StatCard label="Active Products" value={stats.activeProducts} />
            <StatCard label="Inactive Products" value={stats.inactiveProducts} />
          </div>

          <Card className="mt-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Recently Added Products
            </h2>
            {stats.recentlyAddedProducts.length === 0 ? (
              <p className="text-sm text-neutral-500">No products yet.</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {stats.recentlyAddedProducts.map((product) => (
                  <li key={product._id} className="flex items-center justify-between py-3">
                    <div>
                      <Link href={`/admin/products/${product._id}`} className="text-sm font-medium text-neutral-900 hover:underline">
                        {product.name}
                      </Link>
                      <p className="text-xs text-neutral-500">{product.category}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.active ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {product.active ? "Active" : "Inactive"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--color-charcoal)]">{value}</p>
    </Card>
  );
}
