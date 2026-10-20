import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { company, launchEvent, nav } from '../content'
import { Logo } from './Logo'

export default function Footer() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(q('.footer__giant span'), {
          yPercent: 100,
          stagger: 0.04,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.footer__giant')[0], start: 'top 95%' },
        })
        gsap.from(q('.footer__col'), {
          autoAlpha: 0,
          y: 20,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer ref={root} className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__col footer__brand">
            <Logo size={30} />
            <p className="footer__tagline">Rocket-launched, wing-deploying aircraft — built in {company.hq}.</p>
          </div>
          <div className="footer__col">
            <h3 className="mono">Navigate</h3>
            <ul>
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="link-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="mono">Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${company.email}`} className="link-underline">
                  Email the founders
                </a>
              </li>
              <li>{company.hq}</li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="mono">Launch event</h3>
            <ul>
              <li>{launchEvent.date}</li>
              <li>{launchEvent.venue}</li>
              <li>{launchEvent.city}</li>
            </ul>
          </div>
        </div>
        <div className="footer__giant" aria-hidden="true">
          {'ALBATROSS'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <div className="footer__bottom mono">
          <span>
            © {company.founded} {company.name}. All rights reserved.
          </span>
          <span>Est. {company.founded} · {company.hqShort}</span>
        </div>
      </div>
    </footer>
  )
}
