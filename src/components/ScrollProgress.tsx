import { useEffect, useState } from 'react'

/**
 * A readout of how far through the page you are.
 *
 * The console puts a live teal line at the top of every screen; this is the
 * marketing page's version of the same signal, and on a page this long it
 * answers a real question — how much of this is left?
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setPct(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }
    // Scroll fires far more often than the screen repaints; coalesce to frames.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-accent-deep via-accent to-accent-bright"
        style={{
          transform: `scaleX(${pct})`,
          boxShadow: pct > 0.01 ? '0 0 12px var(--color-accent)' : 'none',
        }}
      />
    </div>
  )
}
