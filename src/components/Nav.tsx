import { NAV } from '../content/site'
import Wordmark from './Wordmark'
import GeekToggle from './GeekToggle'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-base/80 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-lg" aria-label="Labelnest, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-fg-soft transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
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
