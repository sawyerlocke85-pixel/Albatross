import { mission } from '../content'
import { useTitle } from '../lib/useTitle'
import ZephyrSVG from '../components/ZephyrSVG'

export default function Mission() {
  useTitle('Mission')
  return (
    <>
      <header className="page-head">
        <div className="wrap grid">
          <h1 className="page-head__title">{mission.title}</h1>
        </div>
      </header>
      <section className="wrap grid">
        <div className="prose mission__text">
          {mission.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="figure mission__figure">
          <div className="figure__frame">
            <ZephyrSVG frame="launch" title="Zephyr Z1 standing on its rocket booster, wings folded" />
          </div>
          <figcaption className="label">Zephyr Z1 on its booster, ready to launch.</figcaption>
        </figure>
      </section>
    </>
  )
}
