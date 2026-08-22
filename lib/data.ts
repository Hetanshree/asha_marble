/** Appends the "Rs" currency marker after a numeric price (e.g. "95" -> "95 Rs").
 *  Uses a non-breaking space so the number and "Rs" never wrap onto separate
 *  lines. Leaves non-numeric prices (e.g. "On Request") untouched. */
export function formatPrice(price: string): string {
  return /^[\d,.]+$/.test(price.trim()) ? `${price} Rs` : price;
}

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  unit: string;
  shortDescription: string;
  description: string;
  images: string[];
  finish?: string[];
  thickness?: string;
  availability: "available" | "limited" | "on-request";
  featured: boolean;
  tags?: string[];
};

export const CATEGORIES = [
  "Jaisalmer Yellow Marble",
  "Jaisalmer Yellow Sandstone",
  "Natural Jaisalmer Stone",
  "Wall Cladding",
  "Exterior Elevation",
  "Stone Jali",
  "Carved Stone Work",
  "Other Natural Stones",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "jaisalmer-yellow-marble-slab",
    name: "Jaisalmer Yellow Marble Slab",
    category: "Jaisalmer Yellow Marble",
    price: "₹85",
    unit: "per sq. ft.",
    shortDescription: "Signature golden-yellow marble with natural veining, sourced directly from Jaisalmer quarries.",
    description: "Our Jaisalmer Yellow Marble is quarried from the ancient golden limestone formations of Rajasthan. Each slab carries warm golden hues and distinctive natural veining that make this stone a preferred choice for luxury interiors, heritage restorations, and premium architectural projects. Available in polished, honed, and brushed finishes. Suitable for flooring, wall cladding, countertops, and decorative features.",
    images: [
      "https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png",
      "https://images.unsplash.com/photo-1615971677499-5467cbab01b0?w=800&q=80",
    ],
    finish: ["Polished", "Honed", "Brushed"],
    thickness: "16–20 mm",
    availability: "available",
    featured: true,
    tags: ["flooring", "wall", "countertop"],
  },
  {
    id: "jaisalmer-yellow-sandstone-tiles",
    name: "Jaisalmer Yellow Sandstone Tiles",
    category: "Jaisalmer Yellow Sandstone",
    price: "₹55",
    unit: "per sq. ft.",
    shortDescription: "Natural sandstone tiles with warm honey-gold tones for exterior and interior applications.",
    description: "Jaisalmer Yellow Sandstone has been the building material of choice for Rajasthan's palaces and temples for centuries. Our sandstone tiles are precision-cut and calibrated for modern construction. Weather-resistant and suitable for both interior and exterior applications including flooring, wall cladding, pathways, and pool surrounds.",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    ],
    finish: ["Natural", "Rough", "Honed"],
    thickness: "18–22 mm",
    availability: "available",
    featured: true,
    tags: ["flooring", "exterior", "wall"],
  },
  {
    id: "stone-wall-cladding",
    name: "Natural Stone Wall Cladding Panels",
    category: "Wall Cladding",
    price: "₹75",
    unit: "per sq. ft.",
    shortDescription: "Handcrafted stone cladding panels for stunning interior and exterior feature walls.",
    description: "Wall cladding panels handcrafted from premium Jaisalmer stone, creating dramatic textured surfaces that transform any wall. Available in split-face, brushed, and dressed finishes. Each panel is calibrated for easy installation. Ideal for living room accent walls, hotel lobbies, retail interiors, and exterior facades.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    finish: ["Split Face", "Brushed", "Dressed"],
    availability: "available",
    featured: true,
    tags: ["interior", "exterior", "feature-wall"],
  },
  {
    id: "exterior-elevation-stone",
    name: "Exterior Elevation Stone",
    category: "Exterior Elevation",
    price: "₹65",
    unit: "per sq. ft.",
    shortDescription: "Durable natural stone for building facades and exterior elevations with timeless appeal.",
    description: "Premium exterior elevation stones from weather-resistant Jaisalmer sandstone and marble. Specifically treated to withstand Indian climate conditions while maintaining their golden hue. Available in multiple profiles, sizes, and finishes. Suitable for residential bungalows, commercial buildings, and institutional architecture.",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    finish: ["Rough", "Dressed", "Textured"],
    availability: "available",
    featured: false,
    tags: ["exterior", "elevation", "facade"],
  },
  {
    id: "carved-stone-jali",
    name: "Hand-Carved Stone Jali Screen",
    category: "Stone Jali",
    price: "₹1,200",
    unit: "per sq. ft.",
    shortDescription: "Intricately hand-carved stone jali screens in traditional Rajasthani geometric patterns.",
    description: "Carved by master artisans using techniques passed down through generations. Each piece is hand-carved from premium Jaisalmer stone, creating intricate geometric and floral patterns. Available in standard patterns or custom designs. Used for partitions, window screens, balustrades, and decorative panels in residential and hospitality projects.",
    images: [
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80",
    ],
    availability: "limited",
    featured: true,
    tags: ["decorative", "partition", "artisan"],
  },
  {
    id: "carved-stone-columns",
    name: "Carved Stone Columns & Pillars",
    category: "Carved Stone Work",
    price: "On Request",
    unit: "per piece",
    shortDescription: "Majestic hand-carved stone columns and pillars for grand architectural statements.",
    description: "Architectural masterpieces, each individually crafted by skilled stone carvers from Rajasthan. Available in classical, Indo-Saracenic, and contemporary designs. Custom dimensions, profiles, and capital designs available. Suitable for palatial homes, resort lobbies, temples, and institutional buildings.",
    images: [
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    availability: "on-request",
    featured: false,
    tags: ["decorative", "architectural", "artisan"],
  },
  {
    id: "jaisalmer-stone-flooring",
    name: "Jaisalmer Stone Flooring",
    category: "Natural Jaisalmer Stone",
    price: "₹70",
    unit: "per sq. ft.",
    shortDescription: "Classic natural stone flooring with the iconic warmth of Jaisalmer golden stone.",
    description: "Bring the warmth of Rajasthan's golden stone to your floors. Available in multiple sizes from 12×12 to 24×24 inches and custom cuts. Our flooring stones are calibrated to precise thickness for seamless installation. Natural variation in tone creates a rich, organic floor surface that improves with age.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    ],
    finish: ["Polished", "Honed", "Antique"],
    thickness: "16–18 mm",
    availability: "available",
    featured: true,
    tags: ["flooring", "indoor", "outdoor"],
  },
  {
    id: "stone-fountain-water-feature",
    name: "Decorative Stone Fountain",
    category: "Carved Stone Work",
    price: "On Request",
    unit: "per piece",
    shortDescription: "Handcrafted stone fountains and water features in traditional Rajasthani style.",
    description: "Carved from single or multiple blocks of premium Jaisalmer marble and sandstone. Each fountain features intricate relief carving on the basin, tiered levels, and decorative spouts. Waterproofing treatment applied during finishing. Custom sizes available. Ideal for hotels, resorts, luxury residences, and public spaces.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    availability: "on-request",
    featured: false,
    tags: ["decorative", "outdoor", "water-feature"],
  },
  {
    id: "sandstone-cobbles-pavers",
    name: "Sandstone Cobbles & Pavers",
    category: "Jaisalmer Yellow Sandstone",
    price: "₹45",
    unit: "per sq. ft.",
    shortDescription: "Natural sandstone cobbles and pavers for driveways, pathways, and landscaping.",
    description: "Our sandstone cobbles and pavers combine the natural beauty of Jaisalmer stone with practical durability. Perfect for driveways, garden pathways, courtyards, and pool surrounds. Available in multiple sizes and natural finishes that provide grip and aesthetic appeal. Resistant to weathering and heavy foot traffic.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png",
    ],
    finish: ["Natural", "Rough", "Tumbled"],
    availability: "available",
    featured: false,
    tags: ["outdoor", "landscaping", "paving"],
  },
  {
    id: "marble-fireplace-surround",
    name: "Marble Fireplace Surround",
    category: "Carved Stone Work",
    price: "On Request",
    unit: "per piece",
    shortDescription: "Bespoke hand-carved marble fireplace surrounds crafted to your specifications.",
    description: "Our bespoke fireplace surrounds are carved from premium Jaisalmer Yellow Marble and sandstone. Each piece is uniquely crafted to complement your interior style. Available in classical, Mughal-inspired, and contemporary designs. Custom dimensions and relief carving patterns. A centrepiece that lasts for generations.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1615971677499-5467cbab01b0?w=800&q=80",
    ],
    availability: "on-request",
    featured: false,
    tags: ["interior", "decorative", "fireplace"],
  },
  {
    id: "granite-countertop",
    name: "Natural Stone Countertop",
    category: "Other Natural Stones",
    price: "₹120",
    unit: "per sq. ft.",
    shortDescription: "Premium natural stone countertops for kitchen, bathroom, and bar applications.",
    description: "Our natural stone countertops are precision-engineered from premium Jaisalmer marble and sandstone. Heat-resistant, durable, and uniquely beautiful. Available with square, bullnose, or bevelled edge profiles. Custom sizes cut to your exact specifications. With proper care, these countertops last a lifetime.",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    ],
    finish: ["Polished", "Honed"],
    availability: "available",
    featured: false,
    tags: ["kitchen", "bathroom", "countertop"],
  },
  {
    id: "stone-border-inlay",
    name: "Stone Border & Inlay Work",
    category: "Other Natural Stones",
    price: "₹250",
    unit: "per running ft.",
    shortDescription: "Decorative stone borders and inlay work for premium flooring and wall applications.",
    description: "Our stone borders and inlay work add a sophisticated finishing touch to any marble or stone floor. Hand-crafted from Jaisalmer stone in a variety of geometric and floral patterns. Can be combined with other stone types for dramatic contrast effects. Custom widths and patterns available on request.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
    ],
    availability: "available",
    featured: false,
    tags: ["decorative", "flooring", "inlay"],
  },
];

