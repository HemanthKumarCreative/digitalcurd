const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const root = 'src'
function walk(dir, acc=[]) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(ts|tsx)$/.test(e.name) && !e.name.endsWith('.d.ts')) acc.push(p)
  }
  return acc
}
const files = walk(root)
const skipBases = new Set(['page.tsx','layout.tsx','route.ts','loading.tsx','error.tsx','not-found.tsx','middleware.ts','sitemap.ts','robots.ts','icon.tsx','apple-icon.tsx'])

const exportMap = []
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const base = path.basename(file)
  if (skipBases.has(base)) continue
  let m
  const re1 = /export\s+(?:async\s+)?(?:function|const|class|type|interface|enum)\s+([A-Za-z0-9_]+)/g
  while ((m = re1.exec(text))) {
    exportMap.push({file, name: m[1]})
  }
  const re2 = /export\s*(?:type\s*)?\{([^}]+)\}/g
  while ((m = re2.exec(text))) {
    for (const part of m[1].split(',')) {
      const cleaned = part.trim()
      if (!cleaned || cleaned.startsWith('//')) continue
      const asMatch = cleaned.match(/^(?:type\s+)?([A-Za-z0-9_]+)(?:\s+as\s+([A-Za-z0-9_]+))?/)
      if (asMatch) exportMap.push({file, name: asMatch[2] || asMatch[1]})
    }
  }
}

const unused = []
for (const exp of exportMap) {
  let hits = ''
  try {
    hits = execSync(`rg -l -w --glob "*.ts" --glob "*.tsx" ${JSON.stringify(exp.name)} src`, {encoding:'utf8'})
  } catch (e) {
    hits = (e.stdout || '') + ''
  }
  const hitFiles = hits.trim().split(/\r?\n/).filter(Boolean)
  const others = hitFiles.filter(f => path.resolve(f) !== path.resolve(exp.file))
  if (others.length === 0) {
    unused.push({file: exp.file.replace(/\\/g,'/'), name: exp.name})
  }
}

const seen = new Set()
for (const u of unused) {
  const k = u.file + '::' + u.name
  if (seen.has(k)) continue
  seen.add(k)
  console.log(u.file + ' => ' + u.name)
}
console.error('TOTAL', seen.size)
