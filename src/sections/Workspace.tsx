import { useVoice } from '../voice'

export default function Workspace() {
  const { voice } = useVoice()
  const plain = voice === 'plain'

  return (
    <section className="band">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="t-h2">Your own address, working straight away.</h2>

          {plain ? (
            <>
              <p className="t-body mt-5 text-lg">
                Every label gets its own web address the moment we set you up —
                yourlabel.labelnest.pro. It works immediately. Nothing to configure,
                no waiting for anything to switch on.
              </p>
              <p className="t-body mt-4">
                Prefer your own domain? Add one line to your domain settings, press
                Check, and point it at us. We handle the padlock for you. Until it is
                confirmed, the address simply doesn&rsquo;t work — so nobody can claim
                a domain that isn&rsquo;t theirs.
              </p>
              <p className="muted mt-6 max-w-[52ch] text-sm">
                Your sign-in only works on your own address. Anyone poking at an
                address that isn&rsquo;t in use gets a blank wall — it won&rsquo;t even
                tell them whether a label exists there.
              </p>
            </>
          ) : (
            <>
              <p className="t-body mt-5 text-lg">
                Every label gets <code className="t-code">{'{slug}'}.labelnest.pro</code>{' '}
                the instant the workspace is created. It works immediately — the
                wildcard certificate already covers it.
              </p>
              <p className="t-body mt-4">
                For a custom domain, publish a{' '}
                <code className="t-code">_labelnest-verify</code> TXT record, press
                Check, then point an A record at us. Until a domain is verified it does
                not resolve at all.
              </p>
              <p className="muted mt-6 max-w-[52ch] text-sm">
                A token issued for your workspace is rejected on another
                workspace&rsquo;s hostname, and unknown hostnames return a flat 404 —
                they don&rsquo;t reveal whether a workspace exists.
              </p>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <p className="t-code text-fg-faint">
              {plain ? 'Included, live immediately' : 'Free with every workspace'}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] break-all">
              <span className="text-accent-bright">yourlabel</span>.labelnest.pro
            </p>
            <p className="muted mt-2 text-sm">
              {plain
                ? 'Ready the moment your label is set up.'
                : 'Live the second the workspace exists.'}
            </p>
          </div>

          <div className="card p-6">
            <p className="t-code text-fg-faint">{plain ? 'Or use your own' : 'Or bring your own'}</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] break-all">
              admin.<span className="text-accent-bright">yourlabel.com</span>
            </p>
            <div className="mt-4 space-y-2">
              <p className="t-code rounded-lg border border-edge bg-white/[0.03] px-3 py-2 break-all text-fg-soft">
                {plain
                  ? 'Add the line we give you to your domain settings'
                  : 'TXT _labelnest-verify → labelnest-domain-verification=…'}
              </p>
              <p className="muted text-sm">
                {plain
                  ? 'We set up the padlock for you once it checks out.'
                  : 'We issue the certificate for you once the record checks out.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
