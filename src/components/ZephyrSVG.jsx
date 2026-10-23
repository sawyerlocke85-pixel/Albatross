import { useEffect, useRef } from "react";

/**
 * Zephyr Z1 — flat top-down schematic matching the site's two reference renders
 * (ivory page, #6c9fbd body, dark ink outlines).
 * Local coords: fuselage on the x-axis, nose +x, tail -x, centre (0,0). Body Ø60, length ~488.
 *
 * REST STATE = final cruise pose: wings deployed AND slid aft (wrapper .z-slide = translate(-45,0)),
 * panel closed, booster hidden inside the grey base, z-exhaust / z-puff at opacity 0.
 * Wing roots still sit at pivot (10,0) in their own group; .z-slide moves them aft afterwards.
 * Wing swing: z-wing-u rotates 90 -> 0, z-wing-l rotates -90 -> 0 around (10,0)  (stowed = pointing at the nose).
 *
 * <ZephyrSVG demo /> plays a built-in 24 s loop of the whole mission so you can see/tune it
 * (and copy the timings into your own timeline). Without `demo` only the ambient CSS runs.
 */

const INK = "#1c1f22";
const BODY = "#78a0bd";
const FUSE =
  "M-248 -30 L106 -30 C150 -30 205 -20 232 -4 Q237 0 232 4 C205 20 150 30 106 30 L-248 30 Q-252 30 -252 26 L-252 -26 Q-252 -30 -248 -30 Z";
const NOSE = "M106 -30 C150 -30 205 -20 232 -4 Q237 0 232 4 C205 20 150 30 106 30 Z";
const wingShape = (s) =>
  `M-19 0 V${s * 188} Q-19 ${s * 192} -15 ${s * 192} H35 Q39 ${s * 192} 39 ${s * 188} V0 Z`;

