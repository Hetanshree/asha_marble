import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Globe, Package, Users, CheckCircle } from "lucide-react";
import { getAbout } from "@/server/services/about.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Asha Marble & Art Work",
  description: "Learn about Asha Marble & Art Work — leading manufacturer, supplier and exporter of Jaisalmer Yellow Marble and natural stone from Ahmedabad, Gujarat since 2005.",
};

const DEFAULT_IMAGE = "https://res.cloudinary.com/uycfz4al/image/upload/v1786904451/asha-marble/cbqjhmw598la2zmmo9nq.png";

export default async function AboutPage() {
  const about = await getAbout();
  const title = about?.title || "Years of Stone Mastery in Gujarat";
  const paragraphs = (about?.description || "").split("\n\n").filter(Boolean);
  const image = about?.images?.[0] || DEFAULT_IMAGE;
  const experience = about?.experience || "";

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 380, overflow: "hidden" }}>
        <Image src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1600&q=80" alt="Jaisalmer stone quarry" fill className="object-cover" unoptimized priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,26,22,0.85) 50%, rgba(28,26,22,0.5))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1440, margin: "0 auto", padding: "0 24px 48px", width: "100%" }}>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link><span>/</span>
            <span style={{ color: "var(--color-limestone)" }}>About Us</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#fff" }}>The Company</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="about-section" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px", display: "grid", gap: 80, alignItems: "center" }} className="two-col">
          <div>
            <div className="label-with-line" style={{ marginBottom: 16 }}><span className="label">About Asha Marble</span></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.15, marginBottom: 20 }}>
              {title}
            </h2>
            <div className="gold-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.9 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Image src={image} alt="Jaisalmer Yellow Marble" width={700} height={520} className="object-cover" style={{ width: "100%", height: "auto" }} unoptimized />
            {experience && (
              <div className="exp-badge" style={{ position: "absolute", bottom: -20, left: -20, background: "var(--color-gold)", padding: "24px 28px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1 }}>{experience}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-charcoal)", marginTop: 6 }}>Years of Excellence</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="about-section" style={{ background: "var(--color-charcoal)", padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 12 }}><span className="label">Our Role</span></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "#fff" }}>
              Manufacturer · Supplier · Wholesaler · Exporter
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {[
              { icon: <Package size={24} color="var(--color-gold)" />, title: "Manufacturer", desc: "Direct quarry partnerships in Jaisalmer, Rajasthan. We process and manufacture stone at our own facility — quality controlled from raw block to finished product." },
              { icon: <Award size={24} color="var(--color-gold)" />, title: "Supplier", desc: "Direct supply of premium Jaisalmer Yellow Marble, sandstone, and natural stone to construction projects, architects, and designers across India." },
              { icon: <Users size={24} color="var(--color-gold)" />, title: "Wholesaler", desc: "Bulk pricing and wholesale supply for distributors, contractors, and large-scale construction projects. Competitive rates with consistent quality guarantees." },
              { icon: <Globe size={24} color="var(--color-gold)" />, title: "Exporter", desc: "International export to UAE, UK, USA, Australia, and Southeast Asia with full documentation, packaging, and logistics support." },
            ].map(item => (
              <div key={item.title} style={{ background: "var(--color-charcoal-light)", padding: "40px 32px" }}>
                <div style={{ marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(212,201,176,0.65)", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialization */}
      <section className="about-section" style={{ padding: "96px 0", background: "var(--color-cream-dark)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px", display: "grid", gap: 80, alignItems: "center" }} className="two-col">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=75",
              "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&q=75",
              "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75",
              "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=75",
            ].map((img, i) => (
              <div key={i} style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                <Image src={img} alt="Stone product" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <div>
            <div className="label-with-line" style={{ marginBottom: 16 }}><span className="label">Our Specialization</span></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.2, marginBottom: 20 }}>
              Jaisalmer Yellow Marble —<br />
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Our Signature Stone</span>
            </h2>
            <div className="gold-line" />
            <p style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.9, marginBottom: 16 }}>
              Quarried from the ancient golden limestone formations of the Thar Desert, Jaisalmer Yellow Marble carries 180 million years of geological history. Its warm golden hue, distinctive natural veining, and exceptional durability make it one of India&apos;s most sought-after building materials.
            </p>
            <p style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.9, marginBottom: 28 }}>
              Beyond marble, we specialize in wall cladding, exterior elevation, hand-carved stone jali, carved columns, decorative fountains, and bespoke stone art — all crafted by master artisans from Rajasthan&apos;s centuries-old tradition.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {["Direct quarry partnerships in Jaisalmer, Rajasthan", "State-of-the-art processing facility", "Master artisans with generational expertise", "Custom sizes, finishes, and carved designs", "Pan India delivery &amp; international export"].map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckCircle size={14} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "var(--color-charcoal)", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: f }} />
                </div>
              ))}
            </div>
            <Link href="/products" className="btn-gold">Explore Our Products <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-section" style={{ background: "var(--color-charcoal)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px", display: "grid", gap: 0 }} className="stats-4">
          {[
            { n: experience || "—", label: "Years in Business" },
            { n: "500+", label: "Projects Delivered" },
            { n: "12+", label: "States Served" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ textAlign: "center", padding: "16px", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 300, color: "var(--color-gold)" }}>{s.n}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,201,176,0.5)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`
          .two-col{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}
          .stats-4{grid-template-columns:repeat(3,minmax(0,1fr));}
          @media(max-width:768px){
            .two-col{grid-template-columns:minmax(0,1fr); gap:40px !important;}
            .stats-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
            .about-section{padding-top:56px !important; padding-bottom:56px !important;}
            .exp-badge{left:0 !important; bottom:-16px !important; padding:16px 20px !important;}
            .exp-badge > div:first-child{font-size:32px !important;}
          }
        `}</style>
      </section>
    </div>
  );
}
