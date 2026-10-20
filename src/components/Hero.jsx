import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { hero, launchEvent, zephyr } from '../content'
import { Mark } from './Logo'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
// Flight profile: vertical boost → pitch-over at ~800 ft → level cruise.
const FLIGHT_PATH = 'M1220 905 L1220 560 C1220 430 1270 380 1370 380 L1600 380'

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const scr = q('.scr')
        if (!ready) {
          // hold everything hidden until the intro reveals the page
          scr.forEach((el) => {
            el.dataset.text ||= el.textContent
            el.textContent = '\u00a0'
          })
          gsap.set(q('.hero__eyebrow > *, .hero__sub, .hero__ctas > *, .hero__bar-inner > *'), { autoAlpha: 0, y: 20 })
          gsap.set(q('.hero__path-line'), { drawSVG: '0%' })
          gsap.set(q('.hero__path-label, .hero__dot'), { autoAlpha: 0 })
          gsap.set(q('.hero__sky, .hero__floor'), { scale: 1.08 })
          return
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.to(q('.hero__sky, .hero__floor'), { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
          .to(q('.hero__eyebrow > *'), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.8 }, 0.1)
        scr.forEach((el, i) => {
          tl.to(
            el,
            {
              duration: 1.1,
              scrambleText: { text: el.dataset.text, chars: SCRAMBLE_CHARS, revealDelay: 0.25, speed: 0.7 },
              ease: 'none',
            },
            0.25 + i * 0.32,
          )
        })
        tl.to(q('.hero__sub, .hero__ctas > *'), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.9 }, 0.9)
          .to(q('.hero__path-line'), { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut' }, 0.6)
          .to(q('.hero__path-label'), { autoAlpha: 1, stagger: 0.25, duration: 0.6 }, 1.4)
          .to(q('.hero__dot'), { autoAlpha: 1, duration: 0.4 }, 1.6)
          .to(q('.hero__bar-inner > *'), { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.7 }, 1.1)

        // scroll: content lifts away, background zooms, the craft flies its profile
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(q('.hero__content'), { yPercent: -18, autoAlpha: 0.15, ease: 'none', scrollTrigger: st })
        gsap.to(q('.hero__bg'), { scale: 1.14, ease: 'none', scrollTrigger: st })
        gsap.to(q('.hero__watermark'), { yPercent: 18, rotate: 4, ease: 'none', scrollTrigger: st })
        const path = q('.hero__path-line')[0]
        gsap.to(q('.hero__dot'), {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0.05, end: 0.92 },
          ease: 'none',
          immediateRender: true,
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: 0.6 },
        })
      })
    },
    { scope: root, dependencies: [ready] },
  )

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  const fullTitle = `${hero.lines[0]} ${hero.lines[1]}${hero.accent}`

  return (
    <section id="company" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__sky" />
        <div className="hero__floor" />
        <Mark className="hero__watermark" size={880} mono />
        <svg className="hero__path" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hero-path-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#3b63ff" stopOpacity="0" />
              <stop offset="0.35" stopColor="#3b63ff" />
              <stop offset="1" stopColor="#8ea4ff" />
            </linearGradient>
          </defs>
          <path className="hero__path-line" d={FLIGHT_PATH} fill="none" stroke="url(#hero-path-grad)" strokeWidth="1.5" />
          <path d="M1210 560 H1230 M1360 370 V390" stroke="rgba(242,239,232,.4)" />
          <text className="hero__path-label" x="1236" y="760">BOOST</text>
          <text className="hero__path-label" x="1100" y="556">SEP · 800 FT</text>
          <text className="hero__path-label" x="1268" y="352">CRUISE · 80 MPH</text>
          <g className="hero__dot">
            <circle r="14" fill="#3b63ff" opacity=".25" />
            <circle r="4.5" fill="#f2efe8" />
          </g>
        </svg>
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow mono">
          {hero.eyebrow.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
        <h1 id="hero-title" className="display hero__title" aria-label={fullTitle}>
          <span className="hero__line" aria-hidden="true">
            <span className="scr">{hero.lines[0]}</span>
          </span>
          <span className="hero__line" aria-hidden="true">
            <span className="scr">{hero.lines[1].trim()}</span> <em className="scr">{hero.accent}</em>
          </span>
        </h1>
        <div className="hero__row">
          <p className="lede hero__sub">{hero.sub}</p>
          <div className="hero__ctas">
            <a href="#zephyr" onClick={go('zephyr')} className="btn">
              Meet {zephyr.name} <span className="btn__arrow">→</span>
            </a>
            <a href="#mission" onClick={go('mission')} className="btn btn--ghost">
              Our mission
            </a>
          </div>
        </div>
      </div>

      <div className="hero__bar">
        <div className="container hero__bar-inner mono">
          <span>
            01 — Company
            <b>Albatross Defense</b>
          </span>
          <span>
            Platform
            <b>{zephyr.name}</b>
          </span>
          <span>
            Launch event
            <b>
              {launchEvent.dateShort} · {launchEvent.city}
            </b>
          </span>
          <span className="hero__scroll">
            Scroll
            <span className="hero__scroll-line" />
          </span>
        </div>
      </div>
    </section>
  )
}
