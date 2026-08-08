"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageCircle, Star, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { SITE, CATEGORIES, TESTIMONIALS, GALLERY_IMAGES, FAQS } from "@/lib/data";

export type HeroSlideData = {
  eyebrow: string;
  headline: string;
  sub: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FeaturedProductData = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  shortDescription: string;
  images: string[];
  availability: "available" | "limited" | "on-request";
};

type HomeClientProps = {
  heroSlides: HeroSlideData[];
  featuredProducts: FeaturedProductData[];
  phone: string;
  phoneRaw: string;
  whatsapp: string;
};

/* ─── Reveal hook ─────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ─── Counter ────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0); const { ref, vis } = useReveal();
  useEffect(() => {
    if (!vis) return;
    let v = 0; const step = Math.ceil(to / 55);
    const t = setInterval(() => { v += step; if (v >= to) { setN(to); clearInterval(t); } else setN(v); }, 22);
    return () => clearInterval(t);
  }, [vis, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Hero Slider ────────────────────────────────── */
function HeroSlider({ slides, phone, phoneRaw, whatsapp }: { slides: HeroSlideData[]; phone: string; phoneRaw: string; whatsapp: string }) {
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = slides.length;

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCur((idx + total) % total); setAnimating(false); }, 50);
  };

  useEffect(() => {
    if (total < 2) return;
    const t = setInterval(() => go(cur + 1), 5500);
    return () => clearInterval(t);
  }, [cur, total]);

  if (total === 0) return null;
  const slide = slides[cur];

  return (
    <section style={{ position: "relative", minHeight: "max(580px, calc(100vh - 68px))", overflow: "hidden", background: "var(--color-charcoal)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Bg images */}
      {slides.map((s, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          opacity: i === cur ? 1 : 0,
          transition: "opacity 0.9s ease",
        }}>
          <Image src={s.image} alt={s.eyebrow} fill className="object-cover" priority={i === 0} unoptimized />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,26,22,0.88) 45%, rgba(28,26,22,0.4) 100%)" }} />
        </div>
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "40px 0" }} className="hero-content">
        <div className="label-with-line" style={{ marginBottom: 20 }}>
          <span className="label">{slide.eyebrow}</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 80px)",
          fontWeight: 300, color: "#fff", lineHeight: 1.15,
          marginBottom: 24, marginTop: 4, maxWidth: 900,
          whiteSpace: "pre-line",
        }}>
          {slide.headline}
        </h1>
        <p style={{ color: "rgba(212,201,176,0.8)", fontSize: 15, maxWidth: 440, lineHeight: 1.7, marginBottom: 40 }}>
          {slide.sub}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          {slide.ctaHref && (
            <Link href={slide.ctaHref} className="btn-gold">{slide.ctaLabel || "Explore"} <ArrowRight size={14} /></Link>
          )}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a href={`tel:${phoneRaw}`} className="btn-outline-light">
            <Phone size={14} /> {phone}
          </a>
        </div>
      </div>

      {/* Slide counter + nav */}
      {total > 1 && (
        <div style={{ position: "absolute", bottom: 32, zIndex: 3, display: "flex", alignItems: "center", gap: 16 }} className="hero-nav-controls">
          <button onClick={() => go(cur - 1)} style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-gold)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}>
            <ChevronLeft size={16} />
          </button>
          <span style={{ color: "var(--color-limestone)", fontSize: 11, letterSpacing: "0.1em" }}>
            {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button onClick={() => go(cur + 1)} style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-gold)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Dots */}
      {total > 1 && (
        <div style={{ position: "absolute", bottom: 42, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i === cur ? 24 : 8, height: 8, background: i === cur ? "var(--color-gold)" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "width 0.3s, background 0.3s", borderRadius: 4 }} />
          ))}
        </div>
      )}
      <style>{`
        .hero-content { padding: 0 48px; }
        .hero-nav-controls { right: 48px; }
        @media (max-width: 640px) {
          .hero-content { padding: 0 20px; }
          .hero-nav-controls { right: 20px; bottom: 20px; }
        }
      `}</style>
    </section>
  );
}

