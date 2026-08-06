'use client'

import { EditableText } from '@/components/design-mode/EditableText'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import type { LegalSection } from '@/types/content'

type LegalDocumentProps = {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
  documentId?: string
  documentType?: string
}

export default function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
  documentId,
  documentType,
}: LegalDocumentProps) {
  const inner = (
    <article className="dc-legal" aria-label={title}>
      <header className="dc-legal__banner">
        <div className="dc-legal__banner-inner">
          <p className="dc-legal__eyebrow">Legal</p>
          <EditableText
            as="h1"
            path="title"
            label="Legal → Title"
            value={title}
            className="dc-legal__title"
          />
          <p className="dc-legal__updated">
            Last updated:{' '}
            <EditableText
              as="span"
              path="lastUpdated"
              label="Legal → Last updated"
              value={lastUpdated}
            />
          </p>
        </div>
      </header>

      <div className="dc-legal__inner">
        {intro ? (
          <EditableText
            as="p"
            path="intro"
            label="Legal → Intro"
            value={intro}
            multiline
            className="dc-legal__intro"
          />
        ) : null}

        <div className="dc-legal__body">
          {sections.map((section, sIndex) => (
            <section key={section.heading} className="dc-legal__section">
              <EditableText
                as="h2"
                path={`sections[${sIndex}].heading`}
                label={`Section ${sIndex + 1} → Heading`}
                value={section.heading}
              />
              {section.paragraphs.map((p, pIndex) => (
                <EditableText
                  key={`${sIndex}-${pIndex}`}
                  as="p"
                  path={`sections[${sIndex}].paragraphs[${pIndex}]`}
                  label={`Section ${sIndex + 1} → Paragraph ${pIndex + 1}`}
                  value={p}
                  multiline
                />
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  )

  if (documentId && documentType) {
    return (
      <DesignModeDocument documentId={documentId} documentType={documentType}>
        {inner}
      </DesignModeDocument>
    )
  }

  return inner
}
