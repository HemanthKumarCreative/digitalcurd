'use client'

import Link from 'next/link'
import { ArticleAuthorCard } from '@/components/blog/ArticleAuthorCard'
import { ArticleHelpful } from '@/components/blog/ArticleHelpful'
import { ArticleSectionRenderer } from '@/components/blog/ArticleSectionRenderer'
import { ArticleShareBar } from '@/components/blog/ArticleShareBar'
import { ArticleToc } from '@/components/blog/ArticleToc'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import CtaBand from '@/components/shared/CtaBand'
import RelatedServices from '@/components/shared/RelatedServices'
import SimpleFaq from '@/components/shared/SimpleFaq'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import { buildTocFromSections, formatDate } from '@/lib/blog/utils'
import type {
  BlogAuthor,
  BlogRelatedPost,
  BlogSection,
} from '@/types/blog'
import type { FaqItem, ServiceMeta } from '@/types/content'

type BlogCta = {
  title?: string
  description?: string
  label?: string
  href?: string
  cta?: { label?: string; href?: string }
}

type BlogPostContentProps = {
  documentId: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt?: string
  readingMinutes?: number
  coverImageUrl: string
  shareUrl: string
  author?: BlogAuthor
  sections: BlogSection[]
  faqs: FaqItem[]
  relatedPosts: BlogRelatedPost[]
  relatedServices?: ServiceMeta[]
  cta?: BlogCta
}

export default function BlogPostContent({
  documentId,
  slug,
  title,
  excerpt,
  category,
  publishedAt,
  updatedAt,
  readingMinutes,
  coverImageUrl,
  shareUrl,
  author,
  sections,
  faqs,
  relatedPosts,
  relatedServices = [],
  cta,
}: BlogPostContentProps) {
  const toc = buildTocFromSections(
    sections,
    faqs.length ? [{ id: 'faqs', label: 'FAQs' }] : []
  )
  const updatedLabel = formatDate(updatedAt || publishedAt)
  const publishedLabel = formatDate(publishedAt)
  const ctaTitle =
    cta?.title || 'Want this applied to your business?'
  const ctaDescription =
    cta?.description ||
    'Book a free consultation and we will map a practical next step.'
  const ctaLabel = cta?.cta?.label || cta?.label || 'Schedule a Call'
  const ctaHref = cta?.cta?.href || cta?.href || '/contact'

  return (
    <DesignModeDocument documentId={documentId} documentType="post">
      <article className="dc-article" aria-label={title}>
        <div className="dc-article__inner">
          <nav className="dc-article__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <Link href="/articles">Articles</Link>
            <span aria-hidden>›</span>
            <EditableText
              as="span"
              path="category"
              label="Category (topic label)"
              value={category}
            />
          </nav>

          <EditableText
            as="h1"
            path="title"
            label="Article title"
            value={title}
            className="dc-article__title"
          />

          {excerpt ? (
            <EditableText
              as="p"
              path="excerpt"
              label="Short summary (under the title)"
              value={excerpt}
              className="dc-article__lead"
              multiline
            />
          ) : null}

          <div className="dc-article__meta-strip">
            <div>
              <span className="dc-article__meta-label">Author</span>
              <span className="dc-article__meta-value">
                {author?.name || 'Digital Curd'}
              </span>
            </div>
            <div>
              <span className="dc-article__meta-label">Updated</span>
              <span className="dc-article__meta-value">{updatedLabel || publishedLabel}</span>
            </div>
            <div>
              <span className="dc-article__meta-label">Reading time</span>
              <span className="dc-article__meta-value">
                {readingMinutes ? `${readingMinutes} min` : '—'}
              </span>
            </div>
          </div>

          <ArticleShareBar title={title} url={shareUrl} />

          {coverImageUrl ? (
            <EditableImage
              path="coverImageUrl"
              label="Cover image (click to change)"
              value={coverImageUrl}
              alt={title}
              className="dc-article__cover"
            />
          ) : null}

          <div className="dc-article__layout">
            <ArticleToc items={toc} />
            <div className="dc-article__main">
              <ArticleSectionRenderer sections={sections} />
              <ArticleHelpful slug={slug} />
            </div>
          </div>
        </div>

        {faqs.length ? (
          <div id="faqs">
            <SimpleFaq
              title="Frequently Asked Questions"
              faqs={faqs}
              pathPrefix="faqs"
            />
          </div>
        ) : null}

        {author ? (
          <div className="dc-article__inner">
            <ArticleAuthorCard author={author} />
          </div>
        ) : null}
      </article>

      <RelatedPosts posts={relatedPosts} />

      {relatedServices.length ? (
        <RelatedServices title="Related services" services={relatedServices} />
      ) : null}

      <CtaBand
        title={ctaTitle}
        description={ctaDescription}
        cta={{
          label: ctaLabel,
          href: ctaHref,
        }}
        pathPrefix="cta"
      />
    </DesignModeDocument>
  )
}
