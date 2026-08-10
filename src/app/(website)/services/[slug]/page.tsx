import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePageView from '@/components/services/ServicePageView'
import ContactForm from '@/components/contact/ContactForm'
import JsonLd from '@/components/seo/JsonLd'
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
  serviceJsonLd,
} from '@/lib/seo'
import {
  getHomePage,
  getServiceBySlug,
  getServiceSlugs,
  getSiteSettings,
} from '@/sanity/lib/fetch'
import { resolveImageUrl } from '@/sanity/lib/image'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) {
    return buildPageMetadata({
      path: `/services/${slug}`,
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
      noIndex: true,
    })
  }

  const heroImage =
    resolveImageUrl(service.heroImage, service.heroImageUrl) ||
    service.heroImageUrl ||
    (typeof service.heroImage === 'string' ? service.heroImage : '')

  return buildPageMetadata({
    path: `/services/${slug}`,
    title: service.seo?.title || service.title,
    description:
      service.seo?.description || service.subtitle || service.description || '',
    ogImage: heroImage,
  })
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params
  const [service, siteSettings, home] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
    getHomePage(),
  ])
  if (!service) notFound()

  const heroImage =
    resolveImageUrl(service.heroImage, service.heroImageUrl) ||
    service.heroImageUrl ||
    (typeof service.heroImage === 'string' ? service.heroImage : '')

  const mapped = {
    ...service,
    heroImage,
    relatedSlugs: (service.relatedSlugs || []) as string[],
  }

  const faqs = service.faqs || []
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: `/services/${slug}` },
    ]),
    serviceJsonLd({
      title: service.title,
      subtitle: service.subtitle || '',
      description: service.description || '',
      slug,
      heroImageUrl: heroImage,
    }),
    ...(faqs.length > 0 ? [faqJsonLd(faqs)] : []),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicePageView
        service={mapped as Parameters<typeof ServicePageView>[0]['service']}
        related={(service.relatedServices || []) as Parameters<typeof ServicePageView>[0]['related']}
      />
      <ContactForm data={home.contactForm!} />
    </>
  )
}
