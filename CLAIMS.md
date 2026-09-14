# CLAIMS.md — what this landing page is allowed to say

**Rule:** every factual statement on `labelnest.pro` must map to a line in the "Verified" table
below. Nothing may be sourced from `CLAUDE.md` or `README.md` in the product repo — those are
*specification* documents written ahead of the build, and a meaningful number of their claims were
never implemented.

Source repo for all citations: `/home/modaltech/app.quest4goarecords.com`
Audited: 14 September 2026.

---

## ❌ Must NOT appear on the page

These are all stated in the product's own spec docs and are **not true in code**. Publishing any of
them would be a false advertising claim.

| Forbidden claim | Reality |
|---|---|
| "Spotify / Apple Music / Beatport integration" | No OAuth, no API client, no sync job. They exist only as **manually typed URL fields** in a JSONB column (`schema.ts:526-528`). Safe wording: *"store streaming and store links"*. |
| "Google Calendar sync" | Zero references anywhere in the codebase. No iCal export either. |
| "Charts", "analytics dashboards" | Recharts is **not a dependency**. `ReportsPage.tsx:59` has a hand-rolled CSS bar (divs with percentage widths). Safe wording: *"distribution bars"* or just *"reports"*. |
| "Calendar view" | No calendar grid exists. Events render as lists. |
| "Gantt / timeline view" | Zero matches in the web app. |
| "Drag and drop" | No dnd library. The kanban is a column layout, not reorderable. |
| "PDF / XLSX export" | No generation code, no libraries. The `pdf`/`xlsx` strings are MIME-type display labels. |
| "Outbound webhooks" | Table + queue exist; the worker processor is a `console.log` stub (`apps/worker/src/index.ts:79-82`), there is no webhooks API module and no UI. |
| "Custom fields" | Settings → General is an explicit *"Coming soon"* panel (`SettingsPage.tsx:1962-1970`). |
| "Real-time collaboration", "live edit presence" | Server-side WebSocket plugin exists but **the SPA contains zero WebSocket references** — it polls. |
| "All your data stays in the EU" | Files are EU-jurisdiction R2; **the database is hosted in the UK** (`docs/multi-tenant-saas-plan.md:251`). |
| "90-day backup retention" | The R2 lifecycle rule is an open manual task (`docs/manual-maintenance-q4grec.md:25`). |
| "Database-enforced append-only audit log" | It's a convention, not a constraint — no trigger, no REVOKE. ✅ Safe alternative: *"the application never modifies or deletes an audit entry"* (verified by grep). |
| "pgcrypto", "database-level encryption" | Encryption is **application-level AES-256-GCM** only. |
| Any uptime %, "monitored", "tested disaster recovery" | No monitoring, no restore rehearsal, no staging (`docs/manual-maintenance-q4grec.md:35-37`). |
| Any test-coverage percentage | Never measured. |
| "DPA", "privacy policy", "sub-processor list" | Proposed in the plan, not written. |
| Any price, tier name, seat count, GB figure | No numbers exist anywhere in the repo. Only the *shape* is decided (flat per-label + seat cap). |
| "We'll email your invite" | Invite and password-reset emails are `TODO` stubs (`auth.service.ts:362`, `:472`). Belongs in **Building**, not Shipped. |
| "Mobile app" | `docs/mobile-plan.md` is explicit: *"Partially mobile-ready, but not deployable as a phone-first product yet."* PWA is planned, not built. |

---

## ✅ Verified — safe to publish

### Product identity
| Claim | Citation |
|---|---|
| Product name is **Labelnest**, one word, capital L, lowercase n. Never "LabelNest" or "Label Nest". | `packages/shared/src/constants/saas.ts:8` — `PRODUCT_NAME = 'Labelnest'` |
| Quest4Goa Records is tenant #1 and runs its whole operation on this exact code | `CLAUDE.md:12`; `docs/multi-tenant-saas-plan.md` §1 |
| A tenant's instance is called a **workspace** in user-facing copy | Addendum B §B.1 |
| Category noun: **label back office** | `docs/multi-tenant-saas-plan.md` title |

