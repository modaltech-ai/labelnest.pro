import { BUILDING, SHIPPED } from '../content/roadmap'
import { usePick, useVoice } from '../voice'

export default function Roadmap() {
  const pick = usePick()
  const { voice } = useVoice()
  return (
    <section id="roadmap" className="band">
      <div className="shell">
        <div className="max-w-[46rem]">
          <h2 className="t-h2">Where it is, honestly.</h2>
          <p className="t-lead mt-5 max-w-none">
            {voice === 'plain'
              ? 'Everything a label needs day to day is built and in use right now. What is still coming is the part that lets you sign yourself up and pay — which is why this is a waitlist and not a checkout.'
              : 'The label modules are built and in daily use. The parts that turn one label\u2019s back office into a product you can sign up for are still landing — which is why this is a waitlist and not a checkout.'}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <div className="card p-8">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              <h3 className="t-h3">Shipped and in daily use</h3>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {pick(SHIPPED).map((s) => (
                <li key={s} className="text-[0.95rem] text-fg-soft">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-8">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flag" />
              <h3 className="t-h3">Building now</h3>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {pick(BUILDING).map((b) => (
                <li key={b} className="text-[0.95rem] text-fg-soft">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
