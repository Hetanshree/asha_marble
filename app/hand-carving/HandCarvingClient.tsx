"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  X,
  ZoomIn,
  Sparkles,
  ImageOff,
} from "lucide-react";
import { formatPrice } from "@/lib/data";

/* ─── Types ──────────────────────────────────────── */
type Highlight = { title: string; description: string };
type AboutData = {
  sectionLabel: string;
  heading: string;
  description: string;
  paragraphs: string[];
  images: string[];
  highlights: Highlight[];
};
type CustomData = { heading: string; description: string; ctaLabel: string };
type GalleryItem = { _id: string; image: string; title: string; description: string };
type ProductItem = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  dimensions: string;
  price: string;
  unit: string;
  shortDescription: string;
  description: string;
  images: string[];
  availability: "available" | "limited" | "on-request";
  featured: boolean;
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1753808013959-2c62f77f872d?w=1800&q=85";
const DEFAULT_ABOUT_IMAGE = "https://images.unsplash.com/photo-1769969232952-3469d4f23a20?w=900&q=80";
const CUSTOM_CTA_IMAGE = "https://images.unsplash.com/photo-1684064970985-69a98f178b94?w=1800&q=80";

/* ─── Reveal-on-scroll hook ──────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

const availabilityMap = {
  available: { label: "In Stock", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  limited: { label: "Limited Stock", bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  "on-request": { label: "On Request", bg: "var(--color-cream-dark)", color: "var(--color-umber)", border: "var(--color-limestone)" },
};

/* ─── Hero ───────────────────────────────────────── */
function HandCarvingHero() {
  return (
    <section style={{ position: "relative", minHeight: "min(72vh, 640px)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "var(--color-charcoal)" }}>
      <Image src={HERO_IMAGE} alt="Hand-carved marble and stone artistry" fill className="object-cover" priority unoptimized />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,22,0.92) 10%, rgba(28,26,22,0.55) 55%, rgba(28,26,22,0.35) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "140px 48px 64px" }} className="hc-hero-content">
        <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }} className="animate-fadeUp">
          <Link href="/" style={{ color: "inherit" }}>Home</Link><span>/</span>
          <span style={{ color: "var(--color-limestone)" }}>Explore Hand Carving</span>
        </div>
        <div className="label-with-line animate-fadeUp" style={{ marginBottom: 18, animationDelay: "80ms" }}>
          <span className="label">Master Artisans · Rajasthan</span>
        </div>
        <h1 className="animate-fadeUp" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 6vw, 100px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 22, maxWidth: 900, animationDelay: "160ms" }}>
          Explore Hand Carving
        </h1>
        <p className="animate-fadeUp" style={{ color: "rgba(212,201,176,0.82)", fontSize: 15, maxWidth: 480, lineHeight: 1.8, animationDelay: "260ms" }}>
          Discover the beauty of handcrafted artistry, detailed craftsmanship, and timeless designs — carved by master hands from Rajasthan&apos;s centuries-old stone tradition.
        </p>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .hc-hero-content { padding: 120px 20px 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── About ──────────────────────────────────────── */
function AboutSection({ about }: { about: AboutData }) {
  const { ref, vis } = useReveal();
  const paragraphs = about.description ? [about.description, ...about.paragraphs] : about.paragraphs;
  const images = about.images.length > 0 ? about.images : [DEFAULT_ABOUT_IMAGE];

  return (
    <section ref={ref} style={{ padding: "96px 0", background: "var(--color-cream)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gap: 64, alignItems: "center" }} className="hc-about-grid">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div className="label-with-line" style={{ marginBottom: 16 }}><span className="label">{about.sectionLabel}</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.15, marginBottom: 20 }}>
            {about.heading}
          </h2>
          <div className="gold-line" />
          {paragraphs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: about.highlights.length > 0 ? 28 : 0 }}>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.9 }}>{p}</p>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 14, color: "var(--color-umber)", lineHeight: 1.9, marginBottom: about.highlights.length > 0 ? 28 : 0 }}>
              Content for this section is coming soon.
            </p>
          )}
          {about.highlights.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px,100%),1fr))", gap: 14 }}>
              {about.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", background: "#fff", border: "1px solid var(--color-limestone)" }}>
                  <Sparkles size={15} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-charcoal)" }}>{h.title}</div>
                    {h.description && <div style={{ fontSize: 12, color: "var(--color-umber)", marginTop: 3, lineHeight: 1.6 }}>{h.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: "relative", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" }}>
          <div style={{ display: "grid", gridTemplateColumns: images.length > 1 ? "1fr 1fr" : "1fr", gap: 8 }}>
            {images.slice(0, 4).map((img, i) => (
              <div key={i} style={{ aspectRatio: images.length > 1 ? "1/1" : "4/3", position: "relative", overflow: "hidden", gridColumn: images.length === 3 && i === 0 ? "1 / span 2" : undefined }}>
                <Image src={img} alt="Hand-carved stone artistry" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hc-about-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        @media (max-width: 900px) {
          .hc-about-grid { grid-template-columns: minmax(0,1fr); }
        }
      `}</style>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────── */
function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  const { ref, vis } = useReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [lightboxIndex, gallery.length]);

  return (
    <section id="carving-gallery" ref={ref} style={{ padding: "96px 0", background: "var(--color-charcoal)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">Hand Carving Gallery</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "#fff" }}>
            Craftsmanship in Every Detail
          </h2>
        </div>

        {gallery.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 24px", border: "1px dashed rgba(255,255,255,0.15)" }}>
            <ImageOff size={32} color="var(--color-gold)" style={{ margin: "0 auto 16px", opacity: 0.7 }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "#fff", marginBottom: 6 }}>Gallery coming soon</p>
            <p style={{ fontSize: 13, color: "rgba(212,201,176,0.6)" }}>Photos of our hand-carved work will appear here shortly.</p>
          </div>
        ) : (
          <div className="hc-masonry">
            {gallery.map((g, i) => (
              <button
                key={g._id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="hc-masonry-item"
                style={{
                  position: "relative", display: "block", width: "100%", border: "none", padding: 0, cursor: "zoom-in",
                  breakInside: "avoid", marginBottom: 12, overflow: "hidden", background: "var(--color-charcoal-light)",
                  opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ${i * 60}ms ease, transform 0.6s ${i * 60}ms ease`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt={g.title || "Hand-carved stone work"} loading="lazy" style={{ width: "100%", display: "block", transition: "transform 0.5s ease" }} className="hc-masonry-img" />
                <div className="hc-masonry-overlay" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16, background: "linear-gradient(to top, rgba(28,26,22,0.88), transparent 55%)", opacity: 0, transition: "opacity 0.3s ease" }}>
                  <ZoomIn size={16} color="var(--color-gold)" style={{ position: "absolute", top: 14, right: 14 }} />
                  {g.title && <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", textAlign: "left" }}>{g.title}</span>}
                  {g.description && <span style={{ fontSize: 11, color: "rgba(212,201,176,0.75)", marginTop: 4, textAlign: "left", lineHeight: 1.5 }}>{g.description}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          role="dialog" aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setLightboxIndex(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,9,7,0.94)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <button onClick={() => setLightboxIndex(null)} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <X size={26} />
          </button>
          {gallery.length > 1 && (
            <button onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={20} />
            </button>
          )}
          <div style={{ maxWidth: "min(920px, 92vw)", maxHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[lightboxIndex].image} alt={gallery[lightboxIndex].title || "Hand-carved stone work"} style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }} />
            {(gallery[lightboxIndex].title || gallery[lightboxIndex].description) && (
              <div style={{ textAlign: "center" }}>
                {gallery[lightboxIndex].title && <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "#fff" }}>{gallery[lightboxIndex].title}</div>}
                {gallery[lightboxIndex].description && <div style={{ fontSize: 13, color: "rgba(212,201,176,0.75)", marginTop: 6, maxWidth: 520 }}>{gallery[lightboxIndex].description}</div>}
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <button onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)} aria-label="Next"
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}

      <style>{`
        .hc-masonry { column-count: 3; column-gap: 12px; }
        .hc-masonry-item:hover .hc-masonry-img { transform: scale(1.06); }
        .hc-masonry-item:hover .hc-masonry-overlay { opacity: 1; }
        @media (max-width: 900px) { .hc-masonry { column-count: 2; } }
        @media (max-width: 480px) { .hc-masonry { column-count: 1; } }
      `}</style>
    </section>
  );
}

