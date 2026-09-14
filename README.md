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
| `CLAIMS.md` | **What the page is allowed to say**, with citations into the product repo. Read before changing any factual claim. |
| `src/content/*` | Structured content — modules, pipeline stages, roadmap, FAQ. |
| `src/sections/*` | One component per page section. |
| `src/index.css` | Design tokens and shared component classes. |

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

## Before launch

- [ ] Create the `hello@labelnest.pro` mailbox — the footer links to it, the
      form falls back to it, and `waitlist.php` sends notifications there.
      Until it exists those notification emails go nowhere.
- [x] ~~Waitlist endpoint~~ — live at `/api/waitlist.php`
- [x] ~~OG image~~ — `public/og-image.png`, 1200x630
- [x] ~~Apex domain~~ — handled by Hostinger, both apex and `www` serve 200
