import { useId } from 'react'

const A_PATH = 'M32 2 L60 60 L48.5 60 L32 25.5 L15.5 60 L4 60 Z'
const WING_PATH = 'M0 45 L32 35 L64 45 L64 49.5 L32 39.5 L0 49.5 Z'

/** The Albatross "A": a nose-cone apex crossed by a deployed-wing chevron. */
export function Mark({ size = 28, className = '', mono = false, title }) {
  const id = useId()
  return (
    <svg
      className={`mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="#fff" />
          <path d={WING_PATH} fill="#000" stroke="#000" strokeWidth="3.2" />
        </mask>
      </defs>
      <path className="mark__a" d={A_PATH} fill="currentColor" mask={`url(#${id})`} />
      <path className="mark__wing" d={WING_PATH} fill={mono ? 'currentColor' : 'var(--cobalt)'} />
    </svg>
  )
}

export function Logo({ size = 26 }) {
  return (
    <span className="logo">
      <Mark size={size} />
      <span className="logo__word">
        Albatross<span className="logo__sub">Defense</span>
      </span>
    </span>
  )
}
