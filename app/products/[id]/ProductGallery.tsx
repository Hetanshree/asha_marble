"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={{ aspectRatio: "4/3", position: "relative", marginBottom: 12, overflow: "hidden", background: "var(--color-cream-dark)" }}>
        <Image src={images[active]} alt={name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" priority />
      </div>
      {images.length > 1 && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: 8 }}>
          {images.map((img, i) => (
            <button key={i} type="button" onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={active === i}
              style={{
                aspectRatio: "1/1", position: "relative", overflow: "hidden",
                border: active === i ? "2px solid var(--color-gold)" : "2px solid var(--color-limestone)",
                padding: 0, cursor: "pointer", background: "var(--color-cream-dark)", transition: "border-color 0.2s",
              }}>
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-contain" sizes="120px" />
              {active === i && (
                <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 2px var(--color-gold)" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