/* ─── Marquee band ───────────────────────────────── */
function MarqueeBand() {
  const items = [...CATEGORIES, ...CATEGORIES];
  return (
    <div style={{ background: "var(--color-gold)", overflow: "hidden", padding: "10px 0" }}>
      <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {items.map((c, i) => (
          <span key={i} style={{ padding: "0 28px", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-charcoal)", whiteSpace: "nowrap" }}>
            {c} <span style={{ opacity: 0.4, marginLeft: 12 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Company section ────────────────────────────── */
function CompanySection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--color-charcoal)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid" }} className="company-grid">
        {/* Image */}
        <div style={{ position: "relative", minHeight: 500 }}>
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Jaisalmer Yellow Marble quarry" fill className="object-cover" unoptimized />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(28,26,22,0.5))" }} />
        </div>
        {/* Text */}
        <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}
          className={`reveal ${vis ? "visible" : ""}`}>
          <div className="label-with-line" style={{ marginBottom: 16 }}><span className="label">The Company</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
            Ahmedabad&apos;s Most Trusted<br />
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Stone Supplier Since {SITE.founded}</span>
          </h2>
          <div className="gold-line" />
          <p style={{ color: "rgba(212,201,176,0.75)", fontSize: 14, lineHeight: 1.9, marginBottom: 16 }}>
            Asha Marble &amp; Art Work began with a simple mission — bring the finest Jaisalmer Yellow Marble directly from Rajasthan&apos;s quarries to builders, architects, and homeowners across India.
          </p>
          <p style={{ color: "rgba(212,201,176,0.75)", fontSize: 14, lineHeight: 1.9, marginBottom: 32 }}>
            Today, operating as manufacturer, supplier, wholesaler, and exporter, we combine ancient Rajasthani stone-crafting traditions with modern processing and a nationwide distribution network.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 36 }}>
            {[["Manufacturer", "Direct from Jaisalmer quarries"], ["Wholesaler", "Bulk pricing for contractors"], ["Exporter", "UAE, UK, USA & beyond"], [`${SITE.rating}★ Rating`, `${SITE.reviews}+ verified reviews`]].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--color-gold)", marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 11, color: "rgba(212,201,176,0.55)", letterSpacing: "0.04em" }}>{d}</div>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn-gold" style={{ alignSelf: "flex-start" }}>
            Read More <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <style>{`
        .company-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        @media(max-width:768px){.company-grid{grid-template-columns:minmax(0,1fr);}}
        .company-grid > div:first-child { min-height: 320px; }
      `}</style>
    </section>
  );
}


