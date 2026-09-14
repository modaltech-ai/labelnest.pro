# Two voices, one set of facts

The page reads in two registers. **Plain is the default.** The glasses button in
the nav — *Geek view* — switches to the technical one, and the choice is
remembered.

## Why

The first draft was written for someone who already knows what Row-Level
Security is. Most people running an independent label do not, and should not
have to decode a database term to work out whether their masters are safe.

An audit of that draft found:

| Term | Occurrences |
|---|---|
| `bucket` | 21 |
| `endpoint` | 13 |
| `Cloudflare R2` | 10 |
| `JSON` | 8 |
| `ISRC` / `UPC` | 9 |
| `Row-Level Security`, `PostgreSQL` | 8 |
| `TOTP`, `bcrypt`, `AES-256`, `HKDF` | 9 |
| `TXT record`, `hostname`, `404` | 9 |

Concentrated in three sections: **Security** (16 hits), **Own your files** (11),
**Your own address** (5). Hero, Problem, Promo and Pipeline were already fine.

After the rewrite, plain mode contains **zero** technical terms. (A jargon scan
returns six hits for "a record" — all the ordinary English phrase, as in "a
record of who changed what".)

## The rule

**Both registers must be equally true.** Plain wording says what a thing means
for the label; geek wording names the mechanism. Neither may claim anything the
other contradicts, and neither may claim anything outside `CLAIMS.md`.

Plain is not vaguer, it is differently specific — "five wrong guesses locks the
account for fifteen minutes" is plain *and* exact.

## How it translates

| Geek view | Plain |
|---|---|
| 39 Row-Level Security policies enforced through a restricted runtime role | Every label is sealed off from every other one, and the separation is built into the storage itself — not just into our code remembering to ask |
| A forgotten `WHERE` clause returns nothing instead of another label's data | A mistake in our code shows you nothing, never somebody else's catalogue |
| AES-256-GCM under a key derived per workspace with HKDF-SHA256 | Your private details are stored scrambled, with a key unique to your label |
| TOTP two-factor with recovery codes | Everyone signs in with a code from an app like Google Authenticator |
| 15-minute access tokens, 7-day rotating refresh tokens | A session left open on a studio laptop does not stay open forever |
| bcrypt at cost 12 | We could not tell you your own password if you asked |
| 100 requests a minute, keyed per workspace | However hard someone else hammers it, your side keeps working |
| Soft deletes and optimistic locking | Deleting something does not really delete it, and two people editing at once do not overwrite each other |
| Impersonation capped at 15 minutes, written to the tenant's audit log | If we look inside your account, you find out — it is in your own history, with our name on it |
| Publish a `_labelnest-verify` TXT record, then point an A record at us | Add one line to your domain settings, press Check, and point it at us |
| Export as gzipped JSON with an object manifest, secrets redacted | One download of every record you have, with passwords and keys stripped out |
| Previews transcode in the background, BPM detected in the browser | Short previews are made for you in the background, the tempo is worked out automatically |
| `19 endpoints` | `the heart of it` |
| Self-serve signup and billing | Signing up and paying online, by yourself |
| Installable mobile app (PWA) | A proper phone version |
| Outbound webhooks | Sending updates to other tools you use |

## Where the copy lives

| File | Sections |
|---|---|
| `src/content/security.ts` | All twelve security items, intro, pull quote, footnote |
| `src/content/modules.ts` | Module names, labels and descriptions |
| `src/content/faq.ts` | Questions *and* answers — plain mode asks "Is it ready to use?", geek asks "Is Labelnest ready to use?" |
| `src/content/roadmap.ts` | Both lists |
| `src/sections/*.tsx` | Prose-heavy sections branch inline on `useVoice()` |

## Adding copy

Anything with a technical and a plain form is a `Dual` (`src/voice.tsx`):

```ts
{ plain: 'Copies are taken every week', tech: 'Off-site backups' }
```

Read it with `usePick()` for data, or branch on `useVoice()` for JSX. Text that
reads the same either way stays a plain string.

One extra question was added for plain readers only — *"Do I need to be
technical to use it?"* — because it is the question that actually stops a label
owner from signing up. Geek view shows the same entry as *"What does setup
involve?"* with the real steps.
