import { getHandCarvingAbout, getHandCarvingCustom, listHandCarvingGallery, listHandCarvingProducts } from "@/server/services/hand-carving.service";
import { handCarvingGalleryListQuerySchema, handCarvingProductListQuerySchema } from "@/server/validation/hand-carving.validation";
import { getContact } from "@/server/services/contact.service";
import HandCarvingClient from "./HandCarvingClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore Hand Carving | Asha Marble & Art Work",
  description:
    "Discover the beauty of handcrafted artistry, detailed craftsmanship, and timeless designs — hand-carved marble and stone work by Asha Marble & Art Work.",
};

export default async function HandCarvingPage() {
  const [about, custom, galleryRaw, productsRaw, contact] = await Promise.all([
    getHandCarvingAbout(),
    getHandCarvingCustom(),
    listHandCarvingGallery(handCarvingGalleryListQuerySchema.parse({}), { publicOnly: true }),
    listHandCarvingProducts(handCarvingProductListQuerySchema.parse({ limit: "24" }), { publicOnly: true }),
    getContact(),
  ]);

  const gallery = galleryRaw.map((g) => ({
    _id: String(g._id),
    image: g.image,
    title: g.title,
    description: g.description,
  }));

  const products = productsRaw.items.map((p) => ({
    _id: String(p._id),
    slug: p.slug,
    name: p.name,
    category: p.category,
    material: p.material,
    dimensions: p.dimensions,
    price: p.price,
    unit: p.unit,
    shortDescription: p.shortDescription,
    description: p.description,
    images: p.images,
    availability: p.availability as "available" | "limited" | "on-request",
    featured: p.featured,
  }));

  return (
    <HandCarvingClient
      about={{
        sectionLabel: about?.sectionLabel || "About Hand Carving",
        heading: about?.heading || "The Art of Hand Carving",
        description: about?.description || "",
        paragraphs: about?.paragraphs || [],
        images: about?.images || [],
        highlights: about?.highlights || [],
      }}
      custom={{
        heading: custom?.heading || "Have a Custom Design in Mind?",
        description:
          custom?.description ||
          "Bring your ideas to life with our skilled craftsmen. From traditional patterns to custom designs, we create unique hand-carved marble and stone products based on your requirements.",
        ctaLabel: custom?.ctaLabel || "Request a Custom Design",
      }}
      gallery={gallery}
      products={products}
      phone={contact?.phone ?? ""}
      phoneRaw={(contact?.phone ?? "").replace(/\D/g, "")}
      whatsapp={contact?.whatsapp ?? ""}
    />
  );
}
