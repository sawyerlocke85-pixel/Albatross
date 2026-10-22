import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, REDUCED } from '../lib/gsap'
import { zephyr } from '../content'
import ZephyrSVG from './ZephyrSVG'

// Timeline is built in abstract units; these mark where each flight phase starts.
const T = { launch: 0, separation: 3, transition: 4.5, cruise: 7.5, end: 10 }
const phaseAt = (t) => (t < T.separation ? 0 : t < T.transition ? 1 : t < T.cruise ? 2 : 3)

const LADDER = [0, 250, 500, 750, 1000]

/**
 * The one animation on the site: Zephyr Z1 flying launch → cruise, scrubbed
 * by scroll while the section is pinned. With reduced motion it renders the
 * final cruise frame and lists all four stages.
 */
export default function FlightSequence() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add({ motion: MOTION_OK, reduce: REDUCED, mobile: '(max-width: 767px)' }, (ctx) => {
        const { reduce, mobile } = ctx.conditions
        const flight = root.current
        const stage = q('.stage')[0]
        const vehicle = q('.vehicle')[0]
        const wingU = q('.z-wing-u')[0]
        const wingL = q('.z-wing-l')[0]
        const out = {
          alt: q('[data-ro="alt"]')[0],
          spd: q('[data-ro="spd"]')[0],
          prop: q('[data-ro="prop"]')[0],
          wings: q('[data-ro="wings"]')[0],
          intake: q('[data-ro="intake"]')[0],
        }

        // wing fold: 90 = stowed along the fuselage, 0 = deployed
        const wing = { a: 90 }
        const applyWing = () => {
          wingU.setAttribute('transform', `rotate(${-wing.a} 10 0)`)
          wingL.setAttribute('transform', `rotate(${wing.a} 10 0)`)
        }
        const tele = { alt: 0, spd: 0 }
        const writeTele = () => {
          out.alt.textContent = String(Math.round(tele.alt))
          out.spd.textContent = tele.spd < 1 ? '0' : String(Math.round(tele.spd))
        }
        const writeStatus = (t) => {
          const set = (el, txt) => el.textContent !== txt && (el.textContent = txt)
          set(out.prop, t < T.separation ? 'Booster' : t < 6.1 ? 'Coast' : 'Fan')
          set(out.wings, t < 6.6 ? 'Stowed' : 'Out')
          set(out.intake, t < 5.9 ? 'Sealed' : 'Open')
        }

        if (reduce) {
          // static, fully-deployed cruise frame
          wing.a = 0
          applyWing()
          gsap.set(vehicle, { xPercent: -50, yPercent: -50 })
          gsap.set(q('.z-booster, .z-cover-a, .z-cover-b, .stage__ground'), { autoAlpha: 0 })
          gsap.set(q('.z-exhaust'), { opacity: 1 })
          gsap.set(q('.ladder__marker'), { bottom: '80%' })
          gsap.set(q('.stage__seg i'), { scaleX: 1 })
          tele.alt = 800
          tele.spd = 80
          writeTele()
          writeStatus(T.end)
          flight.dataset.phase = 'all'
          return () => (flight.dataset.phase = '0')
        }

        applyWing()
        writeTele()
        writeStatus(0)

        const H = () => stage.clientHeight
        const W = () => vehicle.offsetWidth
        // Rest the booster nozzle (local x = -272 of an 800-unit viewBox) on the pad.
        const padY = () => H() * 0.28 - (272 / 800) * W()

        // engine flicker and fan spin — only while the section is on screen
        const loops = gsap.timeline({ paused: true })
        loops
          .to(q('.z-flame-core'), { scaleX: 0.86, transformOrigin: '100% 50%', duration: 0.08, repeat: -1, yoyo: true, ease: 'none' }, 0)
          .to(q('.z-rotor'), { rotation: 360, transformOrigin: '50% 50%', duration: 0.32, repeat: -1, ease: 'none' }, 0)

        // Wing angle and telemetry live on plain objects; write them to the DOM
        // on every timeline render and after every refresh. (Child-tween
        // callbacks are skipped when ScrollTrigger jumps the timeline.)
        const sync = () => {
          applyWing()
          writeTele()
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: sync,
          scrollTrigger: {
            trigger: flight,
            start: 'top top',
            end: () => `+=${window.innerHeight * (mobile ? 3.2 : 4)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => (self.isActive ? loops.play() : loops.pause()),
            onRefresh: (self) => {
              sync()
              writeStatus(self.progress * T.end)
            },
            onUpdate: (self) => {
              const t = self.progress * T.end
              const p = String(phaseAt(t))
              if (flight.dataset.phase !== p) flight.dataset.phase = p
              writeStatus(t)
            },
          },
        })

        // initial state
        tl.set(vehicle, { xPercent: -50, yPercent: -50, rotation: -90 }, 0)

        // 1 — LAUNCH
        tl.fromTo(q('.z-flame'), { scale: 0, transformOrigin: '100% 50%' }, { scale: 1, duration: 0.35, ease: 'power2.out' }, T.launch)
          .fromTo(vehicle, { y: padY }, { y: () => -H() * 0.06, duration: 3, ease: 'power2.in' }, T.launch + 0.15)
          .fromTo(q('.stage__ground'), { y: 0 }, { y: () => H() * 0.5, duration: 2.4, ease: 'power2.in' }, T.launch + 0.3)
          .fromTo(tele, { alt: 0 }, { alt: 800, duration: 3, ease: 'power2.in' }, T.launch + 0.15)
          .fromTo(q('.ladder__marker'), { bottom: '0%' }, { bottom: '80%', duration: 3, ease: 'power2.in' }, T.launch + 0.15)

        // 2 — SEPARATION
        tl.to(q('.z-flame'), { scale: 0, duration: 0.25 }, T.separation)
          .fromTo(q('.z-puff'), { opacity: 0.8, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 0, scale: 3, duration: 0.8, ease: 'power2.out' }, T.separation + 0.1)
          .to(q('.z-booster'), { x: -320, rotation: -28, transformOrigin: '50% 50%', duration: 1.4, ease: 'power2.in' }, T.separation + 0.1)
          .to(q('.z-booster'), { autoAlpha: 0, duration: 0.5 }, T.separation + 1)

        // 3 — TRANSITION
        tl.to(vehicle, { rotation: 0, y: 0, scale: mobile ? 1 : 1.1, duration: 1.4, ease: 'power2.inOut' }, T.transition)
          .to(q('.z-cover-a'), { x: -30, y: -120, rotation: -170, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, T.transition + 1.35)
          .to(q('.z-cover-b'), { x: 40, y: 120, rotation: 160, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, T.transition + 1.4)
          .to(wing, { a: 0, duration: 1.3, ease: 'power2.out' }, T.transition + 1.5)

        // 4 — CRUISE
        tl.to(q('.z-exhaust'), { opacity: 1, duration: 0.6 }, T.cruise)
          .to(tele, { spd: 80, duration: 1, ease: 'power1.out' }, T.cruise)
          .to({}, { duration: T.end - T.cruise }, T.cruise) // hold the final frame

        // progress segments
        const segs = q('.stage__seg i')
        tl.fromTo(segs[0], { scaleX: 0 }, { scaleX: 1, duration: T.separation }, 0)
          .fromTo(segs[1], { scaleX: 0 }, { scaleX: 1, duration: T.transition - T.separation }, T.separation)
          .fromTo(segs[2], { scaleX: 0 }, { scaleX: 1, duration: T.cruise - T.transition }, T.transition)
          .fromTo(segs[3], { scaleX: 0 }, { scaleX: 1, duration: T.end - T.cruise }, T.cruise)

        return () => loops.kill()
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="flight" data-phase="0">
      <div className="wrap grid flight__grid">
        <ol className="phases" aria-label="Zephyr Z1 flight stages">
          {zephyr.phases.map((p) => (
            <li key={p.name} className="phase">
              <div className="phase__name">{p.name}</div>
              <p className="phase__caption">{p.caption}</p>
            </li>
          ))}
        </ol>

        <div
          className="stage"
          role="img"
          aria-label="Zephyr Z1 launching on a booster, dropping it at about 800 ft, unfolding its wings and cruising at 80 mph"
        >
          <div className="stage__ground">
            <span className="stage__pad" />
          </div>

          <div className="ladder" aria-hidden="true">
            {LADDER.map((ft) => (
              <span key={ft} className="ladder__tick num" style={{ bottom: `${(ft / 1000) * 100}%` }}>
                {ft}
              </span>
            ))}
            <span className="ladder__marker" />
          </div>

          <div className="vehicle">
            <ZephyrSVG />
          </div>

          <dl className="hud" aria-hidden="true">
            <dt className="label">Alt ft</dt>
            <dt className="label">Speed mph</dt>
            <dt className="label">Power</dt>
            <dt className="label">Wings</dt>
            <dt className="label">Intake</dt>
            <dd className="num" data-ro="alt">0</dd>
            <dd className="num" data-ro="spd">0</dd>
            <dd data-ro="prop">Booster</dd>
            <dd data-ro="wings">Stowed</dd>
            <dd data-ro="intake">Sealed</dd>
          </dl>

          <div className="stage__progress" aria-hidden="true">
            {zephyr.phases.map((p) => (
              <span key={p.name} className="stage__seg">
                <i />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
