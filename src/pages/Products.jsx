import { Link } from 'react-router'
import { zephyr } from '../content'
import { updates } from '../lib/updates'
import { useTitle } from '../lib/useTitle'
import FlightSequence from '../components/FlightSequence'
import Post from '../components/Post'

const LATEST = 5

export default function Products() {
  useTitle('Zephyr Z1')
  const latest = updates.slice(0, LATEST)

  return (
    <>
      <header className="page-head">
        <div className="wrap grid">
          <h1 className="page-head__title">{zephyr.title}</h1>
          <p className="page-head__lead lead">{zephyr.line}</p>
        </div>
      </header>

      <FlightSequence />

      <section className="section" aria-labelledby="specs-title">
        <div className="wrap grid">
          <h2 id="specs-title" className="h4 block__title">
            Specifications
          </h2>
          <div className="block__body">
            <table className="spec-table">
              <tbody>
                {zephyr.specs.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="label">
                      {k}
                    </th>
                    <td className="num">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="table-note">Preliminary figures from the founders. They may change as testing continues.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="customer-title" style={{ paddingTop: 0 }}>
        <div className="wrap grid">
          <h2 id="customer-title" className="h4 block__title">
            What changes for you
          </h2>
          <ul className="block__body plain-list">
            {zephyr.forCustomer.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="updates-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="updates-title" className="h4">
            Build updates
          </h2>
          <div style={{ marginTop: '2rem' }}>
            {latest.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/products/updates" className="text-link">
              See all updates
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
