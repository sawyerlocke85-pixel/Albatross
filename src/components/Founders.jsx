import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../lib/gsap'
import { founders, launchEvent } from '../content'

/** Photo with a clip-path wipe on enter and inner parallax while scrolling. */
function Photo({ src, alt, variant, tag }) {
  return (
    <figure className={`photo photo--${variant}`} style={{ margin: 0 }}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {tag && <figcaption className="photo__tag mono">{tag}</figcaption>}
    </figure>
  )
}

export default function Founders() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)

      // Page theme: dark → ivory as the founders section arrives.
      gsap.fromTo(
        document.documentElement,
        {
          '--bg': 'rgb(7, 8, 10)',
          '--fg': 'rgb(242, 239, 232)',
          '--muted': 'rgba(242, 239, 232, 0.62)',
          '--line': 'rgba(242, 239, 232, 0.14)',
          '--accent': 'rgb(59, 99, 255)',
        },
        {
          '--bg': 'rgb(241, 237, 228)',
          '--fg': 'rgb(11, 12, 15)',
          '--muted': 'rgba(11, 12, 15, 0.62)',
          '--line': 'rgba(11, 12, 15, 0.14)',
          '--accent': 'rgb(36, 72, 232)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 30%', scrub: true },
        },
      )

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const title = SplitText.create(q('.founders__title'), { type: 'lines', mask: 'lines' })
        gsap.from(title.lines, {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.1,
          scrollTrigger: { trigger: q('.founders__head')[0], start: 'top 75%' },
        })
        gsap.from(q('.founders__head .eyebrow, .founders__intro'), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: q('.founders__head')[0], start: 'top 75%' },
        })

        // photos: wipe in, then drift inside their frame
        q('.photo').forEach((fig) => {
          gsap.fromTo(
            fig,
            { clipPath: 'inset(18% 8% 18% 8% round 18px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: fig, start: 'top 82%' } },
          )
          gsap.fromTo(
            fig.querySelector('img'),
            { yPercent: -7, scale: 1.12 },
            { yPercent: 7, scale: 1, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })

        gsap.from(q('.event__row, .event__info .eyebrow, .event__info h3'), {
          y: 18,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.8,
          scrollTrigger: { trigger: q('.event__info')[0], start: 'top 85%' },
        })

        q('.person').forEach((row) => {
          const name = SplitText.create(row.querySelector('.person__name'), { type: 'chars', mask: 'chars' })
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 70%' } })
          tl.from(row.querySelector('.person__meta'), { autoAlpha: 0, y: 14, duration: 0.7 })
            .from(name.chars, { yPercent: 115, stagger: 0.025, duration: 0.9, ease: 'expo.out' }, 0.1)
            .from(row.querySelectorAll('.person__role, .person__bio'), { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.9 }, 0.35)
            .from(row.querySelectorAll('.tag'), { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.5 }, 0.6)
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="founders" ref={root} className="section founders" aria-labelledby="founders-title">
      <div className="container">
        <div className="founders__head">
          <span className="eyebrow">04 — Founders</span>
          <h2 id="founders-title" className="display h2 founders__title">
            {founders.title[0]}
            <br />
            <em>{founders.title[1]}</em>
          </h2>
          <p className="lede founders__intro">{founders.intro}</p>
        </div>

        <div className="event">
          <div className="event__media">
            <Photo src={launchEvent.photo} alt={launchEvent.photoAlt} variant="wide" tag={`Keynote — ${launchEvent.dateShort}`} />
          </div>
          <div className="event__info">
            <span className="eyebrow">Launch event</span>
            <h3 className="display" style={{ fontSize: 'clamp(32px, 3vw, 48px)', marginTop: 16 }}>
              {launchEvent.name}
            </h3>
            <dl className="event__table">
              {[
                ['Date', launchEvent.date],
                ['Venue', launchEvent.venue],
                ['Location', launchEvent.city],
                ['Speakers', founders.people.map((p) => p.name).join(', ')],
              ].map(([k, v]) => (
                <div key={k} className="event__row">
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="people">
          {founders.people.map((p, i) => (
            <article key={p.name} className="person" aria-labelledby={`person-${i}`}>
              <div className="person__media">
                <Photo
                  src={p.photo}
                  alt={`${p.name} speaking at the ${launchEvent.name}`}
                  variant="tall"
                  tag={`${launchEvent.venue} · ${launchEvent.dateShort}`}
                />
              </div>
              <div className="person__text">
                <div className="person__meta mono">
                  <span>
                    0{i + 1} / 0{founders.people.length}
                  </span>
                  <span>{p.origin}</span>
                </div>
                <h3 id={`person-${i}`} className="display person__name">
                  {p.name}
                </h3>
                <p className="mono person__role">{p.role}</p>
                <p className="person__bio">{p.bio}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
