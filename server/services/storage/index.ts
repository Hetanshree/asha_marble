import { env } from "../../config/env";
import { cloudinaryProvider } from "./cloudinary.provider";
import { localProvider } from "./local.provider";
import type { ImageStorageProvider, UploadedImage } from "./storage.types";

const providers: Record<typeof env.IMAGE_STORAGE_PROVIDER, ImageStorageProvider> = {
  local: localProvider,
  cloudinary: cloudinaryProvider,
};

const imageStorage: ImageStorageProvider = providers[env.IMAGE_STORAGE_PROVIDER];

export function uploadImageBuffer(buffer: Buffer, contentType: string): Promise<UploadedImage> {
  return imageStorage.upload(buffer, contentType);
}

export async function deleteImageByPublicId(publicId: string): Promise<void> {
  await imageStorage.remove(publicId);
}

export async function deleteImagesByPublicIds(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) return;
  await Promise.all(publicIds.map((id) => deleteImageByPublicId(id).catch(() => undefined)));
}

export type { UploadedImage } from "./storage.types";
