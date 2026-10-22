import { Link } from 'react-router'
import { formatDate } from '../lib/updates'
import Photos from './Photos'

export default function Post({ post, headingLevel = 3, linkTitle = true }) {
  const H = `h${headingLevel}`
  return (
    <article className="post grid" aria-labelledby={`post-${post.slug}`}>
      <time className="post__meta label" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <div className="post__main">
        <H id={`post-${post.slug}`} className="post__title">
          {linkTitle ? <Link to={`/products/updates/${post.slug}`}>{post.title}</Link> : post.title}
        </H>
        {/* body is markdown written by the team, rendered at build time */}
        <div className="post__body" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.photos.length > 0 && <Photos photos={post.photos} title={post.title} />}
      </div>
    </article>
  )
}
