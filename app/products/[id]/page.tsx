import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { getProductByIdOrSlug, listProducts } from "@/server/services/product.service";
import { getContact } from "@/server/services/contact.service";
import { productListQuerySchema } from "@/server/validation/product.validation";
import { ApiError } from "@/server/utils/ApiError";
import ProductGallery from "./ProductGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const p = await getProductByIdOrSlug(id, { publicOnly: true });
    return { title: `${p.name} | Asha Marble & Art Work`, description: p.shortDescription };
  } catch {
    return {};
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let p;
  try {
    p = await getProductByIdOrSlug(id, { publicOnly: true });
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound();
    throw err;
  }

  const [{ items: relatedRaw }, contact] = await Promise.all([
    listProducts(productListQuerySchema.parse({ category: p.category, limit: "4" }), { publicOnly: true }),
    getContact(),
  ]);
  const related = relatedRaw.filter((x) => String(x._id) !== String(p._id)).slice(0, 3);

  const phone = contact?.phone ?? "";
  const whatsapp = contact?.whatsapp ?? "";
  const phoneRaw = phone.replace(/\D/g, "");

  const availMap = {
    available: { label: "In Stock", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    limited: { label: "Limited Stock", bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
    "on-request": { label: "On Request", bg: "var(--color-cream-dark)", color: "var(--color-umber)", border: "var(--color-limestone)" },
  };
  const av = availMap[p.availability as keyof typeof availMap] ?? availMap.available;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--color-charcoal)", padding: "20px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <Link href="/" style={{ color: "inherit" }}>Home</Link><span>/</span>
          <Link href="/products" style={{ color: "inherit" }}>Products</Link><span>/</span>
          <span style={{ color: "var(--color-limestone)" }}>{p.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "grid", gap: 64, marginBottom: 80 }} className="detail-grid">
          {/* Images */}
          <ProductGallery images={p.images} name={p.name} />

          {/* Info */}
          <div>
            <div className="label-with-line" style={{ marginBottom: 10 }}><span className="label">{p.category}</span></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.1, marginBottom: 20 }}>
              {p.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 300, color: "var(--color-gold)" }}>{p.price}</span>
                {p.price !== "On Request" && <span style={{ fontSize: 13, color: "var(--color-umber)", marginLeft: 6 }}>{p.unit}</span>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", background: av.bg, color: av.color, border: `1px solid ${av.border}` }}>
                {av.label}
              </span>
            </div>

            <div className="gold-line" />

            <p style={{ fontSize: 14, color: "var(--color-charcoal)", lineHeight: 1.9, marginBottom: 24 }}>{p.description}</p>

            {/* Features */}
            <div style={{ display: "grid", gap: 10, marginBottom: 32 }} className="form-row-2">
              {["Premium Quality Stone", "Direct from Quarry", "Custom Sizes Available", "PAN India Delivery", "Export Available", "Bulk Orders Welcome"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle size={13} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--color-charcoal)" }}>{f}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`https://wa.me/${whatsapp}?text=Hi, I am interested in ${p.name} (${p.price} ${p.unit}). Please share details.`}
                target="_blank" rel="noopener noreferrer"
                className="btn-gold" style={{ flex: 1, justifyContent: "center", minWidth: 180 }}>
                <MessageCircle size={14} /> WhatsApp Enquiry
              </a>
              <a href={`tel:${phoneRaw}`} className="btn-outline-dark" style={{ flex: 1, justifyContent: "center", minWidth: 140 }}>
                <Phone size={14} /> Call Now
              </a>
            </div>
            <p style={{ fontSize: 11, color: "var(--color-limestone)", marginTop: 12 }}>
              Prices indicative. Contact us for bulk pricing &amp; custom requirements.
            </p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ borderTop: "1px solid var(--color-limestone)", paddingTop: 64 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 300, color: "var(--color-charcoal)", marginBottom: 32 }}>
              Related Products
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 20 }}>
              {related.map(rp => (
                <Link key={String(rp._id)} href={`/products/${rp.slug}`} className="product-card"
                  style={{ display: "block", background: "#fff", border: "1px solid var(--color-limestone)" }}>
                  <div className="card-img" style={{ aspectRatio: "4/3", position: "relative" }}>
                    <Image src={rp.images[0]} alt={rp.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 240px" />
                  </div>
                  <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--color-charcoal)" }}>{rp.name}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-gold)", marginTop: 4 }}>{rp.price}</div>
                    </div>
                    <ArrowRight size={14} color="var(--color-gold)" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`.detail-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.form-row-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}@media(max-width:768px){.detail-grid{grid-template-columns:minmax(0,1fr);}}@media(max-width:420px){.form-row-2{grid-template-columns:minmax(0,1fr);}}`}</style>
    </div>
  );
}
