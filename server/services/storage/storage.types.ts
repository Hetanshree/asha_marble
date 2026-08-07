export type UploadedImage = { url: string; publicId: string };

export interface ImageStorageProvider {
  upload(buffer: Buffer, contentType: string): Promise<UploadedImage>;
  remove(publicId: string): Promise<void>;
}
