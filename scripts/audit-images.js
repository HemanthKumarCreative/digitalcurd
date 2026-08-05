const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const urls = new Set()
const locals = new Set()

const walk = (dir) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      walk(p)
      continue
    }
    if (!/\.(json|tsx|ts|js|css)$/.test(ent.name)) continue
    const t = fs.readFileSync(p, 'utf8')
    const urlMatches = t.match(/https?:\/\/[^\s"'\\)]+/g) || []
    for (const raw of urlMatches) {
      const u = raw.replace(/[),.]+$/g, '')
      if (u.includes('unsplash') || /\.(jpg|jpeg|png|webp|svg|gif)(\?|$)/i.test(u)) {
        urls.add(u)
      }
    }
    const localMatches = t.match(/["'](\/(?:assets|logo|under)[^"']+\.(?:jpg|jpeg|png|webp|svg|gif|lottie))["']/gi) || []
    for (const m of localMatches) {
      locals.add(m.replace(/['"]/g, ''))
    }
  }
}

walk('src')
locals.add('/logo-icon.png')
locals.add('/under-construction.lottie')

console.log('=== LOCAL ===')
let localMissing = 0
for (const loc of [...locals].sort()) {
  const file = path.join('public', loc.replace(/^\//, ''))
  const ok = fs.existsSync(file)
  if (!ok) localMissing++
  console.log(`${ok ? 'OK' : 'MISSING'} ${loc}`)
}

const checkUrl = (url) =>
  new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.request(url, { method: 'HEAD', timeout: 15000 }, (res) => {
      const status = res.statusCode || 0
      // follow one redirect
      if (status >= 300 && status < 400 && res.headers.location) {
        checkUrl(res.headers.location).then(resolve)
        return
      }
      resolve({ url, status })
    })
    req.on('error', (err) => resolve({ url, status: 0, error: err.message }))
    req.on('timeout', () => {
      req.destroy()
      resolve({ url, status: 0, error: 'timeout' })
    })
    req.end()
  })

;(async () => {
  console.log('\\n=== REMOTE (' + urls.size + ') ===')
  const list = [...urls].sort()
  const results = []
  // sequential batches of 5
  for (let i = 0; i < list.length; i += 5) {
    const batch = list.slice(i, i + 5)
    const part = await Promise.all(batch.map(checkUrl))
    results.push(...part)
  }
  let broken = 0
  for (const r of results) {
    const ok = r.status >= 200 && r.status < 400
    if (!ok) broken++
    console.log(`${ok ? 'OK' : 'BROKEN'} ${r.status} ${r.url}${r.error ? ' (' + r.error + ')' : ''}`)
  }
  console.log('\\nSUMMARY localMissing=' + localMissing + ' remoteBroken=' + broken)
  fs.writeFileSync('_img_audit.json', JSON.stringify({ localMissing, broken, results }, null, 2))
})()
