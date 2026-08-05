const fs = require('fs')
const path = require('path')
const https = require('https')

const urls = new Set()
const walk = (dir) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (/\.(json|tsx|ts)$/.test(ent.name)) {
      const t = fs.readFileSync(p, 'utf8')
      for (const m of t.match(/https:\/\/images\.unsplash\.com\/[^"'\\s)]+/g) || []) {
        urls.add(m.replace(/[),.]+$/g, ''))
      }
    }
  }
}
walk('src')

const check = (url) =>
  new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 12000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        check(res.headers.location).then(resolve)
        return
      }
      resolve({ url, status: res.statusCode })
    })
    req.on('error', (e) => resolve({ url, status: 0, error: e.message }))
    req.on('timeout', () => {
      req.destroy()
      resolve({ url, status: 0, error: 'timeout' })
    })
    req.end()
  })

;(async () => {
  const list = [...urls]
  let broken = 0
  for (let i = 0; i < list.length; i += 6) {
    const part = await Promise.all(list.slice(i, i + 6).map(check))
    for (const r of part) {
      const ok = r.status >= 200 && r.status < 400
      if (!ok) {
        broken++
        console.log('BROKEN', r.status, r.url)
      }
    }
  }
  console.log('checked=' + list.length + ' broken=' + broken)
})()
