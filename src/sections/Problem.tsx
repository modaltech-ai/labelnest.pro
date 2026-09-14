const PAINS = [
  {
    title: 'The catalogue lives in a spreadsheet',
    body: 'Catalogue numbers, ISRCs, release dates and revenue splits, in a file two people edit and nobody trusts.',
  },
  {
    title: 'Promo feedback dies in DMs',
    body: 'You sent the promo to sixty DJs. The replies are in email, WhatsApp, Instagram and a SoundCloud comment thread. Nobody can tell the artist who charted it.',
  },
  {
    title: 'Demos pile up in an inbox',
    body: 'Every unsigned producer emails the same address. Half get no reply. The good ones get buried under the rest.',
  },
  {
    title: 'The masters are in a shared drive',
    body: 'Somewhere. Under a folder name that made sense in 2023. With three files called final_v2.',
  },
]

export default function Problem() {
  return (
    <section className="band">
      <div className="shell">
        <h2 className="t-h2 max-w-[18ch]">
          You already have a system. It&rsquo;s just scattered across six apps.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PAINS.map((p) => (
            <article key={p.title} className="card card-hover p-7">
              <h3 className="t-h3">{p.title}</h3>
              <p className="muted mt-3 text-[0.95rem]">{p.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-[52ch] text-lg text-fg">
          Labelnest replaces the folder, the sheet and the thread with records that
          know about each other.
        </p>
      </div>
    </section>
  )
}
