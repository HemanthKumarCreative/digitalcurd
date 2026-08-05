import type { LegalSection } from '@/types/content'

type LegalDocumentProps = {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
}

export default function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="dc-legal" aria-label={title}>
      <header className="dc-legal__banner">
        <div className="dc-legal__banner-inner">
          <p className="dc-legal__eyebrow">Legal</p>
          <h1 className="dc-legal__title">{title}</h1>
          <p className="dc-legal__updated">Last updated: {lastUpdated}</p>
        </div>
      </header>

      <div className="dc-legal__inner">
        {intro ? <p className="dc-legal__intro">{intro}</p> : null}

        <div className="dc-legal__body">
          {sections.map((section) => (
            <section key={section.heading} className="dc-legal__section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