### Scale (countable, each verified by grep)
| Figure | Citation |
|---|---|
| 42 PostgreSQL tables | `grep -c "pgTable(" apps/api/src/db/schema.ts` |
| 20 API modules | `ls apps/api/src/modules/` |
| 249 HTTP endpoints under `/api/v1/` | grep across module route files |
| 21 frontend feature areas | `ls apps/web/src/features/` |
| 30 database migrations | `ls apps/api/src/db/migrations/*.sql` |
| 39 Row-Level Security policies | `grep -c "CREATE POLICY"` in migrations |
| 17 test suites (15 API + 2 web) | `apps/api/src/__tests__/`, `apps/web/src/__tests__/` |

### Enumerated values (verbatim from `packages/shared/src/constants/enums.ts`)
| Set | Values |
|---|---|
| **11 release pipeline stages** (`DEFAULT_PIPELINE_STEPS`) | Idea & A&R · Demo Review · Production · Mastering · Artwork & Visual · Metadata & Credits · Distribution Delivery · Store Scheduling · Pre-Release Marketing · Release Day · Post-Release Follow-Up |
| **18 contact types** | Artist, Roster, DJ, Producer, Promoter, Booking Agent, Distributor, Mastering Engineer, Graphic Designer, Journalist, Blogger, Radio Host, Playlist Curator, Venue, Festival, PR Agency, Sync Licensing, Other |
| **10 release statuses** | Idea, DemoReceived, InProduction, Mastering, Artwork, MetadataReady, DeliveredToDistributor, Scheduled, Released, Pulled |
| **6 release types** | Single, EP, Album, Compilation, Remix, VA |
| **5 promo delivery states** | Pending → Sent → Delivered → Opened → Downloaded |
| **4 promo statuses** | Preparing, Sent, FollowUpSent, Closed |
| **11 activity types** | Task, Phone Call, Email, Meeting, Studio Session, File Delivery, Contract Signing, Payment, Reminder, Note, Other |
| **8 event types** | Label Night, Festival Stage, Showcase, Listening Party, Livestream, Workshop, Pop-Up, Other |
| **9 event budget categories** | Artist Fees, Travel, Accommodation, Production, Sound, Visuals, Marketing, Venue, Miscellaneous |
| **5 user roles** | owner, manager, contributor, readonly, distributor |
| **12 streaming/store link fields per release** + custom | spotify, appleMusic, beatport, bandcamp, soundcloud, youtube, tidal, deezer, amazonMusic, junoDownload, mixcloud, discogs (`schema.ts:526-528`) |
| **34 musical keys** on tracks | `enums.ts` |

⚠️ **Campaign channels are NOT an enum** — free-text array (`schemas/campaigns.ts:18,53`). Do not claim "N supported channels."

### Modules that genuinely exist (endpoint counts verified)
Library (30) · Events (21) · Contacts (20) · Releases (19) · Demos (18) · Settings (18) ·
Activities (16) · Campaigns (15) · Platform console (15) · Auth (13) · Promos (12) · Artists (10) ·
Tracks (10) · Remix contests (8) · Users (7) · Reports (6) · Files (5) · Notifications (4) ·
Dashboard (1) · Search (1)

### Capabilities confirmed in the UI
| Claim | Citation |
|---|---|
| Kanban board for tasks (list/kanban toggle) | `ActivitiesListPage.tsx` — the only kanban in the product |
| Catalogue cover-art grid with grid/list toggle, persisted | `features/catalog/pages/CatalogPage.tsx` |
| "Move to catalog" / "Move back to releases", fully reversible | `releases.routes.ts`; `docs/catalogo-feature.pdf` |
| Release pipeline checklist with completed/total progress | `ReleaseDetailPage.tsx:911-941` |
| CSV **import** of contacts (10 MB limit) | `ImportContactsDialog.tsx` → `contacts.routes.ts:703` |
| Contact merge, contact relationships, GDPR export per contact | `contacts-advanced.routes.ts:19-151` |
| In-browser audio players across pool, library, demos, releases | 9 files with `<audio>` / `new Audio()` |
| Persistent library player bar | `LibraryPlayerBar.tsx` + zustand `playerStore` |
| Client-side BPM detection via kick-peak inter-onset intervals | `apps/web/src/lib/audio-analysis.ts` |
| Waveform thumbnails | `WaveformThumb.tsx` |
| ffmpeg-transcoded 192 kbps MP3 previews, generated in background | `jobs/generate-library-sound-preview.ts` |
| Client-side ZIP download via JSZip | `library/utils/downloadZip.ts` |
| Bulk delete / move / tag in the library; bulk ops on demos | `library.routes.ts`, `demos.routes.ts` |
| Public share links for library folders (`/share/:token`) | `LibrarySharePage.tsx` |
| Global search across 7 modules, grouped results | `GlobalSearch.tsx`, `search.routes.ts:90-176` |
| PostgreSQL full-text search with `ts_rank` relevance | `search.routes.ts` ⚠️ **unindexed** — do not say "indexed" |
| Direct-to-storage uploads via presigned URL with progress | `hooks/useFileUpload.ts`, `lib/upload.ts` |
| Guest lists with plus-ones and check-in | `schema.ts:710` |
| Event budgets, estimated vs actual, by line item | `schema.ts:639-686` |
| Event wrap-up: attendance, revenue, costs, lessons learned | `schema.ts` `wrap_up` JSONB |
| Campaign content calendar items with per-item status | `campaign_content_items`, `schema.ts:865` |
| Campaign KPIs planned vs actual | `campaigns` `kpis` / `actual_results` JSONB |
| Task templates, applied to create batches of linked tasks | `activities` module, `task_templates` table |
| Dark/light theme toggle | `hooks/useTheme.ts` |

