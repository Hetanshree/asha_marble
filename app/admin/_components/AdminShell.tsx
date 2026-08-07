"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "../_lib/api";
import type { AdminProfile } from "../_lib/types";
import { Spinner } from "./ui";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products", exact: false },
  { href: "/admin/homepage", label: "Homepage", exact: true },
  { href: "/admin/about", label: "About Page", exact: true },
  { href: "/admin/contact", label: "Contact Page", exact: true },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AdminProfile>("/api/admin/me")
      .then((res) => setProfile(res.data))
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await api.post("/api/admin/logout").catch(() => undefined);
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-[var(--color-charcoal)] text-white">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="font-display text-lg font-semibold text-[var(--color-gold)]">Asha Marble</p>
          <p className="text-xs text-neutral-400">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-[var(--color-gold)] text-[var(--color-charcoal)] font-medium" : "text-neutral-300 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-sm font-medium">{profile?.name}</p>
          <p className="truncate text-xs text-neutral-400">{profile?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
