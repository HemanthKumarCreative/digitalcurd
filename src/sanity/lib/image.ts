import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { dataset, projectId, hasSanityConfig } from '../env'

const builder = hasSanityConfig
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export const urlForImage = (source: SanityImageSource | null | undefined) => {
  if (!builder || !source) return null
  return builder.image(source)
}

export const resolveImageUrl = (
  image: SanityImageSource | null | undefined | unknown,
  fallbackUrl?: string | null
) => {
  const built = urlForImage(image as SanityImageSource | null | undefined)
    ?.width(1920)
    .quality(80)
    .url()
  return built || fallbackUrl || ''
}
