import type { ServiceMeta } from '@/types/content'

export const serviceCategories = [
  'AI & Automation',
  'Growth Marketing',
  'Ecommerce',
  'Digital Engineering',
  'Creative Studio',
] as const

export const getServicesByCategory = (
  catalog: ServiceMeta[],
  category: string
) => catalog.filter((s) => s.category === category)
