export type SeoFields = {
  title?: string
  description?: string
  canonical?: string
  keywords?: string[]
  robots?: string
  ogImageUrl?: string
  twitterImageUrl?: string
  schemaJson?: string
}

export type CtaLink = {
  label: string
  href: string
}

export type PageHeroContent = {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  backgroundUrl: string
  cta?: CtaLink
  secondaryCta?: CtaLink
  phone?: {
    label: string
    href: string
  }
}

export type FeatureItem = {
  title: string
  description: string
  icon?: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ServiceContent = {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  seo?: SeoFields
  heroImage: string
  outcomes: FeatureItem[]
  capabilities: FeatureItem[]
  featuresSection?: {
    title: string
    description: string
    items: FeatureItem[]
  }
  process: ProcessStep[]
  faqs: FaqItem[]
  relatedSlugs: string[]
  cta: CtaLink
}

export type ServiceMeta = {
  slug: string
  title: string
  category: string
  shortDescription: string
}

export type JobListing = {
  id: string
  title: string
  location: string
  type: string
  blurb: string
  applyHref: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  updatedAt?: string
  readingMinutes?: number
  coverImage: string
  category: string
  body: string[]
  seo?: SeoFields
}

export type LegalSection = {
  heading: string
  paragraphs: string[]
}
