"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiRequestError } from "../../_lib/api";
import type { HandCarvingAbout, HandCarvingCustom } from "../../_lib/types";
import { Banner, Button, Card, Field, Input, PageHeader, Spinner, Textarea } from "../../_components/ui";
import ImageUploader, { type UploadedImage } from "../../_components/ImageUploader";

export default function HandCarvingSettingsPage() {
  const [about, setAbout] = useState<HandCarvingAbout | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [custom, setCustom] = useState<HandCarvingCustom | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingCustom, setSavingCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.get<HandCarvingAbout>("/api/hand-carving/about"), api.get<HandCarvingCustom>("/api/hand-carving/custom")])
      .then(([aboutRes, customRes]) => {
        setAbout(aboutRes.data);
        setImages(aboutRes.data.images.map((url, i) => ({ url, publicId: aboutRes.data.cloudinaryPublicIds[i] ?? "" })));
        setCustom(customRes.data);
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  function updateParagraph(index: number, value: string) {
    if (!about) return;
    const paragraphs = [...about.paragraphs];
    paragraphs[index] = value;
    setAbout({ ...about, paragraphs });
  }

  function addParagraph() {
    if (!about) return;
    setAbout({ ...about, paragraphs: [...about.paragraphs, ""] });
  }

  function removeParagraph(index: number) {
    if (!about) return;
    setAbout({ ...about, paragraphs: about.paragraphs.filter((_, i) => i !== index) });
  }

  function updateHighlight(index: number, field: "title" | "description", value: string) {
    if (!about) return;
    const highlights = about.highlights.map((h, i) => (i === index ? { ...h, [field]: value } : h));
    setAbout({ ...about, highlights });
  }

  function addHighlight() {
    if (!about) return;
    setAbout({ ...about, highlights: [...about.highlights, { title: "", description: "" }] });
  }

  function removeHighlight(index: number) {
    if (!about) return;
    setAbout({ ...about, highlights: about.highlights.filter((_, i) => i !== index) });
  }

  async function handleAboutSubmit(e: FormEvent) {
    e.preventDefault();
    if (!about) return;
    setSavingAbout(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...about,
        paragraphs: about.paragraphs.filter((p) => p.trim() !== ""),
        highlights: about.highlights.filter((h) => h.title.trim() !== ""),
        images: images.map((i) => i.url),
        cloudinaryPublicIds: images.map((i) => i.publicId),
      };
      const res = await api.put<HandCarvingAbout>("/api/hand-carving/about", payload);
      setAbout(res.data);
      setSuccess("About Hand Carving content updated.");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to save changes");
    } finally {
      setSavingAbout(false);
    }
  }

  async function handleCustomSubmit(e: FormEvent) {
    e.preventDefault();
    if (!custom) return;
    setSavingCustom(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await api.put<HandCarvingCustom>("/api/hand-carving/custom", custom);
      setCustom(res.data);
      setSuccess("Custom carving section updated.");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to save changes");
    } finally {
      setSavingCustom(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!about || !custom) {
    return <Banner kind="error" message={error ?? "Failed to load"} />;
  }

  return (
    <div>
      <PageHeader title="Hand Carving Page" />
      {error && <Banner kind="error" message={error} />}
      {success && <Banner kind="success" message={success} />}

      {/* About Hand Carving */}
      <form onSubmit={handleAboutSubmit} className="mt-4 flex flex-col gap-6">
        <h2 className="font-display text-lg font-semibold text-[var(--color-charcoal)]">About Hand Carving</h2>

        <Card>
          <div className="flex flex-col gap-4">
            <Field label="Section Label" htmlFor="sectionLabel">
              <Input
                id="sectionLabel"
                placeholder="e.g. About Hand Carving"
                value={about.sectionLabel}
                onChange={(e) => setAbout({ ...about, sectionLabel: e.target.value })}
              />
            </Field>
            <Field label="Main Heading" htmlFor="heading">
              <Input
                id="heading"
                placeholder="e.g. The Art of Hand Carving"
                value={about.heading}
                onChange={(e) => setAbout({ ...about, heading: e.target.value })}
              />
            </Field>
            <Field label="Description" htmlFor="description">
              <Textarea
                id="description"
                placeholder="Craftsmanship, experience, the hand-carving process, materials used..."
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Additional Paragraphs</h3>
            <Button type="button" variant="ghost" onClick={addParagraph}>
              + Add Paragraph
            </Button>
          </div>
          {about.paragraphs.length === 0 && <p className="text-sm text-neutral-500">No additional paragraphs yet.</p>}
          <div className="flex flex-col gap-3">
            {about.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={p} onChange={(e) => updateParagraph(i, e.target.value)} className="min-h-20 flex-1" />
                <Button type="button" variant="danger" onClick={() => removeParagraph(i)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Highlights / Features</h3>
            <Button type="button" variant="ghost" onClick={addHighlight}>
              + Add Highlight
            </Button>
          </div>
          {about.highlights.length === 0 && <p className="text-sm text-neutral-500">No highlights yet, e.g. &quot;Custom Carving Available&quot;.</p>}
          <div className="flex flex-col gap-4">
            {about.highlights.map((h, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3 sm:flex-row sm:items-start">
                <div className="flex flex-1 flex-col gap-2">
                  <Input placeholder="Title, e.g. 20+ Years Experience" value={h.title} onChange={(e) => updateHighlight(i, "title", e.target.value)} />
                  <Input placeholder="Short description (optional)" value={h.description} onChange={(e) => updateHighlight(i, "description", e.target.value)} />
                </div>
                <Button type="button" variant="danger" onClick={() => removeHighlight(i)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Images</h2>
          <ImageUploader images={images} onChange={setImages} />
        </Card>

        <div>
          <Button type="submit" disabled={savingAbout}>
            {savingAbout ? "Saving..." : "Save About Section"}
          </Button>
        </div>
      </form>

      {/* Custom Carving CTA */}
      <form onSubmit={handleCustomSubmit} className="mt-10 flex flex-col gap-6">
        <h2 className="font-display text-lg font-semibold text-[var(--color-charcoal)]">Custom Hand Carving Section</h2>
        <Card>
          <div className="flex flex-col gap-4">
            <Field label="Heading" htmlFor="customHeading">
              <Input id="customHeading" value={custom.heading} onChange={(e) => setCustom({ ...custom, heading: e.target.value })} />
            </Field>
            <Field label="Description" htmlFor="customDescription">
              <Textarea
                id="customDescription"
                value={custom.description}
                onChange={(e) => setCustom({ ...custom, description: e.target.value })}
                className="min-h-24"
              />
            </Field>
            <Field label="CTA Button Text" htmlFor="ctaLabel">
              <Input id="ctaLabel" value={custom.ctaLabel} onChange={(e) => setCustom({ ...custom, ctaLabel: e.target.value })} />
            </Field>
          </div>
        </Card>
        <div>
          <Button type="submit" disabled={savingCustom}>
            {savingCustom ? "Saving..." : "Save Custom Section"}
          </Button>
        </div>
      </form>
    </div>
  );
}
