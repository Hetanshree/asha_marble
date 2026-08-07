import type { NextRequest } from "next/server";
import { updateContactSchema } from "../validation/contact.validation";
import { getContact, updateContact } from "../services/contact.service";
import { requireAdmin } from "../middleware/auth.middleware";
import { apiSuccess } from "../utils/ApiResponse";

export async function getContactController() {
  const contact = await getContact();
  return apiSuccess(contact, "Contact content fetched successfully");
}

export async function updateContactController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = updateContactSchema.parse(body);

  const contact = await updateContact(input);
  return apiSuccess(contact, "Contact content updated successfully");
}
