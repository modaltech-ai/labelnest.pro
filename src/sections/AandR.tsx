const BLOCKS = [
  {
    name: 'Demos',
    body: 'A submission form the public can use, an inbox your label shares, and notes only you can see. Draft a reply with AI using your own API key, edit it, send it. Approve a demo and it becomes a track.',
  },
  {
    name: 'Remix contests',
    body: 'Publish a contest, take entries from anyone, and work through them in the same place you work through demos.',
  },
  {
    name: 'Artists',
    body: 'A roster with bios, photos and links, and public endpoints so your own website can read it instead of you updating two places.',
  },
  {
    name: 'Sample library',
    body: 'Folders, tags, favourites, waveform thumbnails and a player that keeps going while you browse. Previews transcode in the background, BPM is detected in the browser, and a folder can be zipped or shared by link with someone who has no account.',
  },
]

export default function AandR() {
  return (
    <section className="band">
      <div className="shell">
        <div className="max-w-[46rem]">
          <h2 className="t-h2">The unglamorous half of running a label.</h2>
          <p className="t-lead mt-5 max-w-none">
            Signing, sorting and storing. The work nobody posts about, and the work
            that quietly decides whether next year has a catalogue in it.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {BLOCKS.map((b) => (
            <article key={b.name} className="card card-hover p-8">
              <h3 className="t-h3">{b.name}</h3>
              <p className="muted mt-3 text-[0.95rem]">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
