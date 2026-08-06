import { notFound } from 'next/navigation'
import {
  StructuredDocumentEditor,
  type SectionDef,
} from '@/components/admin/StructuredDocumentEditor'
import { getDocument } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

const pageMap: Record<
  string,
  {
    id: string
    type: string
    title: string
    previewPath: string
    description: string
    sections: SectionDef[]
  }
> = {
  home: {
    id: 'homePage',
    type: 'homePage',
    title: 'Home page',
    previewPath: '/',
    description: 'Edit each homepage section with visual fields. Publish when ready.',
    sections: [
      {
        key: 'heroSection',
        title: 'Hero',
        description: 'Main headline, CTA, and background',
        kind: 'homeHero',
      },
      {
        key: 'clientLogosSlider',
        title: 'Client logos',
        description: 'Logo strip content',
        kind: 'logosSlider',
        defaultOpen: false,
      },
      {
        key: 'statsDeliverySection',
        title: 'Stats & delivery',
        kind: 'statsDelivery',
        defaultOpen: false,
      },
      {
        key: 'helpSectionGrid',
        title: 'Help section',
        kind: 'helpGrid',
        defaultOpen: false,
      },
      {
        key: 'aiSection',
        title: 'AI section',
        kind: 'aiBlock',
        defaultOpen: false,
      },
      {
        key: 'corePillarsSection',
        title: 'Core pillars',
        kind: 'pillars',
        defaultOpen: false,
      },
      {
        key: 'faqAccordion',
        title: 'FAQs',
        kind: 'faqs',
      },
      {
        key: 'contactForm',
        title: 'Contact form',
        kind: 'contactFormBlock',
        defaultOpen: false,
      },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
  about: {
    id: 'aboutPage',
    type: 'aboutPage',
    title: 'About page',
    previewPath: '/about',
    description: 'Update story, team, and about page SEO.',
    sections: [
      { key: 'hero', title: 'Hero', kind: 'hero' },
      { key: 'story', title: 'Story', kind: 'textBlock' },
      { key: 'stats', title: 'Stats', kind: 'stats' },
      { key: 'values', title: 'Values', kind: 'features' },
      { key: 'team', title: 'Team', kind: 'team' },
      { key: 'cta', title: 'Call to action', kind: 'cta' },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
  careers: {
    id: 'careersPage',
    type: 'careersPage',
    title: 'Careers page',
    previewPath: '/careers',
    description: 'Culture, benefits, and careers page SEO.',
    sections: [
      { key: 'hero', title: 'Hero', kind: 'hero' },
      { key: 'culture', title: 'Culture', kind: 'features' },
      { key: 'benefits', title: 'Benefits', kind: 'features' },
      { key: 'cta', title: 'Call to action', kind: 'cta' },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
  contact: {
    id: 'contactPage',
    type: 'contactPage',
    title: 'Contact page',
    previewPath: '/contact',
    description: 'Contact hero and SEO. Form copy lives on Home.',
    sections: [
      { key: 'hero', title: 'Hero', kind: 'hero' },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
  'blog-index': {
    id: 'blogIndex',
    type: 'blogIndex',
    title: 'Blog index',
    previewPath: '/blog',
    description: 'Blog listing hero and SEO.',
    sections: [
      { key: 'hero', title: 'Hero', kind: 'hero' },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
  'services-index': {
    id: 'servicesIndex',
    type: 'servicesIndex',
    title: 'Services index',
    previewPath: '/services',
    description: 'Services listing hero and SEO.',
    sections: [
      { key: 'hero', title: 'Hero', kind: 'hero' },
      { key: 'seo', title: 'SEO', kind: 'seo' },
    ],
  },
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AdminPageEditor({ params }: PageProps) {
  await requireAdminSession()
  const { slug } = await params
  const config = pageMap[slug]
  if (!config) notFound()

  const doc = (await getDocument<Record<string, unknown>>(config.id)) || {}
  const initialValues: Record<string, unknown> = {}
  for (const section of config.sections) {
    initialValues[section.key] = doc[section.key] ?? null
  }

  return (
    <StructuredDocumentEditor
      documentId={config.id}
      documentType={config.type}
      title={config.title}
      description={config.description}
      breadcrumbs={[
        { label: 'Pages', href: '/admin/pages' },
        { label: config.title },
      ]}
      sections={config.sections}
      initialValues={initialValues}
      previewPath={config.previewPath}
    />
  )
}
