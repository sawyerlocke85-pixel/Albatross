import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../lib/gsap'
import { careers, company } from '../content'
import { Mark } from './Logo'

export default function Careers() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(q('.careers__title'), { type: 'lines', mask: 'lines' })
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } })
        tl.from(q('.careers__card'), { y: 60, scale: 0.97, autoAlpha: 0, duration: 1.2, ease: 'expo.out' })
          .from(split.lines, { yPercent: 110, stagger: 0.08, duration: 1 }, 0.25)
          .from(q('.careers__main > :not(.careers__title)'), { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.8 }, 0.4)
          .from(q('.careers__list li'), { autoAlpha: 0, x: 20, stagger: 0.07, duration: 0.7 }, 0.5)
        gsap.to(q('.careers__mark'), {
          rotate: -8,
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="careers" ref={root} className="section careers" aria-labelledby="careers-title">
      <div className="container">
        <div className="careers__card">
          <Mark className="careers__mark" size={340} mono />
          <div className="careers__main">
            <span className="eyebrow">05 — Careers</span>
            <h2 id="careers-title" className="display careers__title">
              {careers.title[0]}
              <em>{careers.title[1]}</em>
              {careers.title[2]}
            </h2>
            <p className="lede">{careers.body}</p>
            <a className="btn" href={`mailto:${company.email}?subject=${encodeURIComponent('Careers at Albatross Defense')}`}>
              Get in touch <span className="btn__arrow">→</span>
            </a>
          </div>
          <div className="careers__areas">
            <span className="mono" style={{ color: 'var(--muted)' }}>
              Areas we’re excited about
            </span>
            <ul className="careers__list">
              {careers.areas.map((a, i) => (
                <li key={a}>
                  <span>{a}</span>
                  <span className="mono">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
