export const ADMIN_SESSION_COOKIE = 'dc_admin_session'

export const getAdminEmail = (): string =>
  process.env.ADMIN_EMAIL?.trim() || process.env.ADMIN_BOOTSTRAP_EMAIL?.trim() || ''

export const getAdminPassword = (): string =>
  process.env.ADMIN_PASSWORD?.trim() || process.env.ADMIN_BOOTSTRAP_PASSWORD?.trim() || ''

export const getAdminName = (): string =>
  process.env.ADMIN_NAME?.trim() || 'Admin'

export const getSessionSecret = (): string =>
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  process.env.BETTER_AUTH_SECRET?.trim() ||
  'dev-only-change-admin-session-secret'

export const hasAdminCredentials = (): boolean =>
  Boolean(getAdminEmail() && getAdminPassword())

export const validateAdminCredentials = (email: string, password: string): boolean => {
  const expectedEmail = getAdminEmail()
  const expectedPassword = getAdminPassword()
  if (!expectedEmail || !expectedPassword) return false

  const emailOk = email.trim().toLowerCase() === expectedEmail.toLowerCase()
  const passwordOk = password === expectedPassword
  return emailOk && passwordOk
}
