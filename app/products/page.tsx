import { listProducts } from "@/server/services/product.service";
import { productListQuerySchema } from "@/server/validation/product.validation";
import { toPlainObject } from "@/server/utils/serialize";
import ProductsClient, { type ProductListItem } from "./ProductsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products | Asha Marble & Art Work",
  description: "Browse our full collection of Jaisalmer Yellow Marble, sandstone, wall cladding, stone jali, and carved stone work.",
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
