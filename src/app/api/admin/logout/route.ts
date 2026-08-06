import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

export const POST = async () => {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
