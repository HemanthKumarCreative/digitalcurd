const DEFAULT_SITE_URL = 'https://www.digitalcurd.com'

export const getSiteUrl = (): string => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return raw.replace(/\/$/, '')
}
