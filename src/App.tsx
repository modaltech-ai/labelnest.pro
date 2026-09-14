import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Origin from './sections/Origin'
import Problem from './sections/Problem'
import Modules from './sections/Modules'
import Pipeline from './sections/Pipeline'
import Promo from './sections/Promo'
import AandR from './sections/AandR'
import Workspace from './sections/Workspace'
import OwnYourFiles from './sections/OwnYourFiles'
import Security from './sections/Security'
import Roadmap from './sections/Roadmap'
import FAQ from './sections/FAQ'
import CTA from './sections/CTA'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Origin />
        <Problem />
        <Modules />
        <Pipeline />
        <Promo />
        <AandR />
        <Workspace />
        <OwnYourFiles />
        <Security />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
