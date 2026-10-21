/**
 * Zephyr Z1 — top-down schematic, redrawn from the real airframe photos.
 * Local coords: fuselage on the x-axis, nose +x, tail -x, centre (0,0).
 * Wings drawn DEPLOYED, roots at pivot (10,0): z-wing-u = -y, z-wing-l = +y.
 * Booster = grey rectangle hidden inside the aft tube (slides out at ejection).
 * Intake covers are the two grey square pads on the fins near the base
 * (z-cover-a on -y, z-cover-b on +y). Fans sit underneath them.
 * Ambient CSS animation only touches inner/wrapper nodes, never the
 * transforms/opacity the scroll timeline drives.
 */

const FUSE =
  "M-248 -25 L128 -25 C176 -25 224 -16 235 -3 Q237 0 235 3 C224 16 176 25 128 25 L-248 25 Q-252 25 -252 21 L-252 -21 Q-252 -25 -248 -25 Z";
const NOSE =
  "M128 -25 C176 -25 224 -16 235 -3 Q237 0 235 3 C224 16 176 25 128 25 Z";
const wingShape = (s) =>
  `M-14 0 V${s * 155} Q-14 ${s * 160} -9 ${s * 160} H29 Q34 ${s * 160} 34 ${s * 155} V0 Z`;

function Wing({ s }) {
  const k = s < 0 ? "u" : "l";
  const Y = (v) => s * v;
  return (
    <g className={`z-wing-${k}`}>
      <path d={wingShape(s)} fill="url(#z-g-wing)" />
      {/* aileron / flap near the trailing edge, outer half */}
      <rect x="-14" y={s < 0 ? -147 : 99.5} width="12" height="47.5" fill="#868990" stroke="#55585d" strokeWidth=".8" />
      {/* inboard / outboard split */}
      <path d={`M-14 ${Y(88)} H34`} stroke="#000" strokeOpacity=".4" />
      <path d={`M-14 ${Y(89.2)} H34`} stroke="#fff" strokeOpacity=".12" />
      <circle cx="14" cy={Y(83)} r="1.2" fill="#2b2d31" />
      <circle cx="8" cy={Y(83)} r="1.2" fill="#2b2d31" />
      <circle cx="30" cy={Y(154)} r="1.4" fill="#c9ced6" />
      <circle cx="-10" cy={Y(154)} r="1.4" fill="#c9ced6" />
      <path d={`M34 0 V${Y(155)}`} stroke="#fff" strokeOpacity=".22" />
      <path d={`M-14 0 V${Y(155)}`} stroke="#000" strokeOpacity=".3" />
      {/* nav light */}
      <circle className="z-blink" cx="30" cy={Y(157)} r="5" fill={s < 0 ? "#ff4d4d" : "#3dff8a"} opacity=".28" />
      <circle className="z-blink" cx="30" cy={Y(157)} r="2.2" fill={s < 0 ? "#ff6b6b" : "#6dffa6"} />
      {/* light sweep, clipped to the wing */}
      <g clipPath={`url(#z-clip-w${k})`}>
        <rect className={`z-sweep-${k}`} x="-14" y="-14" width="48" height="28" fill="url(#z-g-sweepv)" opacity="0" />
      </g>
    </g>
  );
}

function Rotor({ cx, cy }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="z-rotor">
        <circle className="z-blur" r="9" fill="url(#z-g-blur)" />
        <g className="z-spin">
          <circle r="8" fill="none" />
          <use href="#z-blades" />
        </g>
        <g className="z-spin-ghost">
          <circle r="8" fill="none" />
          <use href="#z-blades" opacity=".28" />
        </g>
        <circle r="2.6" fill="#2a2e38" stroke="#8ea4ff" strokeOpacity=".6" strokeWidth=".6" />
      </g>
    </g>
  );
}

function Cover({ cls, y }) {
  return (
    <g className={cls}>
      <rect x="-142" y={y} width="22" height="22" rx="2" fill="url(#z-g-cover)" stroke="#7d8085" strokeWidth=".8" />
      <rect x="-139.5" y={y + 2.5} width="17" height="17" rx="1" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth=".6" />
      <path d={`M-142 ${y + 11} H-120`} stroke="#000" strokeOpacity=".16" strokeWidth=".6" />
      <circle cx="-139" cy={y + 3} r="1" fill="#5d6065" />
      <circle cx="-123" cy={y + 19} r="1" fill="#5d6065" />
    </g>
  );
}

