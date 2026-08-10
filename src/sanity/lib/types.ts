import type { SeoFields } from '@/types/content'

export type SanityImageLike = {
  asset?: { _ref?: string; _type?: string }
  [key: string]: unknown
} | null

/** CMS-shaped hero before mapping through `toPageHero`. */
export type CmsPageHero = {
  eyebrow?: string
  title?: string
  subtitle?: string
  description?: string
  backgroundUrl?: string
  backgroundImage?: SanityImageLike
  cta?: { label: string; href: string }
}

export type CmsDocument = {
  seo?: SeoFields
  hero?: CmsPageHero
  [key: string]: unknown
}
