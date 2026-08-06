export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer'

export const ADMIN_ROLES: AdminRole[] = [
  'super_admin',
  'admin',
  'editor',
  'author',
  'viewer',
]

export const canMutateContent = (role?: string | null): boolean =>
  role === 'super_admin' || role === 'admin' || role === 'editor'

export const canMutateBlogOnly = (role?: string | null): boolean =>
  canMutateContent(role) || role === 'author'

export const canManageUsers = (role?: string | null): boolean =>
  role === 'super_admin' || role === 'admin'

export const canAccessAdmin = (role?: string | null): boolean =>
  ADMIN_ROLES.includes((role || '') as AdminRole)
