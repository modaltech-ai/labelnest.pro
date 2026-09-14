import { CONTACT_EMAIL, NAV } from '../content/site'
import Wordmark from './Wordmark'

export default function Footer() {
  return (
    <footer className="rule-top bg-void">
      <div className="shell flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg">
            <Wordmark />
          </p>
          <p className="muted mt-3 max-w-[32ch] text-sm">
            The back office for independent record labels.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-14 text-sm">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="muted inline-block py-1.5 transition-colors hover:text-fg" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-1">
            <li>
              <a
                className="muted inline-block py-1.5 transition-colors hover:text-fg"
                href="https://quest4goarecords.com"
                rel="noreferrer"
              >
                Quest4Goa Records
              </a>
            </li>
            <li>
              <a className="muted inline-block py-1.5 transition-colors hover:text-fg" href={`mailto:${CONTACT_EMAIL}`}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="shell border-t border-edge py-6">
        <p className="t-code text-fg-faint">&copy; 2026 Labelnest. Built by a label, for labels.</p>
      </div>
    </footer>
  )
}
