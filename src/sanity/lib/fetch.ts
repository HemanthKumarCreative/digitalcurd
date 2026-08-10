import { draftMode } from 'next/headers'
import { createClient } from 'next-sanity'
import { client } from './client'
import { apiVersion, dataset, hasSanityConfig, projectId } from '../env'
import {
  aboutPageQuery,
  blogIndexQuery,
  careersPageQuery,
  contactPageQuery,
  homePageQuery,
  jobsQuery,
  legalBySlugQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  serviceBySlugQuery,
  serviceCatalogQuery,
  serviceSlugsQuery,
  servicesIndexQuery,
  siteSettingsQuery,
} from './queries'
import {
  fallbackAboutPage,
  fallbackBlogIndex,
  fallbackCareersPage,
  fallbackContactPage,
  fallbackHomePage,
  fallbackJobs,
  fallbackPosts,
  fallbackServiceCatalog,
  fallbackServicesIndex,
  fallbackSiteSettings,
  getFallbackLegal,
  getFallbackPost,
  getFallbackService,
  type SeoFields,
} from './fallback'
import type { CmsPageHero, SanityImageLike } from './types'
import { resolveImageUrl } from './image'
import { normalizeBlogPost } from '@/lib/blog/normalize'
import type { BlogAuthor, BlogRelatedPost, BlogSection } from '@/types/blog'

type HomePageData = typeof fallbackHomePage & {
  seo?: SeoFields
  heroSection?: CmsPageHero & { backgroundImage?: SanityImageLike }
  contactForm?: {
    title: string
    subtitle?: string
    leftCol: { email: string; emailLabel?: string }
    form: {
      namePlaceholder: string
      emailPlaceholder: string
      servicePlaceholder: string
      requirementsPlaceholder: string
      submitButton: string
      successMessage: string
      services: { group: string; options: string[] }[]
    }
    imageUrl?: string
  }
}

type AboutPageData = Omit<typeof fallbackAboutPage, 'hero' | 'team'> & {
  hero?: CmsPageHero
  team: {
    eyebrow?: string
    title: string
    description?: string
    members: Array<{
      name: string
      role: string
      image?: SanityImageLike
      imageUrl?: string
    }>
  }
}

type CareersPageData = Omit<typeof fallbackCareersPage, 'hero'> & { hero?: CmsPageHero }
type ContactPageData = Omit<typeof fallbackContactPage, 'hero'> & { hero?: CmsPageHero }
type BlogIndexData = Omit<typeof fallbackBlogIndex, 'hero'> & { hero?: CmsPageHero }
type ServicesIndexData = Omit<typeof fallbackServicesIndex, 'hero'> & { hero?: CmsPageHero }

type PostData = (typeof fallbackPosts)[number] & {
  coverImage?: SanityImageLike
  body?: unknown
  seo?: SeoFields
  sections?: BlogSection[]
  faqs?: { question: string; answer: string }[]
  relatedPosts?: BlogRelatedPost[]
  author?: BlogAuthor
  updatedAt?: string
  readingMinutes?: number
  cta?: { label: string; href: string }
}

type ServiceData = {
  _id?: string
  title: string
  subtitle?: string
  description?: string
  category?: string
  slug: string
  outcomes?: { title: string; description: string; icon?: string }[]
  capabilities?: { title: string; description: string; icon?: string }[]
  featuresSection?: {
    title: string
    description: string
    items: { title: string; description: string; icon?: string }[]
  }
  process?: { title: string; description: string }[]
  faqs?: { question: string; answer: string }[]
  cta?: { label: string; href: string }
  heroImage?: SanityImageLike | string
  heroImageUrl?: string
  relatedServices?: unknown[]
  relatedSlugs?: string[]
  phone?: { label: string; href: string }
  seo?: SeoFields
  [key: string]: unknown
}

type LegalData = {
  _id?: string
  title: string
  slug: string
  lastUpdated: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
  seo?: SeoFields
}

