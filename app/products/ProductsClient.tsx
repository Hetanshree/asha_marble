"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { formatPrice } from "@/lib/data";

export type ProductListItem = {
  slug: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  shortDescription: string;
  images: string[];
  availability: "available" | "limited" | "on-request";
};

function ProductsContent({ products, categories }: { products: ProductListItem[]; categories: string[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [cat, setCat] = useState(initialCat);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = products.filter(p => {
    const matchCat = cat === "All" || p.category === cat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      {/* Header */}
      <div style={{ background: "var(--color-charcoal)", padding: "72px 0 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "inherit" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gold)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(212,201,176,0.5)")}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--color-limestone)" }}>Products</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#fff", marginBottom: 12 }}>
            Marble, Sandstone &amp; Stone
          </h1>
          <p style={{ color: "rgba(212,201,176,0.6)", fontSize: 14, maxWidth: 520 }}>
            Premium Jaisalmer Yellow Marble, sandstone, natural stone, carved work, and wall cladding solutions.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        {/* Search + Filter bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--color-umber)" }} />
            <input type="search" placeholder="Search products..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 11, paddingBottom: 11, border: "1px solid var(--color-limestone)", background: "#fff", fontSize: 13, color: "var(--color-charcoal)", outline: "none", fontFamily: "var(--font-sans)" }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--color-gold)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--color-limestone)")}
            />
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid var(--color-charcoal)", background: "transparent", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", color: "var(--color-charcoal)" }}>
            <SlidersHorizontal size={13} /> Filter {cat !== "All" && `· ${cat}`}
          </button>
          <span style={{ fontSize: 12, color: "var(--color-umber)" }}>{filtered.length} products</span>
        </div>

        {/* Category filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["All", ...categories].map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                padding: "8px 18px", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                border: "1px solid", cursor: "pointer", transition: "all 0.2s",
                background: cat === c ? "var(--color-charcoal)" : "transparent",
                color: cat === c ? "#fff" : "var(--color-charcoal)",
                borderColor: cat === c ? "var(--color-charcoal)" : "var(--color-limestone)",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%),1fr))", gap: 24 }}>
          {filtered.map(p => (
            <Link key={p.slug} href={`/products/${p.slug}`}
              className="product-card"
              style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff", border: "1px solid var(--color-limestone)" }}>
              <div className="card-img" style={{ aspectRatio: "4/3", position: "relative", background: "var(--color-cream-dark)", flexShrink: 0 }}>
                <Image src={p.images[0]} alt={p.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 280px" />
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(28,26,22,0.82)", padding: "4px 10px" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>{p.category}</span>
                </div>
                {p.availability === "limited" && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: "var(--color-gold)", padding: "4px 8px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "var(--color-charcoal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Limited</span>
                  </div>
                )}
                {p.availability === "on-request" && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: "var(--color-umber)", padding: "4px 8px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>On Request</span>
                  </div>
                )}
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--color-charcoal)", marginBottom: 8, lineHeight: 1.25, minHeight: "2.5em", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.name}</h3>
                <p style={{ fontSize: 12, color: "var(--color-umber)", lineHeight: 1.6, marginBottom: 14, minHeight: "3.2em", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {p.shortDescription}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-limestone)", paddingTop: 14, marginTop: "auto" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--color-gold)", fontVariantNumeric: "lining-nums" }}>{formatPrice(p.price)}</span>
                    {p.price !== "On Request" && <span style={{ fontSize: 11, color: "var(--color-umber)", marginLeft: 4 }}>{p.unit}</span>}
                  </div>
                  <ArrowRight size={14} color="var(--color-gold)" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-umber)" }}>
            <p style={{ fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 300 }}>No products found.</p>
            <button onClick={() => { setCat("All"); setSearch(""); }} style={{ marginTop: 16, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)", background: "none", border: "none", cursor: "pointer" }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsClient({ products, categories }: { products: ProductListItem[]; categories: string[] }) {
  return (
    <Suspense>
      <ProductsContent products={products} categories={categories} />
    </Suspense>
  );
}
