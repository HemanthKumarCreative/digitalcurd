'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { createDocument } from '@/lib/admin/actions'
import { documentIdFor, slugify } from '@/lib/admin/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'

export const CreateAuthorButton = () => {
  const router = useRouter()
  const { push } = useToast()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [role, setRole] = useState('Editorial')

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleCreate = () => {
    const trimmedName = name.trim()
    const slugValue = slugify(slug || trimmedName)
    if (!trimmedName || !slugValue) {
      push({ title: 'Name and slug are required', tone: 'danger' })
      return
    }

    startTransition(async () => {
      try {
        const id = documentIdFor('author', slugValue)
        await createDocument({
          id,
          type: 'author',
          publish: true,
          data: {
            name: trimmedName,
            slug: { _type: 'slug', current: slugValue },
            role: role.trim() || 'Editorial',
            avatarUrl:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
            bio: 'Short author bio. Update before publishing posts under this profile.',
            linkedinUrl: 'https://www.linkedin.com/',
          },
        })
        setOpen(false)
        router.push(`/admin/authors/${slugValue}`)
        router.refresh()
      } catch (error) {
        push({
          title: error instanceof Error ? error.message : 'Could not create author',
          tone: 'danger',
        })
      }
    })
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New author
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Create author"
            className="w-full max-w-md rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create author</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-[var(--admin-muted)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="author-name">Name</Label>
                <Input
                  id="author-name"
                  value={name}
                  onChange={(e) => {
                    const next = e.target.value
                    setName(next)
                    if (!slugTouched) setSlug(slugify(next))
                  }}
                />
              </div>
              <div>
                <Label htmlFor="author-slug">Slug</Label>
                <Input
                  id="author-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true)
                    setSlug(slugify(e.target.value))
                  }}
                />
              </div>
              <div>
                <Label htmlFor="author-role">Role</Label>
                <Input
                  id="author-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" disabled={pending} onClick={handleCreate}>
                {pending ? 'Creating…' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
