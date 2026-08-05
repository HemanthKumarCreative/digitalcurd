'use client'

import { useInViewMotion } from '@/hooks/useInViewMotion'
import type { ProcessStep } from '@/types/content'

type ProcessStepsProps = {
  steps: ProcessStep[]
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  const { ref, inView } = useInViewMotion<HTMLDivElement>()

  return (
    <div ref={ref} className="dc-process" role="list">
      {steps.map((step, index) => (
        <article
          key={step.title}
          role="listitem"
          className={`dc-process__item dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${(index % 3) + 1}`}
        >
          <span className="dc-process__num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="dc-process__title">{step.title}</h3>
          <p className="dc-process__desc">{step.description}</p>
        </article>
      ))}
    </div>
  )
}
