import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'

const root = resolve('out')
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? filesIn(path) : path
  }))).flat()
}

const files = await filesIn(root)
const html = await readFile(resolve(root, 'index.html'), 'utf8')
assert.match(html, /<html[^>]+lang="es"/)
assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, 'Exactly one public h1')
assert.match(html, /<meta name="description" content="[^"]+"/)
assert.match(html, /<title>Rodamientos Aguas Negras/)
await stat(resolve(root, '404.html'))
const headers = await readFile(resolve(root, '_headers'), 'utf8')
assert.match(headers, /X-Content-Type-Options: nosniff/)
assert.match(headers, /frame-ancestors 'none'/)

for (const match of html.matchAll(/href="\/?#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${match[1]}"`), `Broken fragment: ${match[1]}`)
}
for (const match of html.matchAll(/(?:src|href)="(\/(?:images\/|_next\/|favicon)[^"?#]*)/g)) {
  await stat(resolve(root, `.${decodeURIComponent(match[1])}`))
}

const privateMarkers = [
  'carrito-dev', 'Prueba interna del carrito', 'Productos de demostración',
  'DEMO-ROD-001', 'DEMO-RET-002', 'DEMO-REP-003', 'ran:cart:v1',
]
for (const file of files) {
  const relative = file.slice(root.length).replaceAll('\\', '/')
  assert.doesNotMatch(relative, /\/(?:api|cart|carrito|checkout|orders|pedidos|pago|shipping)(?:[/.]|$)/i)
  if (!['.html', '.js', '.txt', '.json', '.rsc', '.map'].includes(extname(file))) continue
  const content = await readFile(file, 'utf8')
  for (const marker of privateMarkers) {
    assert.ok(!content.includes(marker), `Private commerce content in ${relative}: ${marker}`)
  }
}
console.log(`Verified ${files.length} exported files: public metadata, fragments and assets OK; no cart UI, mock catalog or purchase routes.`)
