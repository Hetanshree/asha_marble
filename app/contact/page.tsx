import { getContact } from "@/server/services/contact.service";
import { toPlainObject } from "@/server/utils/serialize";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us | Asha Marble & Art Work",
  description: "Get in touch with Asha Marble & Art Work for premium Jaisalmer Yellow Marble, sandstone, and natural stone products.",
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
