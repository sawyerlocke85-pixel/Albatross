import { Link } from 'react-router'
import { home } from '../content'
import { useTitle } from '../lib/useTitle'
import ZephyrSVG from '../components/ZephyrSVG'

// Home is deliberately static: no animation of any kind.
export default function Home() {
  useTitle()
  return (
    <>
      <section className="home-hero">
        <div className="wrap grid">
          <div className="home-hero__text">
            <h1>
              {home.title[0]}
              <br />
              {home.title[1]}
            </h1>
            <p className="lead">{home.line}</p>
            <Link to="/products" className="btn">
              {home.cta}
            </Link>
          </div>
          <figure className="figure home-hero__figure">
            {/* TODO(content): swap for a photo of the real Zephyr Z1 */}
            <div className="figure__frame">
              <ZephyrSVG frame="cruise" title="Zephyr Z1 with its wings deployed, seen from above" />
            </div>
            <figcaption className="label">{home.imageCaption}</figcaption>
          </figure>
        </div>
      </section>

      <nav className="wrap" aria-label="Explore">
        <ul className="grid home-links">
          {home.links.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>
                <span className="home-links__title">{l.title}</span>
                <span className="muted">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
