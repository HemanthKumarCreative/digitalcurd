'use client'

import { useFormStatus } from 'react-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} aria-label="New post">
      <Plus className="h-4 w-4" aria-hidden />
      {pending ? 'Creating…' : 'New post'}
    </Button>
  )
}

export const CreatePostButton = () => (
  <form action="/admin/blog/new" method="post">
    <SubmitButton />
  </form>
)
