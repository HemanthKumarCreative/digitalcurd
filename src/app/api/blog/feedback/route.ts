import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as { slug?: string; vote?: string }
    const slug = String(body.slug || '').trim()
    const vote = body.vote === 'yes' || body.vote === 'no' ? body.vote : null

    if (!slug || !vote) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
    }

    console.info('[blog-feedback]', { slug, vote, at: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