const Bolt = ({ x, y, r = 1.6 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#d9dce0" stroke={INK} strokeWidth=".5" />
    <path d={`M${x - r * 0.6} ${y} H${x + r * 0.6}`} stroke={INK} strokeWidth=".45" />
  </g>
);

function Wing({ s }) {
  const k = s < 0 ? "u" : "l";
  const Y = (v) => s * v;
  return (
    <g className={`z-wing-${k}`}>
      <path d={wingShape(s)} fill="#6b7075" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      {/* aileron on the trailing edge, outboard */}
      <rect x="-19" y={s < 0 ? -176 : 119} width="14" height="57" fill="#737880" stroke={INK} strokeWidth="1" />
      <path d={`M-5 ${Y(124)} H3 M-5 ${Y(171)} H3`} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <Bolt x={-12} y={Y(125)} r={1.3} />
      <Bolt x={-12} y={Y(170)} r={1.3} />
      <Bolt x={32} y={Y(184)} r={1.3} />
      <Bolt x={-12} y={Y(184)} r={1.3} />
      <path d={`M39 0 V${Y(188)}`} stroke="#fff" strokeOpacity=".18" />
      {/* nav light */}
      <circle className="z-blink" cx="32" cy={Y(186)} r="5" fill={s < 0 ? "#ff4d4d" : "#2fd66f"} opacity=".28" />
      <circle className="z-blink" cx="32" cy={Y(186)} r="2" fill={s < 0 ? "#ff5a5a" : "#35e07a"} />
      <g clipPath={`url(#z-clip-w${k})`}>
        <rect className={`z-sweep-${k}`} x="-19" y="-14" width="58" height="28" fill="url(#z-g-sweepv)" opacity="0" />
      </g>
    </g>
  );
}

function Cover({ cls, s }) {
  const y0 = s < 0 ? -30 : 0;
  return (
    <g className={cls}>
      <rect x="-138.5" y={y0} width="43" height="30" fill="#5a5a5a" />
      <path d={`M-135.5 0 V${s * 27} H-98.5 V0`} fill="none" stroke="#c9c9c9" strokeWidth="1.8" />
      <path d={`M-138.5 0 V${s * 30} H-95.5 V0`} fill="none" stroke={INK} strokeWidth="1.2" />
      <Bolt x={-132} y={s * 23} />
      <Bolt x={-102} y={s * 23} />
    </g>
  );
}

export default function ZephyrSVG({ demo = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!demo || !ref.current) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    return runDemo(ref.current);
  }, [demo]);

  return (
    <svg ref={ref} viewBox="-400 -400 800 800" aria-hidden="true">
      <style>{CSS}</style>
      <defs>
        <linearGradient id="z-g-flame" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".2" stopColor="#ffc23a" />
          <stop offset=".55" stopColor="#ff6a1a" />
          <stop offset=".85" stopColor="#e0301b" stopOpacity=".7" />
          <stop offset="1" stopColor="#e0301b" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="z-glow">
          <stop offset="0" stopColor="#ff9a3c" stopOpacity=".55" />
          <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="z-g-cool">
          <stop offset="0" stopColor="#6c9fbd" stopOpacity=".5" />
          <stop offset="1" stopColor="#6c9fbd" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="z-g-blur">
          <stop offset="0" stopColor="#dfe8f2" stopOpacity="0" />
          <stop offset=".6" stopColor="#dfe8f2" stopOpacity=".3" />
          <stop offset="1" stopColor="#dfe8f2" stopOpacity="0" />
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
            <path key={i} d="M0 0 L2.4 -13 Q7 -10 6.4 -3 Z" fill="#4a5360" opacity=".95" transform={`rotate(${40 * i})`} />
          ))}
        </g>
      </defs>

      <g className="z-float">
        {/* EDF cruise exhaust shimmer */}
        <g className="z-exhaust" opacity="0" stroke="#6c9fbd" strokeLinecap="round">
          <ellipse className="z-glow-pulse" cx="-262" cy="0" rx="26" ry="22" fill="url(#z-g-cool)" stroke="none" />
          <path className="z-shimmer" d="M-258 -9 H-340" strokeWidth="2" strokeOpacity=".55" style={{ animationDuration: ".8s" }} />
          <path className="z-shimmer" d="M-258 0 H-380" strokeWidth="2.5" strokeOpacity=".75" style={{ animationDuration: ".6s", animationDelay: "-.2s" }} />
          <path className="z-shimmer" d="M-258 9 H-330" strokeWidth="2" strokeOpacity=".55" style={{ animationDuration: "1s", animationDelay: "-.5s" }} />
          {[-10, 0, 9].map((y, i) => (
            <circle key={i} className="z-spark" cx="-270" cy={y} r="1.6" fill="#6c9fbd" stroke="none" opacity="0" style={{ animationDelay: `${-0.45 * i}s` }} />
          ))}
        </g>

        {/* BOOSTER — grey block fully concealed inside the grey base (drawn behind the fuselage).
            Three small flames leave through the tail; at apogee the whole group slides out (-x) and drops away. */}
        <g className="z-booster">
          <g className="z-flame">
            <ellipse className="z-glow-pulse" cx="-290" cy="0" rx="64" ry="34" fill="url(#z-glow)" />
            <g className="z-flame-core">
              {[-14, 0, 14].map((y, i) => (
                <g key={y} className="z-jit" style={{ animationDuration: `${0.2 + i * 0.03}s`, animationDelay: `${-0.07 * i}s` }}>
                  <path d={`M-250 ${y - 5.5} C-282 ${y - 9} -320 ${y - 3} -350 ${y} C-320 ${y + 3} -282 ${y + 9} -250 ${y + 5.5} Z`} fill="url(#z-g-flame)" />
                  <path d={`M-250 ${y - 2.6} C-268 ${y - 4} -290 ${y - 1.5} -310 ${y} C-290 ${y + 1.5} -268 ${y + 4} -250 ${y + 2.6} Z`} fill="#fff6cf" opacity=".92" />
                </g>
              ))}
            </g>
          </g>
          {[-14, 0, 14].map((y) => (
            <path key={y} d={`M-246 ${y - 4} L-252 ${y - 6.5} L-252 ${y + 6.5} L-246 ${y + 4} Z`} fill={INK} />
          ))}
          <rect x="-246" y="-22" width="100" height="44" rx="2" fill="#9ea1a6" stroke={INK} strokeWidth="1.2" />
          <path d="M-236 -22 V22 M-160 -22 V22" stroke={INK} strokeOpacity=".4" />
          <Bolt x={-241} y={-17} r={1.3} />
          <Bolt x={-241} y={17} r={1.3} />
        </g>

        {/* EJECTION CHARGE — vents from the SIDES of the tail */}
        <g className="z-puff" opacity="0">
          {[-1, 1].map((s) => (
            <g key={s} fill="#b9bcc2" stroke={INK} strokeOpacity=".5" strokeWidth=".8">
              <circle className="z-puff-c" cx="-242" cy={s * 36} r="7" fillOpacity=".55" />
              <circle className="z-puff-c" cx="-256" cy={s * 42} r="5" fillOpacity=".45" style={{ animationDelay: "-.3s" }} />
              <circle className="z-puff-c" cx="-228" cy={s * 43} r="4" fillOpacity=".4" style={{ animationDelay: "-.6s" }} />
              <path d={`M-246 ${s * 32} L-254 ${s * 56} M-238 ${s * 32} L-234 ${s * 57}`} fill="none" stroke="#ff7a1f" strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".8" />
            </g>
          ))}
        </g>

        {/* WINGS — deployed at pivot (10,0); .z-slide carries both aft after they swing out */}
        <g className="z-slide" transform="translate(-45 0)">
          <Wing s={-1} />
          <Wing s={1} />
        </g>

        {/* TAIL FINS with elevators */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M-250 ${s * 30} V${s * 79} H-183.5 L-141 ${s * 30} Z`} fill="#a5a8ac" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
            <rect x="-250" y={s < 0 ? -77 : 33} width="12" height="44" fill="#9a9da2" stroke={INK} strokeWidth=".9" />
            <Bolt x={-244} y={s * 42} r={1.3} />
            <Bolt x={-244} y={s * 68} r={1.3} />
          </g>
        ))}

        {/* FUSELAGE */}
        <rect x="-252" y="-30" width="113.5" height="60" rx="2" fill="#8b8f97" stroke={INK} strokeWidth="1.2" />
        <path d="M-252 0 H-140" stroke="#c4c7cb" strokeWidth="1.6" />
        <rect x="-95.5" y="-30" width="201.5" height="60" fill={BODY} stroke={INK} strokeWidth="1.2" />
        <path d={NOSE} fill={BODY} stroke={INK} strokeWidth="1.2" />
        <path d="M106 -30 V30" stroke={INK} strokeWidth="1.4" />
        {[-20, -10, 0, 10, 20].map((y) => (<Bolt key={y} x={100} y={y} r={1.2} />))}
        <path className="z-pulse" d="M-90 -21 H98 M-90 21 H98" stroke="#c9deec" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="231" cy="0" r="2.8" fill="#fff" stroke={INK} strokeWidth=".5" />
        <circle cx="231.6" cy="0" r="1.1" fill="#8b8f97" />
        <circle cx="10" cy="0" r="3" fill="#d9dce0" stroke={INK} strokeWidth=".6" />
        {/* tail strobe */}
        <circle className="z-strobe" cx="-232" cy="0" r="6" fill="#fff" opacity=".7" />
        <circle className="z-strobe" cx="-232" cy="0" r="2" fill="#fff" opacity=".7" />
        <g clipPath="url(#z-clip-fuse)">
          <rect className="z-sweep" x="0" y="-30" width="40" height="60" fill="url(#z-g-sweep)" opacity="0" />
        </g>

        {/* OPEN EDF INTAKE (hidden by the panel until it ejects) */}
        <g className="z-intake">
          <rect x="-138.5" y="-30" width="43" height="60" fill="#eeeeee" stroke={INK} strokeWidth="1.2" />
          <rect x="-135.5" y="-27" width="37" height="54" fill="none" stroke="#c9c9c9" strokeWidth="1.2" />
          {[[-134, -26], [-100, -26], [-134, 26], [-100, 26]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.1" fill="#8b8f97" />
          ))}
          <circle cx="-123" cy="0" r="15.5" fill="#2b2e33" stroke="#8b8f97" strokeWidth="1.4" />
          <g transform="translate(-123 0)">
            <g className="z-rotor">
              <circle className="z-blur" r="14" fill="url(#z-g-blur)" />
              <g className="z-spin">
                <circle r="13" fill="none" />
                <use href="#z-blades" />
              </g>
              <g className="z-spin-ghost">
                <circle r="13" fill="none" />
                <use href="#z-blades" opacity=".25" />
              </g>
              <circle r="3.6" fill="#a5a8ac" stroke={INK} strokeWidth=".6" />
            </g>
          </g>
          <path d="M-95.5 -29 C-111 -22 -111 22 -95.5 29 Z" fill="#a5a8ac" stroke={INK} strokeWidth="1" />
        </g>
        {/* the square panel: two halves, identical fill, no visible seam */}
        <Cover cls="z-cover-a" s={-1} />
        <Cover cls="z-cover-b" s={1} />
      </g>

      {/* HUD: airspeed (updated by demo) */}
      <g className="z-hud" stroke="none">
        <text x="-380" y="318" {...L}>AIRSPEED</text>
        <text className="z-speed" x="-380" y="352" fontFamily="IBM Plex Mono, monospace" fontSize="30" fontWeight="600" fill={INK}>80</text>
        <text x="-318" y="352" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2" fill="#2f5d7c">MPH</text>
      </g>

      {/* cruise callouts */}
      <g className="z-callouts" fill="none" stroke="#2f5d7c" strokeWidth="1.5">
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M24 -192 V-36 M24 36 V192 M17 -192 H31 M17 192 H31" />
          <text className="z-label" x="40" y="-172" {...L}>WINGSPAN</text>
          <text className="z-value" x="40" y="-150" {...V}>700 MM</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M-117 -36 L-140 -120 H-300" />
          <rect className="z-pulse" x="-143" y="-36" width="53" height="72" rx="3" strokeDasharray="4 4" />
          <text className="z-label" x="-300" y="-152" {...L}>PROPULSION</text>
          <text className="z-value" x="-300" y="-130" {...V}>90 MM EDF</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M60 16 L96 104 H280" />
          <circle cx="60" cy="16" r="2.5" fill="#2f5d7c" stroke="none" />
          <text className="z-label" x="108" y="132" {...L}>6S BATTERY</text>
          <text className="z-value" x="108" y="154" {...V}>~25 MIN</text>
        </g>
        <g className="z-callout">
          <path className="z-draw" pathLength="1" d="M250 0 H340 M328 -8 L340 0 L328 8" />
          <text className="z-label" x="250" y="-16" {...L}>CRUISE</text>
          <text className="z-value" x="250" y="34" {...V}>80 MPH</text>
        </g>
      </g>
    </svg>
  );
}

/* attribute-level text defaults, so your own CSS for .z-label/.z-value still wins */
const L = { fontFamily: "IBM Plex Mono, monospace", fontSize: 10, letterSpacing: 2, fill: "#2f5d7c", stroke: "none" };
const V = { fontFamily: "IBM Plex Mono, monospace", fontSize: 15, fontWeight: 600, fill: INK, stroke: "none" };

/* ───────── BUILT-IN MISSION TIMELINE (only runs with <ZephyrSVG demo />) ───────── */
const LOOP = 24; // seconds
const T = {
  boostEnd: 2.5,      // flames cut, speed peaks at 250 mph
  apogee: 8.5,        // speed has bled down to 45 mph
  puff: [8.5, 9.6],   // side ejection charge
  boosterOut: [8.6, 10], boosterFall: [10, 12.2],
  panel: [9.6, 10.9], // square panel blows off
  swing: [10.9, 12.6],// wings swing out
  slide: [12.8, 14.6],// wings slide aft along the fuselage
  accel: [14.5, 17.5],// EDF takes it 45 -> 80 mph
  callouts: [16, 17],
};
const clamp = (x) => Math.min(1, Math.max(0, x));
const seg = (t, [a, b]) => clamp((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function pose(svg, t) {
  const $ = (c) => svg.querySelector("." + c);
  const set = (c, a, v) => { const e = $(c); if (e) e.setAttribute(a, v); };

  let v;
  if (t < T.boostEnd) v = 250 * Math.pow(t / T.boostEnd, 1.8);
  else if (t < T.apogee) v = 250 - 205 * eio(seg(t, [T.boostEnd, T.apogee]));
  else if (t < T.accel[0]) v = 45;
  else v = 45 + 35 * eio(seg(t, T.accel));
  const sp = $("z-speed"); if (sp) sp.textContent = Math.round(v);

  set("z-flame", "opacity", 1 - seg(t, [T.boostEnd, T.boostEnd + 0.5]));

  const out = eio(seg(t, T.boosterOut)) * 140, fall = seg(t, T.boosterFall);
  set("z-booster", "transform", `translate(${-(out + fall * 20)} ${fall * fall * 150}) rotate(${fall * 28} -196 0)`);
  set("z-booster", "opacity", 1 - seg(t, [11.4, 12.2]));

  const p = seg(t, T.puff);
  set("z-puff", "opacity", Math.sin(Math.PI * p) * 0.9);
  const ps = 1 + 0.9 * p;
  set("z-puff", "transform", `translate(-240 0) scale(${ps}) translate(240 0)`);

  const c = eio(seg(t, T.panel)), co = 1 - seg(t, [T.panel[0] + 0.5, T.panel[1]]);
  set("z-cover-a", "transform", `translate(${-c * 8} ${-c * 70}) rotate(${-c * 35} -117 -15)`);
  set("z-cover-b", "transform", `translate(${-c * 8} ${c * 70}) rotate(${c * 35} -117 15)`);
  set("z-cover-a", "opacity", co);
  set("z-cover-b", "opacity", co);

  const sw = eo(seg(t, T.swing));
  set("z-wing-u", "transform", `rotate(${90 * (1 - sw)} 10 0)`);
  set("z-wing-l", "transform", `rotate(${-90 * (1 - sw)} 10 0)`);
  set("z-slide", "transform", `translate(${-45 * eio(seg(t, T.slide))} 0)`);

  set("z-exhaust", "opacity", seg(t, [11.5, 12.5]));
  set("z-callouts", "opacity", seg(t, T.callouts));

  svg.style.opacity = t < 0.6 ? seg(t, [0, 0.6]) : t > 22.5 ? 1 - seg(t, [22.5, 23.4]) : 1;
}

function runDemo(svg) {
  let raf, start;
  const tick = (now) => {
    start ??= now;
    pose(svg, ((now - start) / 1000) % LOOP);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); svg.style.opacity = ""; };
}

/* ───────── AMBIENT ANIMATION (tune the numbers here) ───────── */
const CSS = `
.z-float{animation:z-float 7s ease-in-out infinite}
@keyframes z-float{0%,100%{transform:translate(0,0)}50%{transform:translate(1.5px,-3px)}}

.z-spin,.z-spin-ghost{transform-box:fill-box;transform-origin:center}
.z-spin{animation:z-spin .55s linear infinite}
.z-spin-ghost{animation:z-spin-r .21s linear infinite}
@keyframes z-spin{to{transform:rotate(360deg)}}
@keyframes z-spin-r{to{transform:rotate(-360deg)}}
.z-blur{animation:z-soft 1.6s ease-in-out infinite}
@keyframes z-soft{0%,100%{opacity:.6}50%{opacity:1}}

.z-jit{transform-box:fill-box;transform-origin:100% 50%;animation:z-flicker .22s ease-in-out infinite}
@keyframes z-flicker{
 0%{transform:scale(1,1);opacity:.95}
 20%{transform:scale(.9,1.12);opacity:1}
 40%{transform:scale(1.07,.88);opacity:.85}
 60%{transform:scale(.95,1.08);opacity:1}
 80%{transform:scale(1.04,.94);opacity:.9}
 100%{transform:scale(1,1);opacity:.95}}
.z-glow-pulse{transform-box:fill-box;transform-origin:center;animation:z-glow 1.4s ease-in-out infinite}
@keyframes z-glow{0%,100%{opacity:.65;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}

.z-puff-c{transform-box:fill-box;transform-origin:center;animation:z-puffc 1s ease-in-out infinite}
@keyframes z-puffc{0%,100%{transform:scale(.9)}50%{transform:scale(1.12)}}

.z-shimmer{transform-box:fill-box;transform-origin:100% 50%;animation:z-shim .8s ease-in-out infinite}
@keyframes z-shim{0%,100%{transform:scaleX(.85);opacity:.45}50%{transform:scaleX(1.08);opacity:1}}
.z-spark{animation:z-spark 1.4s linear infinite}
@keyframes z-spark{0%{transform:translateX(0);opacity:.9}100%{transform:translateX(-80px);opacity:0}}

.z-pulse{animation:z-pulse 3.2s ease-in-out infinite}
@keyframes z-pulse{0%,100%{opacity:.5}50%{opacity:1}}
.z-blink{animation:z-blink 1.6s steps(1,end) infinite}
@keyframes z-blink{0%{opacity:1}12%{opacity:.15}50%{opacity:1}62%{opacity:.15}100%{opacity:1}}
.z-strobe{animation:z-strobe 2.4s linear infinite}
@keyframes z-strobe{0%{opacity:0}2%{opacity:1}6%{opacity:0}12%{opacity:1}16%{opacity:0}100%{opacity:0}}

.z-sweep{animation:z-sweep 8s ease-in-out infinite}
@keyframes z-sweep{0%{transform:translateX(-300px) skewX(-18deg);opacity:1}60%,100%{transform:translateX(300px) skewX(-18deg);opacity:1}}
.z-sweep-u{animation:z-sweep-u 8s ease-in-out infinite}
.z-sweep-l{animation:z-sweep-l 8s ease-in-out infinite}
@keyframes z-sweep-u{0%{transform:translateY(0);opacity:0}10%{opacity:1}60%{transform:translateY(-185px);opacity:1}70%,100%{transform:translateY(-185px);opacity:0}}
@keyframes z-sweep-l{0%{transform:translateY(0);opacity:0}10%{opacity:1}60%{transform:translateY(185px);opacity:1}70%,100%{transform:translateY(185px);opacity:0}}

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