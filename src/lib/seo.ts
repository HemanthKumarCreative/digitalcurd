import type { Metadata } from 'next'
import { getSiteUrl } from './site'

export const DEFAULT_SITE_NAME = 'Digital Curd'

export const DEFAULT_SITE_DESCRIPTION =
  'DigitalCurd helps businesses grow with AI solutions, digital marketing, ecommerce, modern web engineering, and analytics—built as one connected growth system.'

export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=630&q=80'

export type PageMetadataOptions = {
  path: string
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
  publishedTime?: string
}

export type FaqJsonLdItem = {
  question: string
  answer: string
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export const absoluteUrl = (path: string): string => {
  const siteUrl = getSiteUrl()
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalized}`
}

export const resolveOgImage = (url?: string): string => {
  if (!url) return absoluteUrl(DEFAULT_OG_IMAGE)
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return absoluteUrl(url.startsWith('/') ? url : `/${url}`)
}

export const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const buildPageMetadata = ({
  path,
  title,
  description,
  ogImage,
  ogType = 'website',
  noIndex = false,
  publishedTime,
}: PageMetadataOptions): Metadata => {
  const canonical = absoluteUrl(path)
  const image = resolveOgImage(ogImage)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: DEFAULT_SITE_NAME,
      type: ogType,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime && ogType === 'article' ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  }
}

export const organizationJsonLd = (settings: {
  siteName?: string
  email?: string
  phone?: { label: string; href: string }
  socialLinks?: { label: string; href: string }[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: settings.siteName || DEFAULT_SITE_NAME,
  url: getSiteUrl(),
  email: settings.email,
  telephone: settings.phone?.label,
  sameAs: settings.socialLinks?.map((link) => link.href).filter(Boolean) || [],
})

export const webSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: DEFAULT_SITE_NAME,
  url: getSiteUrl(),
  description: DEFAULT_SITE_DESCRIPTION,
})

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const serviceJsonLd = (service: {
  title: string
  subtitle: string
  description: string
  slug: string
  heroImageUrl?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.subtitle || service.description,
  url: absoluteUrl(`/services/${service.slug}`),
  provider: {
    '@type': 'Organization',
    name: DEFAULT_SITE_NAME,
    url: getSiteUrl(),
  },
  ...(service.heroImageUrl ? { image: resolveOgImage(service.heroImageUrl) } : {}),
})

export const articleJsonLd = (post: {
  title: string
  excerpt: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  coverImageUrl?: string
  category?: string
  author?: {
    name: string
    url?: string
  }
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  url: absoluteUrl(`/articles/${post.slug}`),
  datePublished: post.publishedAt,
  ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
  author: post.author?.name
    ? {
        '@type': 'Person',
        name: post.author.name,
        ...(post.author.url ? { url: post.author.url } : {}),
      }
    : {
        '@type': 'Organization',
        name: DEFAULT_SITE_NAME,
        url: getSiteUrl(),
      },
  publisher: {
    '@type': 'Organization',
    name: DEFAULT_SITE_NAME,
    url: getSiteUrl(),
  },
  ...(post.coverImageUrl ? { image: resolveOgImage(post.coverImageUrl) } : {}),
  ...(post.category ? { articleSection: post.category } : {}),
})

export const faqJsonLd = (faqs: FaqJsonLdItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripHtml(faq.answer),
    },
  })),
})
