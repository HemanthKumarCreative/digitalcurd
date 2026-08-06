const DEFAULT_SITE_URL = 'https://www.digitalcurd.com'
const DEFAULT_ADMIN_HOST = 'admin.digitalcurd.com'

export const getSiteUrl = (): string => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return raw.replace(/\/$/, '')
}

export const getAdminHost = (): string => {
  const raw = process.env.ADMIN_HOST?.trim() || process.env.NEXT_PUBLIC_ADMIN_HOST?.trim()
  if (raw) return raw.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return DEFAULT_ADMIN_HOST
}

export const getAdminUrl = (): string => {
  const host = getAdminHost()
  if (host.includes('localhost') || host.startsWith('127.')) {
    return `http://${host}`
  }
  return `https://${host}`
}

export const isLocalHost = (host: string): boolean => {
  const h = host.split(':')[0]?.toLowerCase() || ''
  return h === 'localhost' || h === '127.0.0.1' || h.endsWith('.localhost')
}

/** Vercel production + preview URLs (e.g. digitalcurd.vercel.app). */
export const isVercelDeploymentHost = (host: string): boolean => {
  const h = host.split(':')[0]?.toLowerCase() || ''
  return h === 'vercel.app' || h.endsWith('.vercel.app')
}

/**
 * Hosts that expose admin at `/admin/*` (like localhost), instead of a dedicated admin domain.
 * Public custom domains still block `/admin` and use `admin.digitalcurd.com` instead.
 */
export const allowsPathBasedAdmin = (host: string): boolean =>
  isLocalHost(host) || isVercelDeploymentHost(host)

export const isAdminHostName = (host: string): boolean => {
  const normalized = host.split(':')[0]?.toLowerCase() || ''
  const admin = getAdminHost().split(':')[0]?.toLowerCase() || ''
  if (normalized === admin) return true
  if (normalized.startsWith('admin.') && isLocalHost(host)) return true
  return false
}

export const isPublicHostName = (host: string): boolean => {
  if (isAdminHostName(host)) return false
  return true
}
