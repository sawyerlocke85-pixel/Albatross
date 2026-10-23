import { Link } from 'react-router'
import { updates } from '../lib/updates'
import { useTitle } from '../lib/useTitle'
import Post from '../components/Post'

export default function Updates() {
  useTitle('Build updates')
  return (
    <>
      <header className="page-head">
        <div className="wrap grid">
          <h1 className="page-head__title">Follow the Zephyr Z1 build</h1>
          <p className="page-head__lead lead">Every update from the workshop, newest first.</p>
        </div>
      </header>
      <section className="wrap">
        {updates.map((post) => (
          <Post key={post.slug} post={post} headingLevel={2} />
        ))}
        <p style={{ marginTop: '1rem' }}>
          <Link to="/products" className="text-link">
            Back to Zephyr Z1
          </Link>
        </p>
      </section>
    </>
  )
}
