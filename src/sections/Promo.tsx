const STATES = ['Pending', 'Sent', 'Delivered', 'Opened', 'Downloaded']

/** An illustration of the promo response view, built from the fields the
 *  product actually stores on promo_recipients. Names are invented. */
const ROWS = [
  { name: 'Ed Nomad', role: 'Radio host', reached: 4, chart: 'Beatport #12', support: true },
  { name: 'Selin Ç.', role: 'DJ', reached: 4, chart: null, support: true },
  { name: 'Marco Pires', role: 'Journalist', reached: 3, chart: null, support: false },
  { name: 'Ayla Rune', role: 'Playlist curator', reached: 1, chart: null, support: false },
]

const TRACKED = [
  'Delivery status, through all five states',
  'Feedback received, and the text of it',
  'Rating',
  'Chart support, with chart name and position',
  'DJ support — confirmed plays, recorded mixes, festival sets',
  'Follow-up needed, with a date and notes',
]

export default function Promo() {
  return (
    <section className="band">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Promo</p>
          <h2 className="t-h2">Find out who actually played it.</h2>
            <p className="t-body mt-5 text-lg">
              Promo is where most label admin quietly falls apart. You send sixty
              packages and get back a mess of replies you can&rsquo;t summarise for
              the artist.
            </p>
            <p className="t-body mt-4">
              Labelnest keeps the list, the send and the response in one record. Build
              a recipient list from contacts by type or tag, reuse a list from a
              previous package, set the embargo, then log what came back against each
              name.
            </p>

            <ul className="mt-8 space-y-2.5">
              {TRACKED.map((t) => (
                <li key={t} className="flex gap-3 text-[0.95rem] text-fg-soft">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[46ch] text-lg font-medium text-fg">
              So when the artist asks how it went, the answer is a record, not a
              memory.
            </p>
          </div>

          {/* Response view illustration */}
          <div className="card bracket relative overflow-hidden">
            <span className="sweep" style={{ ['--sweep-distance' as string]: '340px' }} />
            <div className="flex items-center justify-between gap-4 border-b border-edge px-6 py-4">
              <div>
                <p className="text-sm font-semibold">LN-001 — promo response</p>
                <p className="eyebrow mt-1">60 sent · 38 replied</p>
              </div>
              <span className="stat stat-live">63% support</span>
            </div>

            <div className="px-6 pt-5">
              <div className="flex flex-wrap gap-1.5">
                {STATES.map((s, i) => (
                  <span
                    key={s}
                    className={`t-code rounded-[var(--radius-pill)] px-2.5 py-1 ${
                      i < 4
                        ? 'bg-accent/15 text-accent-bright'
                        : 'border border-edge text-fg-faint'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-5 divide-y divide-[var(--color-edge)]">
              {ROWS.map((r) => (
                <li key={r.name} className="flex items-center gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.95rem] font-medium">{r.name}</p>
                    <p className="t-code text-fg-faint">{r.role}</p>
                  </div>

                  <div aria-hidden="true" className="flex shrink-0 gap-1">
                    {STATES.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-5 rounded-full ${
                          i < r.reached ? 'bg-accent' : 'bg-[var(--color-edge-strong)]'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="w-28 shrink-0 text-right">
                    {r.chart ? (
                      <span className="t-code text-flag">{r.chart}</span>
                    ) : r.support ? (
                      <span className="t-code text-accent-bright">Support</span>
                    ) : (
                      <span className="t-code text-fg-faint">No reply</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
