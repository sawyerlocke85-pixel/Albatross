import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router'
import { nav } from '../content'
import { Logo } from './Logo'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // close the mobile menu after navigating
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link to="/" className="header__home" aria-label="Albatross Defense home">
          <Logo />
        </Link>
        <button
          type="button"
          className="menu-btn label"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="primary-nav" className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul className="nav">
            {nav.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className="nav__link label">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
