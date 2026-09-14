import { MODULES, type Module } from '../content/modules'

/** Releases and the catalogue get the wide cells, because they are what a
 *  label opens the app for. Both carry real values from the product. */
function LeadCell({ m }: { m: Module }) {
  return (
    <article className="card card-hover grid gap-8 p-8 lg:col-span-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-10">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-[-0.03em]">{m.name}</h3>
          <span className="t-code shrink-0 text-fg-faint">{m.spec}</span>
        </div>
        <p className="muted mt-3">{m.body}</p>
      </div>

      <div>
        <p className="t-code text-fg-faint">{m.detailLabel}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {m.details?.map((d) => (
            <li key={d} className="chip">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Modules() {
  return (
    <section id="product" className="band">
      <div className="shell">
        <div className="max-w-[46rem]">
          <h2 className="t-h2">One workspace. Twelve places to put things.</h2>
          <p className="t-lead mt-5 max-w-none">
            Every module links to every other one. A release knows its artists, its
            tasks, its promo package, its campaign and its files — so finding
            everything is the default and losing nothing is automatic.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) =>
            m.details ? (
              <LeadCell key={m.name} m={m} />
            ) : (
              <article key={m.name} className="card card-hover p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="t-h3">{m.name}</h3>
                  <span className="t-code shrink-0 text-fg-faint">{m.spec}</span>
                </div>
                <p className="muted mt-3 text-[0.95rem]">{m.body}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
