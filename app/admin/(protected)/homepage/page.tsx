"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiRequestError } from "../../_lib/api";
import type { HeroSlide, Homepage, Product } from "../../_lib/types";
import { Banner, Button, Card, Field, Input, PageHeader, Spinner } from "../../_components/ui";
import ImageUploader, { type UploadedImage } from "../../_components/ImageUploader";

const EMPTY_SLIDE: HeroSlide = {
  eyebrow: "",
  headline: "",
  sub: "",
  image: "",
  imagePublicId: "",
  ctaLabel: "",
  ctaHref: "",
};

export default function HomepagePage() {
  const [homepage, setHomepage] = useState<Homepage | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.get<Homepage>("/api/homepage"), api.get<Product[]>("/api/products?limit=100")])
      .then(([homepageRes, productsRes]) => {
        setHomepage(homepageRes.data);
        setAllProducts(productsRes.data);
      })
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  function updateSlide(index: number, patch: Partial<HeroSlide>) {
    if (!homepage) return;
    const heroSlides = [...homepage.heroSlides];
    heroSlides[index] = { ...heroSlides[index], ...patch };
    setHomepage({ ...homepage, heroSlides });
  }

  function addSlide() {
    if (!homepage) return;
    setHomepage({ ...homepage, heroSlides: [...homepage.heroSlides, { ...EMPTY_SLIDE }] });
  }

  function removeSlide(index: number) {
    if (!homepage) return;
    setHomepage({ ...homepage, heroSlides: homepage.heroSlides.filter((_, i) => i !== index) });
  }

  function toggleFeatured(productId: string) {
    if (!homepage) return;
    const exists = homepage.featuredProducts.some((p) => p._id === productId);
    const product = allProducts.find((p) => p._id === productId);
    if (!product) return;
    setHomepage({
      ...homepage,
      featuredProducts: exists
        ? homepage.featuredProducts.filter((p) => p._id !== productId)
        : [...homepage.featuredProducts, product],
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!homepage) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        heroSlides: homepage.heroSlides,
        featuredProducts: homepage.featuredProducts.map((p) => p._id),
      };
      const res = await api.put<Homepage>("/api/homepage", payload);
      setHomepage(res.data);
      setSuccess("Homepage content updated.");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!homepage) {
    return <Banner kind="error" message={error ?? "Failed to load"} />;
  }

  return (
    <div>
      <PageHeader title="Homepage" />
      {error && <Banner kind="error" message={error} />}
      {success && <Banner kind="success" message={success} />}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Hero Slides</h2>
            <Button type="button" variant="ghost" onClick={addSlide}>
              + Add Slide
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            {homepage.heroSlides.map((slide, index) => (
              <div key={index} className="rounded-md border border-neutral-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Slide {index + 1}</span>
                  <Button type="button" variant="danger" onClick={() => removeSlide(index)}>
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Eyebrow" htmlFor={`eyebrow-${index}`}>
                    <Input
                      id={`eyebrow-${index}`}
                      placeholder="e.g. Jaisalmer Yellow Marble"
                      value={slide.eyebrow}
                      onChange={(e) => updateSlide(index, { eyebrow: e.target.value })}
                    />
                  </Field>
                  <Field label="Headline" htmlFor={`headline-${index}`}>
                    <Input
                      id={`headline-${index}`}
                      required
                      placeholder="e.g. The Golden Stone of Rajasthan"
                      value={slide.headline}
                      onChange={(e) => updateSlide(index, { headline: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Subtext" htmlFor={`sub-${index}`}>
                    <Input id={`sub-${index}`} value={slide.sub} onChange={(e) => updateSlide(index, { sub: e.target.value })} />
                  </Field>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Button Label" htmlFor={`ctaLabel-${index}`}>
                    <Input
                      id={`ctaLabel-${index}`}
                      placeholder="e.g. Explore Collection"
                      value={slide.ctaLabel}
                      onChange={(e) => updateSlide(index, { ctaLabel: e.target.value })}
                    />
                  </Field>
                  <Field label="Button Link" htmlFor={`ctaHref-${index}`}>
                    <Input
                      id={`ctaHref-${index}`}
                      placeholder="/products"
                      value={slide.ctaHref}
                      onChange={(e) => updateSlide(index, { ctaHref: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="mt-4">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">Slide Image</span>
                  <ImageUploader
                    images={slide.image ? [{ url: slide.image, publicId: slide.imagePublicId }] : []}
                    onChange={(images: UploadedImage[]) =>
                      updateSlide(index, { image: images[0]?.url ?? "", imagePublicId: images[0]?.publicId ?? "" })
                    }
                    multiple={false}
                  />
                </div>
              </div>
            ))}
            {homepage.heroSlides.length === 0 && <p className="text-sm text-neutral-500">No hero slides added yet.</p>}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Featured Products</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {allProducts.map((product) => (
              <label key={product._id} className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={homepage.featuredProducts.some((p) => p._id === product._id)}
                  onChange={() => toggleFeatured(product._id)}
                />
                {product.name}
              </label>
            ))}
            {allProducts.length === 0 && <p className="text-sm text-neutral-500">No products available yet.</p>}
          </div>
        </Card>

        <div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
