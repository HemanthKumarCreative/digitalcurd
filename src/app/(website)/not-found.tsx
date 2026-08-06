import type { Metadata } from 'next'
import NotFoundAnimation from '@/components/shared/NotFoundAnimation'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/404',
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found on Digital Curd.',
  noIndex: true,
})

export default function NotFound() {
  return <NotFoundAnimation />
}
