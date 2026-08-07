"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/data";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onEnquire }: { onEnquire: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = isHome
    ? scrolled ? "rgba(28,26,22,0.97)" : "transparent"
    : "var(--color-charcoal)";
  const navBorder = scrolled || !isHome ? "1px solid rgba(255,255,255,0.08)" : "none";

  return (
    <header style={{
      position: "fixed", top: scrolled ? 0 : 40, left: 0, right: 0, zIndex: 100,
      background: navBg, backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: navBorder,
      transition: "background 0.4s, backdrop-filter 0.4s, top 0.3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, lineHeight: 1 }}>
          <div style={{ width: 44, height: 44, flexShrink: 0 }}>
            <Image src="/logo.jpeg" alt="Asha Marble & Art Work" width={120} height={120}
              style={{ width: "100%", height: "100%", objectFit: "contain" }} unoptimized priority />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 300, color: "var(--color-gold)", letterSpacing: "0.06em" }}>
              Asha Marble
            </span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-limestone)", marginTop: 2 }}>
              &amp; Art Work · Est. {SITE.founded}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
              style={{ color: pathname === item.href ? "var(--color-gold)" : "var(--color-limestone)" }}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="desktop-nav">
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#25D366", border: "1px solid #25D366", padding: "8px 16px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#25D366"; }}>
            WhatsApp
          </a>
          <button onClick={onEnquire} className="btn-gold" style={{ padding: "9px 20px", fontSize: 10 }}>
            Get Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-nav-toggle" onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-limestone)", padding: 4 }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ background: "var(--color-charcoal)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {NAV.map((item) => (
              <Link key={item.label} href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-limestone)" }}>
                {item.label}
              </Link>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            <a href={`tel:${SITE.phoneRaw}`} className="btn-outline-light" style={{ justifyContent: "center" }}>Call Now</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: "center" }}>WhatsApp Us</a>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav-toggle { display: none; }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
