import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { lockScroll, unlockScroll } from '../lib/scroll'
import { Mark } from './Logo'

const COLS = 12

/** Cobalt scan-line loader that splits away to reveal the hero. */
export default function Intro({ onReveal }) {
  const root = useRef(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onReveal()
        setDone(true)
        return
      }
      window.scrollTo(0, 0)
      lockScroll()
      const q = gsap.utils.selector(root)
      const counter = { v: 0 }
      const countEl = q('.intro__count')[0]

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setDone(true),
      })
      tl.fromTo(q('.intro__line'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 0.55, duration: 0.9, stagger: { each: 0.04, from: 'center' } }, 0)
        .fromTo(q('.intro__scan'), { top: '0%', opacity: 1 }, { top: '100%', duration: 1.3, ease: 'power2.inOut' }, 0.15)
        .to(q('.intro__scan'), { opacity: 0, duration: 0.2 }, 1.35)
        .fromTo(q('.intro__mark .mark__a'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.3)
        .fromTo(q('.intro__mark .mark__wing'), { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: 0.8, ease: 'expo.out' }, 0.75)
        .fromTo(q('.intro__meta > *'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, 0.2)
        .to(counter, {
          v: 100,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => (countEl.textContent = String(Math.round(counter.v)).padStart(3, '0')),
        }, 0)
        // exit
        .to(q('.intro__center, .intro__meta'), { opacity: 0, y: -16, duration: 0.45, ease: 'power2.in' }, 1.75)
        .add(() => {
          unlockScroll()
          onReveal()
        }, 2.05)
        .to(q('.intro__col'), { scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'expo.inOut', stagger: { each: 0.035, from: 'start' } }, 1.95)

      return () => unlockScroll()
    },
    { scope: root },
  )

  if (done) return null

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro__cols">
        {Array.from({ length: COLS }, (_, i) => (
          <span key={i} className="intro__col">
            <span className="intro__line" />
          </span>
        ))}
      </div>
      <span className="intro__scan" />
      <div className="intro__center">
        <Mark className="intro__mark" size={112} />
      </div>
      <div className="intro__meta mono">
        <span>Albatross Defense</span>
        <span>Systems check</span>
        <span className="intro__count">000</span>
      </div>
    </div>
  )
}
