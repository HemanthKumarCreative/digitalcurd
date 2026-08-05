import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import CtaBand from '@/components/shared/CtaBand'
import careers from '@/content/careers.json'

export const metadata: Metadata = {
  title: 'Careers | Digital Curd',
  description:
    'Join Digital Curd to build connected AI, marketing, and engineering growth systems.',
}

export default function CareersPage() {
  return (
    <>
      <PageHero content={careers.hero} />

      <ContentSection
        eyebrow={careers.culture.eyebrow}
        title={careers.culture.title}
        description={careers.culture.description}
        tone="surface"
      >
        <FeatureGrid items={careers.culture.items} columns={4} />
      </ContentSection>

      <ContentSection
        eyebrow={careers.benefits.eyebrow}
        title={careers.benefits.title}
        tone="light"
      >
        <FeatureGrid items={careers.benefits.items} columns={3} />
      </ContentSection>

      <ContentSection
        id="open-roles"
        eyebrow="Open roles"
        title="Current opportunities"
        description="Sample listings for now—reach out even if you see a near match."
        tone="surface"
      >
        <div className="dc-jobs" role="list">
          {careers.jobs.map((job) => (
            <a
              key={job.id}
              href={job.applyHref}
              className="dc-job-card"
              role="listitem"
              aria-label={`Apply for ${job.title}`}
            >
              <div>
                <h3 className="dc-job-card__title">{job.title}</h3>
                <p className="dc-job-card__meta">
                  {job.location} · {job.type}
                </p>
                <p className="dc-job-card__blurb">{job.blurb}</p>
              </div>
              <span className="dc-btn dc-btn--primary" aria-hidden="true">
                <span>Apply</span>
                <span className="dc-btn__icon">
                  <ArrowRight size={18} />
                </span>
              </span>
            </a>
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
        title={careers.cta.title}
        description={careers.cta.description}
        cta={careers.cta.cta}
      />
    </>
  )
}
