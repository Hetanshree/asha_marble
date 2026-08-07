import { withErrorHandling } from "@/server/utils/asyncHandler";
import { deleteImageController, uploadImageController } from "@/server/controllers/upload.controller";

export const POST = withErrorHandling(uploadImageController);
export const DELETE = withErrorHandling(deleteImageController);
