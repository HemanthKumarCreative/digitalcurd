import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const type = body?._type as string | undefined

    const tagMap: Record<string, string[]> = {
      siteSettings: ['siteSettings'],
      homePage: ['home'],
      aboutPage: ['about'],
      careersPage: ['careers'],
      job: ['jobs', 'careers'],
      contactPage: ['contact'],
      blogIndex: ['blog'],
      post: ['blog'],
      servicesIndex: ['services'],
      service: ['services'],
      legalPage: ['legal'],
    }

    const tags = (type && tagMap[type]) || [
      'home',
      'about',
      'careers',
      'jobs',
      'contact',
      'blog',
      'services',
      'legal',
      'siteSettings',
    ]

    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, tags })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
