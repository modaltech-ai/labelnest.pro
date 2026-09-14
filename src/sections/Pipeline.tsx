import { PIPELINE_STAGES } from '../content/pipeline'
import { useVoice } from '../voice'

/** Stages 1–6 are ticked in the illustration so the rail reads as a real
 *  release mid-flight rather than an empty diagram. */
const DONE_THROUGH = 6

export default function Pipeline() {
  const { voice } = useVoice()
  return (
    <section id="pipeline" className="band">
      <div className="shell">
        <div className="max-w-[46rem]">
          <p className="eyebrow mb-3">Release pipeline</p>
          <h2 className="t-h2">Eleven stages from demo to post-mortem.</h2>
          <p className="t-lead mt-5 max-w-none">
            {voice === 'plain'
              ? 'Every release runs through the same checklist, and each step is dated as you tick it off. One glance tells you which release is stuck waiting on artwork, and which one is waiting on you.'
              : 'Every release carries the same checklist, timestamped as you tick it. You can see at a glance which of your next six releases is waiting on artwork, and which is waiting on you.'}
          </p>
        </div>

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE_STAGES.map((stage, i) => {
            const done = i < DONE_THROUGH
            const current = i === DONE_THROUGH
            return (
              <li
                key={stage}
                className={`card flex items-center gap-4 px-5 py-4 ${
                  current ? 'border-accent/60 bg-accent/10' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-semibold ${
                    done
                      ? 'bg-accent text-white'
                      : current
                        ? 'border border-accent text-accent-bright'
                        : 'border border-edge text-fg-faint'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span
                  className={`text-[0.95rem] font-medium ${
                    done || current ? 'text-fg' : 'text-fg-soft'
                  }`}
                >
                  {stage}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="card mt-6 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="t-h3">Releases and catalogue are different questions</h3>
            <p className="muted mt-2 max-w-[58ch] text-[0.95rem]">
              Releases shows what&rsquo;s moving. Catalogue shows what you&rsquo;ve
              made — a cover-art grid you filter by type and year. Same records, two
              views, and one button between them.
            </p>
          </div>
          <span className="chip shrink-0 border-accent/40 text-accent-bright">
            Move to catalog
          </span>
        </div>
      </div>
    </section>
  )
}
