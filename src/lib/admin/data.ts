import { getWriteClient } from '@/lib/admin/sanity'

export type DashboardStats = {
  pages: number
  services: number
  posts: number
  jobs: number
  legal: number
  drafts: number
  media: number
  storageBytes: number
  recent: Array<{
    _id: string
    _type: string
    title?: string
    slug?: string
    _updatedAt: string
  }>
}

const PAGE_IDS = [
  'homePage',
  'aboutPage',
  'careersPage',
  'contactPage',
  'blogIndex',
  'servicesIndex',
  'siteSettings',
]

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const client = getWriteClient()
    const [services, posts, jobs, legal, drafts, media] = await Promise.all([
      client.fetch<number>('count(*[_type == "service" && !(_id in path("drafts.**"))])'),
      client.fetch<number>('count(*[_type == "post" && !(_id in path("drafts.**"))])'),
      client.fetch<number>('count(*[_type == "job" && !(_id in path("drafts.**"))])'),
      client.fetch<number>('count(*[_type == "legalPage" && !(_id in path("drafts.**"))])'),
      client.fetch<number>('count(*[_id in path("drafts.**")])'),
      client.fetch<{ count: number; bytes: number }>(`{
        "count": count(*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]),
        "bytes": math::sum(*[_type in ["sanity.imageAsset", "sanity.fileAsset"]].size)
      }`),
    ])

    const existingPages = await client.fetch<string[]>(
      `*[_type in ["homePage","aboutPage","careersPage","contactPage","blogIndex","servicesIndex","siteSettings"] && !(_id in path("drafts.**"))]._id`
    )

    const recent = await client.fetch<DashboardStats['recent']>(
      `*[!(_id in path("drafts.**")) && _type in ["homePage","aboutPage","careersPage","contactPage","blogIndex","servicesIndex","service","post","job","legalPage","siteSettings"]] | order(_updatedAt desc)[0...8]{
        _id,
        _type,
        _updatedAt,
        "title": coalesce(title, siteName, name, _type),
        "slug": slug.current
      }`
    )

    return {
      pages: existingPages.filter((id) => PAGE_IDS.includes(id)).length || PAGE_IDS.length,
      services: services || 0,
      posts: posts || 0,
      jobs: jobs || 0,
      legal: legal || 0,
      drafts: drafts || 0,
      media: media?.count || 0,
      storageBytes: media?.bytes || 0,
      recent: recent || [],
    }
  } catch {
    return {
      pages: PAGE_IDS.length,
      services: 0,
      posts: 0,
      jobs: 0,
      legal: 0,
      drafts: 0,
      media: 0,
      storageBytes: 0,
      recent: [],
    }
  }
}

export const listDocuments = async <T>(query: string): Promise<T[]> => {
  try {
    return (await getWriteClient().fetch<T[]>(query)) || []
  } catch {
    return []
  }
}

export const getDocument = async <T>(id: string): Promise<T | null> => {
  try {
    const client = getWriteClient()
    const publishedId = id.replace(/^drafts\./, '')
    const draft = await client.getDocument(`drafts.${publishedId}`)
    if (draft) return draft as T
    const published = await client.getDocument(publishedId)
    return (published as T) || null
  } catch {
    return null
  }
}

/** Prefer draft when present; collapse draft+published pairs for admin lists. */
export const listDocumentsPreferDraft = async <T extends { _id: string }>(
  type: string,
  projection: string,
  order = 'title asc'
): Promise<Array<T & { isDraft?: boolean }>> => {
  try {
    const rows = await getWriteClient().fetch<Array<T & { _id: string }>>(
      `*[_type == $type] | order(${order}){ ${projection} }`,
      { type }
    )
    const map = new Map<string, T & { isDraft?: boolean }>()
    for (const row of rows || []) {
      const publishedId = row._id.replace(/^drafts\./, '')
      const isDraft = row._id.startsWith('drafts.')
      const prev = map.get(publishedId)
      if (!prev || isDraft) {
        map.set(publishedId, { ...row, _id: publishedId, isDraft: isDraft || prev?.isDraft })
      } else if (!prev.isDraft) {
        map.set(publishedId, { ...prev, isDraft: false })
      }
    }
    return Array.from(map.values())
  } catch {
    return []
  }
}

export const resolveIdBySlug = async (
  type: 'service' | 'post' | 'author',
  slug: string
): Promise<string | null> => {
  try {
    const client = getWriteClient()
    const id = await client.fetch<string | null>(
      `coalesce(
        *[_type == $type && slug.current == $slug && _id in path("drafts.**")][0]._id,
        *[_type == $type && slug.current == $slug && !(_id in path("drafts.**"))][0]._id
      )`,
      { type, slug }
    )
    return id ? id.replace(/^drafts\./, '') : null
  } catch {
    return null
  }
}


export const listMediaAssets = async (search = '') => {
  try {
    const client = getWriteClient()
    const filter = search
      ? `&& (originalFilename match $q || title match $q || mimeType match $q)`
      : ''
    return await client.fetch(
      `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] ${filter}] | order(_updatedAt desc)[0...100]{
        _id,
        _type,
        originalFilename,
        url,
        mimeType,
        size,
        metadata,
        _updatedAt
      }`,
      search ? { q: `*${search}*` } : {}
    )
  } catch {
    return []
  }
}