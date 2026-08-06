import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, hasSanityConfig } from '@/sanity/env'

export const getWriteClient = () => {
  if (!hasSanityConfig || !process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error('Sanity write client is not configured')
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  })
}

export const getPreviewClient = () => {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
  if (!hasSanityConfig || !token) {
    throw new Error('Sanity preview client is not configured')
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: false,
  })
}

export const revalidateForType = async (type?: string) => {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'
  try {
    await fetch(`${base}/api/revalidate?secret=${encodeURIComponent(secret)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _type: type }),
    })
  } catch {
    /* best-effort */
  }
}
