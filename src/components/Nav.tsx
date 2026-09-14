import { NAV } from '../content/site'
import { useActiveSection } from '../hooks'
import Wordmark from './Wordmark'
import GeekToggle from './GeekToggle'

const SECTION_IDS = NAV.map((n) => n.href.slice(1))

export default function Nav() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-base/75 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-lg" aria-label="Labelnest, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const on = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={on ? 'true' : undefined}
                className={`relative text-sm font-medium transition-colors ${
                  on ? 'text-accent' : 'text-fg-soft hover:text-fg'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    on ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={on ? { boxShadow: '0 0 8px var(--color-accent)' } : undefined}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <GeekToggle />
          <a href="#access" className="btn px-5 py-2.5 text-sm">
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
