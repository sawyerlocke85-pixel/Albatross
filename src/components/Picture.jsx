/** Renders a build-time resized image ({ src, srcset, w, h } from vite-imagetools). */
export default function Picture({ image, alt, sizes, className, focus, eager = false }) {
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcset}
      sizes={sizes}
      width={image.w}
      height={image.h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={focus ? { objectPosition: focus } : undefined}
    />
  )
}
