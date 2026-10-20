/**
 * Zephyr Z1 — schematic planform (top-down) drawing.
 * Local coordinates: fuselage along the x-axis, nose at +x, centre at (0,0).
 * Wings pivot at (10,0); the Platform timeline rotates them from stowed
 * (along the fuselage, hidden underneath) to deployed (perpendicular).
 * Swap this for real renders later if desired — class names are the hooks.
 */
export default function ZephyrSVG() {
  return (
    <svg viewBox="-400 -400 800 800" aria-hidden="true">
      <defs>
        <linearGradient id="z-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f4ee" />
          <stop offset="0.45" stopColor="#dedbd3" />
          <stop offset="1" stopColor="#9d9a93" />
        </linearGradient>
        <linearGradient id="z-wing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9c6be" />
          <stop offset="0.5" stopColor="#ecE9e2" />
          <stop offset="1" stopColor="#b8b5ad" />
        </linearGradient>
        <linearGradient id="z-booster" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4f59" />
          <stop offset="0.5" stopColor="#2c3038" />
          <stop offset="1" stopColor="#15171c" />
        </linearGradient>
        <linearGradient id="z-flame" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#c9d4ff" />
          <stop offset="0.6" stopColor="#3b63ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#3b63ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="z-glow">
          <stop offset="0" stopColor="#8ea4ff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#3b63ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="z-duct">
          <stop offset="0" stopColor="#1b1f29" />
          <stop offset="1" stopColor="#050608" />
        </radialGradient>
      </defs>

      {/* cruise exhaust shimmer */}
      <g className="z-exhaust" opacity="0" stroke="#8ea4ff" strokeLinecap="round">
        <path d="M-210 -6 H-330" strokeWidth="2" strokeOpacity=".5" />
        <path d="M-210 0 H-380" strokeWidth="2.5" strokeOpacity=".7" />
        <path d="M-210 6 H-320" strokeWidth="2" strokeOpacity=".5" />
      </g>

      {/* booster */}
      <g className="z-booster">
        <g className="z-flame">
          <ellipse cx="-380" cy="0" rx="90" ry="54" fill="url(#z-glow)" />
          <g className="z-flame-core">
            <path d="M-346 -15 C-385 -24 -440 -10 -520 0 C-440 10 -385 24 -346 15 Z" fill="url(#z-flame)" />
            <path d="M-346 -7 C-368 -9 -398 -4 -436 0 C-398 4 -368 9 -346 7 Z" fill="#fff" opacity=".92" />
          </g>
        </g>
        <path d="M-330 -12 L-347 -17 L-347 17 L-330 12 Z" fill="#101216" />
        <path d="M-298 -19 L-334 -52 L-345 -52 L-332 -19 Z" fill="#23262d" />
        <path d="M-298 19 L-334 52 L-345 52 L-332 19 Z" fill="#23262d" />
        <rect x="-333" y="-19" width="120" height="38" rx="3" fill="url(#z-booster)" />
        <rect x="-268" y="-19" width="5" height="38" fill="#3b63ff" />
        <rect x="-215" y="-21" width="13" height="42" rx="2" fill="#1b1e24" />
        <path d="M-320 -19 V19 M-240 -19 V19" stroke="#000" strokeOpacity=".35" />
      </g>
      <circle className="z-puff" cx="-208" cy="0" r="22" fill="none" stroke="#c9d4ff" strokeWidth="3" opacity="0" />

      {/* wings — drawn deployed; rotated to stowed by the timeline */}
      <g className="z-wing-u">
        <path d="M27 -18 L23 -186 Q22 -193 15 -193 L0 -193 Q-6 -193 -6 -186 L-8 -18 Z" fill="url(#z-wing)" />
        <path d="M23 -186 Q22 -193 15 -193 L0 -193 Q-6 -193 -6 -186 L-6.3 -176 L23.4 -176 Z" fill="#3b63ff" />
        <path d="M9.5 -24 V-170" stroke="#000" strokeOpacity=".12" />
        <path d="M-2 -40 L-3 -120" stroke="#000" strokeOpacity=".22" strokeWidth="1.5" />
      </g>
      <g className="z-wing-l">
        <path d="M27 18 L23 186 Q22 193 15 193 L0 193 Q-6 193 -6 186 L-8 18 Z" fill="url(#z-wing)" />
        <path d="M23 186 Q22 193 15 193 L0 193 Q-6 193 -6 186 L-6.3 176 L23.4 176 Z" fill="#3b63ff" />
        <path d="M9.5 24 V170" stroke="#000" strokeOpacity=".12" />
        <path d="M-2 40 L-3 120" stroke="#000" strokeOpacity=".22" strokeWidth="1.5" />
      </g>

      {/* tail surfaces */}
      <path d="M-146 -20 L-180 -66 L-197 -66 L-194 -20 Z" fill="url(#z-wing)" />
      <path d="M-146 20 L-180 66 L-197 66 L-194 20 Z" fill="url(#z-wing)" />

      {/* fuselage */}
      <path
        d="M206 0 C196 -14 166 -22 120 -22 L-176 -22 C-189 -22 -199 -18 -203 -12 L-203 12 C-199 18 -189 22 -176 22 L120 22 C166 22 196 14 206 0 Z"
        fill="url(#z-body)"
      />
      <path
        d="M120 -22 V22 M40 -22 V22 M-40 -22 V22 M-150 -22 V22"
        stroke="#000"
        strokeOpacity=".14"
      />
      <path d="M-176 0 H150" stroke="#fff" strokeOpacity=".5" />
      <rect x="62" y="-22" width="6" height="44" fill="#3b63ff" />
      <ellipse cx="164" cy="0" rx="15" ry="9" fill="#0b0d12" />
      <ellipse cx="168" cy="-3" rx="5" ry="2.5" fill="#fff" opacity=".55" />
      <text x="-30" y="4" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#000" opacity=".45">
        ALBATROSS · Z1
      </text>
      <circle cx="10" cy="0" r="4" fill="#8b8880" />

      {/* EDF intake + covers */}
      <g className="z-intake">
        <circle cx="-100" cy="0" r="18.5" fill="url(#z-duct)" stroke="#6d6a63" strokeWidth="1.5" />
        <g className="z-rotor">
          <circle cx="-100" cy="0" r="16" fill="none" />
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={i}
              d="M-100 0 L-97 -15 Q-93 -12 -94 -6 Z"
              fill="#7d8aa8"
              opacity=".85"
              transform={`rotate(${(360 / 11) * i} -100 0)`}
            />
          ))}
          <circle cx="-100" cy="0" r="5" fill="#2a2e38" stroke="#8ea4ff" strokeOpacity=".6" />
        </g>
      </g>
      <path className="z-cover-a" d="M-100 -20 A20 20 0 0 0 -100 20 Z" fill="#e3e0d8" stroke="#8b8880" strokeWidth="1" />
      <path className="z-cover-b" d="M-100 -20 A20 20 0 0 1 -100 20 Z" fill="#d2cfc7" stroke="#8b8880" strokeWidth="1" />

      {/* cruise callouts */}
      <g className="z-callouts" fill="none" stroke="#8ea4ff" strokeWidth="1.5">
        <g className="z-callout">
          <path className="z-draw" d="M58 -193 V-34 M58 34 V193 M51 -193 H65 M51 193 H65" />
          <text x="74" y="-176" className="z-label">WINGSPAN</text>
          <text x="74" y="-154" className="z-value">700 MM</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" d="M-108 -16 L-150 -118 H-268" />
          <circle cx="-100" cy="0" r="23" strokeDasharray="4 4" />
          <text x="-268" y="-150" className="z-label">PROPULSION</text>
          <text x="-268" y="-128" className="z-value">90 MM EDF</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" d="M104 18 L138 104 H290" />
          <text x="148" y="132" className="z-label">6S BATTERY</text>
          <text x="148" y="154" className="z-value">~25 MIN</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" d="M228 0 H318 M306 -8 L318 0 L306 8" />
          <text x="228" y="-16" className="z-label">CRUISE</text>
          <text x="228" y="34" className="z-value">80 MPH</text>
        </g>
      </g>
    </svg>
  )
}