export const SITE = {
  name: "Asha Marble & Art Work",
  tagline: "Purveyors of Premium Jaisalmer Stone",
  description:
    "Leading manufacturer, supplier, wholesaler, and exporter of premium Jaisalmer Yellow Marble, Sandstone, and Natural Stone products from Ahmedabad, Gujarat.",
  phone: "089556 22560",
  phoneRaw: "08955622560",
  whatsapp: "918955622560",
  email: "info@ashamarble.com",
  address: {
    line1: "102-10, Sajanad Complex, 1st Floor",
    line2: "Chimanlal Girdharlal Rd, Swastik Society",
    city: "Navrangpura, Ahmedabad",
    state: "Gujarat 380009",
  },
  mapUrl: "https://maps.google.com/?q=Asha+Marble+Art+Work+Navrangpura+Ahmedabad",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d72.5714!3d23.0395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzIyLjIiTiA3MsKwMzQnMTcuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "10:00 AM – 4:00 PM" },
  ],
  // Real values from the Asha Stone Google Business listing:
  // https://share.google/ZAwPhRrL7K2HHhym2 (checked manually — update here if it changes,
  // or set up live Google Places API sync for automatic updates)
  rating: "4.8",
  reviews: "11",
  founded: "2003",
};

export const HERO_SLIDES = [
  {
    image: "https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png",
    eyebrow: "Jaisalmer Yellow Marble",
    headline: "The Golden Stone\nof Rajasthan",
    sub: "Premium marble and natural stone, direct from source.",
    cta: { label: "Explore Collection", href: "/products" },
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=85",
    eyebrow: "Wall Cladding & Elevation",
    headline: "Where Craft\nMeets Architecture",
    sub: "Handcrafted stone panels for interiors and facades that endure.",
    cta: { label: "View Stone Cladding", href: "/products?category=Wall+Cladding" },
  },
  {
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1800&q=85",
    eyebrow: "Stone Jali & Carved Work",
    headline: "Centuries of\nRajasthani Artistry",
    sub: "Hand-carved stone jali and decorative work by master artisans.",
    cta: { label: "See Carved Stone", href: "/products?category=Stone+Jali" },
  },
];

