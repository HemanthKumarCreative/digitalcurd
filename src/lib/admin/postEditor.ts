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
  {
    key: 'title',
    title: 'Article title',
    description: 'Main headline at the top of the article page.',
    helper: 'Write a clear title readers will understand in one glance.',
    placeholder: 'e.g. How to choose an AI development partner',
    kind: 'string',
    defaultOpen: true,
  },
  {
    key: 'slug',
    title: 'URL slug',
    description: 'The end of the public link: /blog/your-slug.',
    helper:
      'Use lowercase words with hyphens (no spaces). Changing this updates the public URL after you publish.',
    placeholder: 'how-to-choose-an-ai-partner',
    kind: 'slug',
  },
  {
    key: 'excerpt',
    title: 'Short summary',
    description: 'Shown under the title and on article cards in the blog list.',
    helper:
      '1–2 sentences (about 140–180 characters). Also used for SEO if meta description is empty.',
    placeholder: 'A short teaser that makes someone want to open the article…',
    kind: 'textarea',
  },
  {
    key: 'category',
    title: 'Category',
    description: 'Topic label shown in the breadcrumb above the title.',
    helper: 'Keep it short — e.g. Insights, AI, Engineering, Product.',
    placeholder: 'Insights',
    kind: 'string',
  },
  {
    key: 'publishedAt',
    title: 'Publish date',
    description: 'When the article first went live. Used for sorting on the blog list.',
    helper: 'Set this before publishing. Leave as-is for drafts if you are not sure yet.',
    kind: 'datetime',
  },
  {
    key: 'updatedAt',
    title: 'Last updated',
    description: 'Optional. Shown as “Updated” in the article meta strip.',
    helper: 'Update this when you meaningfully revise the article after launch.',
    kind: 'datetime',
  },
  {
    key: 'readingMinutes',
    title: 'Reading time (minutes)',
    description: 'Approximate time to read, shown next to the author.',
    helper: 'Whole number only — e.g. 5 for a five-minute read.',
    placeholder: '5',
    kind: 'number',
  },
  {
    key: 'coverImageUrl',
    title: 'Cover image',
    description: 'Large image under the title on the article page.',
    helper: 'Prefer a wide landscape image (around 1600×900). Pick from Media or paste a URL.',
    kind: 'imageUrl',
  },
  {
    key: 'author',
    title: 'Author',
    description: 'Who wrote this article. Shown in the meta strip and author card.',
    kind: 'authorRef',
    authors,
  },
  {
    key: 'sections',
    title: 'Article body',
    description:
      'Build the main content with sections in reading order. Tip: start with Prose (intro), then add Table / Guide / Steps as needed, and end with a conclusion Prose. Light markdown works: **bold**, `code`, [link text](/services/slug).',
    kind: 'blogSections',
    defaultOpen: true,
  },
  {
    key: 'faqs',
    title: 'FAQs',
    description:
      'Common questions shown near the bottom of the article. Add 3–6 clear Q&As when useful.',
    kind: 'faqs',
  },
  {
    key: 'relatedPosts',
    title: 'Related articles',
    description:
      'Other articles suggested after this one. Tick 2–4 posts that help the reader go deeper.',
    kind: 'relatedPosts',
    posts,
  },
  {
    key: 'relatedServiceSlugs',
    title: 'Related services',
    description:
      'Service pages to show under the article (links readers to what you sell).',
    helper:
      'Enter one service slug per line — the part after /services/. Example: ai-agent-development',
    placeholder: 'ai-agent-development\ncustom-software-development',
    kind: 'textarea',
  },
  {
    key: 'cta',
    title: 'Footer call-to-action',
    description:
      'Banner at the bottom that invites readers to contact you or open a service page.',
    helper: 'Use a path like `/services/ai-agent-development` or `/contact`.',
    kind: 'cta',
    defaultOpen: false,
  },
  {
    key: 'seo',
    title: 'Search & social (SEO)',
    description:
      'Controls how this article appears in Google and when shared on LinkedIn, X, etc. Leave blank to fall back to the title and summary above.',
    kind: 'seo',
  },
]
