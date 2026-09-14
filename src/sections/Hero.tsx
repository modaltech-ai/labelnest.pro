import CentreLabel from '../components/CentreLabel'
import { useVoice } from '../voice'
import { useCountUp } from '../hooks'
import WaitlistForm from '../components/WaitlistForm'

const FACTS = {
  plain: [
    { value: '12', label: 'places to put things' },
    { value: '11', label: 'steps from demo to release' },
    { value: '18', label: 'kinds of contact' },
    { value: '1', label: 'label already running on it' },
  ],
  tech: [
    { value: '12', label: 'modules' },
    { value: '11', label: 'pipeline stages' },
    { value: '18', label: 'contact types' },
    { value: '1', label: 'label already running on it' },
  ],
}

function Fact({ value, label }: { value: number; suffix?: string; label: string }) {
  const { ref, n } = useCountUp(value)
  return (
    <div ref={ref} className="bg-base px-5 py-6">
      <span className="block text-3xl font-bold tracking-[-0.04em] text-accent tabular-nums">
        {n}
      </span>
      <span className="muted mt-1 block text-sm">{label}</span>
    </div>
  )
}

export default function Hero() {
  const { voice } = useVoice()
  return (
    <section id="top" className="aura relative isolate overflow-hidden">
      <div className="shell grid items-center gap-14 pt-16 pb-20 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:pt-24 lg:pb-28">
        <div>
          <span className="stat stat-live">Early access · one label at a time</span>

          <h1 className="t-display t-glow mt-6">
            Your catalogue deserves better than a spreadsheet.
          </h1>

          <p className="t-lead mt-6">
            {voice === 'plain'
              ? 'Labelnest is where an independent label keeps everything: releases, catalogue, contacts, demos, promo, events and your sample library. One place, one login, and a record of who changed what.'
              : 'Labelnest is the back office for independent record labels. Releases, catalogue, contacts, demos, promo, events and your sample library — one workspace, one login, one audit trail.'}
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
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-edge bg-edge md:grid-cols-4">
          {FACTS[voice].map((f) => (
            <Fact key={f.label} value={Number(f.value)} label={f.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
