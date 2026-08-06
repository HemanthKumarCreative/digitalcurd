'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { getWriteClient, revalidateForType } from '@/lib/admin/sanity'
import { requireAdminSession } from '@/lib/auth/session'

const assertAuthenticated = async () => {
  await requireAdminSession()
}

const ensureDraft = async (client: ReturnType<typeof getWriteClient>, id: string, type: string) => {
  const publishedId = id.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`
  const existing =
    (await client.getDocument(draftId)) || (await client.getDocument(publishedId)) || null

  if (!existing) {
    throw new Error(`Document not found: ${publishedId}`)
  }

  if (existing._id !== draftId) {
    const { _rev, ...rest } = existing as Record<string, unknown>
    await client.createOrReplace({
      ...(rest as object),
      _id: draftId,
      _type: type || (existing as { _type: string })._type,
    } as { _id: string; _type: string })
  }

  return { publishedId, draftId }
}

export const patchDocument = async (opts: {
  id: string
  type: string
  set: Record<string, unknown>
  publish?: boolean
}) => {
  await assertAuthenticated()

  const client = getWriteClient()
  const publishedId = opts.id.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`

  const existing =
    (await client.getDocument(draftId)) || (await client.getDocument(publishedId)) || null

  const nextDoc = {
    ...(existing || {}),
    ...opts.set,
    _id: draftId,
    _type: opts.type,
  }

  delete (nextDoc as { _rev?: string })._rev

  await client.createOrReplace(nextDoc as { _id: string; _type: string })

  if (opts.publish) {
    const draft = await client.getDocument(draftId)
    if (draft) {
      const { _rev, ...rest } = draft as Record<string, unknown>
      await client.createOrReplace({
        ...(rest as object),
        _id: publishedId,
        _type: opts.type,
      } as { _id: string; _type: string })
      await client.delete(draftId).catch(() => undefined)
    }
  }

  await revalidateForType(opts.type)
  revalidatePath('/admin')
  revalidateTag(opts.type === 'post' ? 'blog' : opts.type === 'service' ? 'services' : opts.type, 'max')
  return { ok: true as const }
}

/** Nested field patch for Design Mode (e.g. path `heroSection.title`). */
export const patchField = async (opts: {
  id: string
  type: string
  path: string
  value: unknown
  publish?: boolean
}) => {
  await assertAuthenticated()

  if (!opts.path || opts.path.includes('..')) {
    throw new Error('Invalid field path')
  }

  const client = getWriteClient()
  const { publishedId, draftId } = await ensureDraft(client, opts.id, opts.type)

  await client.patch(draftId).set({ [opts.path]: opts.value }).commit({ autoGenerateArrayKeys: true })

  if (opts.publish) {
    const draft = await client.getDocument(draftId)
    if (draft) {
      const { _rev, ...rest } = draft as Record<string, unknown>
      await client.createOrReplace({
        ...(rest as object),
        _id: publishedId,
        _type: opts.type,
      } as { _id: string; _type: string })
      await client.delete(draftId).catch(() => undefined)
    }
  }

  await revalidateForType(opts.type)
  revalidatePath('/')
  revalidatePath('/admin')
  revalidateTag(opts.type === 'post' ? 'blog' : opts.type === 'service' ? 'services' : opts.type, 'max')
  return { ok: true as const }
}

export const deleteDocument = async (opts: { id: string; type: string }) => {
  await assertAuthenticated()

  const client = getWriteClient()
  const publishedId = opts.id.replace(/^drafts\./, '')
  await client.delete(publishedId).catch(() => undefined)
  await client.delete(`drafts.${publishedId}`).catch(() => undefined)
  await revalidateForType(opts.type)
  revalidatePath('/admin')
  revalidatePath('/')
  if (opts.type === 'service') {
    revalidatePath('/services')
    revalidatePath('/admin/services')
    revalidateTag('services', 'max')
  }
  if (opts.type === 'post') {
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    revalidateTag('blog', 'max')
  }
  if (opts.type === 'author') {
    revalidatePath('/admin/authors')
    revalidatePath('/blog')
    revalidateTag('blog', 'max')
  }
  if (opts.type === 'job') {
    revalidatePath('/careers')
    revalidatePath('/admin/jobs')
    revalidateTag('jobs', 'max')
  }
  return { ok: true as const }
}

export const createDocument = async (opts: {
  id: string
  type: string
  data: Record<string, unknown>
  publish?: boolean
}) => {
  await assertAuthenticated()

  const client = getWriteClient()
  const publishedId = opts.id.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`

  const existing =
    (await client.getDocument(publishedId)) || (await client.getDocument(draftId)) || null
  if (existing) {
    throw new Error('A document with this ID already exists')
  }

  const slugCurrent =
    opts.data.slug &&
    typeof opts.data.slug === 'object' &&
    opts.data.slug !== null &&
    'current' in (opts.data.slug as object)
      ? String((opts.data.slug as { current?: string }).current || '')
      : ''

  if (
    slugCurrent &&
    (opts.type === 'service' || opts.type === 'post' || opts.type === 'author')
  ) {
    const clash = await client.fetch<number>(
      `count(*[_type == $type && slug.current == $slug])`,
      { type: opts.type, slug: slugCurrent }
    )
    if (clash > 0) {
      throw new Error('That slug is already in use')
    }
  }

  const publish = opts.publish !== false
  const doc = {
    ...opts.data,
    _id: publish ? publishedId : draftId,
    _type: opts.type,
  }
  delete (doc as { _rev?: string })._rev

  await client.create(doc as { _id: string; _type: string })

  await revalidateForType(opts.type)
  revalidatePath('/admin')
  revalidatePath('/')
  if (opts.type === 'service') {
    revalidatePath('/services')
    revalidatePath('/admin/services')
    revalidateTag('services', 'max')
  }
  if (opts.type === 'post') {
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    revalidateTag('blog', 'max')
  }
  if (opts.type === 'author') {
    revalidatePath('/admin/authors')
    revalidatePath('/blog')
    revalidateTag('blog', 'max')
  }
  if (opts.type === 'job') {
    revalidatePath('/careers')
    revalidatePath('/admin/jobs')
    revalidateTag('jobs', 'max')
  }

  return { ok: true as const, id: publishedId }
}

export const publishDocument = async (opts: { id: string; type: string }) =>
  patchDocument({
    id: opts.id,
    type: opts.type,
    set: {},
    publish: true,
  })
