"use client";
import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function EnquireModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", state: "", city: "", query: "" });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="enquire-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="enquire-box">
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--color-umber)" }}>
          <X size={20} />
        </button>

        {done ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <CheckCircle size={48} color="var(--color-gold)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "var(--color-charcoal)", marginBottom: 8 }}>
              Enquiry Received
            </h3>
            <p style={{ color: "var(--color-umber)", fontSize: 13 }}>Our team will contact you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div className="label-with-line" style={{ marginBottom: 8 }}><span className="label">Enquire Now</span></div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "var(--color-charcoal)" }}>
                Request Stone Details
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { key: "name", label: "Name *", type: "text", required: true },
                { key: "mobile", label: "Mobile No. *", type: "tel", required: true },
                { key: "email", label: "Email Address", type: "email", required: false },
              ].map(({ key, label, type, required }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 6 }}>{label}</label>
                  <input required={required} type={type} value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", border: "1px solid var(--color-limestone)", background: "var(--color-cream)", padding: "10px 14px", fontSize: 13, color: "var(--color-charcoal)", outline: "none", fontFamily: "var(--font-sans)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-limestone)")}
                  />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {["state", "city"].map((key) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 6 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input type="text" value={(form as any)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      style={{ width: "100%", border: "1px solid var(--color-limestone)", background: "var(--color-cream)", padding: "10px 14px", fontSize: 13, color: "var(--color-charcoal)", outline: "none", fontFamily: "var(--font-sans)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-limestone)")}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-umber)", marginBottom: 6 }}>Query</label>
                <textarea rows={3} value={form.query}
                  onChange={(e) => setForm({ ...form, query: e.target.value })}
                  style={{ width: "100%", border: "1px solid var(--color-limestone)", background: "var(--color-cream)", padding: "10px 14px", fontSize: 13, color: "var(--color-charcoal)", outline: "none", resize: "none", fontFamily: "var(--font-sans)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-limestone)")}
                  placeholder="Which products are you interested in? Any special requirements?"
                />
              </div>
              <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                Submit Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