// Sourced from real Google reviews on the Asha Stone Google Business listing
// (4.8★ overall, 11 reviews): https://share.google/ZAwPhRrL7K2HHhym2
export const TESTIMONIALS = [
  {
    name: "Darshan Bhootra",
    role: "Google Review",
    text: "Hritik has arranged Jaisalmer yellow stone and marble directly at our site at the best rate as compared to other vendors.",
    rating: 5,
  },
  {
    name: "Krishnabhootra",
    role: "Google Review",
    text: "Mr Hritik has given all details and comparison about Jaisalmer Yellow Marble and Jaisalmer Yellow Sandstone. We buy Jaisalmer Yellow Marble at very best rate from him.",
    rating: 5,
  },
  {
    name: "Priyanshi Sharma",
    role: "Google Review",
    text: "Premium quality of Jaisalmer Yellow Marble. Hritik bhai is a very genuine person, they helped us select a premium lot for our yellow marble stone.",
    rating: 5,
  },
];

// Uploaded to Cloudinary (asha-marble folder) — public/uploads is a gitignored
// local-dev-only folder and isn't available once the site is deployed, so
// gallery images must live on Cloudinary like every other content image.
export const GALLERY_IMAGES = [
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904452/asha-marble/ikxwdgmvokarordgqtqv.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904453/asha-marble/fnewmedz6apknmknsshq.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904454/asha-marble/darlxjtcdjiihyl9thby.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904455/asha-marble/gnsxpnvnwf2vrmunvjgp.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904456/asha-marble/shoo0ipwdqittrfc2oq3.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904457/asha-marble/mzqvxupfcxmhyeqr9tif.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904458/asha-marble/wbsvqq7e8ohfox23d7bt.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904459/asha-marble/bwylr4dxzteayz6larwo.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904460/asha-marble/hc5mthmteogephsywtpb.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904461/asha-marble/zg8ok814fxzocr8o73un.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904462/asha-marble/m4ed7ohnadxlfz7qt0ud.jpg",
  "https://res.cloudinary.com/uycfz4al/image/upload/v1786904463/asha-marble/wb4gubdv2aeubd6hve9u.jpg",
];

