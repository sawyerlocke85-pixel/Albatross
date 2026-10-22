// Turns src/updates/<folder>/index.md into a JS module at build time:
//   export default { slug, title, date, summary, captions, html }
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'

const UPDATE_MD = /[\\/]src[\\/]updates[\\/]([^\\/]+)[\\/]index\.md$/
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export function parseUpdate(source, folder) {
  const match = source.match(FRONTMATTER)
  const meta = (match && parseYaml(match[1])) || {}
  const body = match ? match[2] : source
  const date = String(meta.date ?? folder.slice(0, 10))
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`src/updates/${folder}/index.md: date must look like 2026-10-21 (got "${date}")`)
  }
  if (!meta.title) throw new Error(`src/updates/${folder}/index.md: a title is required`)
  return {
    slug: folder,
    title: String(meta.title),
    date,
    summary: meta.summary ? String(meta.summary) : '',
    captions: meta.captions && typeof meta.captions === 'object' ? meta.captions : {},
    html: marked.parse(body.trim()),
  }
}

export function updatesPlugin() {
  return {
    name: 'albatross-updates',
    enforce: 'pre',
    async load(id) {
      const file = id.split('?')[0]
      const m = file.match(UPDATE_MD)
      if (!m) return null
      const post = parseUpdate(await readFile(file, 'utf8'), m[1])
      return `export default ${JSON.stringify(post)}`
    },
  }
}

export const updatesDir = path.resolve(import.meta.dirname, '../src/updates')
