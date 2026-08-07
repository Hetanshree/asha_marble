import { requireAdmin } from "../middleware/auth.middleware";
import { getDashboardStats } from "../services/dashboard.service";
import { apiSuccess } from "../utils/ApiResponse";

export async function getDashboardController() {
  await requireAdmin();
  const stats = await getDashboardStats();
  return apiSuccess(stats, "Dashboard stats fetched successfully");
}
