import type { Metadata } from 'next'
import LegalDocument from '@/components/shared/LegalDocument'
import terms from '@/content/legal/terms-of-service.json'

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Curd',
  description: 'Terms governing use of the Digital Curd website and related materials.',
}

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title={terms.title}
      lastUpdated={terms.lastUpdated}
      intro={terms.intro}
      sections={terms.sections}
    />
  )
}
