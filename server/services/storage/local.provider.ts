import { randomUUID } from "crypto";
import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import type { ImageStorageProvider } from "./storage.types";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PUBLIC_PATH_PREFIX = "/uploads";

const EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export const localProvider: ImageStorageProvider = {
  async upload(buffer, contentType) {
    await mkdir(UPLOAD_DIR, { recursive: true });

    const extension = EXTENSION_BY_MIME_TYPE[contentType] ?? "";
    const publicId = `${randomUUID()}${extension}`;
    await writeFile(path.join(UPLOAD_DIR, publicId), buffer);

    return { url: `${PUBLIC_PATH_PREFIX}/${publicId}`, publicId };
  },

  async remove(publicId) {
    if (!/^[a-zA-Z0-9-]+\.[a-z]+$/.test(publicId)) return;

    try {
      await unlink(path.join(UPLOAD_DIR, publicId));
    } catch {
      // File already removed or never existed — nothing left to clean up.
    }
  },
};
