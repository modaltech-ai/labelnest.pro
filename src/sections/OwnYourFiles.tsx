import { usePick, useVoice } from '../voice'
import type { Dual } from '../voice'

const BYO: { name: Dual; body: Dual }[] = [
  {
    name: { plain: 'Where your files live', tech: 'Storage' },
    body: {
      plain:
        'Your own storage account with Cloudflare, in the part of the world you choose. Your logins for it are stored scrambled.',
      tech: 'Your own Cloudflare R2 bucket, in the jurisdiction you choose. Credentials encrypted at rest.',
    },
  },
  {
    name: { plain: 'Who emails come from', tech: 'Email' },
    body: {
      plain:
        'Mail to your DJs and artists goes out from your label, not from us. Your name in the inbox, your reply address.',
      tech: 'Your own Resend API key and sender identity, with per-tenant from-name and reply-to.',
    },
  },
  {
    name: { plain: 'Where alerts land', tech: 'Telegram' },
    body: {
      plain:
        'Point alerts at your own Telegram, with a test button that tells you plainly what went wrong if they do not arrive.',
      tech: 'Your own Telegram bot token and chat ID, with a send-test endpoint rate limited to 10/hour.',
    },
  },
  {
    name: { plain: 'Which AI writes your demo replies', tech: 'AI' },
    body: {
      plain: 'Your own account, and you choose which AI drafts the replies — or turn it off entirely.',
      tech: 'Your own OpenRouter API key, with a model picker per use case.',
    },
  },
]

export default function OwnYourFiles() {
  const pick = usePick()
  const { voice } = useVoice()

  return (
    <section className="band">
      <div className="shell">
        <div className="card overflow-hidden">
          <div className="grid gap-12 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-14">
            <div>
              <h2 className="t-h2">Your masters live in your storage.</h2>

              {voice === 'plain' ? (
                <>
                  <p className="t-body mt-5 text-lg">
                    We don&rsquo;t sell you storage and mark it up. You open your own
                    account with Cloudflare, point Labelnest at it, and your audio sits
                    there — on your bill, in your name, in the part of the world you
                    choose.
                  </p>
                  <p className="t-body mt-4">
                    Setting it up is guided, step by step. We check that we can reach it,
                    save a file, read it back and serve it to your browser. If a step
                    fails we tell you exactly what to change, in words, with anything you
                    need to copy ready to paste.
                  </p>
                </>
              ) : (
                <>
                  <p className="t-body mt-5 text-lg">
                    Labelnest doesn&rsquo;t resell you storage. You point the workspace at
                    your own Cloudflare R2 account, and your audio stays on your bill,
                    under your control, in the jurisdiction you choose.
                  </p>
                  <p className="t-body mt-4">
                    Setup is guided: we verify the bucket is reachable, that we can write,
                    that a signed read works, and that CORS is right — and if a step
                    fails, we tell you exactly what to change, with the JSON to paste.
                  </p>
                </>
              )}

              <blockquote className="mt-8 border-l-2 border-accent pl-5">
                <p className="text-xl font-medium tracking-[-0.02em] text-fg">
                  The platform never becomes a storage reseller.
                </p>
              </blockquote>

              <p className="muted mt-8 max-w-[54ch] text-sm">
                {voice === 'plain'
                  ? 'You can take everything with you at any time — one download of every record you have, saved straight into your own storage, with passwords and keys stripped out. If you leave, we delete our copy and never touch your files. They are yours.'
                  : 'Export every table as gzipped JSON with an object manifest, written into your own bucket, secrets redacted. If you cancel, we delete our rows and leave your bucket alone. It’s yours.'}
              </p>
            </div>

            <div>
              <p className="t-code text-fg-faint">
                {voice === 'plain' ? 'Your accounts, not ours' : 'Bring your own, throughout'}
              </p>
              <dl className="mt-4 divide-y divide-[var(--color-edge)] border-y border-edge">
                {BYO.map((b) => (
                  <div key={b.name.tech} className="py-5">
                    <dt className="t-h3">{pick(b.name)}</dt>
                    <dd className="muted mt-1.5 text-[0.95rem]">{pick(b.body)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
