import { NextResponse } from 'next/server'
import { createDocument } from '@/lib/admin/actions'
import { buildPostSeed } from '@/lib/admin/postEditor'
import { documentIdFor, slugify } from '@/lib/admin/slug'
import { requireAdminSession } from '@/lib/auth/session'

const createUntitledPost = async (request: Request) => {
  await requireAdminSession()

  const slug = slugify(`untitled-${Date.now()}`)
  const id = documentIdFor('post', slug)

  await createDocument({
    id,
    type: 'post',
    publish: false,
    data: buildPostSeed({
      title: 'Untitled',
      slug,
      category: 'Insights',
    }),
  })

  return NextResponse.redirect(new URL(`/admin/blog/${slug}`, request.url), 303)
}

/** Prefer POST so Link prefetch / accidental GETs do not create drafts. */
export const POST = createUntitledPost

/** Keep GET for direct navigation / bookmarks; still creates one draft. */
export const GET = createUntitledPost
