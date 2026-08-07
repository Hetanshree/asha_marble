"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/data";

type ContactAddress = { label: string; address: string };
type ContactData = {
  addresses: ContactAddress[];
  phone: string;
  email: string;
  mapUrl: string;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((res) => setContact(res.data))
      .catch(() => setContact(null));
  }, []);

  const addresses: ContactAddress[] =
    contact?.addresses && contact.addresses.length > 0
      ? contact.addresses
      : [{ label: "", address: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.state}` }];
  const phone = contact?.phone || SITE.phone;
  const phoneRaw = phone.replace(/\D/g, "");
  const email = contact?.email || SITE.email;
  const mapUrl = contact?.mapUrl || SITE.mapUrl;

  return (
    <footer style={{ background: "var(--color-charcoal)", color: "var(--color-limestone)" }}>
      {/* Main */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px 48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ width: 88, height: 88, borderRadius: "8px", overflow: "hidden", background: "#fff", padding: 4, marginBottom: 16 }}>
            <Image src="/logo.jpeg" alt="Asha Marble & Art Work" width={200} height={200}
              style={{ width: "100%", height: "100%", objectFit: "contain" }} unoptimized />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "var(--color-gold)", letterSpacing: "0.06em", marginBottom: 4 }}>
            Asha Marble
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(212,201,176,0.5)", marginBottom: 20 }}>
            &amp; Art Work
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(212,201,176,0.7)", maxWidth: 260, marginBottom: 20 }}>
            Manufacturer, supplier, wholesaler &amp; exporter of premium Jaisalmer Yellow Marble and natural stone products since {SITE.founded}.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ color: "var(--color-gold)", fontSize: 14 }}>★</span>)}
            <span style={{ fontSize: 11, color: "rgba(212,201,176,0.5)", marginLeft: 4 }}>{SITE.rating} · {SITE.reviews}+ Reviews</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>Quick Links</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "All Products" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact Us" },
              { href: "/#gallery", label: "Gallery" },
              { href: "/#faq", label: "FAQs" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                style={{ fontSize: 12, color: "rgba(212,201,176,0.7)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,201,176,0.7)")}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>


        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>Contact Us</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {addresses.map((addr, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <MapPin size={14} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <address style={{ fontStyle: "normal", fontSize: 12, color: "rgba(212,201,176,0.7)", lineHeight: 1.7 }}>
                  {addr.label && (
                    <span style={{ display: "block", color: "#fff", fontWeight: 600, marginBottom: 2 }}>{addr.label}</span>
                  )}
                  {addr.address}
                </address>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Phone size={14} color="var(--color-gold)" />
              <a href={`tel:${phoneRaw}`} style={{ fontSize: 12, color: "rgba(212,201,176,0.7)" }}>{phone}</a>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Mail size={14} color="var(--color-gold)" />
              <a href={`mailto:${email}`} style={{ fontSize: 12, color: "rgba(212,201,176,0.7)" }}>{email}</a>
            </div>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                <ExternalLink size={11} /> View on Google Maps
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", maxWidth: 1280, margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 11, color: "rgba(212,201,176,0.4)" }}>
          © {year} Asha Marble &amp; Art Work. All rights reserved.
        </p>
        <p style={{ fontSize: 11, color: "rgba(212,201,176,0.4)" }}>
          Ahmedabad, Gujarat · India
        </p>
      </div>
    </footer>
  );
}
