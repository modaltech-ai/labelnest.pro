import CentreLabel from '../components/CentreLabel'
import WaitlistForm from '../components/WaitlistForm'

const FACTS = [
  { value: '12', label: 'modules' },
  { value: '11', label: 'pipeline stages' },
  { value: '18', label: 'contact types' },
  { value: '1', label: 'label already running on it' },
]

export default function Hero() {
  return (
    <section id="top" className="aura relative isolate overflow-hidden">
      <div className="shell grid items-center gap-14 pt-16 pb-20 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:pt-24 lg:pb-28">
        <div>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            Early access, one label at a time
          </span>

          <h1 className="t-display t-glow mt-6">
            Your catalogue deserves better than a spreadsheet.
          </h1>

          <p className="t-lead mt-6">
            Labelnest is the back office for independent record labels. Releases,
            catalogue, contacts, demos, promo, events and your sample library — one
            workspace, one login, one audit trail.
          </p>

          <div className="mt-9">
            <WaitlistForm source="hero" />
          </div>

          <p className="muted mt-4 max-w-[44ch] text-sm">
            No card, no spam. One email when there&rsquo;s a workspace ready for you.
          </p>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <CentreLabel />
        </div>
      </div>

      <div className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-edge bg-edge md:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="bg-base px-5 py-6">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-3xl font-bold tracking-[-0.04em] text-fg">
                  {f.value}
                </span>
                <span className="muted mt-1 block text-sm">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
