import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getContactController, updateContactController } from "@/server/controllers/contact.controller";

export const GET = withErrorHandling(getContactController);
export const PUT = withErrorHandling(updateContactController);
