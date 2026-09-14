const BYO = [
  {
    name: 'Storage',
    body: 'Your Cloudflare R2 bucket, in the jurisdiction you choose. Credentials encrypted at rest.',
  },
  {
    name: 'Email',
    body: 'Your Resend key and your sender identity, so mail reaches people from your label, not from us.',
  },
  {
    name: 'Telegram',
    body: 'Your own bot for alerts, with a test button that tells you exactly why it failed.',
  },
  {
    name: 'AI',
    body: 'Your own key, and you pick the model that drafts demo replies.',
  },
]

export default function OwnYourFiles() {
  return (
    <section className="band">
      <div className="shell">
        <div className="card overflow-hidden">
          <div className="grid gap-12 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-14">
            <div>
              <h2 className="t-h2">Your masters live in your bucket.</h2>
              <p className="t-body mt-5 text-lg">
                Labelnest doesn&rsquo;t resell you storage. You point the workspace at
                your own Cloudflare R2 account, and your audio stays on your bill,
                under your control, in the jurisdiction you choose.
              </p>
              <p className="t-body mt-4">
                Setup is guided: we check the bucket is reachable, that we can write,
                that a signed read works, and that CORS is right — and if a step fails,
                we tell you exactly what to change, with the JSON to paste.
              </p>

              <blockquote className="mt-8 border-l-2 border-accent pl-5">
                <p className="text-xl font-medium tracking-[-0.02em] text-fg">
                  The platform never becomes a storage reseller.
                </p>
              </blockquote>

              <p className="muted mt-8 max-w-[54ch] text-sm">
                Export every table as gzipped JSON with an object manifest, written
                into your own bucket, secrets redacted. If you cancel, we delete our
                rows and leave your bucket alone. It&rsquo;s yours.
              </p>
            </div>

            <div>
              <p className="t-code text-fg-faint">Bring your own, throughout</p>
              <dl className="mt-4 divide-y divide-[var(--color-edge)] border-y border-edge">
                {BYO.map((b) => (
                  <div key={b.name} className="py-5">
                    <dt className="t-h3">{b.name}</dt>
                    <dd className="muted mt-1.5 text-[0.95rem]">{b.body}</dd>
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
