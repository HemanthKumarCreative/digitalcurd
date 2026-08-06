import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/admin/rate-limit'
import { getSessionFromRequest } from '@/lib/auth/session'
import { DESIGN_MODE_COOKIE } from '@/lib/design-mode/constants'

export const POST = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  const limited = checkRateLimit(`design-enable:${ip}`, 30, 60_000)
  if (!limited.ok) {
    return NextResponse.json({ message: 'Rate limit exceeded' }, { status: 429 })
  }

  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  const res = NextResponse.json({ ok: true, designMode: true, draftMode: true })
  res.cookies.set(DESIGN_MODE_COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
  })
  return res
}
