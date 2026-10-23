import { getContact } from "@/server/services/contact.service";
import { toPlainObject } from "@/server/utils/serialize";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us — Jaisalmer Marble Price & Enquiry",
  description: "Contact Asha Marble & Art Work for Jaisalmer Yellow Marble prices, samples and bulk orders. Call, WhatsApp or visit our office.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getContact();
  const phone = contact?.phone ?? "";

  return (
    <ContactClient
      addresses={toPlainObject(contact?.addresses ?? [])}
      phone={phone}
      phoneRaw={phone.replace(/\D/g, "")}
      email={contact?.email ?? ""}
      whatsapp={contact?.whatsapp ?? ""}
      mapUrl={contact?.mapUrl ?? ""}
      businessHours={toPlainObject(contact?.businessHours ?? [])}
    />
  );
}
