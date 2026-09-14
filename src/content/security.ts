import type { Dual } from '../voice'

/**
 * Plain wording says what it means for the label; geek wording names the
 * mechanism. Both must be true — see CLAIMS.md. Nothing may appear in the
 * plain column that the technical column would contradict.
 */
export type SecurityItem = { name: Dual; body: Dual }

export const SECURITY_ITEMS: SecurityItem[] = [
  {
    name: {
      plain: 'No other label can see your work',
      tech: 'Isolation enforced in the database',
    },
    body: {
      plain:
        'Every label is sealed off from every other one, and the separation is built into the storage itself — not just into our code remembering to ask for the right label. A mistake on our side returns nothing rather than someone else’s catalogue.',
      tech: '39 Row-Level Security policies in PostgreSQL, enforced through a restricted runtime role that does not own the tables — not a superuser with good intentions.',
    },
  },
  {
    name: {
      plain: 'Your private details are scrambled',
      tech: 'Per-workspace encryption keys',
    },
    body: {
      plain:
        'Revenue splits, your storage logins and your two-step codes are stored scrambled, with a key unique to your label. Even if someone walked off with the file, they could not read it — and a key from another label would not open yours.',
      tech: 'AES-256-GCM under a key derived per workspace with HKDF-SHA256. A ciphertext from one workspace cannot be decrypted with another’s key.',
    },
  },
  {
    name: { plain: 'Two-step sign-in, for everyone', tech: 'TOTP two-factor on every account' },
    body: {
      plain:
        'Everyone signs in with a code from an app like Google Authenticator, not just a password. You get backup codes in case you lose your phone, and those are stored scrambled too.',
      tech: 'TOTP (RFC 6238) with recovery codes, encrypted at rest.',
    },
  },
  {
    name: { plain: 'Forgotten logins expire by themselves', tech: 'Sessions that expire' },
    body: {
      plain:
        'A session left open on a studio laptop does not stay open forever. Sign-ins time out on their own and have to be renewed.',
      tech: '15-minute access tokens. Refresh tokens last 7 days, rotate on every use, and are stored hashed.',
    },
  },
  {
    name: { plain: 'Passwords are never stored as you typed them', tech: 'Passwords held properly' },
    body: {
      plain:
        'We could not tell you your own password if you asked. And five wrong guesses locks the account for fifteen minutes, so nobody can sit there trying.',
      tech: 'bcrypt at cost 12. Five failed attempts locks the account for fifteen minutes.',
    },
  },
  {
    name: { plain: 'A busy label can never slow yours down', tech: 'Rate limits per workspace' },
    body: {
      plain:
        'Each label gets its own share of the system. However hard someone else hammers it, your side keeps working.',
      tech: '100 requests a minute, keyed per workspace so one label cannot exhaust another’s budget.',
    },
  },
  {
    name: { plain: 'You can see who changed what', tech: 'A complete audit trail' },
    body: {
      plain:
        'Every edit is recorded — who did it, when, and what it said before. When two partners disagree about who changed a release date, the answer is written down.',
      tech: 'Every create, edit and delete, with values before and after, plus IP and user agent. The application never modifies or deletes an audit entry.',
    },
  },
  {
    name: { plain: 'Deleting something does not really delete it', tech: 'Soft deletes and versioning' },
    body: {
      plain:
        'Anything other records point at is hidden rather than destroyed, so an accidental delete does not take a release’s history with it. And if two of you edit the same thing at once, neither of you silently loses the work.',
      tech: 'Soft deletes on every referenced table, and a version column for optimistic locking.',
    },
  },
  {
    name: { plain: 'If we look inside, you find out', tech: 'Audited support access' },
    body: {
      plain:
        'If you ask us for help and we need to look at your account, we get fifteen minutes and every single thing we do is written into your own history, with our name on it. You can check afterwards.',
      tech: 'Impersonation capped at 15 minutes; every request under it is written to that tenant’s audit log with the platform admin’s identity.',
    },
  },
  {
    name: { plain: 'The connection is locked', tech: 'Transport security' },
    body: {
      plain:
        'Everything between your browser and us is encrypted, with the padlock kept up to date automatically. Nothing travels in the open.',
      tech: 'TLS 1.2 and 1.3 only, HSTS for a year, a strict content security policy, and certificates that renew themselves.',
    },
  },
  {
    name: { plain: 'Copies are taken every week', tech: 'Off-site backups' },
    body: {
      plain:
        'A full copy of your label’s records is taken weekly and kept somewhere else, with a check that refuses to save a copy that looks too small to be complete.',
      tech: 'Weekly pg_dump, compressed and shipped to Cloudflare R2, with a guard that refuses to upload a dump under 100 KB.',
    },
  },
  {
    name: { plain: 'We test the separation, not just claim it', tech: 'Isolation proven in CI' },
    body: {
      plain:
        'Before any change goes live, it has to pass a set of automatic checks — including ones that deliberately try to read another label’s data and must fail.',
      tech: 'Every change is gated by lint, type-check, migrations and tests against a real PostgreSQL and Redis, including tests that run as the restricted role and prove one workspace cannot read another’s data.',
    },
  },
]

export const SECURITY_INTRO: Dual = {
  plain:
    'Labelnest runs many labels on one system, so keeping them apart is the whole job. We do it twice over: once in the software, and again in the storage underneath, which refuses to hand over another label’s records even if the software asks wrongly.',
  tech: 'Labelnest is one deployment serving many labels, so isolation is the whole product. It is enforced twice: every application query filters by workspace, and PostgreSQL denies cross-workspace rows to the database role the app actually runs as.',
}

export const SECURITY_PULL: Dual = {
  plain: 'A mistake in our code shows you nothing, never somebody else’s catalogue.',
  tech: 'So a forgotten WHERE clause returns nothing instead of another label’s data.',
}

export const SECURITY_FOOTNOTE: Dual = {
  plain:
    'Your files are kept in Europe by default, or wherever you choose to put them. The records themselves currently live on a server in the UK. The data is yours; we only look after it.',
  tech: 'Files are stored in Cloudflare R2’s EU jurisdiction by default, or wherever you point your bucket. The database currently runs in the UK. You are the controller of your data; we process it for you.',
}
