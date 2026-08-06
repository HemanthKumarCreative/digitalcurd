import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'
import { DESIGN_MODE_COOKIE } from '@/lib/design-mode/constants'

export const POST = async (req: NextRequest) => {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.disable()

  const res = NextResponse.json({ ok: true, designMode: false, draftMode: false })
  res.cookies.set(DESIGN_MODE_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  })
  return res
}
