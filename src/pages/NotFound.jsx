import { Link } from 'react-router'
import { useTitle } from '../lib/useTitle'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <header className="page-head">
      <div className="wrap grid">
        <h1 className="page-head__title">This page doesn’t exist</h1>
        <p className="page-head__lead">
          <Link to="/" className="btn">
            Go to the homepage
          </Link>
        </p>
      </div>
    </header>
  )
}