const getFetchClient = async () => {
  if (!hasSanityConfig || !client) return null
  try {
    const { isEnabled } = await draftMode()
    if (!isEnabled) return client
    const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
    if (!token || !projectId) return client
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
      perspective: 'previewDrafts',
    })
  } catch {
    return client
  }
}

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  const fetchClient = await getFetchClient()
  if (!fetchClient || !hasSanityConfig) return null
  try {
    let isEnabled = false
    try {
      isEnabled = (await draftMode()).isEnabled
    } catch {
      isEnabled = false
    }
    return await fetchClient.fetch<T>(query, params, {
      next: isEnabled ? { revalidate: 0 } : { tags, revalidate: 60 },
    })
  } catch (error) {
    console.warn('[sanity] fetch failed, using fallback', error)
    return null
  }
}

export const getSiteSettings = async () => {
  const data = await sanityFetch<typeof fallbackSiteSettings>(siteSettingsQuery, {}, [
    'siteSettings',
  ])
  return data || fallbackSiteSettings
}

export const getHomePage = async (): Promise<HomePageData> => {
  const data = await sanityFetch<HomePageData>(homePageQuery, {}, ['home'])
  const page = (data || fallbackHomePage) as HomePageData
  const hero = page.heroSection
  if (hero) {
    const backgroundUrl =
      resolveImageUrl(
        (hero as { backgroundImage?: SanityImageLike }).backgroundImage,
        hero.backgroundUrl
      ) || hero.backgroundUrl
    page.heroSection = { ...hero, backgroundUrl }
  }
  if (page.aiSection) {
    const ai = page.aiSection as { image?: SanityImageLike; imageUrl?: string }
    page.aiSection = {
      ...page.aiSection,
      imageUrl: resolveImageUrl(ai.image, ai.imageUrl) || ai.imageUrl || '',
    }
  }
  if (page.contactForm) {
    const cf = page.contactForm as { image?: SanityImageLike; imageUrl?: string }
    page.contactForm = {
      ...page.contactForm,
      imageUrl: resolveImageUrl(cf.image, cf.imageUrl) || cf.imageUrl || '',
    }
  }
  return page
}

export const getAboutPage = async (): Promise<AboutPageData> => {
  const data = await sanityFetch<AboutPageData>(aboutPageQuery, {}, ['about'])
  return (data || fallbackAboutPage) as AboutPageData
}

export const getCareersPage = async () => {
  const page = await sanityFetch<CareersPageData>(careersPageQuery, {}, ['careers'])
  const jobs = await sanityFetch<typeof fallbackJobs>(jobsQuery, {}, ['jobs'])
  return {
    page: (page || fallbackCareersPage) as CareersPageData,
    jobs: jobs?.length ? jobs : fallbackJobs,
  }
}

export const getContactPage = async (): Promise<ContactPageData> => {
  const data = await sanityFetch<ContactPageData>(contactPageQuery, {}, ['contact'])
  return (data || fallbackContactPage) as ContactPageData
}

export const getBlogIndex = async () => {
  const index = await sanityFetch<BlogIndexData>(blogIndexQuery, {}, ['blog'])
  const posts = await sanityFetch<PostData[]>(postsQuery, {}, ['blog'])
  return {
    index: (index || fallbackBlogIndex) as BlogIndexData,
    posts: (posts?.length ? posts : fallbackPosts) as PostData[],
  }
}

