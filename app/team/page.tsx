import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { listTeamMembers } from "@/server/services/team.service";
import { teamListQuerySchema } from "@/server/validation/team.validation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Team | Asha Marble & Art Work",
  description:
    "Meet the craftsmen, artisans, and leadership behind Asha Marble & Art Work's Jaisalmer Yellow Marble and natural stone work.",
};

export default async function TeamPage() {
  const query = teamListQuerySchema.parse({});
  const items = await listTeamMembers(query, { publicOnly: true });

  const members = items.map((m) => ({
    id: String(m._id),
    name: m.name,
    designation: m.designation,
    bio: m.bio,
    photo: m.photo,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 380, overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
          alt="Asha Marble & Art Work team"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,26,22,0.85) 50%, rgba(28,26,22,0.5))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1280, margin: "0 auto", padding: "0 24px 48px", width: "100%" }}>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(212,201,176,0.5)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link><span>/</span>
            <span style={{ color: "var(--color-limestone)" }}>Our Team</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#fff" }}>Our Team</h1>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "80px 0 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="label-with-line" style={{ justifyContent: "center", marginBottom: 16 }}>
            <span className="label">The People Behind The Stone</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, color: "var(--color-charcoal)", marginBottom: 16 }}>
            Meet Our Team
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-umber)", lineHeight: 1.8 }}>
            From quarry to craftsmanship, our experienced team brings decades of combined expertise in sourcing,
            cutting, carving, and delivering premium Jaisalmer Yellow Marble and natural stone.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "40px 0 96px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {members.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-umber)" }}>
              <p style={{ fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 300 }}>Team information coming soon.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%),1fr))", gap: 28 }}>
              {members.map((m) => (
                <div key={m.id} className="team-card" style={{ background: "#fff", border: "1px solid var(--color-limestone)" }}>
                  <div className="card-img" style={{ aspectRatio: "1/1", position: "relative", background: "var(--color-cream-dark)" }}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} fill className="object-contain" unoptimized />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User size={40} color="var(--color-gold)" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 22, textAlign: "center" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 500, color: "var(--color-charcoal)", marginBottom: 4 }}>
                      {m.name}
                    </h3>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: m.bio ? 12 : 0 }}>
                      {m.designation}
                    </div>
                    {m.bio && (
                      <p style={{ fontSize: 12.5, color: "var(--color-umber)", lineHeight: 1.7, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                        {m.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
