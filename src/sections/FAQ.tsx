import { FAQS } from '../content/faq'
import { usePick } from '../voice'

export default function FAQ() {
  const pick = usePick()
  return (
    <section className="band">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="t-h2 lg:sticky lg:top-28 lg:self-start">
          Questions we&rsquo;d ask too.
        </h2>

        <div className="divide-y divide-[var(--color-edge)] border-y border-edge">
          {FAQS.map((f) => (
            <details key={f.q.tech} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] font-semibold tracking-[-0.015em] marker:content-none">
                {pick(f.q)}
                <span
                  aria-hidden="true"
                  className="mt-[0.4rem] grid h-5 w-5 shrink-0 place-items-center rounded-full border border-edge text-fg-soft transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </summary>
              <p className="muted -mt-1 max-w-[62ch] pb-5 text-[0.95rem]">{pick(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
