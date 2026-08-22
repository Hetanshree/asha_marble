import { dbConnect } from "../db/connect";
import { AboutModel } from "../models/About.model";
import { ContactModel } from "../models/Contact.model";
import { HomepageModel } from "../models/Homepage.model";
import { SITE, HERO_SLIDES } from "../../lib/data";

export async function ensureInitialContent(): Promise<void> {
  await dbConnect();

  const [homepageExists, aboutExists, contactExists] = await Promise.all([
    HomepageModel.exists({}),
    AboutModel.exists({}),
    ContactModel.exists({}),
  ]);

  if (!homepageExists) {
    await HomepageModel.create({
      heroSlides: HERO_SLIDES.map((slide) => ({
        eyebrow: slide.eyebrow,
        headline: slide.headline,
        sub: slide.sub,
        image: slide.image,
        imagePublicId: "",
        ctaLabel: slide.cta.label,
        ctaHref: slide.cta.href,
      })),
      featuredProducts: [],
    });
    console.log("[seed] Homepage content migrated from static data");
  }

  if (!aboutExists) {
    const yearsActive = new Date().getFullYear() - parseInt(SITE.founded, 10);
    await AboutModel.create({
      title: `${yearsActive}+ Years of Stone Mastery in Gujarat`,
      description: [
        `Asha Marble & Art Work was established in ${SITE.founded} in Ahmedabad, Gujarat, with a singular vision: to bring the timeless beauty of Rajasthan's finest natural stone to builders, architects, and homeowners across India and beyond.`,
        "From our base at Sajanad Complex in Navrangpura, we have grown into a trusted name for premium Jaisalmer Yellow Marble, Jaisalmer Yellow Sandstone, and a comprehensive range of natural stone products.",
        "We operate across the full supply chain — manufacturer, supplier, wholesaler, and exporter — giving our clients consistent quality, competitive pricing, and the reliability of a single, accountable partner.",
      ].join("\n\n"),
      mission: "",
      vision: "",
      experience: `${yearsActive}+`,
      images: ["https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png"],
      cloudinaryPublicIds: [""],
    });
    console.log("[seed] About content migrated from static data");
  }

  if (!contactExists) {
    await ContactModel.create({
      addresses: [
        {
          label: "Head Office",
          address: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.state}`,
        },
      ],
      phone: SITE.phone,
      email: SITE.email,
      whatsapp: SITE.whatsapp,
      mapUrl: SITE.mapEmbed,
      businessHours: SITE.hours,
    });
    console.log("[seed] Contact content migrated from static data");
  }
}
