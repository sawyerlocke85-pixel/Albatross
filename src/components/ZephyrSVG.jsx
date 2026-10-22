/**
 * Zephyr Z1 — top-down drawing, geometry from the real airframe
 * (gray aft tube with tail fins, light collar, blue body tube + nose).
 * Local coordinates: fuselage on the x-axis, nose at +x, centre (0,0).
 * Wings are drawn deployed with roots at the pivot (10,0); the 2 square
 * intake covers sit on the fins near the base, each over a 90 mm fan.
 *
 * FlightSequence animates the class-named groups. Pass `frame` for a still:
 *   frame="launch"  standing on its booster, wings stowed (drawn nose-up)
 *   frame="cruise"  booster gone, intakes open, wings deployed
 */
const C = {
  ink: '#14171a',
  blue: '#6c9fbd', // body tube + nose cone
  aft: '#8b9198', // aft tube
  collar: '#c4c8cc',
  fin: '#a3a8ad',
  wing: '#6b7177',
  cover: '#c4c8cc',
  booster: '#4a5057',
  flame: '#ddd6c4',
  flameCore: '#faf8ef',
}
const LINE = { stroke: C.ink, strokeWidth: 1.5, strokeLinejoin: 'round' }

const NOSE = 'M128 -25 C176 -25 224 -16 235 -3 Q237 0 235 3 C224 16 176 25 128 25 Z'
const wingPath = (s) => `M-14 0 V${s * 155} Q-14 ${s * 160} -9 ${s * 160} H29 Q34 ${s * 160} 34 ${s * 155} V0 Z`

function Wing({ s, transform }) {
  return (
    <g className={`z-wing-${s < 0 ? 'u' : 'l'}`} transform={transform}>
      <path d={wingPath(s)} fill={C.wing} {...LINE} />
      {/* aileron on the outer trailing edge */}
      <rect x="-14" y={s < 0 ? -147 : 99.5} width="12" height="47.5" fill="none" stroke={C.ink} strokeWidth="1" />
    </g>
  )
}

function Rotor({ cx, cy }) {
  return (
    <g className="z-rotor">
      <circle cx={cx} cy={cy} r="8" fill="none" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${cx} ${cy} l2.2 -7.6 q3.4 2 3 6 Z`} fill={C.collar} transform={`rotate(${40 * i} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r="2.4" fill={C.aft} />
    </g>
  )
}

export default function ZephyrSVG({ frame, title }) {
  const cruise = frame === 'cruise'
  const still = Boolean(frame)
  const stowed = still && !cruise
  // Still frames get a tight crop; "launch" is rotated to stand nose-up.
  const viewBox = cruise ? '-275 -178 530 356' : stowed ? '-92 -255 184 545' : '-400 -400 800 800'

  return (
    <svg viewBox={viewBox} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g transform={stowed ? 'rotate(-90)' : undefined}>
        {/* fan exhaust, shown in cruise by the timeline */}
        {!still && (
          <g className="z-exhaust" opacity="0" stroke={C.aft} strokeWidth="2" strokeLinecap="round">
            <path d="M-262 -7 H-340" />
            <path d="M-262 0 H-375" />
            <path d="M-262 7 H-330" />
          </g>
        )}

        {/* booster, stowed inside the aft tube; the timeline slides it out the tail */}
        {!cruise && (
          <g className="z-booster">
            {!still && (
              <g className="z-flame">
                <g className="z-flame-core">
                  <path d="M-272 -13 C-312 -21 -367 -9 -440 0 C-367 9 -312 21 -272 13 Z" fill={C.flame} />
                  <path d="M-272 -6 C-294 -8 -324 -4 -360 0 C-324 4 -294 8 -272 6 Z" fill={C.flameCore} />
                </g>
              </g>
            )}
            <path d="M-266 -11 L-272 -14 L-272 14 L-266 11 Z" fill={C.ink} />
            <rect x="-266" y="-19" width="90" height="38" fill={C.booster} {...LINE} />
          </g>
        )}
        {!still && (
          <g className="z-puff" opacity="0" fill="none" stroke={C.ink} strokeWidth="1.5">
            <circle cx="-244" cy="-33" r="7" />
            <circle cx="-244" cy="33" r="7" />
          </g>
        )}

        {/* wings — under the fuselage so they hide there when stowed */}
        <Wing s={-1} transform={stowed ? 'rotate(-90 10 0)' : undefined} />
        <Wing s={1} transform={stowed ? 'rotate(90 10 0)' : undefined} />

        {/* tail fins on the aft section */}
        <path d="M-76 -22 L-114 -66 L-169 -66 L-169 -22 Z" fill={C.fin} {...LINE} />
        <path d="M-76 22 L-114 66 L-169 66 L-169 22 Z" fill={C.fin} {...LINE} />

        {/* fuselage: gray aft tube, light collar, blue body tube and nose */}
        <rect x="-252" y="-25" width="176" height="50" fill={C.aft} {...LINE} />
        <path d="M-74 0 H-250" stroke={C.collar} strokeWidth="2" />
        <rect x="-76" y="-25" width="35" height="50" fill={C.collar} {...LINE} />
        <rect x="-41" y="-25" width="169" height="50" fill={C.blue} {...LINE} />
        <path d={NOSE} fill={C.blue} {...LINE} />

        {/* 90 mm intakes on the fins, under 2 square covers */}
        <g className="z-intake">
          <rect x="-141" y="-47" width="20" height="20" fill={C.ink} />
          <rect x="-141" y="27" width="20" height="20" fill={C.ink} />
          <Rotor cx={-131} cy={-37} />
          <Rotor cx={-131} cy={37} />
        </g>
        {!cruise && (
          <>
            <rect className="z-cover-a" x="-142" y="-48" width="22" height="22" fill={C.cover} {...LINE} />
            <rect className="z-cover-b" x="-142" y="26" width="22" height="22" fill={C.cover} {...LINE} />
          </>
        )}
      </g>
    </svg>
  )
}
