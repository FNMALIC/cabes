import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  eager?: boolean;
}

/** Serves WebP when available; falls back to the original path. */
export function OptimizedImage({
  src,
  alt,
  eager = false,
  className,
  ...props
}: OptimizedImageProps) {
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp");
  const hasWebp = webpSrc !== src;

  const img = (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
      {...props}
    />
  );

  if (!hasWebp) return img;

  return (
    <picture className={className ? "contents" : undefined}>
      <source srcSet={webpSrc} type="image/webp" />
      {img}
    </picture>
  );
}
