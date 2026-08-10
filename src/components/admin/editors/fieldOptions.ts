import { serviceCategories } from '@/sanity/lib/catalog'

export const FEATURE_ICON_OPTIONS = [
  'bot',
  'chart',
  'checkCircle',
  'clock',
  'code',
  'fileSearch',
  'globe',
  'hardDrive',
  'layers',
  'lock',
  'megaphone',
  'monitor',
  'palette',
  'search',
  'shield',
  'sparkles',
  'target',
  'users',
  'workflow',
  'zap',
].map((value) => ({ label: value, value }))

export const SOCIAL_LABEL_OPTIONS = ['Facebook', 'LinkedIn', 'Instagram', 'YouTube'].map(
  (value) => ({ label: value, value })
)

export const SERVICE_CATEGORY_OPTIONS = serviceCategories.map((value) => ({
  label: value,
  value,
}))
