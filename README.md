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

## Before launch

- [ ] Point `VITE_WAITLIST_ENDPOINT` at a real endpoint
- [ ] Set `VITE_CONTACT_EMAIL` to a mailbox that exists (`hello@labelnest.pro` does not yet)
- [ ] Add `public/og-image.png` at 1200×630 — referenced by the meta tags, not yet created
- [ ] Hosting: the `labelnest.pro` apex and `www` are **not** in the product's nginx
      config, and the wildcard certificate covers `*.labelnest.pro` only. Serving the
      apex needs both a certificate change and an nginx change.
