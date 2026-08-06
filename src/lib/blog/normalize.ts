import type {
  BlogAuthor,
  BlogPostDetail,
  BlogRelatedPost,
  BlogSection,
  BlogTableSection,
} from '@/types/blog'
import {
  estimateReadingMinutes,
  legacyParagraphsToSections,
  normalizeTableRows,
} from '@/lib/blog/utils'

type RawPost = {
  _id?: string
  title?: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  date?: string
  updatedAt?: string
  readingMinutes?: number
  category?: string
  coverImageUrl?: string
  coverImage?: string | null
  bodyParagraphs?: string[]
  body?: string[] | null
  sections?: BlogSection[]
  faqs?: { question: string; answer: string }[]
  relatedSlugs?: string[]
  relatedPosts?: BlogRelatedPost[]
  relatedServiceSlugs?: string[]
  author?: BlogAuthor | null
  cta?: BlogPostDetail['cta']
  seo?: BlogPostDetail['seo']
}

const normalizeSection = (section: BlogSection): BlogSection => {
  if (section._type !== 'blogTable') return section
  const table = section as BlogTableSection
  return {
    ...table,
    rows: normalizeTableRows(table),
  }
}

export const normalizeBlogPost = (
  raw: RawPost,
  relatedLookup: BlogRelatedPost[] = [],
  defaultAuthor?: BlogAuthor
): BlogPostDetail => {
  const slug = raw.slug || ''
  const body =
    (Array.isArray(raw.bodyParagraphs) && raw.bodyParagraphs.length
      ? raw.bodyParagraphs
      : Array.isArray(raw.body)
        ? raw.body
        : []) || []
  const sections =
    raw.sections?.length
      ? raw.sections.map(normalizeSection)
      : legacyParagraphsToSections(body)

  const relatedPosts =
    raw.relatedPosts?.length
      ? raw.relatedPosts
      : (raw.relatedSlugs || [])
          .map((relatedSlug) => relatedLookup.find((post) => post.slug === relatedSlug))
          .filter(Boolean) as BlogRelatedPost[]

  const faqs = raw.faqs || []
  const readingMinutes =
    raw.readingMinutes || estimateReadingMinutes(sections, faqs)

  return {
    slug,
    title: raw.title || 'Untitled',
    excerpt: raw.excerpt || '',
    date: raw.publishedAt || raw.date || '',
    updatedAt: raw.updatedAt,
    readingMinutes,
    coverImage: raw.coverImageUrl || (typeof raw.coverImage === 'string' ? raw.coverImage : '') || '',
    category: raw.category || 'Insights',
    author: raw.author || defaultAuthor,
    sections,
    faqs,
    relatedSlugs: raw.relatedSlugs,
    relatedPosts,
    relatedServiceSlugs: raw.relatedServiceSlugs || [],
    cta: raw.cta,
    body,
    seo: raw.seo,
  }
}
