import { UploadApiResponse } from 'cloudinary';

export function toSecuredUrls(uploadResponses: UploadApiResponse[]) {
  return uploadResponses.map((res) => res.secure_url);
}
