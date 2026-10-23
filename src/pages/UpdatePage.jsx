import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getUpdate } from '../lib/updates'
import { useTitle } from '../lib/useTitle'
import Post from '../components/Post'
import NotFound from './NotFound'

export default function UpdatePage() {
  const post = getUpdate(useParams().slug)
  useTitle(post?.title || 'Update not found')

  // the optional `summary` becomes this page's description (link previews, search)
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    if (!meta || !post?.summary) return undefined
    const previous = meta.content
    meta.content = post.summary
    return () => {
      meta.content = previous
    }
  }, [post])
  if (!post) return <NotFound />
  return (
    <section className="wrap" style={{ paddingTop: '3rem' }}>
      <p style={{ marginBottom: '2rem' }}>
        <Link to="/products/updates" className="text-link">
          All updates
        </Link>
      </p>
      <Post post={post} headingLevel={1} linkTitle={false} />
    </section>
  )
}
