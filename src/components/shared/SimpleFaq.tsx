'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EditableHtml } from '@/components/design-mode/EditableHtml'
import { EditableText } from '@/components/design-mode/EditableText'
import { DesignModeDocument, useDesignMode } from '@/components/design-mode/DesignModeProvider'
import type { FaqItem } from '@/types/content'

type SimpleFaqProps = {
  title?: string
  titleLine1?: string
  titleEm?: string
  subtitle?: string
  faqs: FaqItem[]
  documentId?: string
  documentType?: string
  pathPrefix?: string
  variant?: 'page' | 'home'
  showMoreLimit?: number
}

export default function SimpleFaq({
  title = 'Frequently Asked Questions',
  titleLine1,
  titleEm,
  subtitle,
  faqs,
  documentId,
  documentType,
  pathPrefix = 'faqs',
  variant = 'page',
  showMoreLimit,
}: SimpleFaqProps) {
  const { enabled: designOn } = useDesignMode()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  const isHome = variant === 'home'
  const limit = showMoreLimit
  const visibleFaqs =
    isHome && limit && !designOn && !showAll ? faqs.slice(0, limit) : faqs

  const handleToggle = (index: number) => {
    if (designOn) return
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (!isHome && faqs.length === 0) return null

  const sectionClassName = isHome ? 'dc-faq' : 'dc-faq dc-faq--page'
  const ariaLabel = isHome ? 'Frequently asked questions' : title
  const triggerIdPrefix = isHome ? 'dc-faq-trigger' : 'page-faq-trigger'
  const panelIdPrefix = isHome ? 'dc-faq-panel' : 'page-faq-panel'

  const header = isHome ? (
    <header className="dc-faq__header">
      <p className="dc-faq__eyebrow">Support</p>
      <h2 className="dc-faq__title">
        <EditableText
          as="span"
          path={`${pathPrefix}.titleLine1`}
          label="FAQs → Title"
          value={titleLine1 || 'Frequently Asked'}
        />{' '}
        <em>
          <EditableText
            as="span"
            path={`${pathPrefix}.titleEm`}
            label="FAQs → Emphasis"
            value={titleEm || 'Questions'}
          />
        </em>
      </h2>
      <EditableText
        as="p"
        path={`${pathPrefix}.subtitle`}
        label="FAQs → Subtitle"
        value={
          subtitle ||
          'Here are answers to common questions before getting started. If you do not see yours, contact us and we will respond within 24 hours.'
        }
        multiline
        className="dc-faq__subtitle"
      />
    </header>
  ) : (
    <header className="dc-faq__header">
      <p className="dc-faq__eyebrow">Support</p>
      <h2 className="dc-faq__title">{title}</h2>
    </header>
  )

  const questionPath = (index: number) =>
    isHome
      ? `${pathPrefix}.faqs[${index}].question`
      : `${pathPrefix}[${index}].question`
  const answerPath = (index: number) =>
    isHome
      ? `${pathPrefix}.faqs[${index}].answer`
      : `${pathPrefix}[${index}].answer`

  const inner = (
    <section id="dc-section-faqs" className={sectionClassName} aria-label={ariaLabel}>
      <div className="dc-faq__container">
        {header}

        <div className="dc-faq__list">
          {visibleFaqs.map((faq, index) => {
            const isActive = designOn || activeIndex === index
            const answer = faq.answer || ''
            const isHtml = isHome || /<[a-z][\s\S]*>/i.test(answer)
            return (
              <div
                key={isHome ? index : faq.question}
                className={`dc-faq__item ${isActive ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="dc-faq__trigger"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`${panelIdPrefix}-${index}`}
                  id={`${triggerIdPrefix}-${index}`}
                >
                  <EditableText
                    as="span"
                    path={questionPath(index)}
                    label={
                      isHome
                        ? `FAQ ${index + 1} → Question`
                        : `FAQ ${index + 1} — question`
                    }
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
                  id={`${panelIdPrefix}-${index}`}
                  role="region"
                  aria-labelledby={`${triggerIdPrefix}-${index}`}
                  className={`dc-faq__panel ${isActive ? 'is-open' : ''}`}
                >
                  {isHtml ? (
                    <EditableHtml
                      path={answerPath(index)}
                      label={
                        isHome
                          ? `FAQ ${index + 1} → Answer`
                          : `FAQ ${index + 1} — answer`
                      }
                      html={answer}
                      className="dc-faq__answer"
                    />
                  ) : (
                    <EditableText
                      as="div"
                      path={answerPath(index)}
                      label={`FAQ ${index + 1} — answer`}
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

        {isHome && limit && !designOn && faqs.length > limit ? (
          <div className="dc-faq__show-more">
            <button
              type="button"
              onClick={() => {
                setShowAll((prev) => !prev)
                if (showAll) setActiveIndex(0)
              }}
              aria-expanded={showAll}
            >
              {showAll
                ? `Show fewer questions (${limit})`
                : `Show remaining ${faqs.length - limit} questions`}
            </button>
          </div>
        ) : null}
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
