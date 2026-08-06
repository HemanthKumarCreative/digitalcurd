export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export const documentIdFor = (
  type: 'service' | 'post' | 'job' | 'author',
  slugOrKey: string
) => {
  const key = slugify(slugOrKey)
  if (!key) throw new Error('A valid slug is required')
  if (type === 'service') return `service-${key}`
  if (type === 'post') return `post-${key}`
  if (type === 'author') return `author-${key}`
  return `job-${key}`
}
