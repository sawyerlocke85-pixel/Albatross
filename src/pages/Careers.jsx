import { careers, company, team } from '../content'
import { useTitle } from '../lib/useTitle'
import Picture from '../components/Picture'

export default function Careers() {
  useTitle('Careers')
  const subject = encodeURIComponent('Working at Albatross Defense')
  return (
    <>
      <header className="page-head">
        <div className="wrap grid">
          <h1 className="page-head__title">{careers.title}</h1>
          <p className="page-head__lead lead">{careers.intro}</p>
        </div>
      </header>

      <div className="wrap">
        <figure className="figure team-photo">
          <Picture image={team.photo} alt={team.alt} sizes="100vw" eager />
          <figcaption className="label">The founding team. You would be working with these 3.</figcaption>
        </figure>
      </div>

      <section className="wrap grid section">
        <h2 className="h4 block__title">Open roles</h2>
        <div className="block__body">
          {careers.roles.length > 0 ? (
            <ul className="plain-list">
              {careers.roles.map((r) => (
                <li key={r.title}>
                  {r.title}
                  <span className="muted"> · {[r.type, r.location].filter(Boolean).join(', ')}</span>
                  {r.summary && <p className="muted">{r.summary}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="prose">We have no open roles listed right now. If you want to build with us anyway, get in touch.</p>
          )}
        </div>
      </section>

      <section className="wrap grid" style={{ paddingBottom: 'var(--section)' }}>
        <h2 className="h4 block__title">Apply</h2>
        <div className="block__body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
          <p className="prose">{careers.apply}</p>
          <a className="btn" href={`mailto:${company.email}?subject=${subject}`}>
            Email {company.email}
          </a>
        </div>
      </section>
    </>
  )
}
