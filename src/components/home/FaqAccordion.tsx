'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EditableHtml } from '@/components/design-mode/EditableHtml'
import { EditableText } from '@/components/design-mode/EditableText'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'

const INITIAL_VISIBLE = 10

type FaqData = {
  title?: string
  titleLine1?: string
  titleEm?: string
  subtitle?: string
  faqs: { question: string; answer: string }[]
}

export default function FaqAccordion({ data: faqAccordion }: { data: FaqData }) {
  const { enabled: designOn } = useDesignMode()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  const faqs = faqAccordion.faqs
  const visibleFaqs = designOn || showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE)

  const handleToggle = (index: number) => {
    if (designOn) return
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="dc-section-faqs" className="dc-faq" aria-label="Frequently asked questions">
      <div className="dc-faq__container">
        <header className="dc-faq__header">
          <p className="dc-faq__eyebrow">Support</p>
          <h2 className="dc-faq__title">
            <EditableText
              as="span"
              path="faqAccordion.titleLine1"
              label="FAQs → Title"
              value={faqAccordion.titleLine1 || 'Frequently Asked'}
            />{' '}
            <em>
              <EditableText
                as="span"
                path="faqAccordion.titleEm"
                label="FAQs → Emphasis"
                value={faqAccordion.titleEm || 'Questions'}
              />
            </em>
          </h2>
          <EditableText
            as="p"
            path="faqAccordion.subtitle"
            label="FAQs → Subtitle"
            value={
              faqAccordion.subtitle ||
              'Here are answers to common questions before getting started. If you do not see yours, contact us and we will respond within 24 hours.'
            }
            multiline
            className="dc-faq__subtitle"
          />
        </header>

        <div className="dc-faq__list">
          {visibleFaqs.map((faq, index) => {
            const isActive = designOn || activeIndex === index
            return (
              <div
                key={index}
                className={`dc-faq__item ${isActive ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="dc-faq__trigger"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`dc-faq-panel-${index}`}
                  id={`dc-faq-trigger-${index}`}
                >
                  <EditableText
                    as="span"
                    path={`faqAccordion.faqs[${index}].question`}
                    label={`FAQ ${index + 1} → Question`}
                    value={faq.question}
                    className="dc-faq__question"
                  />
                  <span className={`dc-faq__chevron ${isActive ? 'is-open' : ''}`} aria-hidden="true">
                    <ChevronDown size={20} strokeWidth={2.25} />
                  </span>
                </button>

                <div
                  id={`dc-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`dc-faq-trigger-${index}`}
                  className={`dc-faq__panel ${isActive ? 'is-open' : ''}`}
                >
                  <EditableHtml
                    path={`faqAccordion.faqs[${index}].answer`}
                    label={`FAQ ${index + 1} → Answer`}
                    html={faq.answer}
                    className="dc-faq__answer"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {!designOn && faqs.length > INITIAL_VISIBLE && (
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
                ? `Show fewer questions (${INITIAL_VISIBLE})`
                : `Show remaining ${faqs.length - INITIAL_VISIBLE} questions`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
