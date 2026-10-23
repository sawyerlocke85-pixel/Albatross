// GitHub Pages has no SPA fallback. Copy the built index.html into a folder
// for every route so deep links (and refreshes) return 200, and use it as
// 404.html for anything else.
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve(import.meta.dirname, '../dist')
const updates = path.resolve(import.meta.dirname, '../src/updates')
const index = path.join(dist, 'index.html')

const routes = ['products', 'products/updates', 'founders', 'mission', 'careers']
for (const name of await readdir(updates)) {
  if ((await stat(path.join(updates, name))).isDirectory()) routes.push(`products/updates/${name}`)
}

for (const route of routes) {
  await mkdir(path.join(dist, route), { recursive: true })
  await copyFile(index, path.join(dist, route, 'index.html'))
}
await copyFile(index, path.join(dist, '404.html'))
console.log(`postbuild: wrote ${routes.length} route pages + 404.html`)
