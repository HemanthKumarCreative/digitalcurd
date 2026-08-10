'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import CtaBand from '@/components/shared/CtaBand'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import { EditableText } from '@/components/design-mode/EditableText'
import type { PageHeroContent } from '@/types/content'

type Job = {
  _id: string
  title: string
  location: string
  type: string
  blurb: string
  applyHref: string
}

type CareersPageContentProps = {
  hero: PageHeroContent
  culture: {
    eyebrow?: string
    title: string
    description?: string
    items: { title: string; description: string; icon?: string }[]
  }
  benefits: {
    eyebrow?: string
    title: string
    items: { title: string; description: string; icon?: string }[]
  }
  cta: {
    title: string
    description?: string
    cta: { label: string; href: string }
  }
  jobs: Job[]
}

export default function CareersPageContent({
  hero,
  culture,
  benefits,
  cta,
  jobs,
}: CareersPageContentProps) {
  return (
    <DesignModeDocument documentId="careersPage" documentType="careersPage">
      <PageHero content={hero} />

      <ContentSection
        id="dc-section-culture"
        eyebrow={culture.eyebrow}
        title={culture.title}
        description={culture.description}
        tone="surface"
        pathPrefix="culture"
      >
        <FeatureGrid items={culture.items} columns={4} pathPrefix="culture.items" />
      </ContentSection>

      <ContentSection
        id="dc-section-benefits"
        eyebrow={benefits.eyebrow}
        title={benefits.title}
        tone="light"
        pathPrefix="benefits"
      >
        <FeatureGrid items={benefits.items} columns={3} pathPrefix="benefits.items" />
      </ContentSection>

      <ContentSection
        id="open-roles"
        eyebrow="Open roles"
        title="Current opportunities"
        description="Sample listings for now—reach out even if you see a near match."
        tone="surface"
      >
        <div className="dc-jobs" role="list">
          {jobs.map((job) => (
            <DesignModeDocument key={job._id} documentId={job._id} documentType="job">
              <div className="dc-job-card" role="listitem">
                <div>
                  <EditableText
                    as="h3"
                    path="title"
                    label="Job → Title"
                    value={job.title}
                    className="dc-job-card__title"
                  />
                  <p className="dc-job-card__meta">
                    <EditableText
                      as="span"
                      path="location"
                      label="Job → Location"
                      value={job.location}
                    />
                    {' · '}
                    <EditableText
                      as="span"
                      path="type"
                      label="Job → Type"
                      value={job.type}
                    />
                  </p>
                  <EditableText
                    as="p"
                    path="blurb"
                    label="Job → Blurb"
                    value={job.blurb}
                    className="dc-job-card__blurb"
                    multiline
                  />
                </div>
                <a
                  href={job.applyHref}
                  className="dc-btn dc-btn--primary"
                  aria-label={`Apply for ${job.title}`}
                >
                  <span>Apply</span>
                  <span className="dc-btn__icon">
                    <ArrowRight size={18} />
                  </span>
                </a>
              </div>
            </DesignModeDocument>
          ))}
        </div>
        <p style={{ marginTop: 20, color: '#64748b', fontSize: 14 }}>
          Prefer a form?{' '}
          <Link href="/contact" style={{ color: 'var(--dc-blue)', fontWeight: 650 }}>
            Contact us
          </Link>{' '}
          and mention the role in your message.
        </p>
      </ContentSection>

      <CtaBand
        title={cta.title}
        description={cta.description}
        cta={cta.cta}
        pathPrefix="cta"
      />
    </DesignModeDocument>
  )
}
