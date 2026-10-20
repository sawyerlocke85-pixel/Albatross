import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { lockScroll, scrollToId, unlockScroll } from '../lib/scroll'
import { company, nav } from '../content'
import { Logo } from './Logo'

export default function Nav({ ready }) {
  const root = useRef(null)
  const menu = useRef(null)
  const [active, setActive] = useState('company')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const menuTl = useRef(null)

  // section tracking + "scrolled" background
  useGSAP(() => {
    const triggers = nav.concat({ id: 'contact' }).map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 45%',
        end: 'bottom 45%',
        refreshPriority: -1,
        onToggle: (self) => self.isActive && setActive(id),
      }),
    )
    // contact + footer are always dark, whatever the page theme is
    triggers.push(
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 40px',
        end: 'max',
        refreshPriority: -1,
        onToggle: (self) => setOnDark(self.isActive),
      }),
    )
    triggers.push(
      ScrollTrigger.create({
        start: 40,
        end: 'max',
        refreshPriority: -1,
        onToggle: (self) => setScrolled(self.isActive),
      }),
    )
  })

  // entrance after the intro
  useGSAP(
    () => {
      if (!ready) {
        gsap.set(root.current, { yPercent: -100, autoAlpha: 0 })
        return
      }
      gsap.to(root.current, { yPercent: 0, autoAlpha: 1, duration: 1, delay: 0.5, ease: 'expo.out' })
    },
    { dependencies: [ready] },
  )

  // mobile menu
  useGSAP(
    () => {
      const q = gsap.utils.selector(menu)
      menuTl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8 })
        .from(q('.menu__link'), { yPercent: 110, duration: 0.8, stagger: 0.05, ease: 'expo.out' }, 0.35)
        .from(q('.menu__foot'), { autoAlpha: 0, y: 12, duration: 0.5, ease: 'power2.out' }, 0.6)
    },
    { scope: menu },
  )

  const prevOpen = useRef(open)
  useEffect(() => {
    const tl = menuTl.current
    if (prevOpen.current === open || !tl) return
    prevOpen.current = open
    if (open) {
      lockScroll()
      tl.timeScale(1).play()
    } else {
      unlockScroll()
      tl.timeScale(1.6).reverse()
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    // let the menu start closing before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header ref={root} className={`nav ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'is-open' : ''} ${onDark || open ? 'nav--dark' : ''}`}>
        <div className="container nav__inner">
          <a href="#company" onClick={go('company')} aria-label="Albatross Defense — home">
            <Logo />
          </a>
          <nav aria-label="Primary">
            <ul className="nav__links">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className={`nav__link ${active === id ? 'is-active' : ''}`} aria-current={active === id ? 'true' : undefined}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__right">
            <a href="#contact" onClick={go('contact')} className="btn nav__cta">
              Contact <span className="btn__arrow">→</span>
            </a>
            <button className="nav__menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
              {open ? 'Close' : 'Menu'}
              <span className="nav__burger" />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={menu} className="menu" aria-hidden={!open}>
        <ul className="menu__list">
          {nav.concat({ id: 'contact', label: 'Contact' }).map(({ id, label }, i) => (
            <li key={id} className="menu__item">
              <a href={`#${id}`} onClick={go(id)} className="menu__link" tabIndex={open ? 0 : -1}>
                {label}
                <span className="mono">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="menu__foot mono">
          <span>{company.hq}</span>
          <a href={`mailto:${company.email}`} tabIndex={open ? 0 : -1}>
            {company.email}
          </a>
        </div>
      </div>
    </>
  )
}
