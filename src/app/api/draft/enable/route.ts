import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/admin/rate-limit'
import { getSessionFromRequest } from '@/lib/auth/session'

export const POST = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  const limited = checkRateLimit(`draft-enable:${ip}`, 20, 60_000)
  if (!limited.ok) {
    return NextResponse.json({ message: 'Rate limit exceeded' }, { status: 429 })
  }

  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  return NextResponse.json({ ok: true, draftMode: true })
}
