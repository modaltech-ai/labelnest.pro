const ITEMS = [
  {
    name: 'Isolation in the database',
    body: '39 Row-Level Security policies, enforced through a restricted runtime role that does not own the tables — not a superuser with good intentions.',
  },
  {
    name: 'Per-workspace encryption keys',
    body: 'Secrets are encrypted with AES-256-GCM under a key derived per workspace with HKDF-SHA256. A ciphertext from one workspace cannot be decrypted with another’s key.',
  },
  {
    name: 'Two-factor on every account',
    body: 'TOTP, with recovery codes, encrypted at rest.',
  },
  {
    name: 'Sessions that expire',
    body: '15-minute access tokens. Refresh tokens last 7 days, rotate on every use, and are stored hashed.',
  },
  {
    name: 'Passwords held properly',
    body: 'bcrypt at cost 12. Five failed attempts locks the account for fifteen minutes.',
  },
  {
    name: 'Rate limits per workspace',
    body: '100 requests a minute, keyed so one label cannot exhaust another’s budget.',
  },
  {
    name: 'A real audit trail',
    body: 'Every create, edit and delete — with the values before and after, the IP and the user agent. The application never modifies or deletes an audit entry.',
  },
  {
    name: 'Nothing vanishes',
    body: 'Soft deletes on everything other records point at, and a version column that stops two people silently overwriting each other.',
  },
  {
    name: 'Support that leaves a trace',
    body: 'If we ever need to look inside your workspace it is capped at fifteen minutes, and every request is written into your audit log with our name on it.',
  },
  {
    name: 'Transport',
    body: 'TLS 1.2 and 1.3 only, HSTS for a year, a strict content security policy, and certificates that renew themselves.',
  },
  {
    name: 'Backups',
    body: 'Weekly compressed dumps shipped off-site to Cloudflare R2, with a guard that refuses to upload a dump small enough to be corrupt.',
  },
  {
    name: 'Tested where it counts',
    body: 'Every change is gated by lint, type-check, migrations and tests against a real PostgreSQL and Redis — including tests that run as the restricted role and prove one workspace cannot read another’s data.',
  },
]

export default function Security() {
  return (
    <section id="security" className="band bg-void">
      <div className="shell">
        <div className="max-w-[46rem]">
          <h2 className="t-h2">Isolation you can point at, not just trust.</h2>
          <p className="t-lead mt-5 max-w-none">
            Labelnest is one deployment serving many labels, so isolation is the whole
            product. It&rsquo;s enforced twice: every application query filters by
            workspace, and PostgreSQL denies cross-workspace rows to the database role
            the app actually runs as.
          </p>
          <p className="mt-6 max-w-[44ch] border-l-2 border-accent pl-5 text-lg font-medium text-fg">
            So a forgotten <code className="t-code text-accent-bright">WHERE</code>{' '}
            clause returns nothing instead of another label&rsquo;s data.
          </p>
        </div>

        <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.name}>
              <dt className="t-h3">{item.name}</dt>
              <dd className="muted mt-2 text-[0.95rem]">{item.body}</dd>
            </div>
          ))}
        </dl>

        <p className="muted mt-14 max-w-[64ch] border-t border-edge pt-6 text-sm">
          Files are stored in Cloudflare R2&rsquo;s EU jurisdiction by default, or
          wherever you point your bucket. The database currently runs in the UK. You
          are the controller of your data; we process it for you.
        </p>
      </div>
    </section>
  )
}
