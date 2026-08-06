'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EditableHtml } from '@/components/design-mode/EditableHtml'
import { EditableText } from '@/components/design-mode/EditableText'
import { DesignModeDocument, useDesignMode } from '@/components/design-mode/DesignModeProvider'
import type { FaqItem } from '@/types/content'

type SimpleFaqProps = {
  title?: string
  faqs: FaqItem[]
  documentId?: string
  documentType?: string
  pathPrefix?: string
}

export default function SimpleFaq({
  title = 'Frequently Asked Questions',
  faqs,
  documentId,
  documentType,
  pathPrefix = 'faqs',
}: SimpleFaqProps) {
  const { enabled: designOn } = useDesignMode()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    if (designOn) return
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (faqs.length === 0) return null

  const inner = (
    <section id="dc-section-faqs" className="dc-faq dc-faq--page" aria-label={title}>
      <div className="dc-faq__container">
        <header className="dc-faq__header">
          <p className="dc-faq__eyebrow">Support</p>
          <h2 className="dc-faq__title">{title}</h2>
        </header>

        <div className="dc-faq__list">
          {faqs.map((faq, index) => {
            const isActive = designOn || activeIndex === index
            const answer = faq.answer || ''
            const isHtml = /<[a-z][\s\S]*>/i.test(answer)
            return (
              <div
                key={faq.question}
                className={`dc-faq__item ${isActive ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="dc-faq__trigger"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`page-faq-panel-${index}`}
                  id={`page-faq-trigger-${index}`}
                >
                  <EditableText
                    as="span"
                    path={`${pathPrefix}[${index}].question`}
                    label={`FAQ ${index + 1} → Question`}
                    value={faq.question}
                    className="dc-faq__question"
                  />
                  <span
                    className={`dc-faq__chevron ${isActive ? 'is-open' : ''}`}
                    aria-hidden="true"
                  >
                    <ChevronDown size={20} strokeWidth={2.25} />
                  </span>
                </button>
                <div
                  id={`page-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`page-faq-trigger-${index}`}
                  className={`dc-faq__panel ${isActive ? 'is-open' : ''}`}
                >
                  {isHtml ? (
                    <EditableHtml
                      path={`${pathPrefix}[${index}].answer`}
                      label={`FAQ ${index + 1} → Answer`}
                      html={answer}
                      className="dc-faq__answer"
                    />
                  ) : (
                    <EditableText
                      as="div"
                      path={`${pathPrefix}[${index}].answer`}
                      label={`FAQ ${index + 1} → Answer`}
                      value={answer}
                      multiline
                      className="dc-faq__answer"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
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
