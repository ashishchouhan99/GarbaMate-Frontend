import { AdvancedImage } from '@cloudinary/react';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { cloudinary, cloudinaryImageUrl } from '../lib/cloudinary';

const responsiveWidths = [320, 480, 640, 960, 1280, 1600];

export default function CloudinaryImage({ publicId, alt, width, height, priority = false, ...props }) {
  const image = cloudinary
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(scale().width(width));
  const srcSet = responsiveWidths
    .filter((responsiveWidth) => responsiveWidth <= Math.max(width, 1600))
    .map((responsiveWidth) => `${cloudinaryImageUrl(publicId, responsiveWidth)} ${responsiveWidth}w`)
    .join(', ');

  return <AdvancedImage
    cldImg={image}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    sizes={`(max-width: 640px) ${Math.min(width, 480)}px, ${width}px`}
    srcSet={srcSet}
    {...props}
  />;
}
