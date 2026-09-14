export default function Workspace() {
  return (
    <section className="band">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="t-h2">Your address, working the moment you sign up.</h2>
          <p className="t-body mt-5 text-lg">
            Every label gets its own address the instant the workspace is created. It
            works immediately — the wildcard certificate already covers it.
          </p>
          <p className="t-body mt-4">
            When you&rsquo;re ready for your own domain, publish one TXT record, press
            Check, and point an A record at us. Until a domain is verified, it
            doesn&rsquo;t resolve at all.
          </p>
          <p className="muted mt-6 max-w-[52ch] text-sm">
            A token issued for your workspace is rejected on anyone else&rsquo;s
            hostname, and unknown hostnames return a flat 404 — they don&rsquo;t reveal
            whether a workspace exists.
          </p>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <p className="t-code text-fg-faint">Free with every workspace</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] break-all">
              <span className="text-accent-bright">yourlabel</span>.labelnest.pro
            </p>
            <p className="muted mt-2 text-sm">Live the second the workspace exists.</p>
          </div>

          <div className="card p-6">
            <p className="t-code text-fg-faint">Or bring your own</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] break-all">
              admin.<span className="text-accent-bright">yourlabel.com</span>
            </p>
            <div className="mt-4 space-y-2">
              <p className="t-code rounded-lg border border-edge bg-white/[0.03] px-3 py-2 break-all text-fg-soft">
                TXT _labelnest-verify → labelnest-domain-verification=…
              </p>
              <p className="muted text-sm">
                We issue the certificate for you once the record checks out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
