import { listProducts } from "@/server/services/product.service";
import { productListQuerySchema } from "@/server/validation/product.validation";
import { toPlainObject } from "@/server/utils/serialize";
import ProductsClient, { type ProductListItem } from "./ProductsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jaisalmer Yellow Marble, Sandstone & Stone Products",
  description: "Browse Jaisalmer Yellow Marble slabs & tiles, Jaisalmer yellow sandstone, wall cladding, stone jali and carved stone work. Get prices and quotes directly from the supplier.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const query = productListQuerySchema.parse({ limit: "100" });
  const { items } = await listProducts(query, { publicOnly: true });

  const products: ProductListItem[] = items.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    unit: p.unit,
    shortDescription: p.shortDescription,
    images: p.images,
    availability: p.availability as ProductListItem["availability"],
  }));

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return <ProductsClient products={toPlainObject(products)} categories={categories} />;
}
