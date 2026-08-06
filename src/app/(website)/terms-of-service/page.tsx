import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalDocument from '@/components/shared/LegalDocument'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalPage } from '@/sanity/lib/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('terms-of-service')
  return buildPageMetadata({
    path: '/terms-of-service',
    title: page?.seo?.title || 'Terms of Service',
    description:
      page?.seo?.description ||
      page?.intro ||
      'Terms governing use of the Digital Curd website.',
  })
}

export default async function TermsOfServicePage() {
  const page = await getLegalPage('terms-of-service')
  if (!page) notFound()
  return (
    <LegalDocument
      title={page.title}
      lastUpdated={page.lastUpdated}
      intro={page.intro}
      sections={page.sections}
      documentId={page._id}
      documentType="legalPage"
    />
  )
}
