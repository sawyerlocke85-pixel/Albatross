// Product updates: every folder in src/updates/ is a post. Adding a folder
// is all it takes to publish (see README → "How to post an update").

// index.md → { slug, title, date, summary, captions, html } (scripts/vite-plugin-updates.mjs)
const files = import.meta.glob('/src/updates/*/index.md', { eager: true, import: 'default' })

// Photos → resized WebP variants with width/height, generated at build time.
const images = import.meta.glob('/src/updates/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: { w: '480;960;1600', format: 'webp', quality: '78', withoutEnlargement: 'true', as: 'img' },
})

const folderOf = (path) => path.split('/').at(-2)
const fileOf = (path) => path.split('/').at(-1)

export const updates = Object.values(files)
  .map((post) => ({
    ...post,
    photos: Object.entries(images)
      .filter(([path]) => folderOf(path) === post.slug)
      .sort(([a], [b]) => fileOf(a).localeCompare(fileOf(b), undefined, { numeric: true }))
      .map(([path, img]) => ({ ...img, file: fileOf(path), caption: post.captions[fileOf(path)] || '' })),
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug))

export const getUpdate = (slug) => updates.find((u) => u.slug === slug)

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
