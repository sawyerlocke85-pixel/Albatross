import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { about } from '../content'

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const split = SplitText.create(q('.about__title'), { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.1,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
      gsap.from(q('.about__head .eyebrow, .about__body'), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })

      // hairline draws across, then each stat scrambles in
      const stats = q('.stats')[0]
      const tl = gsap.timeline({ scrollTrigger: { trigger: stats, start: 'top 85%' } })
      tl.from(q('.stats__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.inOut' })
        .from(q('.stat .mono'), { autoAlpha: 0, y: 10, stagger: 0.08, duration: 0.6 }, 0.4)
      q('.stat__value').forEach((el, i) => {
        tl.from(
          el,
          { duration: 1, scrambleText: { text: '', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', speed: 0.6 }, ease: 'none' },
          0.5 + i * 0.12,
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__grid">
          <div className="about__head">
            <span className="eyebrow">01 — The Company</span>
            <h2 id="about-title" className="display about__title">
              {about.title[0]} <em>{about.title[1]}</em>
            </h2>
          </div>
          <p className="lede about__body">{about.body}</p>
        </div>
        <div className="stats">
          <span className="stats__rule" />
          {about.stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="mono" style={{ color: 'var(--muted)' }}>
                {s.label}
              </span>
              <div className="stat__value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
