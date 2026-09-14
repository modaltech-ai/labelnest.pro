import { useEffect, useRef, useState } from 'react'

/** Whether the visitor has asked the system to stop things moving. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Which section the reader is currently in, for the nav.
 *
 * Tracks the band nearest the top quarter of the viewport rather than whatever
 * merely intersects it, so a tall section stays selected while you read it
 * instead of handing over the moment the next one appears.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.3
      let best: string | null = null
      let bestDistance = Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (bottom < 0 || top > window.innerHeight) continue
        const distance = Math.abs(top - line)
        if (distance < bestDistance) {
          bestDistance = distance
          best = id
        }
      }
      setActive(best)
    }

    let frame = 0
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0
          pick()
        })
    }
    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

/** Fires once, when the element first comes into view. */
export function useInView<T extends HTMLElement>(margin = '-15%') {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin, seen])

  return { ref, seen }
}

/**
 * Counts up to `value` once the element is in view.
 *
 * Returns the target immediately under reduced motion — the number is the
 * point, the animation is not.
 */
export function useCountUp(value: number, duration = 900) {
  const { ref, seen } = useInView<HTMLDivElement>()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setN(value)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out cubic: fast first, settles on the number.
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, value, duration])

  return { ref, n }
}
