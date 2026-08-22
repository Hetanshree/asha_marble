export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superadmin";
  active: boolean;
  createdAt: string;
};

export type Availability = "available" | "limited" | "on-request";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  unit: string;
  shortDescription: string;
  description: string;
  images: string[];
  cloudinaryPublicIds: string[];
  availability: Availability;
  featured: boolean;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type About = {
  title: string;
  description: string;
  mission: string;
  vision: string;
  experience: string;
  images: string[];
  cloudinaryPublicIds: string[];
};

export type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  photo: string;
  photoPublicId: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BusinessHour = { days: string; time: string };
export type ContactAddress = { label: string; address: string };

export type Contact = {
  addresses: ContactAddress[];
  phone: string;
  email: string;
  whatsapp: string;
  mapUrl: string;
  businessHours: BusinessHour[];
};

export type HeroSlide = {
  eyebrow: string;
  headline: string;
  sub: string;
  image: string;
  imagePublicId: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Homepage = {
  heroSlides: HeroSlide[];
  featuredProducts: Product[];
};

export type HandCarvingHighlight = { title: string; description: string };

export type HandCarvingAbout = {
  sectionLabel: string;
  heading: string;
  description: string;
  paragraphs: string[];
  images: string[];
  cloudinaryPublicIds: string[];
  highlights: HandCarvingHighlight[];
};

export type HandCarvingCustom = {
  heading: string;
  description: string;
  ctaLabel: string;
};

export type HandCarvingGalleryItem = {
  _id: string;
  image: string;
  imagePublicId: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HandCarvingProduct = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  material: string;
  dimensions: string;
  price: string;
  unit: string;
  shortDescription: string;
  description: string;
  images: string[];
  cloudinaryPublicIds: string[];
  availability: Availability;
  featured: boolean;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  recentlyAddedProducts: Product[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
