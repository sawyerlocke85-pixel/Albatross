import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../lib/gsap'
import { company, contact } from '../content'

export default function Contact() {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(q('.contact__title'), { type: 'chars', mask: 'chars' })
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 65%' } })
        tl.from(q('.contact__inner .eyebrow'), { autoAlpha: 0, y: 14, duration: 0.6 })
          .from(split.chars, { yPercent: 110, stagger: 0.03, duration: 1, ease: 'expo.out' }, 0.1)
          .from(q('.contact__body, .contact__email'), { autoAlpha: 0, y: 24, stagger: 0.12, duration: 0.9 }, 0.5)
        gsap.fromTo(
          q('.contact__glow'),
          { opacity: 0.3, scale: 0.9 },
          { opacity: 1, scale: 1.1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section id="contact" ref={root} className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" />
      <div className="container contact__inner">
        <span className="eyebrow">06 — Contact</span>
        <h2 id="contact-title" className="display contact__title">
          {contact.title[0]}
          <em>{contact.title[1]}</em>
          {contact.title[2]}
        </h2>
        <div className="contact__row">
          <p className="lede contact__body">{contact.body}</p>
          <a className="contact__email" href={`mailto:${company.email}`}>
            <span className="link-underline">{company.email}</span>
            <span className="contact__email-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
