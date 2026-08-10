'use client'

import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import CtaBand from '@/components/shared/CtaBand'
import PageHero from '@/components/shared/PageHero'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import type { PageHeroContent } from '@/types/content'

type AboutPageContentProps = {
  content: {
    hero: PageHeroContent
    story: {
      eyebrow?: string
      title: string
      paragraphs?: string[]
    }
    stats: { number: string; label: string }[]
    values: {
      eyebrow?: string
      title: string
      items: { title: string; description: string; icon?: string }[]
    }
    team: {
      eyebrow?: string
      title: string
      description?: string
      members: { name: string; role: string; imageUrl?: string }[]
    }
    cta: {
      title: string
      description?: string
      cta: { label: string; href: string }
    }
  }
}

export default function AboutPageContent({ content }: AboutPageContentProps) {
  return (
    <DesignModeDocument documentId="aboutPage" documentType="aboutPage">
      <PageHero content={content.hero} />

      <ContentSection
        id="dc-section-story"
        eyebrow={content.story.eyebrow}
        title={content.story.title}
        paragraphs={content.story.paragraphs}
        tone="light"
        pathPrefix="story"
      />

      <ContentSection id="dc-section-stats" eyebrow="Impact" title="Numbers that reflect how we work" tone="navy">
        <div className="dc-stats-row" role="list">
          {content.stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="dc-stats-row__item" role="listitem">
              <EditableText
                as="span"
                path={`stats[${index}].number`}
                label={`Stat ${index + 1} → Number`}
                value={stat.number}
                className="dc-stats-row__num"
              />
              <EditableText
                as="span"
                path={`stats[${index}].label`}
                label={`Stat ${index + 1} → Label`}
                value={stat.label}
                className="dc-stats-row__label"
              />
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        id="dc-section-values"
        eyebrow={content.values.eyebrow}
        title={content.values.title}
        tone="surface"
        pathPrefix="values"
      >
        <FeatureGrid items={content.values.items} columns={4} pathPrefix="values.items" />
      </ContentSection>

      <ContentSection
        id="dc-section-team"
        eyebrow={content.team.eyebrow}
        title={content.team.title}
        description={content.team.description}
        tone="light"
        pathPrefix="team"
      >
        <div className="dc-blog-grid" role="list">
          {content.team.members.map((member, index) => (
            <article key={`${member.name}-${index}`} className="dc-blog-card" role="listitem">
              <EditableImage
                path={`team.members[${index}].imageUrl`}
                label={`Team → ${member.name || index + 1}`}
                value={member.imageUrl || ''}
                alt={member.name}
                className="dc-blog-card__img"
              />
              <div className="dc-blog-card__body">
                <EditableText
                  as="h3"
                  path={`team.members[${index}].name`}
                  label={`Team ${index + 1} → Name`}
                  value={member.name}
                  className="dc-blog-card__title"
                />
                <EditableText
                  as="p"
                  path={`team.members[${index}].role`}
                  label={`Team ${index + 1} → Role`}
                  value={member.role}
                  className="dc-blog-card__excerpt"
                />
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <CtaBand
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.cta}
        pathPrefix="cta"
      />
    </DesignModeDocument>
  )
}
