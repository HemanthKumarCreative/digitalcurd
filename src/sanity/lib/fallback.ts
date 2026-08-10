import homeJson from '@/content/home.json'
import aboutJson from '@/content/about.json'
import careersJson from '@/content/careers.json'
import contactJson from '@/content/contact.json'
import blogJson from '@/content/blog.json'
import privacyJson from '@/content/legal/privacy-policy.json'
import disclaimerJson from '@/content/legal/disclaimer.json'
import termsJson from '@/content/legal/terms-of-service.json'
import catalogJson from '@/content/services/catalog.json'
import { getServiceContent as getLocalService } from '@/content/services'
import { normalizeBlogPost } from '@/lib/blog/normalize'
import type { BlogAuthor, BlogRelatedPost, BlogSection } from '@/types/blog'
import type { ServiceMeta } from '@/types/content'

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

export type WithSeo<T> = T & { seo?: SeoFields }

export const fallbackSiteSettings = {
  siteName: 'Digital Curd',
  email: 'hello@digitalcurd.com',
  phone: {
    label: '+91 8510932094',
    href: 'tel:+918510932094',
  },
  footerBlurb:
    'AI-powered growth systems for marketing, commerce, and modern digital products.',
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
  ],
  seo: {
    title: 'Digital Curd',
    description: 'AI-powered growth partner for marketing, technology & analytics.',
  },
}

export const fallbackHomePage: WithSeo<typeof homeJson> = { ...homeJson }
export const fallbackAboutPage: WithSeo<typeof aboutJson> = { ...aboutJson }
export const fallbackCareersPage: WithSeo<
  Omit<typeof careersJson, 'jobs'> & { jobs?: undefined }
> = {
  ...careersJson,
  jobs: undefined,
}
export const fallbackJobs = careersJson.jobs.map((j) => ({
  _id: j.id,
  jobId: j.id,
  title: j.title,
  location: j.location,
  type: j.type,
  blurb: j.blurb,
  applyHref: j.applyHref,
}))
export const fallbackContactPage: WithSeo<typeof contactJson> = { ...contactJson }
export const fallbackBlogIndex: WithSeo<{ hero: typeof blogJson.hero }> = {
  hero: blogJson.hero,
  seo: blogJson.seo,
}

const fallbackAuthor = blogJson.author as BlogAuthor

const relatedLookup: BlogRelatedPost[] = blogJson.posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  publishedAt: p.date,
  date: p.date,
  category: p.category,
  readingMinutes: p.readingMinutes,
  coverImageUrl: p.coverImage,
}))

export const fallbackPosts = blogJson.posts.map((p) => {
  const normalized = normalizeBlogPost(
    {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      publishedAt: p.date,
      updatedAt: p.updatedAt,
      readingMinutes: p.readingMinutes,
      category: p.category,
      coverImageUrl: p.coverImage,
      bodyParagraphs: p.body,
      sections: p.sections as BlogSection[],
      faqs: p.faqs,
      relatedSlugs: p.relatedSlugs,
      relatedServiceSlugs: p.relatedServiceSlugs,
      cta: p.cta,
      seo: p.seo,
      author: fallbackAuthor,
    },
    relatedLookup,
    fallbackAuthor
  )
  return {
    _id: p.slug,
    title: normalized.title,
    slug: normalized.slug,
    excerpt: normalized.excerpt,
    publishedAt: normalized.date,
    updatedAt: normalized.updatedAt,
    readingMinutes: normalized.readingMinutes,
    category: normalized.category,
    coverImage: null as null,
    coverImageUrl: normalized.coverImage,
    bodyParagraphs: normalized.body || p.body,
    sections: normalized.sections,
    faqs: normalized.faqs,
    relatedPosts: normalized.relatedPosts,
    relatedServiceSlugs: normalized.relatedServiceSlugs,
    author: normalized.author,
    cta: normalized.cta,
    seo: normalized.seo,
  }
})

export const fallbackServicesIndex: WithSeo<{
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    backgroundUrl: string
    cta: { label: string; href: string }
  }
}> = {
  seo: {
    title: 'Services',
    description:
      'Browse every Digital Curd capability. Each service page shares the same clear layout so you can compare options and start a conversation quickly.',
  },
  hero: {
    eyebrow: 'Services',
    title: 'One connected growth system',
    subtitle: 'AI, marketing, commerce, engineering, and creative—built to work together.',
    description:
      'Browse every Digital Curd capability. Each service page shares the same clear layout so you can compare options and start a conversation quickly.',
    backgroundUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    cta: { label: 'Book a consultation', href: '/contact' },
  },
}

export const fallbackServiceCatalog: ServiceMeta[] = catalogJson.services

export const getFallbackService = async (slug: string) => {
  const service = await getLocalService(slug)
  if (!service) return null
  return {
    ...service,
    heroImage: null,
    heroImageUrl: service.heroImage,
    relatedServices: service.relatedSlugs
      .map((s) => fallbackServiceCatalog.find((c) => c.slug === s))
      .filter(Boolean),
    phone: fallbackSiteSettings.phone,
    seo: service.seo,
  }
}

export const getFallbackLegal = (slug: string) => {
  const map: Record<string, typeof privacyJson> = {
    'privacy-policy': privacyJson,
    disclaimer: disclaimerJson,
    'terms-of-service': termsJson,
  }
  const doc = map[slug]
  if (!doc) return null
  return { ...doc, slug, seo: doc.seo }
}

export const getFallbackPost = (slug: string) => {
  const post = fallbackPosts.find((p) => p.slug === slug)
  if (!post) return null
  return {
    ...post,
    body: null,
  }
}

export const fallbackAuthors = [fallbackAuthor]