export const FAQS = [
  {
    q: "What types of stone do you supply?",
    a: "We specialise in Jaisalmer Yellow Marble, Jaisalmer Yellow Sandstone, and a full range of natural Jaisalmer stone products including wall cladding, exterior elevation stone, stone jali, and carved stone work.",
  },
  {
    q: "Do you supply in bulk / wholesale?",
    a: "Yes. We are manufacturers and wholesalers, supplying bulk quantities to builders, contractors, architects, and distributors across India and internationally. Contact us for bulk pricing.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Minimum order quantities vary by product. For flooring and cladding tiles, typically 100 sq. ft. For carved and custom work, orders are taken piece-by-piece. Contact us to discuss your requirements.",
  },
  {
    q: "Do you export outside India?",
    a: "Yes. We export to UAE, UK, USA, Australia, and Southeast Asia. We provide full export documentation, packaging, and logistics support for international orders.",
  },
  {
    q: "Can you make custom sizes and designs?",
    a: "Absolutely. We offer custom cutting, sizing, and design for all our stone products. Our carved stone work team can execute custom jali patterns, column designs, and decorative features to your specifications.",
  },
  {
    q: "How do I get samples before ordering?",
    a: "We provide stone samples for evaluation. Contact us via WhatsApp or phone to request samples. Sample couriers are available for a small fee which is refunded on your first order.",
  },
];
