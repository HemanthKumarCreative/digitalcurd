import type { Metadata } from 'next'
import LegalDocument from '@/components/shared/LegalDocument'
import privacy from '@/content/legal/privacy-policy.json'

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Curd',
  description: 'How Digital Curd collects, uses, and protects personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title={privacy.title}
      lastUpdated={privacy.lastUpdated}
      intro={privacy.intro}
      sections={privacy.sections}
    />
  )
}
