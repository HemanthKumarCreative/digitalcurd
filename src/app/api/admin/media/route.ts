import { type NextRequest, NextResponse } from 'next/server'
import { getWriteClient } from '@/lib/admin/sanity'
import { checkRateLimit } from '@/lib/admin/rate-limit'
import { getSessionFromRequest } from '@/lib/auth/session'

export const GET = async (req: NextRequest) => {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const assets = await getWriteClient().fetch(
      `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] | order(_updatedAt desc)[0...100]{
        _id,
        _type,
        originalFilename,
        url,
        mimeType,
        size,
        _updatedAt
      }`
    )
    return NextResponse.json({ assets: assets || [] })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load media' },
      { status: 500 }
    )
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const limited = checkRateLimit(`upload:${session.user.email}`, 30, 60_000)
  if (!limited.ok) {
    return NextResponse.json({ message: 'Rate limit exceeded' }, { status: 429 })
  }

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'Missing file' }, { status: 400 })
  }

  const client = getWriteClient()
  const buffer = Buffer.from(await file.arrayBuffer())
  const asset = await client.assets.upload(
    file.type.startsWith('image/') ? 'image' : 'file',
    buffer,
    {
      filename: file.name,
      contentType: file.type || undefined,
    }
  )

  return NextResponse.json({
    asset: {
      _id: asset._id,
      _type: asset._type,
      originalFilename: asset.originalFilename,
      url: asset.url,
      mimeType: asset.mimeType,
      size: asset.size,
      _updatedAt: asset._updatedAt,
    },
  })
}

export const DELETE = async (req: NextRequest) => {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ message: 'Missing id' }, { status: 400 })
  }

  await getWriteClient().delete(id)
  return NextResponse.json({ ok: true })
}
