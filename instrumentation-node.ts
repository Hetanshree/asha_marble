import { ensureDefaultAdmin } from "@/server/services/admin-seed.service";
import { ensureInitialContent } from "@/server/services/content-seed.service";

export async function register() {
  try {
    await ensureDefaultAdmin();
  } catch (err) {
    console.error("[startup] Failed to seed default admin:", err);
  }

  try {
    await ensureInitialContent();
  } catch (err) {
    console.error("[startup] Failed to seed initial content:", err);
  }
}
