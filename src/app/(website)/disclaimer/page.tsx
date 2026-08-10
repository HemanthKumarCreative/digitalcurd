import { createLegalPage } from '@/lib/legal-page'

const { generateMetadata, Page } = createLegalPage({
  slug: 'disclaimer',
  path: '/disclaimer',
  defaultTitle: 'Disclaimer',
  defaultDescription:
    'Important disclaimers regarding Digital Curd website content.',
})

export { generateMetadata }
export default Page
