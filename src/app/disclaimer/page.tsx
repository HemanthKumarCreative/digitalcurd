import type { Metadata } from 'next'
import LegalDocument from '@/components/shared/LegalDocument'
import disclaimer from '@/content/legal/disclaimer.json'

export const metadata: Metadata = {
  title: 'Disclaimer | Digital Curd',
  description: 'Important disclaimers regarding Digital Curd website content and outcomes.',
}

export default function DisclaimerPage() {
  return (
    <LegalDocument
      title={disclaimer.title}
      lastUpdated={disclaimer.lastUpdated}
      intro={disclaimer.intro}
      sections={disclaimer.sections}
    />
  )
}
