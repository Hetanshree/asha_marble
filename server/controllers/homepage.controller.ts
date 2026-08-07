import type { NextRequest } from "next/server";
import { updateHomepageSchema } from "../validation/homepage.validation";
import { getHomepage, updateHomepage } from "../services/homepage.service";
import { requireAdmin } from "../middleware/auth.middleware";
import { apiSuccess } from "../utils/ApiResponse";

export async function getHomepageController() {
  const homepage = await getHomepage();
  return apiSuccess(homepage, "Homepage content fetched successfully");
}

export async function updateHomepageController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = updateHomepageSchema.parse(body);

  const homepage = await updateHomepage(input);
  return apiSuccess(homepage, "Homepage content updated successfully");
}
