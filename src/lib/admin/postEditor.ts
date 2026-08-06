import type { SectionDef } from '@/components/admin/StructuredDocumentEditor'

export type PostAuthorOption = {
  id: string
  name: string
  role?: string
}

export type PostRelatedOption = {
  id: string
  title: string
  slug: string
}

type BuildPostSeedOpts = {
  title: string
  slug: string
  category?: string
}

export const buildPostSeed = ({
  title,
  slug,
  category = 'Insights',
}: BuildPostSeedOpts): Record<string, unknown> => {
  const now = new Date().toISOString()

  return {
    title,
    slug: { _type: 'slug', current: slug },
    excerpt: 'Short summary for cards and SEO. Update before publishing.',
    category,
    publishedAt: now,
    updatedAt: now,
    readingMinutes: 5,
    coverImageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        _type: 'blogProse',
        _key: 'intro',
        heading: 'Overview',
        headingId: 'overview',
        paragraphs: [
          'Write your introduction here. Explain the problem and what the reader will learn.',
        ],
      },
      {
        _type: 'blogTable',
        _key: 'table',
        heading: 'Key comparisons',
        headingId: 'key-comparisons',
        columns: ['Topic', 'Why it matters'],
        rows: [
          {
            _key: 'row-1',
            cells: ['Example topic', 'Describe why this matters for your service.'],
          },
        ],
      },
      {
        _type: 'blogInlineCta',
        _key: 'mid-cta',
        title: 'Need help applying this?',
        description: 'Explore the related Digital Curd service, or book a consultation.',
        ctaLabel: 'View related service',
        ctaHref: '/services',
      },
      {
        _type: 'blogGuide',
        _key: 'guide',
        heading: 'How to put this into practice',
        headingId: 'how-to-put-this-into-practice',
        intro: 'Start with one practical win, then expand.',
        items: [
          {
            title: 'First action',
            headingId: 'first-action',
            paragraphs: ['Describe the first action clearly.'],
            steps: [
              { title: 'Prepare', body: 'Gather the inputs you need.' },
              { title: 'Execute', body: 'Run the first controlled change.' },
            ],
            bullets: [],
          },
          {
            title: 'Second action',
            headingId: 'second-action',
            paragraphs: ['Describe the follow-up action.'],
            steps: [{ title: 'Review', body: 'Check quality and impact.' }],
            bullets: [],
          },
        ],
      },
      {
        _type: 'blogProse',
        _key: 'conclusion',
        heading: 'Conclusion',
        headingId: 'conclusion',
        paragraphs: [
          'Summarize the takeaway and point readers to the matching Digital Curd service.',
        ],
      },
    ],
    faqs: [
      {
        _key: 'faq-1',
        question: 'What is the first step?',
        answer: 'Start with one narrow workflow and define success criteria.',
      },
    ],
    relatedServiceSlugs: [],
    cta: {
      title: 'Want this applied to your business?',
      description: 'Talk to Digital Curd about the service that matches this playbook.',
      label: 'Explore services',
      href: '/services',
    },
    seo: {
      title,
      description: 'Draft post. Update excerpt and sections before publishing.',
    },
  }
}

export const mapPostToInitialValues = (
  doc: Record<string, unknown>,
  slugFallback: string
): Record<string, unknown> => {
  const slugCurrent =
    typeof doc.slug === 'object' && doc.slug && 'current' in (doc.slug as object)
      ? String((doc.slug as { current?: string }).current || slugFallback)
      : slugFallback

  const ctaValue =
    doc.cta && typeof doc.cta === 'object'
      ? {
          title: String((doc.cta as { title?: string }).title || ''),
          description: String((doc.cta as { description?: string }).description || ''),
          label: String(
            (doc.cta as { label?: string }).label ||
              (doc.cta as { cta?: { label?: string } }).cta?.label ||
              ''
          ),
          href: String(
            (doc.cta as { href?: string }).href ||
              (doc.cta as { cta?: { href?: string } }).cta?.href ||
              ''
          ),
        }
      : {
          title: 'Want this applied to your business?',
          description: 'Book a free consultation and we will map a practical next step.',
          label: 'Schedule a Call',
          href: '/contact',
        }

  return {
    title: doc.title,
    slug: slugCurrent,
    excerpt: doc.excerpt,
    category: doc.category,
    publishedAt: doc.publishedAt ? String(doc.publishedAt).slice(0, 16) : '',
    updatedAt: doc.updatedAt ? String(doc.updatedAt).slice(0, 16) : '',
    readingMinutes: doc.readingMinutes,
    coverImageUrl: doc.coverImageUrl,
    author: doc.author,
    sections: doc.sections || [],
    faqs: doc.faqs || [],
    relatedPosts: doc.relatedPosts || [],
    relatedServiceSlugs: Array.isArray(doc.relatedServiceSlugs)
      ? (doc.relatedServiceSlugs as string[]).join('\n')
      : '',
    cta: ctaValue,
    seo: doc.seo,
  }
}

export const getPostEditorSections = ({
  authors = [],
  posts = [],
}: {
  authors?: PostAuthorOption[]
  posts?: PostRelatedOption[]
} = {}): SectionDef[] => [
  { key: 'title', title: 'Title', kind: 'string', defaultOpen: true },
  { key: 'slug', title: 'URL slug', kind: 'slug' },
  { key: 'excerpt', title: 'Excerpt', kind: 'textarea' },
  { key: 'category', title: 'Category', kind: 'string' },
  { key: 'publishedAt', title: 'Published at', kind: 'datetime' },
  { key: 'updatedAt', title: 'Updated at', kind: 'datetime' },
  { key: 'readingMinutes', title: 'Reading minutes', kind: 'number' },
  { key: 'coverImageUrl', title: 'Cover image', kind: 'imageUrl' },
  {
    key: 'author',
    title: 'Author',
    kind: 'authorRef',
    authors,
  },
  {
    key: 'sections',
    title: 'Article sections',
    description:
      'Recommended order: prose intro → comparison table → inline CTA → guide → conclusion. Use markdown lightly: **bold**, `code`, [label](/services/slug).',
    kind: 'blogSections',
    defaultOpen: true,
  },
  { key: 'faqs', title: 'FAQs', kind: 'faqs' },
  {
    key: 'relatedPosts',
    title: 'Related posts',
    kind: 'relatedPosts',
    posts,
  },
  {
    key: 'relatedServiceSlugs',
    title: 'Related service slugs',
    description: 'One service slug per line, e.g. ai-agent-development',
    kind: 'textarea',
  },
  { key: 'cta', title: 'Footer CTA', kind: 'cta', defaultOpen: false },
  { key: 'seo', title: 'SEO', kind: 'seo' },
]
