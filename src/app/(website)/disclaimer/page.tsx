import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalDocument from '@/components/shared/LegalDocument'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalPage } from '@/sanity/lib/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('disclaimer')
  return buildPageMetadata({
    path: '/disclaimer',
    title: page?.seo?.title || 'Disclaimer',
    description:
      page?.seo?.description ||
      page?.intro ||
      'Important disclaimers regarding Digital Curd website content.',
  })
}

export default async function DisclaimerPage() {
  const page = await getLegalPage('disclaimer')
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
