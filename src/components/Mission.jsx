import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../lib/gsap'
import { mission } from '../content'

const ACCENT_WORDS = new Set(['innovation', 'passion', 'peace'])

export default function Mission() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(q('.mission__statement'), { type: 'words', wordsClass: 'word' })
        // the statement lights up word-by-word while the section is pinned
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=110%',
              pin: true,
              scrub: 0.5,
            },
          },
        )
        gsap.from(q('.pillar'), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: q('.mission__pillars')[0], start: 'top 92%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="mission" ref={root} className="section mission" aria-labelledby="mission-title">
      <div className="container">
        <span id="mission-title" className="eyebrow">
          02 — Mission
        </span>
        <p className="display mission__statement">
          {mission.statement.split(' ').map((w, i) => {
            const clean = w.toLowerCase().replace(/[^a-z]/g, '')
            return (
              <span key={i}>
                {ACCENT_WORDS.has(clean) ? <em>{w}</em> : w}{' '}
              </span>
            )
          })}
        </p>
        <div className="mission__pillars">
          {mission.pillars.map((p, i) => (
            <div key={p.k} className="pillar">
              <div className="pillar__k mono">
                <span>{p.k}</span>
                <span style={{ color: 'var(--muted)' }}>0{i + 1}</span>
              </div>
              <p className="pillar__v">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
