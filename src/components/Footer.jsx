import { Link } from 'react-router'
import { company, nav } from '../content'
import { Logo } from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap grid">
        <div className="footer__brand">
          <Logo />
          <p className="muted">{company.hq}</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <ul className="footer__list">
            {nav.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__contact">
          <ul className="footer__list">
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>
        <p className="footer__legal muted">
          © {company.founded} {company.name}
        </p>
      </div>
    </footer>
  )
}
