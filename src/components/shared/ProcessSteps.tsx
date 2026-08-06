'use client'

import { EditableText } from '@/components/design-mode/EditableText'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import type { ProcessStep } from '@/types/content'

type ProcessStepsProps = {
  steps: ProcessStep[]
  pathPrefix?: string
}

export default function ProcessSteps({ steps, pathPrefix }: ProcessStepsProps) {
  const { ref, inView } = useInViewMotion<HTMLDivElement>()

  return (
    <div ref={ref} className="dc-process" role="list">
      {steps.map((step, index) => {
        const base = pathPrefix ? `${pathPrefix}[${index}]` : null
        return (
          <article
            key={`${step.title}-${index}`}
            role="listitem"
            className={`dc-process__item dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${(index % 3) + 1}`}
          >
            <span className="dc-process__num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            {base ? (
              <>
                <EditableText
                  as="h3"
                  path={`${base}.title`}
                  label={`Step ${index + 1} → Title`}
                  value={step.title}
                  className="dc-process__title"
                />
                <EditableText
                  as="p"
                  path={`${base}.description`}
                  label={`Step ${index + 1} → Description`}
                  value={step.description}
                  className="dc-process__desc"
                  multiline
                />
              </>
            ) : (
              <>
                <h3 className="dc-process__title">{step.title}</h3>
                <p className="dc-process__desc">{step.description}</p>
              </>
            )}
          </article>
        )
      })}
    </div>
  )
}
