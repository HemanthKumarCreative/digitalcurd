import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import CtaBand from '@/components/shared/CtaBand'
import { buildPageMetadata } from '@/lib/seo'
import { getCareersPage } from '@/sanity/lib/fetch'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCareersPage()
  return buildPageMetadata({
    path: '/careers',
    title: page.seo?.title || 'Careers',
    description:
      page.seo?.description ||
      page.hero?.description ||
      'Join Digital Curd to build connected AI, marketing, and engineering growth systems.',
    ogImage: page.hero?.backgroundUrl,
  })
}

export default async function CareersPage() {
  const { page, jobs } = await getCareersPage()
  const hero = toPageHero(page.hero)

  return (
    <>
      <PageHero content={hero} />

      <ContentSection
        eyebrow={page.culture.eyebrow}
        title={page.culture.title}
        description={page.culture.description}
        tone="surface"
      >
        <FeatureGrid items={page.culture.items} columns={4} />
      </ContentSection>

      <ContentSection
        eyebrow={page.benefits.eyebrow}
        title={page.benefits.title}
        tone="light"
      >
        <FeatureGrid items={page.benefits.items} columns={3} />
      </ContentSection>

      <ContentSection
        id="open-roles"
        eyebrow="Open roles"
        title="Current opportunities"
        description="Sample listings for now—reach out even if you see a near match."
        tone="surface"
      >
        <div className="dc-jobs" role="list">
          {jobs.map(
            (job: {
              _id: string
              title: string
              location: string
              type: string
              blurb: string
              applyHref: string
            }) => (
              <a
                key={job._id}
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
            )
          )}
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
        title={page.cta.title}
        description={page.cta.description}
        cta={page.cta.cta}
      />
    </>
  )
}
