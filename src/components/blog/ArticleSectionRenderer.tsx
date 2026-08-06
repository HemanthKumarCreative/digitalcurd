import Link from 'next/link'
import { InlineMarkdown } from '@/components/blog/InlineMarkdown'
import {
  getSectionHeadingId,
  normalizeTableRows,
  slugifyHeading,
} from '@/lib/blog/utils'
import type { BlogSection } from '@/types/blog'

type ArticleSectionRendererProps = {
  sections: BlogSection[]
}

export const ArticleSectionRenderer = ({ sections }: ArticleSectionRendererProps) => {
  if (!sections.length) return null

  return (
    <div className="dc-article__sections">
      {sections.map((section, index) => {
        const headingId = getSectionHeadingId(section, index)
        const key = section._key || `${section._type}-${index}`

        if (section._type === 'blogProse') {
          return (
            <section key={key} id={headingId} className="dc-article__block">
              {section.heading ? <h2 className="dc-article__h2">{section.heading}</h2> : null}
              {(section.paragraphs || []).map((paragraph, pIndex) => (
                <InlineMarkdown key={`${key}-p-${pIndex}`} text={paragraph} />
              ))}
            </section>
          )
        }

        if (section._type === 'blogTable') {
          const rows = normalizeTableRows(section)
          const columns = section.columns || []
          return (
            <section key={key} id={headingId} className="dc-article__block">
              {section.heading ? <h2 className="dc-article__h2">{section.heading}</h2> : null}
              <div className="dc-article__table-wrap">
                <table className="dc-article__table">
                  {columns.length ? (
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={`${key}-row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <InlineMarkdown
                            key={`${key}-cell-${rowIndex}-${cellIndex}`}
                            as="td"
                            text={cell}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        }

        if (section._type === 'blogInlineCta') {
          return (
            <aside key={key} className="dc-article__inline-cta" aria-label={section.title || 'Call to action'}>
              {section.title ? <h3 className="dc-article__inline-cta-title">{section.title}</h3> : null}
              {section.description ? (
                <InlineMarkdown
                  as="div"
                  className="dc-article__inline-cta-desc"
                  text={section.description}
                />
              ) : null}
              {section.ctaLabel && section.ctaHref ? (
                <Link href={section.ctaHref} className="dc-btn dc-btn--primary">
                  {section.ctaLabel}
                </Link>
              ) : null}
            </aside>
          )
        }

        if (section._type === 'blogGuide') {
          return (
            <section key={key} id={headingId} className="dc-article__block">
              {section.heading ? <h2 className="dc-article__h2">{section.heading}</h2> : null}
              {section.intro ? <InlineMarkdown text={section.intro} /> : null}
              <div className="dc-article__guide">
                {(section.items || []).map((item, itemIndex) => {
                  const itemId =
                    item.headingId ||
                    (item.title ? slugifyHeading(item.title) : `${headingId}-${itemIndex + 1}`)
                  return (
                    <article key={itemId} id={itemId} className="dc-article__guide-item">
                      <h3 className="dc-article__h3">
                        {`${itemIndex + 1}. ${item.title}`}
                      </h3>
                      {(item.paragraphs || []).map((paragraph, pIndex) => (
                        <InlineMarkdown
                          key={`${itemId}-p-${pIndex}`}
                          text={paragraph}
                        />
                      ))}
                      {(item.steps || []).length ? (
                        <ol className="dc-article__steps">
                          {item.steps!.map((step, stepIndex) => (
                            <li key={`${itemId}-step-${stepIndex}`}>
                              <strong>{`Step ${stepIndex + 1}. ${step.title}`}</strong>
                              {step.body ? (
                                <InlineMarkdown as="div" text={step.body} />
                              ) : null}
                            </li>
                          ))}
                        </ol>
                      ) : null}
                      {(item.bullets || []).length ? (
                        <ul className="dc-article__list">
                          {item.bullets!.map((bullet, bulletIndex) => (
                            <InlineMarkdown
                              key={`${itemId}-b-${bulletIndex}`}
                              as="li"
                              text={bullet}
                            />
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </section>
          )
        }

        if (section._type === 'blogSteps') {
          return (
            <section key={key} id={headingId} className="dc-article__block">
              {section.heading ? <h2 className="dc-article__h2">{section.heading}</h2> : null}
              {section.intro ? <InlineMarkdown text={section.intro} /> : null}
              <ol className="dc-article__steps">
                {(section.steps || []).map((step, stepIndex) => (
                  <li key={`${key}-step-${stepIndex}`}>
                    <strong>{`Step ${stepIndex + 1}. ${step.title}`}</strong>
                    {step.body ? <InlineMarkdown as="div" text={step.body} /> : null}
                  </li>
                ))}
              </ol>
            </section>
          )
        }

        if (section._type === 'blogList') {
          const ListTag = section.style === 'numbered' ? 'ol' : 'ul'
          return (
            <section key={key} id={headingId} className="dc-article__block">
              {section.heading ? <h2 className="dc-article__h2">{section.heading}</h2> : null}
              <ListTag className="dc-article__list">
                {(section.items || []).map((item, itemIndex) => (
                  <InlineMarkdown key={`${key}-item-${itemIndex}`} as="li" text={item} />
                ))}
              </ListTag>
            </section>
          )
        }

        if (section._type === 'blogCallout') {
          const variant = section.variant || 'tip'
          const label =
            variant === 'warning' ? 'Warning' : variant === 'note' ? 'Note' : 'Tip'
          return (
            <aside
              key={key}
              className={`dc-article__callout dc-article__callout--${variant}`}
            >
              <p className="dc-article__callout-label">{label}</p>
              {section.body ? <InlineMarkdown as="div" text={section.body} /> : null}
            </aside>
          )
        }

        return null
      })}
    </div>
  )
}
