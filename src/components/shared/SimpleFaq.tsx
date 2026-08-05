'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/types/content'

type SimpleFaqProps = {
  title?: string
  faqs: FaqItem[]
}

export default function SimpleFaq({
  title = 'Frequently Asked Questions',
  faqs,
}: SimpleFaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (faqs.length === 0) return null

  return (
    <section className="dc-faq dc-faq--page" aria-label={title}>
      <div className="dc-faq__container">
        <header className="dc-faq__header">
          <p className="dc-faq__eyebrow">Support</p>
          <h2 className="dc-faq__title">{title}</h2>
        </header>

        <div className="dc-faq__list">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index
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
                  <span className="dc-faq__question">{faq.question}</span>
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
                  <div className="dc-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
