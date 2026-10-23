import { useId } from 'react'

const A_PATH = 'M32 2 L60 60 L48.5 60 L32 25.5 L15.5 60 L4 60 Z'
const WING_PATH = 'M0 45 L32 35 L64 45 L64 49.5 L32 39.5 L0 49.5 Z'

/** The Albatross "A": a nose-cone apex crossed by a deployed-wing chevron. */
export function Mark({ size = 24 }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="#fff" />
          <path d={WING_PATH} fill="#000" stroke="#000" strokeWidth="3.2" />
        </mask>
      </defs>
      <path d={A_PATH} fill="var(--ink)" mask={`url(#${id})`} />
      <path d={WING_PATH} fill="var(--accent)" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="logo">
      <Mark />
      Albatross Defense
    </span>
  )
}
