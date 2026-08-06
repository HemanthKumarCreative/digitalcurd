import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import CtaBand from '@/components/shared/CtaBand'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { getAboutPage } from '@/sanity/lib/fetch'
import { resolveImageUrl } from '@/sanity/lib/image'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  return buildPageMetadata({
    path: '/about',
    title: about.seo?.title || 'About Us',
    description:
      about.seo?.description ||
      about.hero?.description ||
      'Digital Curd builds AI-powered growth systems across marketing, commerce, engineering, and creative.',
    ogImage: about.hero?.backgroundUrl,
  })
}

export default async function AboutPage() {
  const about = await getAboutPage()
  const hero = toPageHero(about.hero)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero content={hero} />

      <ContentSection
        eyebrow={about.story.eyebrow}
        title={about.story.title}
        paragraphs={about.story.paragraphs}
        tone="light"
      />

      <ContentSection eyebrow="Impact" title="Numbers that reflect how we work" tone="navy">
        <div className="dc-stats-row" role="list">
          {about.stats.map((stat: { number: string; label: string }) => (
            <div key={stat.label} className="dc-stats-row__item" role="listitem">
              <span className="dc-stats-row__num">{stat.number}</span>
              <span className="dc-stats-row__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow={about.values.eyebrow}
        title={about.values.title}
        tone="surface"
      >
        <FeatureGrid items={about.values.items} columns={4} />
      </ContentSection>

      <ContentSection
        eyebrow={about.team.eyebrow}
        title={about.team.title}
        description={about.team.description}
        tone="light"
      >
        <div className="dc-blog-grid" role="list">
          {about.team.members.map(
            (member: { name: string; role: string; image?: unknown; imageUrl?: string }) => (
              <article key={member.name} className="dc-blog-card" role="listitem">
                <Image
                  src={resolveImageUrl(member.image, member.imageUrl) || member.imageUrl || ''}
                  alt={member.name}
                  width={600}
                  height={400}
                  className="dc-blog-card__img"
                />
                <div className="dc-blog-card__body">
                  <h3 className="dc-blog-card__title">{member.name}</h3>
                  <p className="dc-blog-card__excerpt">{member.role}</p>
                </div>
              </article>
            )
          )}
        </div>
      </ContentSection>

      <CtaBand
        title={about.cta.title}
        description={about.cta.description}
        cta={about.cta.cta}
      />
    </>
  )
}
