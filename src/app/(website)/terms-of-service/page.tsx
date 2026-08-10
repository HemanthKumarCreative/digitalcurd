import { createLegalPage } from '@/lib/legal-page'

const { generateMetadata, Page } = createLegalPage({
  slug: 'terms-of-service',
  path: '/terms-of-service',
  defaultTitle: 'Terms of Service',
  defaultDescription: 'Terms governing use of the Digital Curd website.',
})

export { generateMetadata }
export default Page
