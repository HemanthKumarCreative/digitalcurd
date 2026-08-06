import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'

export const POST = async (req: NextRequest) => {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.disable()
  return NextResponse.json({ ok: true, draftMode: false })
}