### A&R
| Claim | Citation |
|---|---|
| Public demo submission inbox (no login for the submitter), IP rate-limited | `demos.routes.ts` |
| Threaded internal notes on each demo | `demo_notes` table |
| **AI-assisted demo reply drafting** via OpenRouter, tenant supplies its own key; model recorded on each draft | `common/plugins/ai.ts:50`; `POST /demos/:id/draft-reply` |
| Convert a demo into a track; promote a submitter into a contact | `demos.routes.ts` |
| Remix contests with public entry submission and entry lifecycle | `remix-contests.routes.ts` (8 endpoints) |
| Public artist roster endpoints for a label's own marketing site | `artists.routes.ts` — `/artists/public`, `/artists/public/:slug` |

### Promo (per-recipient)
Tracked fields, all real columns in `promo_recipients` (`schema.ts:782-827`): email used, delivery
status, feedback received (y/n), feedback text, rating, chart support + chart details, DJ support
details, follow-up needed, follow-up date, follow-up notes. Plus a per-package response dashboard
endpoint and "copy recipients from a previous package".

### Multi-tenancy & domains
| Claim | Citation |
|---|---|
| Every label gets `{slug}.labelnest.pro` | `saas.ts` `tenantSubdomain()` |
| It works the instant the workspace is created — the wildcard certificate already covers it | `NewLabelDialog.tsx:160` (verbatim product string) |
| Bring your own domain: publish a `_labelnest-verify` TXT record, press Check, point DNS | `saas.ts:60-69`; migration `0029_domain_verification.sql` |
| Unverified hostnames do not resolve | migration `0029` |
| Unknown hostnames return 404 without revealing whether any workspace exists | Addendum B §B.4 |
| A token minted for workspace A is rejected on workspace B's hostname | `common/middleware/auth.ts:25-29,68-74` |
| Operator console lives on its own hostname with its own admin accounts and 2FA | `modules/platform/`, `schema.ts:166` |
| Support impersonation is capped at 15 minutes and every request under it is written to that workspace's audit log with the admin's identity | Addendum B §B.5 |

⚠️ Custom-domain certificate issuance is currently **operator-assisted** (an operator runs one
script). Don't imply it's instant and self-serve end-to-end.

### Bring your own infrastructure
| Claim | Citation |
|---|---|
| Point Labelnest at **your own Cloudflare R2 bucket**; credentials encrypted at rest | `tenant_storage`, migration `0025`; `settings/storage.routes.ts:143` |
| Guided 4-step verification: bucket reachable, write, signed read, CORS — each failure mapped to a plain-language fix | `docs/multi-tenant-saas-plan.md` §3.4 |
| *"The platform never becomes a storage reseller."* — you pay Cloudflare directly for storage and egress | plan §3.4 (verbatim, quotable) |
| On cancellation your bucket is left untouched, because it is yours | Addendum B §B.9 |
| Bring your own Resend API key and sender identity | `tenant_integrations`, migration `0026` |
| Bring your own Telegram bot, with a "send test" button (10/hour) | `settings/integrations.routes.ts`; `notify.ts:146-175` |
| R2 EU jurisdiction supported and used by default | `constants/storage.ts:15`; `docs/runbooks/tenant-storage.md:34` |

