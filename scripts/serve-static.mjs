import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep, extname } from 'node:path'

const root = resolve('out')
const port = Number(process.env.PORT ?? 3000)
const types = {
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

// Local preview of the same files served by Cloudflare; never fall back to a SPA.
await stat(resolve(root, 'index.html'))
const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff')
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`)
    if (!file.startsWith(`${root}${sep}`)) throw new Error('Invalid path')
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
    response.end(request.method === 'HEAD' ? undefined : body)
  } catch {
    const body = await readFile(resolve(root, '404.html'))
    response.writeHead(404, { 'Content-Type': types['.html'] })
    response.end(request.method === 'HEAD' ? undefined : body)
  }
})
server.listen(port, '127.0.0.1', () => {
  console.log(`Static preview: http://127.0.0.1:${port}`)
})
