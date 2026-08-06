import type { SeoFields } from './fallback'

export type SanityImageLike = {
  asset?: { _ref?: string; _type?: string }
  [key: string]: unknown
} | null

export type PageHeroContent = {
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
  hero?: PageHeroContent
  [key: string]: unknown
}
