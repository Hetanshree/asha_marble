"use client";
import "./globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import EnquireModal from "./components/EnquireModal";
import { SITE } from "@/lib/data";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Asha Marble &amp; Art Work | Jaisalmer Yellow Marble Supplier Ahmedabad</title>
        <meta name="description" content="Leading manufacturer, supplier, wholesaler &amp; exporter of Jaisalmer Yellow Marble, Sandstone, Stone Jali &amp; Carved Stone Work. Ahmedabad, Gujarat." />
        <meta name="keywords" content="Jaisalmer Yellow Marble, Jaisalmer Yellow Sandstone, marble supplier Ahmedabad, natural stone Gujarat, wall cladding, stone jali, marble manufacturer India, marble exporter" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Asha Marble &amp; Art Work | Premium Jaisalmer Yellow Marble" />
        <meta property="og:description" content="Manufacturer, supplier &amp; exporter of premium Jaisalmer Yellow Marble and natural stone from Ahmedabad, Gujarat." />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {!isAdmin && <TopBar onEnquire={() => setEnquireOpen(true)} />}
        {!isAdmin && <Navbar onEnquire={() => setEnquireOpen(true)} />}
        <main style={isAdmin ? undefined : { paddingTop: 108 }}>
          {children}
        </main>
        {!isAdmin && <Footer />}

        {/* Sticky WhatsApp bubble */}
        {!isAdmin && (
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="sticky-wa" aria-label="Chat on WhatsApp">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        )}

        {!isAdmin && enquireOpen && <EnquireModal onClose={() => setEnquireOpen(false)} />}
      </body>
    </html>
  );
}
