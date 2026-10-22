import { founders, team } from '../content'
import { useTitle } from '../lib/useTitle'
import Picture from '../components/Picture'

export default function Founders() {
  useTitle('Founders')
  return (
    <>
      <header className="page-head">
        <div className="wrap grid">
          <h1 className="page-head__title">{founders.title}</h1>
          <p className="page-head__lead lead">{founders.line}</p>
        </div>
      </header>

      <div className="wrap">
        <figure className="figure team-photo">
          <Picture image={team.photo} alt={team.alt} sizes="100vw" eager />
          <figcaption className="label">{team.caption}</figcaption>
        </figure>
      </div>

      <section className="wrap section" aria-label="Founders">
        <ul className="grid founders">
          {founders.people.map((p) => (
            <li key={p.name} className="founder">
              <Picture
                className="founder__photo"
                image={p.photo}
                alt={p.name}
                focus={p.focus}
                sizes="(max-width: 960px) 100vw, 33vw"
              />
              <h2 className="h5">{p.name}</h2>
              <p className="founder__role">{p.role}</p>
              <p className="founder__bio">{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
