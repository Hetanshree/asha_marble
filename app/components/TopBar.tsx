"use client";
import { Phone, Mail, Download } from "lucide-react";
import { SITE } from "@/lib/data";
import { useState } from "react";

export default function TopBar({ onEnquire }: { onEnquire: () => void }) {
  return (
    <div style={{ background: "var(--color-charcoal)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href={`tel:${SITE.phoneRaw}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-limestone)", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }}>
            <Phone size={11} color="var(--color-gold)" />
            Call Stone Expert: <strong style={{ color: "#fff" }}>{SITE.phone}</strong>
          </a>
          <a href={`mailto:${SITE.email}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-limestone)", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }} className="hidden-mobile">
            <Mail size={11} color="var(--color-gold)" />
            {SITE.email}
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-limestone)", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }}>
            <Download size={11} color="var(--color-gold)" />
            Download Catalogue
          </a>
          <button onClick={onEnquire} style={{ background: "var(--color-gold)", color: "var(--color-charcoal)", border: "none", padding: "6px 16px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
            Enquire Now
          </button>
        </div>
      </div>
      <style>{`.hidden-mobile { display: flex; } @media(max-width:640px){.hidden-mobile{display:none!important;}}`}</style>
    </div>
  );
}
