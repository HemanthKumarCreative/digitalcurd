import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePageView from '@/components/services/ServicePageView'
import {
  getAllServiceSlugs,
  getServiceContent,
  isServiceSlug,
} from '@/content/services'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () =>
  getAllServiceSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = await getServiceContent(slug)
  if (!service) {
    return { title: 'Service Not Found | Digital Curd' }
  }
  return {
    title: `${service.title} | Digital Curd`,
    description: service.subtitle,
  }
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params
  if (!isServiceSlug(slug)) notFound()

  const service = await getServiceContent(slug)
  if (!service) notFound()

  return <ServicePageView service={service} />
}
