import { type NextRequest, NextResponse } from 'next/server'
import {
  getAdminName,
  getSessionSecret,
  validateAdminCredentials,
} from '@/lib/auth/config'
import { createSessionToken } from '@/lib/auth/session-token'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/session'
import { checkRateLimit } from '@/lib/admin/rate-limit'

export const POST = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  const limited = checkRateLimit(`login:${ip}`, 20, 60_000)
  if (!limited.ok) {
    return NextResponse.json({ message: 'Too many login attempts' }, { status: 429 })
  }

  const body = await req.json().catch(() => ({}))
  const email = String(body.email || '')
  const password = String(body.password || '')
  const rememberMe = Boolean(body.rememberMe)

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
  }

  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24
  const exp = Math.floor(Date.now() / 1000) + maxAge
  const token = await createSessionToken(
    {
      email: email.trim().toLowerCase(),
      name: getAdminName(),
      exp,
    },
    getSessionSecret()
  )

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  })
  return res
}
