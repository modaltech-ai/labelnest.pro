import { usePick, useVoice } from '../voice'

type Block = { name: string; body: { plain: string; tech: string } }

const BLOCKS: Block[] = [
  {
    name: 'Demos',
    body: {
      plain:
        'A submission form anyone can use, an inbox your whole label shares, and private notes only you can see. Let the computer draft a reply, change what you like, send it. Say yes to a demo and it becomes a track.',
      tech: 'A public submission form, a shared inbox, and threaded internal notes. Draft a reply with AI using your own API key, edit it, send it. Approve a demo and it becomes a track.',
    },
  },
  {
    name: 'Remix contests',
    body: {
      plain: 'Publish a contest, take entries from anyone, and work through them in the same place you work through demos.',
      tech: 'Publish a contest, take entries from anyone, and work through them in the same place you work through demos.',
    },
  },
  {
    name: 'Artists',
    body: {
      plain: 'A roster with bios, photos and links that your own website can read directly — so you update it once, not twice.',
      tech: 'A roster with bios, photos and links, plus public endpoints so your own site can read it instead of you updating two places.',
    },
  },
  {
    name: 'Sample library',
    body: {
      plain:
        'Folders, tags, favourites and a player that keeps going while you browse. Short previews are made for you in the background, the tempo is worked out automatically, and you can zip a folder or send someone a link even if they have no account.',
      tech: 'Folders, tags, favourites, waveform thumbnails and a persistent player. Previews transcode in the background, BPM is detected in the browser, and a folder can be zipped or shared by link with someone who has no account.',
    },
  },
]

export default function AandR() {
  const pick = usePick()
  const { voice } = useVoice()
  return (
    <section className="band">
      <div className="shell">
        <div className="max-w-[46rem]">
          <p className="eyebrow mb-3">A&R</p>
          <h2 className="t-h2">The unglamorous half of running a label.</h2>
          <p className="t-lead mt-5 max-w-none">
            {voice === 'plain'
              ? 'Signing, sorting and storing. The work nobody posts about, and the work that quietly decides whether next year has a catalogue in it.'
              : 'Signing, sorting and storing. The work nobody posts about, and the work that quietly decides whether next year has a catalogue in it.'}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {BLOCKS.map((b) => (
            <article key={b.name} className="card card-hover p-8">
              <h3 className="t-h3">{b.name}</h3>
              <p className="muted mt-3 text-[0.95rem]">{pick(b.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
