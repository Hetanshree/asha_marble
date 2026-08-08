"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export type BusinessHour = { days: string; time: string };
export type ContactAddress = { label: string; address: string };

export type ContactClientProps = {
  addresses: ContactAddress[];
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  mapUrl: string;
  businessHours: BusinessHour[];
};

export default function ContactClient({ addresses, phone, phoneRaw, email, whatsapp, businessHours }: ContactClientProps) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
        <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" alt="Contact Asha Marble" fill className="object-cover" unoptimized priority />
        <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,22,0.8)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1280, margin: "0 auto", padding: "0 24px 48px", width: "100%" }}>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link><span>/</span>
            <span style={{ color: "var(--color-limestone)" }}>Contact</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#fff" }}>Contact Us</h1>
        </div>
      </div>

      {/* Quick action bar */}
      <div style={{ background: "var(--color-gold)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: 0 }}>
          {[
            { icon: <Phone size={14} />, label: "Call Now", sub: phone, href: `tel:${phoneRaw}` },
            { icon: <MessageCircle size={14} />, label: "WhatsApp", sub: "Chat Instantly", href: `https://wa.me/${whatsapp}` },
            { icon: <Mail size={14} />, label: "Email Us", sub: email, href: `mailto:${email}` },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ flex: 1, minWidth: 160, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12, borderRight: "1px solid rgba(28,26,22,0.12)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(28,26,22,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <div style={{ color: "var(--color-charcoal)" }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-charcoal)", opacity: 0.7 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-charcoal)" }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="contact-info-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px" }}>
        <div className="label-with-line" style={{ marginBottom: 16 }}><span className="label">Contact Information</span></div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.2, marginBottom: 16 }}>
          We&apos;d Love to Hear<br />From You
        </h2>
        <div className="gold-line" />
        <p style={{ fontSize: 14, color: "var(--color-umber)", lineHeight: 1.9, marginBottom: 36 }}>
          Whether you&apos;re an architect, builder, interior designer, or homeowner, we&apos;re here to help you find the perfect natural stone for your project.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {addresses.map((addr, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 40, height: 40, background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={16} color="var(--color-gold)" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 4 }}>{addr.label || "Our Address"}</div>
                <p style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.7 }}>{addr.address}</p>
              </div>
            </div>
          ))}
          {[
            { icon: <Phone size={16} color="var(--color-gold)" />, title: "Phone", content: phone, href: `tel:${phoneRaw}` },
            { icon: <Mail size={16} color="var(--color-gold)" />, title: "Email", content: email, href: `mailto:${email}` },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 40, height: 40, background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 4 }}>{item.title}</div>
                <a href={item.href} style={{ fontSize: 14, color: "var(--color-charcoal)", wordBreak: "break-word" }}>{item.content}</a>
              </div>
            </div>
          ))}

          {/* Hours */}
          {businessHours.length > 0 && (
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 40, height: 40, background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock size={16} color="var(--color-gold)" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 8 }}>Business Hours</div>
                {businessHours.map(h => (
                  <div key={h.days} style={{ fontSize: 13, color: "var(--color-charcoal)", lineHeight: 1.8 }}>
                    <span style={{ fontWeight: 600 }}>{h.days}:</span> {h.time}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a href={`tel:${phoneRaw}`} className="btn-outline-dark">
            <Phone size={14} /> Call Now
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .contact-info-wrap { padding: 48px 20px; }
        }
      `}</style>
    </div>
  );
}