/* ─── Products ───────────────────────────────────── */
function ProductsSection({ products, whatsapp }: { products: ProductItem[]; whatsapp: string }) {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState<ProductItem | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  function openProduct(p: ProductItem) {
    setActive(p);
    setActiveImage(0);
  }

  return (
    <section ref={ref} style={{ padding: "96px 0", background: "var(--color-cream-dark)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">Shop the Collection</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "var(--color-charcoal)" }}>
            Explore Our Carving Products
          </h2>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 24px", border: "1px dashed var(--color-limestone)", background: "#fff" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--color-charcoal)", marginBottom: 6 }}>Products coming soon</p>
            <p style={{ fontSize: 13, color: "var(--color-umber)" }}>Our hand-carved product collection will be listed here shortly.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%),1fr))", gap: 24 }}>
            {products.map((p, i) => {
              const av = availabilityMap[p.availability];
              return (
                <div key={p._id} className="product-card"
                  style={{ background: "#fff", border: "1px solid var(--color-limestone)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `opacity 0.6s ${i * 70}ms, transform 0.6s ${i * 70}ms` }}>
                  <div className="card-img" style={{ aspectRatio: "4/3", position: "relative", background: "var(--color-cream)" }}>
                    {p.images[0] && <Image src={p.images[0]} alt={p.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 280px" />}
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(28,26,22,0.82)", padding: "4px 10px" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>{p.category}</span>
                    </div>
                    {p.featured && (
                      <div style={{ position: "absolute", top: 12, right: 12, background: "var(--color-gold)", padding: "4px 8px" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: "var(--color-charcoal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--color-charcoal)", marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ fontSize: 12, color: "var(--color-umber)", lineHeight: 1.6, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {p.shortDescription}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-limestone)", paddingTop: 14, marginBottom: 14 }}>
                      <div>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--color-gold)", fontVariantNumeric: "lining-nums" }}>{formatPrice(p.price)}</span>
                        {p.price !== "On Request" && <span style={{ fontSize: 11, color: "var(--color-umber)", marginLeft: 4 }}>{p.unit}</span>}
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 8px", background: av.bg, color: av.color, border: `1px solid ${av.border}` }}>
                        {av.label}
                      </span>
                    </div>
                    <button onClick={() => openProduct(p)} className="btn-outline-dark" style={{ width: "100%", justifyContent: "center" }}>
                      View Details <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product detail modal */}
      {active && (
        <div className="enquire-overlay" style={{ alignItems: "center" }} onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <div className="enquire-box" style={{ maxWidth: 880, padding: 0, overflow: "hidden" }}>
            <button onClick={() => setActive(null)} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, zIndex: 2, background: "rgba(28,26,22,0.6)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
              <X size={16} />
            </button>
            <div className="hc-modal-grid" style={{ display: "grid", maxHeight: "85vh", overflowY: "auto" }}>
              <div style={{ background: "var(--color-cream-dark)" }}>
                <div style={{ aspectRatio: "1/1", position: "relative" }}>
                  {active.images[activeImage] && (
                    <Image src={active.images[activeImage]} alt={active.name} fill className="object-contain" unoptimized />
                  )}
                </div>
                {active.images.length > 1 && (
                  <div style={{ display: "flex", gap: 8, padding: 12, overflowX: "auto" }}>
                    {active.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} style={{ width: 56, height: 56, flexShrink: 0, position: "relative", border: i === activeImage ? "2px solid var(--color-gold)" : "2px solid var(--color-limestone)", padding: 0, cursor: "pointer", background: "#fff" }}>
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ padding: 32 }}>
                <div className="label-with-line" style={{ marginBottom: 10 }}><span className="label">{active.category}</span></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, color: "var(--color-charcoal)", marginBottom: 12, lineHeight: 1.15 }}>{active.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, color: "var(--color-gold)", fontVariantNumeric: "lining-nums" }}>{formatPrice(active.price)}</span>
                  {active.price !== "On Request" && <span style={{ fontSize: 12, color: "var(--color-umber)" }}>{active.unit}</span>}
                </div>
                <p style={{ fontSize: 13, color: "var(--color-charcoal)", lineHeight: 1.8, marginBottom: 20 }}>{active.description || active.shortDescription}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {active.material && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 4 }}>Material</div>
                      <div style={{ fontSize: 13, color: "var(--color-charcoal)" }}>{active.material}</div>
                    </div>
                  )}
                  {active.dimensions && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 4 }}>Dimensions</div>
                      <div style={{ fontSize: 13, color: "var(--color-charcoal)" }}>{active.dimensions}</div>
                    </div>
                  )}
                </div>
                <a href={`https://wa.me/${whatsapp}?text=Hi, I am interested in ${active.name} (${formatPrice(active.price)} ${active.unit}). Please share details.`}
                  target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  <MessageCircle size={14} /> WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .hc-modal-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 700px) { .hc-modal-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ─── Custom carving CTA ─────────────────────────── */
function CustomSection({ custom, phone, phoneRaw, whatsapp }: { custom: CustomData; phone: string; phoneRaw: string; whatsapp: string }) {
  return (
    <section style={{ position: "relative", padding: "100px 0", overflow: "hidden", background: "var(--color-charcoal)" }}>
      <Image src={CUSTOM_CTA_IMAGE} alt="Custom hand carving" fill className="object-cover" unoptimized />
      <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,22,0.85)" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 16 }}><span className="label">Bespoke Craftsmanship</span></div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,64px)", fontWeight: 300, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
          {custom.heading}
        </h2>
        <p style={{ color: "rgba(212,201,176,0.78)", fontSize: 14, lineHeight: 1.8, marginBottom: 40, maxWidth: 620, margin: "0 auto 40px" }}>
          {custom.description}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-gold">{custom.ctaLabel} <ArrowRight size={14} /></Link>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><MessageCircle size={14} /> WhatsApp</a>
          {phone && <a href={`tel:${phoneRaw}`} className="btn-outline-light"><Phone size={14} /> {phone}</a>}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function HandCarvingClient({
  about, custom, gallery, products, phone, phoneRaw, whatsapp,
}: {
  about: AboutData;
  custom: CustomData;
  gallery: GalleryItem[];
  products: ProductItem[];
  phone: string;
  phoneRaw: string;
  whatsapp: string;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      <HandCarvingHero />
      <AboutSection about={about} />
      <GallerySection gallery={gallery} />
      <ProductsSection products={products} whatsapp={whatsapp} />
      <CustomSection custom={custom} phone={phone} phoneRaw={phoneRaw} whatsapp={whatsapp} />
    </div>
  );
}
