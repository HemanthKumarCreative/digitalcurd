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
import type { ServiceMeta } from '@/types/content'

export type SeoFields = {
  title?: string
  description?: string
}

export type WithSeo<T> = T & { seo?: SeoFields }

export const fallbackSiteSettings = {
  siteName: 'Digital Curd',
  email: 'hello@digitalcurd.com',
  phone: {
    label: '+91 80 4567 8900',
    href: 'tel:+918045678900',
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
export const fallbackPosts = blogJson.posts.map((p) => ({
  _id: p.slug,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  publishedAt: p.date,
  category: p.category,
  coverImage: null as null,
  coverImageUrl: p.coverImage,
  bodyParagraphs: p.body,
  seo: p.seo,
}))
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
  const post = blogJson.posts.find((p) => p.slug === slug)
  if (!post) return null
  return {
    _id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.date,
    category: post.category,
    coverImage: null,
    coverImageUrl: post.coverImage,
    body: null,
    bodyParagraphs: post.body,
    seo: post.seo,
  }
}
