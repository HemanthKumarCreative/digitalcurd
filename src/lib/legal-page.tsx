import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalDocument from '@/components/shared/LegalDocument'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalPage } from '@/sanity/lib/fetch'

export type LegalPageConfig = {
  slug: string
  path: string
  defaultTitle: string
  defaultDescription: string
}

export const createLegalPage = (config: LegalPageConfig) => {
  const generateMetadata = async (): Promise<Metadata> => {
    const page = await getLegalPage(config.slug)
    return buildPageMetadata({
      path: config.path,
      title: page?.seo?.title || config.defaultTitle,
      description:
        page?.seo?.description || page?.intro || config.defaultDescription,
    })
  }

  const Page = async () => {
    const page = await getLegalPage(config.slug)
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

  return { generateMetadata, Page }
}
