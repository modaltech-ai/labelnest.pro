# labelnest.pro

Marketing landing page for **Labelnest** — the back office for independent record labels.

The product itself lives in [`app.quest4goarecords.com`](https://github.com/modaltech-ai/app.quest4goarecords.com);
Quest4Goa Records is its first workspace. This repo is only the front door.

## Stack

Vite 7 · React 19 · TypeScript · Tailwind CSS v4. Static build, no backend.

Deployed on Hostinger from this repo: a push to `main` triggers a build
(Node 22, `npm run build`, output `dist`).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview   # serve the built output
```

## Configuration

Copy `.env.example` to `.env`:

| Variable | What it does |
|---|---|
| `VITE_WAITLIST_ENDPOINT` | Where the waitlist form POSTs `{ email, label, source }` as JSON. Works with Formspree, Buttondown, a Cloudflare Worker — anything that accepts a JSON POST and returns 2xx. |
| `VITE_CONTACT_EMAIL` | Used for the footer contact link and the form's mail fallback. |

**With no endpoint set, the form does not pretend to work.** It falls back to a
`mailto:` handoff and says so. Set `VITE_WAITLIST_ENDPOINT` before launch.

## Editing the page

| File | What's in it |
|---|---|
| `COPY.md` | **Every word on the page**, in prose. Start here. |
| `VOICE.md` | The two registers — plain English and Geek view — and how to add copy to both. |
| `CLAIMS.md` | **What the page is allowed to say**, with citations into the product repo. Read before changing any factual claim. |
| `src/content/*` | Structured content — modules, pipeline stages, roadmap, FAQ. |
| `src/sections/*` | One component per page section. |
| `src/index.css` | Design tokens and shared component classes. |

### Two registers

The page reads in plain English by default; the glasses button (*Geek view*)
swaps in the technical wording, and the choice is remembered. Both must state
the same facts — see `VOICE.md`.

### The one rule

`CLAIMS.md` exists because the product's own spec documents (`CLAUDE.md`,
`README.md` in the product repo) describe a number of features that were never
built — Spotify and Google Calendar integrations, calendar and Gantt views,
PDF/XLSX export, outbound webhooks, custom fields. **Do not source page copy from
those documents.** Every factual statement here is checked against the product's
actual code, and `CLAIMS.md` records both what is safe to say and what is not.

## Waitlist

`public/api/waitlist.php` is a same-origin endpoint deployed with the site. It
validates the address, drops honeypot submissions, limits each IP to five
signups an hour, appends the signup to JSON Lines and emails a notification.

Signups are stored **outside the document root**, at

```
/home/<user>/domains/labelnest.pro/waitlist-data/signups.jsonl
```

because the Node build overwrites `public_html` on every deploy — anything kept
inside it would be wiped, and anything readable in there would be a public list
of email addresses. Read it over SSH or in hPanel's File Manager:

```bash
cat ~/domains/labelnest.pro/waitlist-data/signups.jsonl
```

To post somewhere else instead (Formspree, Buttondown, a Worker), set
`VITE_WAITLIST_ENDPOINT` — no component changes needed.

### Notifications

Each signup emails `hello@labelnest.pro`. **That has to be a real mailbox, not
just a mail service** — creating the email *order* in hPanel does not create the
mailbox, and mail to an address with no mailbox is rejected outright:

```
550 5.1.1 <hello@labelnest.pro> User doesn't exist
```

Signups are never lost to this — they are written to disk before the email is
attempted, and the endpoint returns 500 if that write fails, so any 200 means
the record is safe. A notification that could not be handed to the mail server
is appended to `notify-failures.log` beside `signups.jsonl`.

### Why SMTP, not mail()

PHP's `mail()` sends from the **web** server (`srv2057.main-hosting.eu`). This
domain's SPF authorises Hostinger's **mail** service instead, and the web server
cannot DKIM-sign for the domain, so DMARC alignment fails and the notification
is filed as spam. Hostinger forces the envelope sender, so `mail()`'s `-f`
parameter does not help.

The endpoint therefore sends through authenticated SMTP as the mailbox, which
makes the envelope sender `hello@labelnest.pro`, passes SPF and gets DKIM-signed.

**One-time setup.** Credentials are deliberately not in this repo. Create this
file on the server, beside `signups.jsonl` and outside the document root:

```
~/domains/labelnest.pro/waitlist-data/smtp.ini
```

```ini
host   = smtp.hostinger.com
port   = 465
user   = hello@labelnest.pro
pass   = <the mailbox password>
notify = you@example.com        ; optional — where alerts are sent
```

`notify` defaults to the mailbox itself. Leave it unset and alerts go from
`hello@labelnest.pro` to `hello@labelnest.pro` — automated mail from an address
to that same address, on a young domain, is a well-known spam heuristic, and
Hostinger filed ours as spam even with SPF and DKIM passing. Pointing `notify`
at a different inbox avoids the pattern.

Until it exists the endpoint falls back to `mail()` and records
`mail` in `notify-failures.log`, so notifications still arrive — just in spam.

Check delivery in hPanel under Emails → Deliverability, or via the API's inbound
logs for the mail order.

## Before launch

- [x] ~~Create the `hello@labelnest.pro` mailbox~~ — created 14 Sep 2026
- [x] ~~Waitlist endpoint~~ — live at `/api/waitlist.php`
- [x] ~~OG image~~ — `public/og-image.png`, 1200x630
- [x] ~~Apex domain~~ — handled by Hostinger, both apex and `www` serve 200
