import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

export const cloudinary = new Cloudinary({
  cloud: { cloudName: import.meta.env.SERVER_CLOUDINARY_CLOUD_NAME },
});

export function cloudinaryImageUrl(publicId, width) {
  return cloudinary
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(scale().width(width))
    .toURL();
}