/* ─── Featured Products ──────────────────────────── */
function FeaturedProducts({ featured }: { featured: FeaturedProductData[] }) {
  const { ref, vis } = useReveal();
  if (featured.length === 0) return null;
  return (
    <section ref={ref} style={{ background: "var(--color-cream-dark)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="label-with-line" style={{ marginBottom: 12 }}><span className="label">Featured</span></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3vw,48px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.2 }}>
              Popular Products
            </h2>
          </div>
          <Link href="/products" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)", display: "flex", alignItems: "center", gap: 6 }}>
            View All <ArrowRight size={12} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24 }}>
          {featured.map((p, i) => (
            <Link key={p._id} href={`/products/${p.slug}`}
              className="product-card"
              style={{
                display: "block", background: "#fff", border: "1px solid var(--color-limestone)",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${i * 90}ms, transform 0.6s ${i * 90}ms`,
              }}>
              <div className="card-img" style={{ aspectRatio: "4/3", position: "relative" }}>
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" unoptimized />
                {/* Category badge */}
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(28,26,22,0.82)", backdropFilter: "blur(4px)", padding: "4px 10px" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>{p.category}</span>
                </div>
                {p.availability === "limited" && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: "var(--color-gold)", padding: "4px 8px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-charcoal)" }}>Limited</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--color-charcoal)", marginBottom: 6 }}>{p.name}</h3>
                <p style={{ fontSize: 12, color: "var(--color-umber)", lineHeight: 1.6, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {p.shortDescription}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--color-limestone)", paddingTop: 14 }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--color-gold)" }}>{p.price}</span>
                    {p.price !== "On Request" && <span style={{ fontSize: 11, color: "var(--color-umber)", marginLeft: 4 }}>{p.unit}</span>}
                  </div>
                  <ArrowRight size={14} color="var(--color-gold)" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { n: 18, sfx: "+", label: "Years of Excellence" },
    { n: 500, sfx: "+", label: "Projects Delivered" },
    { n: 8, sfx: "", label: "Product Categories" },
    { n: 12, sfx: "+", label: "States Served" },
  ];
  return (
    <section style={{ background: "var(--color-charcoal)", padding: "64px 0", borderTop: "1px solid rgba(200,169,110,0.15)", borderBottom: "1px solid rgba(200,169,110,0.15)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gap: 0 }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} style={{
            textAlign: "center", padding: "8px 16px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none"
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, color: "var(--color-gold)", lineHeight: 1 }}>
              <Counter to={s.n} suffix={s.sfx} />
            </div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-limestone)", opacity: 0.6, marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`.stats-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;}@media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}`}</style>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────── */
function TestimonialsSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--color-cream)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">What Our Clients Say</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, color: "var(--color-charcoal)" }}>
            Testimonials
          </h2>
          <p style={{ fontSize: 13, color: "var(--color-umber)", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
            An outpour of appreciation for our promise of excellence.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid var(--color-limestone)",
              padding: "32px", display: "flex", flexDirection: "column",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
              transition: `opacity 0.6s ${i * 100}ms, transform 0.6s ${i * 100}ms`,
            }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={13} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={{ fontSize: 13, color: "var(--color-charcoal)", lineHeight: 1.8, flex: 1, marginBottom: 20, fontStyle: "italic" }}>
                &quot;{t.text}&quot;
              </p>
              <div style={{ borderTop: "1px solid var(--color-limestone)", paddingTop: 16 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--color-charcoal)" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-umber)", marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="https://share.google/ZAwPhRrL7K2HHhym2" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-gold)", borderBottom: "1px solid var(--color-gold)", paddingBottom: 2 }}>
            Read all 11 reviews on Google (4.8★)
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────── */
function GallerySection() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="gallery" ref={ref} style={{ background: "var(--color-charcoal)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">Project Gallery</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, color: "#fff" }}>Gallery</h2>
        </div>
        <div style={{ display: "grid", gap: 8 }} className="gallery-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i}
              onClick={() => setActive(active === img ? null : img)}
              style={{
                aspectRatio: "1/1",
                position: "relative", cursor: "pointer", overflow: "hidden",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ${i * 60}ms`,
              }}>
              <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover"
                style={{ transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                unoptimized />
              <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,22,0)", transition: "background 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(28,26,22,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(28,26,22,0)")} />
            </div>
          ))}
        </div>
      </div>
      <style>{`.gallery-grid{grid-template-columns:repeat(4,minmax(0,1fr));}@media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}`}</style>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────── */
function CTABanner({ phone, phoneRaw, whatsapp }: { phone: string; phoneRaw: string; whatsapp: string }) {
  return (
    <section style={{ position: "relative", padding: "100px 0", overflow: "hidden" }}>
      <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80" alt="Premium stone architecture" fill className="object-cover" unoptimized />
      <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,22,0.82)" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 16 }}><span className="label">Ready to Begin?</span></div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
          Transform Your Space with<br />
          <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Natural Stone</span>
        </h2>
        <p style={{ color: "rgba(212,201,176,0.75)", fontSize: 14, lineHeight: 1.8, marginBottom: 40 }}>
          Contact us for samples, pricing, or to discuss your project. Our stone experts respond within 24 hours.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-gold">Request a Quote <ArrowRight size={14} /></Link>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><MessageCircle size={14} /> WhatsApp</a>
          <a href={`tel:${phoneRaw}`} className="btn-outline-light"><Phone size={14} /> {phone}</a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ background: "var(--color-cream)", padding: "96px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">Common Questions</span></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, color: "var(--color-charcoal)" }}>FAQ&apos;s</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ border: "1px solid var(--color-limestone)", background: open === i ? "var(--color-cream-dark)" : "#fff" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 500, color: "var(--color-charcoal)", flex: 1 }}>{faq.q}</span>
                {open === i ? <Minus size={16} color="var(--color-gold)" /> : <Plus size={16} color="var(--color-gold)" />}
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: 13, color: "var(--color-umber)", lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function HomeClient({ heroSlides, featuredProducts, phone, phoneRaw, whatsapp }: HomeClientProps) {
  return (
    <div>
      <HeroSlider slides={heroSlides} phone={phone} phoneRaw={phoneRaw} whatsapp={whatsapp} />
      <MarqueeBand />
      <CompanySection />
      <FeaturedProducts featured={featuredProducts} />
      <StatsSection />
      <TestimonialsSection />
      <GallerySection />
      <CTABanner phone={phone} phoneRaw={phoneRaw} whatsapp={whatsapp} />
      <FAQSection />
    </div>
  );
}
