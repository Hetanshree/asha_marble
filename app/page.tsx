import { getHomepage } from "@/server/services/homepage.service";
import { getContact } from "@/server/services/contact.service";
import { toPlainObject } from "@/server/utils/serialize";
import HomeClient, { type FeaturedProductData, type HeroSlideData } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [homepage, contact] = await Promise.all([getHomepage(), getContact()]);

  const heroSlides: HeroSlideData[] = (homepage?.heroSlides ?? []).map((slide) => ({
    eyebrow: slide.eyebrow,
    headline: slide.headline,
    sub: slide.sub,
    image: slide.image,
    ctaLabel: slide.ctaLabel,
    ctaHref: slide.ctaHref,
  }));

  const featuredProducts: FeaturedProductData[] = ((homepage?.featuredProducts ?? []) as unknown as Array<{
    _id: unknown;
    slug: string;
    name: string;
    category: string;
    price: string;
    unit: string;
    shortDescription: string;
    images: string[];
    availability: "available" | "limited" | "on-request";
    active: boolean;
  }>)
    .filter((p) => p.active)
    .map((p) => ({
      _id: String(p._id),
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      unit: p.unit,
      shortDescription: p.shortDescription,
      images: p.images,
      availability: p.availability,
    }));

  const phone = contact?.phone ?? "";
  const whatsapp = contact?.whatsapp ?? "";
  const phoneRaw = phone.replace(/\D/g, "");

  return (
    <HomeClient
      heroSlides={toPlainObject(heroSlides)}
      featuredProducts={toPlainObject(featuredProducts)}
      phone={phone}
      phoneRaw={phoneRaw}
      whatsapp={whatsapp}
    />
  );
}
