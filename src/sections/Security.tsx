import {
  SECURITY_FOOTNOTE,
  SECURITY_INTRO,
  SECURITY_ITEMS,
  SECURITY_PULL,
} from '../content/security'
import { usePick, useVoice } from '../voice'

export default function Security() {
  const pick = usePick()
  const { voice } = useVoice()

  return (
    <section id="security" className="band bg-void">
      <div className="shell">
        <div className="max-w-[46rem]">
          <p className="eyebrow mb-3">Isolation</p>
          <h2 className="t-h2">
            {voice === 'plain'
              ? 'Your catalogue stays yours alone.'
              : 'Isolation you can point at, not just trust.'}
          </h2>
          <p className="t-lead mt-5 max-w-none">{pick(SECURITY_INTRO)}</p>
          <p className="mt-6 max-w-[46ch] border-l-2 border-accent pl-5 text-lg font-medium text-fg">
            {voice === 'tech' ? (
              <>
                So a forgotten <code className="t-code text-accent-bright">WHERE</code>{' '}
                clause returns nothing instead of another label&rsquo;s data.
              </>
            ) : (
              SECURITY_PULL.plain
            )}
          </p>
        </div>

        <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_ITEMS.map((item) => (
            <div key={item.name.tech}>
              <dt className="t-h3">{pick(item.name)}</dt>
              <dd className="muted mt-2 text-[0.95rem]">{pick(item.body)}</dd>
            </div>
          ))}
        </dl>

        <p className="muted mt-14 max-w-[64ch] border-t border-edge pt-6 text-sm">
          {pick(SECURITY_FOOTNOTE)}
        </p>
      </div>
    </section>
  )
}
