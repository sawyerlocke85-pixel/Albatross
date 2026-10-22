// Usage: npm run new-update "First static fire"
// Creates src/updates/YYYY-MM-DD-first-static-fire/index.md, ready to fill in.
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const title = process.argv.slice(2).join(' ').trim()
if (!title) {
  console.error('Give the update a title:  npm run new-update "First static fire"')
  process.exit(1)
}

const now = new Date()
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, '0')).join('-')
const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60)
const folder = path.resolve(import.meta.dirname, '../src/updates', `${date}-${slug}`)

if (existsSync(folder)) {
  console.error(`Already exists: ${path.relative(process.cwd(), folder)}`)
  process.exit(1)
}

await mkdir(folder, { recursive: true })
await writeFile(
  path.join(folder, 'index.md'),
  `---
title: ${JSON.stringify(title)}
date: ${date}
summary: ""
# Optional photo captions, keyed by file name:
# captions:
#   01-test-stand.jpg: Booster on the test stand
---

Write a few sentences about what you built, tested or learned.
`,
)
console.log(`Created ${path.relative(process.cwd(), folder)}/index.md`)
console.log('Add photos (.jpg, .png or .webp) to the same folder, then commit and push.')
