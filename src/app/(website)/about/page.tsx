import type { Metadata } from 'next'
import AboutPageContent from '@/components/about/AboutPageContent'
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

  const members = about.team.members.map(
    (member: { name: string; role: string; image?: unknown; imageUrl?: string }) => ({
      name: member.name,
      role: member.role,
      imageUrl:
        resolveImageUrl(member.image, member.imageUrl) || member.imageUrl || '',
    })
  )

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutPageContent
        content={{
          hero,
          story: about.story,
          stats: about.stats,
          values: about.values,
          team: {
            ...about.team,
            members,
          },
          cta: about.cta,
        }}
      />
    </>
  )
}
