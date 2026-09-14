import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL, WAITLIST_ENDPOINT } from '../content/site'

type Status = 'idle' | 'sending' | 'done' | 'no-endpoint' | 'error'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function WaitlistForm({
  source,
  withLabelField = false,
}: {
  source: string
  withLabelField?: boolean
}) {
  const [email, setEmail] = useState('')
  const [label, setLabel] = useState('')
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [invalid, setInvalid] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (trap) return // honeypot: a bot filled a field no human can see

    if (!EMAIL.test(email)) {
      setInvalid(true)
      return
    }
    setInvalid(false)

    // No endpoint configured yet. Say so, and hand over to mail — never
    // pretend a signup was recorded.
    if (!WAITLIST_ENDPOINT) {
      setStatus('no-endpoint')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, label, source }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="max-w-[34ch] border-l-[3px] border-spot pl-4 font-semibold">
        You&rsquo;re on the list. We&rsquo;ll email {email} when there&rsquo;s a
        workspace ready for you.
      </p>
    )
  }

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    'Labelnest early access',
  )}&body=${encodeURIComponent(
    `Email: ${email}\nLabel: ${label || '—'}\nFrom: ${source}`,
  )}`

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[34rem]">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${source}`}>
          Your email address
        </label>
        <input
          id={`email-${source}`}
          className="field flex-1"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourlabel.com"
          value={email}
          aria-invalid={invalid}
          aria-describedby={invalid ? `err-${source}` : undefined}
          onChange={(e) => {
            setEmail(e.target.value)
            if (invalid) setInvalid(false)
          }}
        />
        <button className="btn shrink-0" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Request early access'}
        </button>
      </div>

      {withLabelField && (
        <>
          <label className="sr-only" htmlFor={`label-${source}`}>
            Label name (optional)
          </label>
          <input
            id={`label-${source}`}
            className="field mt-2"
            type="text"
            placeholder="Label name, and roughly what you release (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </>
      )}

      {/* Honeypot. Hidden from people and from screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`company-${source}`}>Company</label>
        <input
          id={`company-${source}`}
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div aria-live="polite">
        {invalid && (
          <p id={`err-${source}`} className="mt-2 text-sm font-medium text-flag">
            That doesn&rsquo;t look like an email address. Check it and try again.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 max-w-[44ch] text-sm font-medium text-flag">
            That didn&rsquo;t send. Try again, or email us at{' '}
            <a className="underline" href={mailto}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
        {status === 'no-endpoint' && (
          <p className="mt-2 max-w-[46ch] text-sm font-medium">
            The signup form isn&rsquo;t connected yet.{' '}
            <a className="text-spot underline underline-offset-2" href={mailto}>
              Send us an email instead
            </a>{' '}
            and you&rsquo;ll go on the same list.
          </p>
        )}
      </div>
    </form>
  )
}
