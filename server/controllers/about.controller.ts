import type { NextRequest } from "next/server";
import { updateAboutSchema } from "../validation/about.validation";
import { getAbout, updateAbout } from "../services/about.service";
import { requireAdmin } from "../middleware/auth.middleware";
import { apiSuccess } from "../utils/ApiResponse";

export async function getAboutController() {
  const about = await getAbout();
  return apiSuccess(about, "About content fetched successfully");
}

export async function updateAboutController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = updateAboutSchema.parse(body);

  const about = await updateAbout(input);
  return apiSuccess(about, "About content updated successfully");
}
