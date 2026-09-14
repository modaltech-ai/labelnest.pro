import { useVoice } from '../voice'

function Glasses({ on }: { on: boolean }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="5.6" cy="9" r="4.4" stroke="currentColor" strokeWidth="1.6" fill={on ? 'currentColor' : 'none'} fillOpacity={on ? 0.28 : 0} />
      <circle cx="18.4" cy="9" r="4.4" stroke="currentColor" strokeWidth="1.6" fill={on ? 'currentColor' : 'none'} fillOpacity={on ? 0.28 : 0} />
      <path d="M10 9c.7-.8 3.3-.8 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M1.2 6.4C1.6 3.4 2.6 2 4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22.8 6.4C22.4 3.4 21.4 2 20 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function GeekToggle({ compact = false }: { compact?: boolean }) {
  const { voice, toggle } = useVoice()
  const on = voice === 'tech'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title={
        on
          ? 'Geek view is on — showing how it actually works. Click for plain English.'
          : 'Geek view — show the technical detail behind each claim.'
      }
      className={`inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-2 text-sm font-medium transition-colors ${
        on
          ? 'border-accent/60 bg-accent/15 text-accent-bright'
          : 'border-edge bg-white/[0.03] text-fg-soft hover:border-edge-strong hover:text-fg'
      }`}
    >
      <Glasses on={on} />
      <span className={compact ? 'sr-only' : 'hidden sm:inline'}>Geek view</span>
      <span className="sr-only">
        {on ? ' is on. Click to switch back to plain English.' : '. Click to show technical detail.'}
      </span>
    </button>
  )
}
