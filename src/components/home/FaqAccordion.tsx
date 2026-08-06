'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const INITIAL_VISIBLE = 8

type FaqData = {
  title?: string
  titleLine1?: string
  titleEm?: string
  subtitle?: string
  faqs: { question: string; answer: string }[]
}

export default function FaqAccordion({ data: faqAccordion }: { data: FaqData }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  const faqs = faqAccordion.faqs
  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="dc-faq" aria-label="Frequently asked questions">
      <div className="dc-faq__container">
        <header className="dc-faq__header">
          <p className="dc-faq__eyebrow">Support</p>
          <h2 className="dc-faq__title">
            {faqAccordion.titleLine1 || 'Frequently Asked'}{' '}
            <em>{faqAccordion.titleEm || 'Questions'}</em>
          </h2>
          <p className="dc-faq__subtitle">
            {faqAccordion.subtitle ||
              'Here are answers to common questions before getting started. If you do not see yours, contact us and we will respond within 24 hours.'}
          </p>
        </header>

        <div className="dc-faq__list">
          {visibleFaqs.map((faq, index) => {
            const isActive = activeIndex === index
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
                  <span className="dc-faq__question">{faq.question}</span>
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
                  <div
                    className="dc-faq__answer"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {faqs.length > INITIAL_VISIBLE && (
          <div className="dc-faq__show-more">
            <button
              type="button"
              onClick={() => {
                setShowAll((prev) => !prev)
                if (showAll) setActiveIndex(0)
              }}
              aria-expanded={showAll}
            >
              {showAll ? 'Show fewer questions' : 'Show all questions'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
