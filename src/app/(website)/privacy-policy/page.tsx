import { createLegalPage } from '@/lib/legal-page'

const { generateMetadata, Page } = createLegalPage({
  slug: 'privacy-policy',
  path: '/privacy-policy',
  defaultTitle: 'Privacy Policy',
  defaultDescription:
    'How Digital Curd collects, uses, and protects personal information.',
})

export { generateMetadata }
export default Page