export default function ZephyrSVG() {
  return (
    <svg viewBox="-400 -400 800 800" aria-hidden="true">
      <style>{CSS}</style>
      <defs>
        <linearGradient id="z-g-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b5ca8" />
          <stop offset=".28" stopColor="#52a0f2" />
          <stop offset=".55" stopColor="#2f7fd6" />
          <stop offset="1" stopColor="#164a8f" />
        </linearGradient>
        <linearGradient id="z-g-gray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#75777c" />
          <stop offset=".3" stopColor="#bcbec1" />
          <stop offset=".55" stopColor="#a3a5a9" />
          <stop offset="1" stopColor="#6b6d72" />
        </linearGradient>
        <linearGradient id="z-g-collar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a9c9e" />
          <stop offset=".3" stopColor="#e0e1e0" />
          <stop offset=".6" stopColor="#c4c6c6" />
          <stop offset="1" stopColor="#8d8f91" />
        </linearGradient>
        <linearGradient id="z-g-fin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9abae" />
          <stop offset="1" stopColor="#8f9195" />
        </linearGradient>
        <linearGradient id="z-g-wing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5f6268" />
          <stop offset=".45" stopColor="#7d8086" />
          <stop offset="1" stopColor="#6a6d73" />
        </linearGradient>
        <linearGradient id="z-g-cover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c3c5c8" />
          <stop offset="1" stopColor="#9a9c9f" />
        </linearGradient>
        <linearGradient id="z-g-bgray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a8c90" />
          <stop offset=".3" stopColor="#b3b5b8" />
          <stop offset="1" stopColor="#6e7075" />
        </linearGradient>
        <linearGradient id="z-g-flame" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".25" stopColor="#c9d4ff" />
          <stop offset=".6" stopColor="#3b63ff" stopOpacity=".75" />
          <stop offset="1" stopColor="#3b63ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="z-glow">
          <stop offset="0" stopColor="#8ea4ff" stopOpacity=".7" />
          <stop offset="1" stopColor="#3b63ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="z-g-duct">
          <stop offset="0" stopColor="#1b1f29" />
          <stop offset="1" stopColor="#050608" />
        </radialGradient>
        <radialGradient id="z-g-blur">
          <stop offset="0" stopColor="#c9d4ff" stopOpacity="0" />
          <stop offset=".6" stopColor="#c9d4ff" stopOpacity=".28" />
          <stop offset="1" stopColor="#c9d4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="z-g-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="z-g-sweepv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="z-clip-fuse"><path d={FUSE} /></clipPath>
        <clipPath id="z-clip-wu"><path d={wingShape(-1)} /></clipPath>
        <clipPath id="z-clip-wl"><path d={wingShape(1)} /></clipPath>
        <g id="z-blades">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d="M0 0 L2.2 -7.6 Q5.6 -5.6 5.2 -1.6 Z" fill="#8793b0" opacity=".92" transform={`rotate(${40 * i})`} />
          ))}
        </g>
      </defs>

      <g className="z-float">
        {/* cruise exhaust shimmer */}
        <g className="z-exhaust" opacity="0" stroke="#8ea4ff" strokeLinecap="round">
          <ellipse className="z-glow-pulse" cx="-262" cy="0" rx="26" ry="20" fill="url(#z-glow)" stroke="none" />
          <path className="z-shimmer" d="M-258 -7 H-345" strokeWidth="2" strokeOpacity=".5" style={{ animationDuration: ".8s" }} />
          <path className="z-shimmer" d="M-258 0 H-385" strokeWidth="2.5" strokeOpacity=".7" style={{ animationDuration: ".6s", animationDelay: "-.2s" }} />
          <path className="z-shimmer" d="M-258 7 H-335" strokeWidth="2" strokeOpacity=".5" style={{ animationDuration: "1s", animationDelay: "-.5s" }} />
          {[-9, 0, 8].map((y, i) => (
            <circle key={i} className="z-spark" cx="-270" cy={y} r="1.6" fill="#c9d4ff" stroke="none" opacity="0" style={{ animationDelay: `${-0.45 * i}s` }} />
          ))}
        </g>

        {/* booster — grey rectangle stowed INSIDE the fuselage (drawn behind it);
            only ~20 units poke out past the tail. Timeline slides it out (-x). */}
        <g className="z-booster">
          <g className="z-flame">
            <ellipse className="z-glow-pulse" cx="-312" cy="0" rx="90" ry="46" fill="url(#z-glow)" />
            <g className="z-flame-core">
              <g className="z-jit">
                <path d="M-272 -13 C-312 -22 -367 -10 -447 0 C-367 10 -312 22 -272 13 Z" fill="url(#z-g-flame)" />
                <path d="M-272 -6 C-294 -8 -324 -4 -362 0 C-324 4 -294 8 -272 6 Z" fill="#fff" opacity=".92" />
              </g>
            </g>
          </g>
          <path d="M-266 -11 L-272 -14 L-272 14 L-266 11 Z" fill="#101216" />
          <rect x="-266" y="-19" width="90" height="38" rx="2" fill="url(#z-g-bgray)" stroke="#6b6d72" strokeWidth=".8" />
          <path d="M-258 -19 V19 M-212 -19 V19" stroke="#000" strokeOpacity=".25" />
          <path d="M-266 -12 H-176" stroke="#fff" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* ejection charge — vents from the SIDES of the tail (group, opacity 0 until the timeline fires it) */}
        <g className="z-puff" opacity="0">
          {[-1, 1].map((s) => (
            <g key={s} fill="#c9d4ff" stroke="#c9d4ff">
              <circle className="z-puff-c" cx="-244" cy={s * 31} r="6" fillOpacity=".35" strokeOpacity=".7" strokeWidth="1.5" />
              <circle className="z-puff-c" cx="-256" cy={s * 37} r="4.5" fillOpacity=".3" strokeOpacity=".6" strokeWidth="1.2" style={{ animationDelay: "-.3s" }} />
              <circle className="z-puff-c" cx="-234" cy={s * 38} r="3.5" fillOpacity=".25" strokeOpacity=".5" strokeWidth="1" style={{ animationDelay: "-.6s" }} />
              <path d={`M-246 ${s * 27} L-252 ${s * 46} M-240 ${s * 27} L-236 ${s * 48}`} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".6" />
            </g>
          ))}
        </g>

        {/* wings (deployed, roots at pivot 10,0) — under the fuselage */}
        <Wing s={-1} />
        <Wing s={1} />

        {/* tail fins (grey section) */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M-76 ${s * 22} L-114 ${s * 66} L-169 ${s * 66} L-169 ${s * 22} Z`} fill="url(#z-g-fin)" />
            <path d={`M-76 ${s * 22} L-114 ${s * 66}`} stroke="#fff" strokeOpacity=".28" />
            <rect x="-172" y={s < 0 ? -68 : 22} width="5" height="46" fill="#b9bbbe" />
          </g>
        ))}

        {/* fuselage: grey aft tube, light collar, blue tube + nose */}
        <rect x="-252" y="-25" width="176" height="50" rx="3" fill="url(#z-g-gray)" />
        <rect x="-251" y="-25" width="4" height="50" fill="#0b0d12" opacity=".55" />
        <rect x="-76" y="-25" width="35" height="50" fill="url(#z-g-collar)" />
        <rect x="-76" y="-25" width="35" height="8" fill="#2f7fd6" />
        <rect x="-76" y="17" width="35" height="8" fill="#2f7fd6" />
        <rect x="-41" y="-25" width="169" height="50" fill="url(#z-g-blue)" />
        <path d={NOSE} fill="url(#z-g-blue)" />
        <path d="M-46 -25 L-62 14 L-71 13 L-58 -25 Z" fill="#1d3f9d" opacity=".92" />
        {/* guide rod along the aft tube */}
        <path d="M-74 0 H-252" stroke="#8e9094" strokeWidth="4.2" />
        <path d="M-74 0 H-252" stroke="#d8d9db" strokeWidth="2.2" />
        <path d="M-71 0 L-82 -6 L-82 6 Z" fill="#c7c9cc" />
        {/* servo window recess */}
        <rect x="-110" y="-20" width="19" height="8" rx="1" fill="#6a6c71" stroke="#4e5156" strokeWidth=".6" />
        {/* seams, screws, highlights */}
        <path d="M36 -25 V25 M-14 -25 V25 M-41 -25 V25 M-76 -25 V25" stroke="#000" strokeOpacity=".22" />
        <path d="M128 -25 V25" stroke="#000" strokeOpacity=".35" />
        {[-18, -9, 0, 9, 18].map((y) => (<circle key={y} cx="124" cy={y} r="1" fill="#cfd6e0" />))}
        {[36, -14].flatMap((x) => [-22, 22].map((y) => (<circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#c9ced6" />)))}
        {[-72].flatMap((x) => [-21, 21].map((y) => (<circle key={y} cx={x} cy={y} r="1.5" fill="#c9ced6" />)))}
        <path d="M90 -25 h5 v-2 h-5 z M72 -25 h5 v-2 h-5 z M54 -25 h5 v-2 h-5 z M-30 -25 h5 v-2 h-5 z M90 25 h5 v2 h-5 z M72 25 h5 v2 h-5 z M54 25 h5 v2 h-5 z M-30 25 h5 v2 h-5 z" fill="#2f7fd6" />
        <path d="M-38 -12 H122" stroke="#fff" strokeOpacity=".22" strokeWidth="3" strokeLinecap="round" />
        <path d="M140 -15 C170 -17 205 -11 226 -5" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M-250 -12 H-80" stroke="#fff" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
        <text x="120" y="3" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="1.5" fill="#fff" stroke="none" opacity=".6">ALBATROSS · Z1</text>
        <circle cx="10" cy="0" r="3.4" fill="#aeb6c6" stroke="#6a7285" strokeWidth=".6" />
        {/* accent stripes */}
        <path className="z-pulse" d="M131 -23 V23" stroke="#9bbcff" strokeWidth="2.2" />
        <path className="z-pulse" d="M-43 -16 V16" stroke="#9bbcff" strokeWidth="2.2" style={{ animationDelay: "-1.6s" }} />
        {/* tail strobe */}
        <circle className="z-strobe" cx="-230" cy="0" r="6" fill="#fff" opacity=".7" />
        <circle className="z-strobe" cx="-230" cy="0" r="2" fill="#fff" opacity=".7" />
        {/* fuselage light sweep */}
        <g clipPath="url(#z-clip-fuse)">
          <rect className="z-sweep" x="0" y="-30" width="40" height="60" fill="url(#z-g-sweep)" opacity="0" />
        </g>

        {/* EDF intakes — one under each square cover */}
        <g className="z-intake">
          <rect x="-141" y="-47" width="20" height="20" rx="1.5" fill="url(#z-g-duct)" stroke="#4d5056" strokeWidth=".8" />
          <rect x="-141" y="27" width="20" height="20" rx="1.5" fill="url(#z-g-duct)" stroke="#4d5056" strokeWidth=".8" />
          <Rotor cx={-131} cy={-37} />
          <Rotor cx={-131} cy={37} />
        </g>
        <Cover cls="z-cover-a" y={-48} />
        <Cover cls="z-cover-b" y={26} />
      </g>

      {/* cruise callouts */}
      <g className="z-callouts" fill="none" stroke="#8ea4ff" strokeWidth="1.5">
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M58 -160 V-30 M58 30 V160 M51 -160 H65 M51 160 H65" />
          <text className="z-label" x="74" y="-144" {...L}>WINGSPAN</text>
          <text className="z-value" x="74" y="-122" {...V}>700 MM</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M-143 -53 L-170 -120 H-300" />
          <rect className="z-pulse" x="-147" y="-53" width="32" height="32" rx="3" strokeDasharray="4 4" />
          <text className="z-label" x="-300" y="-152" {...L}>PROPULSION</text>
          <text className="z-value" x="-300" y="-130" {...V}>90 MM EDF</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M80 14 L118 104 H290" />
          <circle cx="80" cy="14" r="2.5" fill="#8ea4ff" stroke="none" />
          <text className="z-label" x="130" y="132" {...L}>6S BATTERY</text>
          <text className="z-value" x="130" y="154" {...V}>~25 MIN</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M246 0 H336 M324 -8 L336 0 L324 8" />
          <text className="z-label" x="246" y="-16" {...L}>CRUISE</text>
          <text className="z-value" x="246" y="34" {...V}>80 MPH</text>
        </g>
      </g>
    </svg>
  );
}

/* attribute-level defaults so your own CSS for .z-label/.z-value still wins */
const L = { fontFamily: "IBM Plex Mono, monospace", fontSize: 10, letterSpacing: 2, fill: "#8ea4ff", stroke: "none" };
const V = { fontFamily: "IBM Plex Mono, monospace", fontSize: 15, fontWeight: 600, fill: "#fff", stroke: "none" };

/* ───────── AMBIENT ANIMATION (tune the numbers here) ───────── */
const CSS = `
/* idle float */
.z-float{animation:z-float 7s ease-in-out infinite}
@keyframes z-float{0%,100%{transform:translate(0,0)}50%{transform:translate(1.5px,-3px)}}

/* EDF rotors: spin + counter-rotating ghost + blur disc */
.z-spin,.z-spin-ghost{transform-box:fill-box;transform-origin:center}
.z-spin{animation:z-spin .55s linear infinite}
.z-spin-ghost{animation:z-spin-r .21s linear infinite}
@keyframes z-spin{to{transform:rotate(360deg)}}
@keyframes z-spin-r{to{transform:rotate(-360deg)}}
.z-blur{animation:z-soft 1.6s ease-in-out infinite}
@keyframes z-soft{0%,100%{opacity:.6}50%{opacity:1}}

/* flame flicker + glow pulse */
.z-jit{transform-box:fill-box;transform-origin:100% 50%;animation:z-flicker .22s ease-in-out infinite}
@keyframes z-flicker{
 0%{transform:scale(1,1);opacity:.95}
 20%{transform:scale(.92,1.08);opacity:1}
 40%{transform:scale(1.06,.9);opacity:.88}
 60%{transform:scale(.96,1.05);opacity:1}
 80%{transform:scale(1.04,.95);opacity:.9}
 100%{transform:scale(1,1);opacity:.95}}
.z-glow-pulse{transform-box:fill-box;transform-origin:center;animation:z-glow 1.4s ease-in-out infinite}
@keyframes z-glow{0%,100%{opacity:.65;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}

/* ejection-charge puffs (only visible when the timeline shows z-puff) */
.z-puff-c{transform-box:fill-box;transform-origin:center;animation:z-puffc 1s ease-in-out infinite}
@keyframes z-puffc{0%,100%{transform:scale(.9)}50%{transform:scale(1.12)}}

/* exhaust shimmer + sparks */
.z-shimmer{transform-box:fill-box;transform-origin:100% 50%;animation:z-shim .8s ease-in-out infinite}
@keyframes z-shim{0%,100%{transform:scaleX(.85);opacity:.45}50%{transform:scaleX(1.08);opacity:1}}
.z-spark{animation:z-spark 1.4s linear infinite}
@keyframes z-spark{0%{transform:translateX(0);opacity:.9}100%{transform:translateX(-80px);opacity:0}}

/* accent stripes, nav lights, strobe */
.z-pulse{animation:z-pulse 3.2s ease-in-out infinite}
@keyframes z-pulse{0%,100%{opacity:.5}50%{opacity:1}}
.z-blink{animation:z-blink 1.6s steps(1,end) infinite}
@keyframes z-blink{0%{opacity:1}12%{opacity:.15}50%{opacity:1}62%{opacity:.15}100%{opacity:1}}
.z-strobe{animation:z-strobe 2.4s linear infinite}
@keyframes z-strobe{0%{opacity:0}2%{opacity:1}6%{opacity:0}12%{opacity:1}16%{opacity:0}100%{opacity:0}}

/* light sweep across fuselage and wings */
.z-sweep{animation:z-sweep 8s ease-in-out infinite}
@keyframes z-sweep{0%{transform:translateX(-300px) skewX(-18deg);opacity:1}60%,100%{transform:translateX(300px) skewX(-18deg);opacity:1}}
.z-sweep-u{animation:z-sweep-u 8s ease-in-out infinite}
.z-sweep-l{animation:z-sweep-l 8s ease-in-out infinite}
@keyframes z-sweep-u{0%{transform:translateY(0);opacity:0}10%{opacity:1}60%{transform:translateY(-165px);opacity:1}70%,100%{transform:translateY(-165px);opacity:0}}
@keyframes z-sweep-l{0%{transform:translateY(0);opacity:0}10%{opacity:1}60%{transform:translateY(165px);opacity:1}70%,100%{transform:translateY(165px);opacity:0}}

/* ── CALLOUT LOOPS — delete this block if your timeline already draws z-draw / fades z-label / z-value ── */
.z-draw{animation:z-draw 14s ease-in-out infinite}
@keyframes z-draw{0%{stroke-dasharray:1;stroke-dashoffset:1}10%,88%{stroke-dasharray:1;stroke-dashoffset:0}100%{stroke-dasharray:1;stroke-dashoffset:-1}}
.z-label,.z-value{animation:z-type 14s ease-out infinite backwards;animation-delay:.5s}
.z-value{animation-delay:.8s}
@keyframes z-type{0%{opacity:0;transform:translateX(-6px)}8%{opacity:1;transform:translateX(0)}88%{opacity:1}100%{opacity:0}}

@media (prefers-reduced-motion: reduce){
 .z-float,.z-puff-c,.z-jit,.z-glow-pulse,.z-shimmer,.z-spark,.z-pulse,.z-blink,.z-strobe,.z-sweep,.z-sweep-u,.z-sweep-l,.z-spin-ghost,.z-blur,.z-draw,.z-label,.z-value{animation:none!important}
 .z-spin{animation-duration:9s!important}
}
`;