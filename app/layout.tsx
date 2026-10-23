import "./globals.css";
import type { Metadata } from "next";
import SiteChrome from "./components/SiteChrome";
import { SITE_URL, DEFAULT_OG_IMAGE, GOOGLE_SITE_VERIFICATION, jsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jaisalmer Yellow Marble & Stone Supplier | Asha Marble & Art Work",
    template: "%s | Asha Marble & Art Work",
  },
  description:
    "Manufacturer, supplier, wholesaler & exporter of Jaisalmer Yellow Marble, Jaisalmer Yellow Sandstone, stone wall cladding, stone jali & hand-carved stone work. Best prices, pan-India & export delivery.",
  keywords: [
    "Jaisalmer marble",
    "Jaisalmer yellow marble",
    "Jaisalmer yellow stone",
    "Jaisalmer yellow sandstone",
    "Jaisalmer stone price",
    "Jaisalmer marble supplier",
    "yellow marble supplier India",
    "stone wall cladding",
    "stone jali",
    "marble exporter India",
  ],
  applicationName: "Asha Marble & Art Work",
  openGraph: {
    type: "website",
    siteName: "Asha Marble & Art Work",
    locale: "en_IN",
    title: "Jaisalmer Yellow Marble & Stone Supplier | Asha Marble & Art Work",
    description:
      "Manufacturer, supplier & exporter of premium Jaisalmer Yellow Marble and natural stone.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Asha Marble & Art Work" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd)} />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
