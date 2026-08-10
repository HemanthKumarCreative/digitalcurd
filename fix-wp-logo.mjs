import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter((line) => line.includes('='))
    .map((line) => {
      const idx = line.indexOf('=')
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim().replace(/^"|"$/g, '')]
    })
)

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET
const token = env.SANITY_API_WRITE_TOKEN
const base = `https://${projectId}.api.sanity.io/v2025-01-01/data`

const ids = ['homePage', 'drafts.homePage']
for (const id of ids) {
  const query = `*[_id==$id][0]{_id, "logos": clientLogosSlider.logos}`
  const res = await fetch(
    `${base}/query/${dataset}?query=${encodeURIComponent(query)}&$id="${id}"`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const { result } = await res.json()
  if (!result) {
    console.log(`skip missing ${id}`)
    continue
  }
  const logos = result.logos || []
  const idx = logos.findIndex(
    (l) => l.src === '/assets/logos/wordpress-development.svg' || l.name === 'WordPress'
  )
  if (idx < 0) {
    console.log(`${id}: no wordpress logo to patch`)
    continue
  }
  const path = `clientLogosSlider.logos[_key=="${logos[idx]._key}"].src`
  const mut = await fetch(`${base}/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id,
            set: { [path]: '/assets/logos/wordpress.svg' },
          },
        },
      ],
    }),
  })
  console.log(`${id}:`, await mut.json())
}
