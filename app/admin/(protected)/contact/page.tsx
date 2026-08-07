"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiRequestError } from "../../_lib/api";
import type { Contact } from "../../_lib/types";
import { Banner, Button, Card, Field, Input, PageHeader, Spinner, Textarea } from "../../_components/ui";

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Contact>("/api/contact")
      .then((res) => setContact(res.data))
      .catch((err) => setError(err instanceof ApiRequestError ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  function updateHour(index: number, field: "days" | "time", value: string) {
    if (!contact) return;
    const businessHours = [...contact.businessHours];
    businessHours[index] = { ...businessHours[index], [field]: value };
    setContact({ ...contact, businessHours });
  }

  function addHour() {
    if (!contact) return;
    setContact({ ...contact, businessHours: [...contact.businessHours, { days: "", time: "" }] });
  }

  function removeHour(index: number) {
    if (!contact) return;
    setContact({ ...contact, businessHours: contact.businessHours.filter((_, i) => i !== index) });
  }

  function updateAddress(index: number, field: "label" | "address", value: string) {
    if (!contact) return;
    const addresses = [...contact.addresses];
    addresses[index] = { ...addresses[index], [field]: value };
    setContact({ ...contact, addresses });
  }

  function addAddress() {
    if (!contact) return;
    setContact({ ...contact, addresses: [...contact.addresses, { label: "", address: "" }] });
  }

  function removeAddress(index: number) {
    if (!contact) return;
    setContact({ ...contact, addresses: contact.addresses.filter((_, i) => i !== index) });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contact) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await api.put<Contact>("/api/contact", contact);
      setContact(res.data);
      setSuccess("Contact details updated.");
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

  if (!contact) {
    return <Banner kind="error" message={error ?? "Failed to load"} />;
  }

  return (
    <div>
      <PageHeader title="Contact Page" />
      {error && <Banner kind="error" message={error} />}
      {success && <Banner kind="success" message={success} />}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Phone" htmlFor="phone">
              <Input id="phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </Field>
            <Field label="WhatsApp Number" htmlFor="whatsapp">
              <Input id="whatsapp" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </Field>
            <Field label="Google Map URL" htmlFor="mapUrl">
              <Input id="mapUrl" value={contact.mapUrl} onChange={(e) => setContact({ ...contact, mapUrl: e.target.value })} />
            </Field>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Addresses</h2>
            <Button type="button" variant="ghost" onClick={addAddress}>
              + Add Address
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {contact.addresses.map((addr, index) => (
              <div key={index} className="flex flex-col gap-3 rounded border border-neutral-200 p-3 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Label, e.g. Head Office / Factory"
                    value={addr.label}
                    onChange={(e) => updateAddress(index, "label", e.target.value)}
                    className="mb-2"
                  />
                  <Textarea
                    placeholder="Full address"
                    value={addr.address}
                    onChange={(e) => updateAddress(index, "address", e.target.value)}
                    className="min-h-20"
                  />
                </div>
                <Button type="button" variant="danger" onClick={() => removeAddress(index)}>
                  Remove
                </Button>
              </div>
            ))}
            {contact.addresses.length === 0 && <p className="text-sm text-neutral-500">No addresses added yet.</p>}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Business Hours</h2>
            <Button type="button" variant="ghost" onClick={addHour}>
              + Add Row
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {contact.businessHours.map((hour, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  placeholder="e.g. Monday – Saturday"
                  value={hour.days}
                  onChange={(e) => updateHour(index, "days", e.target.value)}
                />
                <Input placeholder="e.g. 9:00 AM – 7:00 PM" value={hour.time} onChange={(e) => updateHour(index, "time", e.target.value)} />
                <Button type="button" variant="danger" onClick={() => removeHour(index)}>
                  Remove
                </Button>
              </div>
            ))}
            {contact.businessHours.length === 0 && <p className="text-sm text-neutral-500">No hours added yet.</p>}
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
