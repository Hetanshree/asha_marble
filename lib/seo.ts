import { SITE } from "./data";

// Public URL of the live site. Set NEXT_PUBLIC_SITE_URL in production if the domain differs.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://jaisalmeryellowmarble.com").replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = "/logo.jpeg";

// Strips markdown (**bold**, _italic_, # headings, links) so descriptions read cleanly in search results.
export function plainText(text: string | undefined | null) {
  return (text ?? "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Escapes "<" so JSON-LD can't break out of its <script> tag.
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpeg`,
  image: `${SITE_URL}/logo.jpeg`,
  telephone: `+${SITE.whatsapp}`,
  email: SITE.email,
  foundingDate: SITE.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380009",
    addressCountry: "IN",
  },
  areaServed: ["IN", "AE", "GB", "US", "AU"],
  knowsAbout: [
    "Jaisalmer Yellow Marble",
    "Jaisalmer Yellow Sandstone",
    "Jaisalmer Stone",
    "Stone Wall Cladding",
    "Stone Jali",
    "Hand Carved Stone",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    reviewCount: SITE.reviews,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "16:00" },
  ],
};
