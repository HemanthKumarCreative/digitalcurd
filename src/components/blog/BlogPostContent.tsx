'use client'

import Link from 'next/link'
import CtaBand from '@/components/shared/CtaBand'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'

type BlogPostContentProps = {
  documentId: string
  title: string
  category: string
  publishedAt: string
  coverImageUrl: string
  bodyParagraphs: string[]
}

export default function BlogPostContent({
  documentId,
  title,
  category,
  publishedAt,
  coverImageUrl,
  bodyParagraphs,
}: BlogPostContentProps) {
  return (
    <DesignModeDocument documentId={documentId} documentType="post">
      <article className="dc-article" aria-label={title}>
        <div className="dc-article__inner">
          <p className="dc-article__meta">
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              Blog
            </Link>
            {' · '}
            <EditableText
              as="span"
              path="category"
              label="Post → Category"
              value={category}
            />
            {' · '}
            {publishedAt?.slice?.(0, 10) || publishedAt}
          </p>
          <EditableText
            as="h1"
            path="title"
            label="Post → Title"
            value={title}
            className="dc-article__title"
          />
          <EditableImage
            path="coverImageUrl"
            label="Post → Cover"
            value={coverImageUrl}
            alt=""
            className="dc-article__cover"
          />
          <div className="dc-article__body">
            {bodyParagraphs.map((paragraph, index) => (
              <EditableText
                key={`p-${index}`}
                as="p"
                path={`bodyParagraphs[${index}]`}
                label={`Post → Paragraph ${index + 1}`}
                value={paragraph}
                multiline
              />
            ))}
          </div>
        </div>
      </article>

      <CtaBand
        title="Want this applied to your business?"
        description="Book a free consultation and we will map a practical next step."
        cta={{ label: 'Schedule a Call', href: '/contact' }}
      />
    </DesignModeDocument>
  )
}
