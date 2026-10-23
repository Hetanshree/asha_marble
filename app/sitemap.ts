import { MetadataRoute } from "next";
import { listProducts } from "@/server/services/product.service";
import { productListQuerySchema } from "@/server/validation/product.validation";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/hand-carving`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const { items } = await listProducts(productListQuerySchema.parse({ limit: "100" }), { publicOnly: true });
    return [
      ...pages,
      ...items.map((p) => ({
        url: `${SITE_URL}/products/${p.slug}`,
        lastModified: p.updatedAt ?? now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: p.images?.slice(0, 5),
      })),
    ];
  } catch {
    // DB unreachable — still serve the static pages.
    return pages;
  }
}
