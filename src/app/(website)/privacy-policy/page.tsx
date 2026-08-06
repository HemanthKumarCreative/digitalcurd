import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalDocument from '@/components/shared/LegalDocument'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalPage } from '@/sanity/lib/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('privacy-policy')
  return buildPageMetadata({
    path: '/privacy-policy',
    title: page?.seo?.title || 'Privacy Policy',
    description:
      page?.seo?.description ||
      page?.intro ||
      'How Digital Curd collects, uses, and protects personal information.',
  })
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage('privacy-policy')
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
