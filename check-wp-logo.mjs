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

const query = `*[_type=="homePage"][0]{_id, "logos": clientLogosSlider.logos}`
const res = await fetch(`${base}/query/${dataset}?query=${encodeURIComponent(query)}`, {
  headers: { Authorization: `Bearer ${token}` },
})
const { result } = await res.json()
console.log('doc id:', result?._id)
for (const logo of result?.logos || []) {
  console.log(` - ${logo.name}: ${logo.src}`)
}

const broken = (result?.logos || []).filter(
  (l) => /wordpress-development\.svg/i.test(l.src || '') || (/word/i.test(l.name || '') && !l.src?.includes('wordpress.svg'))
)
console.log('broken wordpress entries:', broken.length)

// Also check drafts
const draftQuery = `*[_id in ["homePage","drafts.homePage"]]{_id, "logos": clientLogosSlider.logos}`
const dres = await fetch(`${base}/query/${dataset}?query=${encodeURIComponent(draftQuery)}`, {
  headers: { Authorization: `Bearer ${token}` },
})
const { result: drafts } = await dres.json()
for (const doc of drafts || []) {
  const wp = (doc.logos || []).find((l) => /word/i.test(l.name || '') || /word/i.test(l.src || ''))
  console.log(doc._id, 'wordpress:', wp)
}
