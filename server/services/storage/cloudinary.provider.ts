import cloudinary, { CLOUDINARY_FOLDER } from "../../config/cloudinary";
import { ApiError } from "../../utils/ApiError";
import type { ImageStorageProvider } from "./storage.types";

export const cloudinaryProvider: ImageStorageProvider = {
  upload(buffer) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: CLOUDINARY_FOLDER, resource_type: "image" },
        (error, result) => {
          if (error || !result) {
            reject(ApiError.internal(error?.message ?? "Image upload failed"));
            return;
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      stream.end(buffer);
    });
  },

  async remove(publicId) {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  },
};
