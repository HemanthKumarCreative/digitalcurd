import { MediaLibrary } from '@/components/admin/MediaLibrary'
import { listMediaAssets } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

export default async function AdminMediaPage() {
  await requireAdminSession()
  const assets = await listMediaAssets()

  return (
    <MediaLibrary initialAssets={assets as never[]} canEdit />
  )
}