export const getPostBySlug = async (slug: string): Promise<PostData | null> => {
  const data = await sanityFetch<PostData>(postBySlugQuery, { slug }, ['blog', `post:${slug}`])
  const fallback = getFallbackPost(slug)
  const raw = data || fallback
  if (!raw) return null

  // Prefer structured fallback content when CMS posts are still legacy paragraphs-only
  const useFallbackStructure =
    Boolean(fallback) &&
    (!Array.isArray(raw.sections) || raw.sections.length === 0) &&
    Array.isArray(fallback?.sections) &&
    (fallback?.sections.length || 0) > 0

  const source = useFallbackStructure
    ? { ...raw, ...fallback, _id: raw._id }
    : {
        ...raw,
        relatedServiceSlugs:
          (raw as { relatedServiceSlugs?: string[] }).relatedServiceSlugs?.length
            ? (raw as { relatedServiceSlugs?: string[] }).relatedServiceSlugs
            : fallback?.relatedServiceSlugs,
        cta: raw.cta || fallback?.cta,
        faqs:
          (fallback?.faqs?.length || 0) >= 10 &&
          (!raw.faqs?.length || raw.faqs.length < 10)
            ? fallback?.faqs
            : raw.faqs?.length
              ? raw.faqs
              : fallback?.faqs,
        author: raw.author || fallback?.author,
      }

  const coverImageUrl =
    resolveImageUrl(source.coverImage, source.coverImageUrl) || source.coverImageUrl || ''

  const relatedPosts = (source.relatedPosts || []).map((related) => ({
    ...related,
    coverImageUrl:
      resolveImageUrl(
        (related as { coverImage?: SanityImageLike }).coverImage,
        related.coverImageUrl
      ) ||
      related.coverImageUrl ||
      related.coverImage ||
      '',
  }))

  const normalized = normalizeBlogPost(
    {
      _id: source._id,
      title: source.title,
      slug: source.slug,
      excerpt: source.excerpt,
      publishedAt: source.publishedAt,
      updatedAt: source.updatedAt,
      readingMinutes: source.readingMinutes,
      category: source.category,
      coverImageUrl,
      bodyParagraphs: source.bodyParagraphs,
      sections: source.sections,
      faqs: source.faqs,
      relatedPosts,
      relatedServiceSlugs:
        (source as { relatedServiceSlugs?: string[] }).relatedServiceSlugs ||
        fallback?.relatedServiceSlugs,
      author: source.author || fallback?.author,
      cta: source.cta || fallback?.cta,
      seo: source.seo,
    },
    relatedPosts.length ? relatedPosts : fallback?.relatedPosts || []
  )

  return {
    ...source,
    _id: raw._id,
    title: normalized.title,
    slug: normalized.slug,
    excerpt: normalized.excerpt,
    publishedAt: normalized.date,
    updatedAt: normalized.updatedAt,
    readingMinutes: normalized.readingMinutes,
    category: normalized.category,
    coverImage: source.coverImage ?? null,
    coverImageUrl: normalized.coverImage,
    bodyParagraphs: normalized.body || source.bodyParagraphs,
    sections: normalized.sections,
    faqs: normalized.faqs,
    relatedPosts: normalized.relatedPosts,
    relatedServiceSlugs: normalized.relatedServiceSlugs,
    author: normalized.author,
    cta: normalized.cta,
    seo: normalized.seo,
  } as unknown as PostData
}

export const getPostSlugs = async () => {
  const data = await sanityFetch<string[]>(postSlugsQuery, {}, ['blog'])
  if (data?.length) return data
  return fallbackPosts.map((p) => p.slug)
}

export const getServicesIndex = async (): Promise<ServicesIndexData> => {
  const data = await sanityFetch<ServicesIndexData>(servicesIndexQuery, {}, ['services'])
  return (data || fallbackServicesIndex) as ServicesIndexData
}

export const getServiceCatalog = async () => {
  const data = await sanityFetch<typeof fallbackServiceCatalog>(serviceCatalogQuery, {}, [
    'services',
  ])
  return data?.length ? data : fallbackServiceCatalog
}

export const getServiceBySlug = async (slug: string): Promise<ServiceData | null> => {
  const data = await sanityFetch<ServiceData>(serviceBySlugQuery, { slug }, [
    'services',
    `service:${slug}`,
  ])
  if (data) return data
  return (await getFallbackService(slug)) as ServiceData | null
}

export const getServiceSlugs = async () => {
  const data = await sanityFetch<string[]>(serviceSlugsQuery, {}, ['services'])
  if (data?.length) return data
  return fallbackServiceCatalog.map((s) => s.slug)
}

export const getLegalPage = async (slug: string): Promise<LegalData | null> => {
  const data = await sanityFetch<LegalData>(legalBySlugQuery, { slug }, ['legal', `legal:${slug}`])
  return (data || getFallbackLegal(slug)) as LegalData | null
}
