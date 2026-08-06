import type { CtaLink, FaqItem, SeoFields } from '@/types/content'

export type BlogAuthor = {
  name: string
  slug: string
  role?: string
  avatarUrl?: string
  bio?: string
  linkedinUrl?: string
}

export type BlogStepItem = {
  title: string
  body?: string
}

export type BlogGuideItem = {
  title: string
  headingId?: string
  paragraphs?: string[]
  steps?: BlogStepItem[]
  bullets?: string[]
}

export type BlogProseSection = {
  _type: 'blogProse'
  _key?: string
  heading?: string
  headingId?: string
  paragraphs?: string[]
}

export type BlogTableSection = {
  _type: 'blogTable'
  _key?: string
  heading?: string
  headingId?: string
  columns?: string[]
  rows?: string[][]
}

export type BlogGuideSection = {
  _type: 'blogGuide'
  _key?: string
  heading?: string
  headingId?: string
  intro?: string
  items?: BlogGuideItem[]
}

export type BlogStepsSection = {
  _type: 'blogSteps'
  _key?: string
  heading?: string
  headingId?: string
  intro?: string
  steps?: BlogStepItem[]
}

export type BlogListSection = {
  _type: 'blogList'
  _key?: string
  heading?: string
  headingId?: string
  style?: 'bullet' | 'numbered'
  items?: string[]
}

export type BlogInlineCtaSection = {
  _type: 'blogInlineCta'
  _key?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export type BlogCalloutSection = {
  _type: 'blogCallout'
  _key?: string
  variant?: 'tip' | 'note' | 'warning'
  body?: string
}

export type BlogSection =
  | BlogProseSection
  | BlogTableSection
  | BlogGuideSection
  | BlogStepsSection
  | BlogListSection
  | BlogInlineCtaSection
  | BlogCalloutSection

export type BlogRelatedPost = {
  slug: string
  title: string
  excerpt?: string
  date?: string
  publishedAt?: string
  coverImage?: string
  coverImageUrl?: string
  category?: string
  readingMinutes?: number
}

export type BlogPostDetail = {
  slug: string
  title: string
  excerpt: string
  date: string
  updatedAt?: string
  readingMinutes?: number
  coverImage: string
  category: string
  author?: BlogAuthor
  sections?: BlogSection[]
  faqs?: FaqItem[]
  relatedSlugs?: string[]
  relatedPosts?: BlogRelatedPost[]
  relatedServiceSlugs?: string[]
  cta?: CtaLink & {
    title?: string
    description?: string
  }
  body?: string[]
  seo?: SeoFields
}

export type BlogTocItem = {
  id: string
  label: string
}
