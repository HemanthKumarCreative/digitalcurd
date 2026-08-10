import type {
  BlogSection,
  BlogTableSection,
  BlogTocItem,
} from '@/types/blog'

export const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export type BlogDateStyle = 'long' | 'short'

export const formatDate = (
  value?: string,
  style: BlogDateStyle = 'long'
) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  if (style === 'short') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const estimateReadingMinutes = (sections: BlogSection[] = [], faqs: { question?: string; answer?: string }[] = []) => {
  const parts: string[] = []
  for (const section of sections) {
    if ('heading' in section && section.heading) parts.push(section.heading)
    if (section._type === 'blogProse') parts.push(...(section.paragraphs || []))
    if (section._type === 'blogTable') {
      parts.push(...(section.columns || []))
      for (const row of section.rows || []) parts.push(...row)
    }
    if (section._type === 'blogGuide') {
      if (section.intro) parts.push(section.intro)
      for (const item of section.items || []) {
        parts.push(item.title, ...(item.paragraphs || []), ...(item.bullets || []))
        for (const step of item.steps || []) parts.push(step.title, step.body || '')
      }
    }
    if (section._type === 'blogSteps') {
      if (section.intro) parts.push(section.intro)
      for (const step of section.steps || []) parts.push(step.title, step.body || '')
    }
    if (section._type === 'blogList') parts.push(...(section.items || []))
    if (section._type === 'blogInlineCta') {
      parts.push(section.title || '', section.description || '')
    }
    if (section._type === 'blogCallout') parts.push(section.body || '')
  }
  for (const faq of faqs) parts.push(faq.question || '', faq.answer || '')
  const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

export const normalizeTableRows = (section: BlogTableSection): string[][] => {
  const rows = section.rows || []
  if (!rows.length) return []
  if (Array.isArray(rows[0])) return rows as string[][]
  return (rows as unknown as { cells?: string[] }[]).map((row) =>
    Array.isArray(row?.cells) ? row.cells : []
  )
}

export const getSectionHeadingId = (section: BlogSection, fallbackIndex: number) => {
  if ('headingId' in section && section.headingId) return section.headingId
  if ('heading' in section && section.heading) return slugifyHeading(section.heading)
  return `section-${fallbackIndex + 1}`
}

export const buildTocFromSections = (
  sections: BlogSection[] = [],
  extras: BlogTocItem[] = []
): BlogTocItem[] => {
  const items: BlogTocItem[] = []
  sections.forEach((section, index) => {
    if (section._type === 'blogInlineCta' || section._type === 'blogCallout') return
    const heading = 'heading' in section ? section.heading : undefined
    if (!heading) return
    items.push({
      id: getSectionHeadingId(section, index),
      label: heading,
    })
  })
  return [...items, ...extras]
}

export const legacyParagraphsToSections = (paragraphs: string[] = []): BlogSection[] => {
  if (!paragraphs.length) return []
  return [
    {
      _type: 'blogProse',
      heading: 'Overview',
      headingId: 'overview',
      paragraphs,
    },
  ]
}

export const renderInlineMarkdown = (text: string): string => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g,
      '<a href="$2" rel="noopener noreferrer">$1</a>'
    )
}
