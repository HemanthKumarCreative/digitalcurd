import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  getAdminName,
  hasAdminCredentials,
} from '@/lib/auth/config'
import { verifySessionToken, type SessionPayload } from '@/lib/auth/session-token'
import type { AdminRole } from '@/lib/auth/roles'
import { isAdminHostName } from '@/lib/site'

export type AdminSession = {
  user: {
    id: 'admin'
    name: string
    email: string
    role: AdminRole
  }
}

export const getSessionFromToken = async (
  token?: string | null
): Promise<AdminSession | null> => {
  if (!token || !hasAdminCredentials()) return null
  const payload = await verifySessionToken(token)
  if (!payload) return null
  return {
    user: {
      id: 'admin',
      name: payload.name || getAdminName(),
      email: payload.email,
      role: 'super_admin',
    },
  }
}

export const getSessionFromRequest = async (
  request: NextRequest
): Promise<AdminSession | null> =>
  getSessionFromToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)

export const getServerSession = async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies()
  return getSessionFromToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export const requireAdminSession = async (opts?: { loginPath?: string }) => {
  const headerStore = await headers()
  const host = headerStore.get('host') || ''
  const loginPath =
    opts?.loginPath || (isAdminHostName(host) ? '/login' : '/admin/login')

  const session = await getServerSession()
  if (!session) {
    redirect(loginPath)
  }
  return session
}

export { ADMIN_SESSION_COOKIE }
export type { SessionPayload }
