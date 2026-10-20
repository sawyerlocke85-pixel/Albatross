import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK, REDUCED } from '../lib/gsap'
import { zephyr } from '../content'
import ZephyrSVG from './ZephyrSVG'

// Timeline is built in abstract units; these mark where each flight phase starts.
const T = { launch: 0, separation: 3, transition: 4.5, cruise: 7.5, end: 10 }
const phaseAt = (t) => (t < T.separation ? 0 : t < T.transition ? 1 : t < T.cruise ? 2 : 3)

const LADDER = [0, 250, 500, 750, 1000]

export default function Platform() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)

      // ---- section intro -------------------------------------------------
      const split = SplitText.create(q('.platform__title'), { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 110,
        stagger: 0.09,
        duration: 1.1,
        scrollTrigger: { trigger: q('.platform__head')[0], start: 'top 78%' },
      })
      gsap.from(q('.platform__head .eyebrow, .platform__sub'), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.platform__head')[0], start: 'top 78%' },
      })

      // ---- spec table ------------------------------------------------------
      gsap.from(q('.specs__row'), {
        y: 18,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.8,
        scrollTrigger: { trigger: q('.specs__table')[0], start: 'top 80%' },
      })
      gsap.from(q('.specs__head > *'), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.specs')[0], start: 'top 75%' },
      })

      // ---- pinned flight sequence -----------------------------------------
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, reduce: REDUCED, mobile: '(max-width: 960px)' }, (ctx) => {
        const { reduce, mobile } = ctx.conditions
        const flight = q('.flight')[0]
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
          out.alt.textContent = String(Math.round(tele.alt)).padStart(4, '0')
          out.spd.textContent = tele.spd < 1 ? '—' : String(Math.round(tele.spd))
        }
        const writeStatus = (t) => {
          const set = (el, txt, on) => {
            if (el.textContent !== txt) el.textContent = txt
            el.classList.toggle('is-on', on)
          }
          set(out.prop, t < T.separation ? 'BOOSTER' : t < 6.1 ? 'COAST' : 'EDF', t >= 6.1)
          set(out.wings, t < 6.6 ? 'STOWED' : 'DEPLOYED', t >= 6.6)
          set(out.intake, t < 5.9 ? 'SEALED' : 'OPEN', t >= 5.9)
        }

        if (reduce) {
          // static, fully-deployed cruise state
          wing.a = 0
          applyWing()
          gsap.set(vehicle, { xPercent: -50, yPercent: -50 })
          gsap.set(q('.z-booster, .z-cover-a, .z-cover-b, .stage__ground'), { autoAlpha: 0 })
          gsap.set(q('.z-callouts, .z-exhaust'), { opacity: 1 })
          gsap.set(q('.stage__seg i'), { scaleX: 1 })
          tele.alt = 800
          tele.spd = 80
          writeTele()
          writeStatus(T.end)
          flight.dataset.phase = '3'
          return
        }

        applyWing()
        writeTele()
        writeStatus(0)

        const H = () => stage.clientHeight
        const W = () => vehicle.offsetWidth
        // Rest the booster nozzle (local x = -347 of an 800-unit viewBox) on the pad.
        const padY = () => H() * 0.28 - (347 / 800) * W()

        // ambient loops — only run while the section is on screen
        const loops = gsap.timeline({ paused: true })
        loops
          .to(q('.z-flame-core'), { scaleX: 0.84, scaleY: 1.14, transformOrigin: '100% 50%', duration: 0.07, repeat: -1, yoyo: true, ease: 'none' }, 0)
          .to(q('.z-rotor'), { rotation: 360, transformOrigin: '50% 50%', duration: 0.32, repeat: -1, ease: 'none' }, 0)
          .to(q('.vehicle__bob'), { y: 6, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: flight,
            start: 'top top',
            end: () => `+=${window.innerHeight * (mobile ? 3.2 : 4)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => (self.isActive ? loops.play() : loops.pause()),
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
        tl.set(q('.z-callouts'), { opacity: 0 }, 0)

        // 01 — LAUNCH
        tl.fromTo(q('.z-flame'), { scale: 0, transformOrigin: '100% 50%' }, { scale: 1, duration: 0.35, ease: 'power2.out' }, T.launch)
          .fromTo(vehicle, { y: padY }, { y: () => -H() * 0.06, duration: 3, ease: 'power2.in' }, T.launch + 0.15)
          .fromTo(q('.stage__ground'), { y: 0 }, { y: () => H() * 0.5, duration: 2.4, ease: 'power2.in' }, T.launch + 0.3)
          .fromTo(q('.stage__clouds'), { y: () => -H() * 0.4 }, { y: () => H() * 0.5, duration: 3.2, ease: 'power1.in' }, T.launch)
          .fromTo(q('.stage__streaks'), { opacity: 0, y: 0 }, { opacity: 1, y: () => H() * 0.3, duration: 1.4 }, T.launch + 1)
          .to(q('.stage__streaks'), { opacity: 0, duration: 0.8 }, T.separation - 0.4)
          .fromTo(tele, { alt: 0 }, { alt: 800, duration: 3, ease: 'power2.in', onUpdate: writeTele }, T.launch + 0.15)
          .fromTo(q('.ladder__marker'), { bottom: '0%' }, { bottom: '80%', duration: 3, ease: 'power2.in' }, T.launch + 0.15)

        // 02 — SEPARATION
        tl.to(q('.z-flame'), { scale: 0, duration: 0.25 }, T.separation)
          .fromTo(q('.z-puff'), { opacity: 0.9, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 0, scale: 3, duration: 0.8, ease: 'power2.out' }, T.separation + 0.1)
          .to(q('.z-booster'), { x: -320, rotation: -28, transformOrigin: '50% 50%', duration: 1.4, ease: 'power2.in' }, T.separation + 0.1)
          .to(q('.z-booster'), { autoAlpha: 0, duration: 0.5 }, T.separation + 1)

        // 03 — TRANSITION
        tl.to(vehicle, { rotation: 0, y: 0, scale: mobile ? 1 : 1.1, duration: 1.4, ease: 'power2.inOut' }, T.transition)
          .to(q('.z-cover-a'), { x: -30, y: -120, rotation: -170, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, T.transition + 1.35)
          .to(q('.z-cover-b'), { x: 40, y: 120, rotation: 160, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, T.transition + 1.4)
          .to(wing, { a: 0, duration: 1.3, ease: 'back.out(1.3)', onUpdate: applyWing }, T.transition + 1.5)

        // 04 — CRUISE
        tl.to(q('.z-exhaust'), { opacity: 1, duration: 0.6 }, T.cruise)
          .to(tele, { spd: 80, duration: 1, ease: 'power1.out', onUpdate: writeTele }, T.cruise)
          .to(q('.z-callouts'), { opacity: 1, duration: 0.2 }, T.cruise + 0.2)
          .from(q('.z-draw'), { drawSVG: '0%', duration: 0.9, stagger: 0.15 }, T.cruise + 0.2)
          .from(q('.z-callout text'), { opacity: 0, duration: 0.5, stagger: 0.08 }, T.cruise + 0.5)
          .fromTo(q('.stage__clouds'), { x: 0 }, { x: () => -stage.clientWidth * 0.6, duration: 2.5 }, T.cruise)
          .fromTo(q('.stage__grid'), { backgroundPositionX: '0px' }, { backgroundPositionX: '-480px', duration: 2.5 }, T.cruise)

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
    <section id="zephyr" ref={root} className="platform" aria-labelledby="zephyr-title">
      <div className="section platform__intro">
        <div className="container platform__head">
          <span className="eyebrow">03 — Platform</span>
          <h2 id="zephyr-title" className="display h2 platform__title">
            {zephyr.title[0]}
            <br />
            {zephyr.title[1]}
            <em>{zephyr.title[2]}</em>
            {zephyr.title[3]}
          </h2>
          <p className="lede platform__sub">{zephyr.sub}</p>
        </div>
      </div>

      <div className="flight" data-phase="0">
        <div className="container flight__grid">
          <ol className="phases" aria-label="Zephyr Z1 flight phases">
            {zephyr.phases.map((p) => (
              <li key={p.n} className="phase">
                <div className="phase__head">
                  <span className="mono phase__n">{p.n}</span>
                  <h3 className="phase__name display">{p.name}</h3>
                </div>
                <div className="phase__body">
                  <div>
                    <p className="phase__desc">{p.desc}</p>
                    <span className="mono phase__spec">{p.spec}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="stage" role="img" aria-label="Animated diagram of Zephyr Z1 launching on a booster, separating, unfolding its wings and cruising">
            <div className="stage__grid" />
            <div className="stage__clouds">
              <span className="cloud" style={{ left: '8%', top: '12%', width: 260, height: 70 }} />
              <span className="cloud" style={{ left: '62%', top: '26%', width: 340, height: 90 }} />
              <span className="cloud" style={{ left: '30%', top: '58%', width: 220, height: 60 }} />
              <span className="cloud" style={{ left: '84%', top: '70%', width: 300, height: 80 }} />
              <span className="cloud" style={{ left: '110%', top: '40%', width: 280, height: 70 }} />
              <span className="cloud" style={{ left: '135%', top: '15%', width: 240, height: 64 }} />
            </div>
            <div className="stage__streaks">
              {[12, 22, 35, 48, 61, 70, 83, 91].map((l, i) => (
                <span key={l} className="streak" style={{ left: `${l}%`, top: `${(i * 37) % 70}%`, height: 60 + ((i * 53) % 90) }} />
              ))}
            </div>
            <div className="stage__ground">
              <span className="stage__pad" />
              <span className="mono">Launch site — 0 ft</span>
            </div>

            <div className="ladder" aria-hidden="true">
              {LADDER.map((ft) => (
                <span key={ft} className="ladder__tick" style={{ bottom: `${(ft / 1000) * 100}%` }}>
                  {ft}
                </span>
              ))}
              <span className="ladder__marker" />
            </div>

            <div className="vehicle">
              <div className="vehicle__bob">
                <ZephyrSVG />
              </div>
            </div>

            <div className="hud mono" aria-hidden="true">
              <span className="hud__title">Zephyr Z1 · Telemetry</span>
              <dl className="hud__readouts">
                <div>
                  <dt>ALT FT</dt>
                  <dd data-ro="alt">0000</dd>
                </div>
                <div>
                  <dt>SPD MPH</dt>
                  <dd data-ro="spd">—</dd>
                </div>
                <div>
                  <dt>PROP</dt>
                  <dd data-ro="prop">BOOSTER</dd>
                </div>
                <div>
                  <dt>WINGS</dt>
                  <dd data-ro="wings">STOWED</dd>
                </div>
                <div>
                  <dt>INTAKE</dt>
                  <dd data-ro="intake">SEALED</dd>
                </div>
              </dl>
            </div>

            <div className="stage__progress" aria-hidden="true">
              {zephyr.phases.map((p) => (
                <span key={p.n} className="stage__seg">
                  <i />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="specs section">
        <div className="container specs__grid">
          <div className="specs__head">
            <span className="eyebrow">Specifications</span>
            <h3 className="display specs__title">
              Zephyr <em>Z1</em>
            </h3>
            <p className="mono specs__note">Preliminary — subject to change</p>
          </div>
          <dl className="specs__table">
            {zephyr.specs.map(([k, v]) => (
              <div key={k} className="specs__row">
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