### Security (all verified in code)
| Claim | Citation |
|---|---|
| Row-Level Security in PostgreSQL, `FORCE ROW LEVEL SECURITY`, with the API and worker connecting as a **non-owner** `app_runtime` role so policies cannot be bypassed | `infra/scripts/create-runtime-role.sql:1-38`; `plugins/tenant.ts:179` |
| *"so a forgotten `WHERE` clause returns nothing instead of another label's data"* | plan §3.1 (verbatim, quotable) |
| Isolation enforced twice: in every application query **and** in the database | Addendum B §B.3 |
| Per-workspace encryption keys derived with HKDF-SHA256 — a ciphertext from one workspace cannot be decrypted with another's key | `packages/shared/src/server/encryption.ts:36-41` |
| AES-256-GCM, 16-byte IV, auth tag | `encryption.ts:21` |
| Encrypted at rest: revenue splits, TOTP secrets, recovery codes, integration secrets, storage credentials, AI keys | `releases.routes.ts:64`; `auth.service.ts:267,278`; `storage.routes.ts:143` |
| TOTP two-factor (RFC 6238, `otpauth`), ±1 step window | `auth.service.ts:4,200-300` |
| 15-minute access tokens | `plugins/jwt.ts:15` |
| 7-day refresh tokens, rotated, hashed at rest, family-tracked | `auth.service.ts:12`; `schema.ts:272-294` |
| bcrypt cost factor 12 | `auth.service.ts:11` |
| Lockout after 5 failed attempts, 15 minutes | `auth.service.ts:13-14` |
| 100 requests/minute, keyed per workspace+user | `plugins/rate-limit.ts:12-30` |
| Rate limits keyed so one label cannot exhaust another's budget | plan §5.5 |
| WebSocket registry keyed by (tenant, user); a broadcast never reaches another workspace's socket | Addendum B §B.8 |
| Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` | `plugins/security-headers.ts:6-10` |
| HSTS 1 year, includeSubDomains | `infra/nginx/tenant-app.conf:19` |
| Strict CSP incl. `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'` | `tenant-app.conf:25` |
| TLS 1.2 and 1.3 only | `tenant-app.conf:9-10` |
| Audit log records user, action, module, record, **before/after values**, IP and user agent | `schema.ts:295-321` |
| The application never issues UPDATE or DELETE against the audit log | verified by grep |
| Soft deletes on 14 tables — nothing referenced elsewhere is hard-deleted | `grep "deletedAt: timestamp"` → 14 |
| Optimistic locking via a `version` column on editable records | `schema.ts:352,548,676` |
| Input validated by shared Zod schemas, same rules front and back (25 schema files) | `packages/shared/src/schemas/` |
| Whole-workspace export: every table as gzipped JSON + an object manifest, written to **your own bucket**, with password hashes, TOTP secrets and storage credentials redacted | `jobs/export-tenant-data.ts` |
| Weekly `pg_dump` + gzip to Cloudflare R2, with a guard that refuses to upload a dump under 100 KB | `infra/scripts/pg-backup.sh:1-53` |
| Let's Encrypt certificates, auto-renewed every 12 hours | `docker-compose.prod.yml:162` |
| Every change gated in CI by lint → typecheck → migrate → test against real PostgreSQL 16 and Redis 7, **including tests that run as the RLS-constrained role and prove one workspace cannot read another's** | `.github/workflows/ci.yml:28-116` |

### Honest roadmap ("Building")
Verified as **not yet shipped**, and therefore safe to list as in-progress:
self-serve signup and billing (no Stripe code exists) · transactional email delivery for invites and
password resets · mobile PWA · a public catalogue page a label can share without login · automatic
fetching of streaming/store URLs from a UPC · per-release sales and stream statistics · outbound
webhooks · custom fields.

---

## Wording notes

- "workspace" not "tenant" in customer-facing copy.
- "store streaming and store links", never "Spotify integration".
- "reports" not "analytics".
- "the application never modifies or deletes an audit entry", never "append-only, enforced by the database".
- "Files in Cloudflare R2's EU jurisdiction; database in the UK" — never "everything stays in the EU".
