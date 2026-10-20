import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll } from './lib/scroll'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Mission from './components/Mission'
import Platform from './components/Platform'
import Founders from './components/Founders'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => initSmoothScroll(), [])

  // Fonts change line heights; re-measure every trigger once they land.
  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (cancelled) return
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro onReveal={() => setReady(true)} />
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Mission />
        <Platform />
        <Founders />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
