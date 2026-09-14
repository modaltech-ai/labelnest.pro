/**
 * Every entry here is a module that exists in the product today.
 * Check CLAIMS.md before adding or rewording one.
 */
import type { Dual } from '../voice'

export type Module = {
  name: string
  spec: Dual
  body: Dual
  /** Shown as chips in the two lead cells. Must be values the product really has. */
  detailLabel?: Dual
  details?: string[]
}

export const MODULES: Module[] = [
  {
    name: 'Releases',
    spec: { plain: 'the heart of it', tech: '19 endpoints' },
    body: { plain: 'Catalogue numbers, track listings with ISRC, tempo and key, artwork, credits, press text, barcodes, and revenue splits kept scrambled so only you can read them.', tech: 'Catalogue numbers, track listings with ISRC, BPM and key, artwork, credits, press text, UPC and encrypted revenue splits.' },
    detailLabel: { plain: 'Six kinds of release', tech: 'Six release types' },
    details: ['Single', 'EP', 'Album', 'Compilation', 'Remix', 'Various Artists'],
  },
  {
    name: 'Catalogue',
    spec: { plain: 'grid or list', tech: 'grid or list' },
    body: { plain: 'Finished work, kept apart from work in progress. A cover-art grid you filter by type and year. One button promotes a release into it, and moves it back if you need to.', tech: 'Finished work, kept apart from work in progress. A cover-art grid you filter by type and year. One button promotes a release into it, and moves it back if you need to.' },
    detailLabel: { plain: 'Add your shop links to any release', tech: 'Store link fields on every release' },
    details: ['Spotify', 'Apple Music', 'Beatport', 'Bandcamp', 'Tidal', 'Deezer', 'Juno', 'Discogs', '+ your own'],
  },
  {
    name: 'Contacts',
    spec: { plain: '18 kinds of contact', tech: '18 types' },
    body: { plain: 'The label address book. DJs, mastering engineers, playlist curators, venues, PR. Multiple emails and phones, social links, tags, relationships between people, and a merge tool for when the same person arrives twice.', tech: 'The label address book. DJs, mastering engineers, playlist curators, venues, PR. Multiple emails and phones, social links, tags, relationships between people, and a merge tool for when the same person arrives twice.' },
  },
  {
    name: 'Demos and A&R',
    spec: { plain: 'open to the public', tech: 'public inbox' },
    body: { plain: 'A submission form the public can use, so unsigned producers stop filling your personal email. Private notes, quick sorting, replies the computer drafts for you to edit, and one click to turn a demo into a track.', tech: 'A submission form the public can use, so unsigned producers stop filling your personal email. Threaded internal notes, bulk triage, AI-drafted replies you edit before sending, and one click to turn a demo into a track.' },
  },
  {
    name: 'Promo',
    spec: { plain: '5 stages tracked', tech: '5 delivery states' },
    body: { plain: 'Pick who gets the promo from your contacts, send it, then keep track of each person — did it arrive, did they open it, what did they say, did they chart it, do you need to chase them.', tech: 'Build a recipient list from your contacts, send a package, then track every recipient through delivery, feedback, rating, chart support and follow-up — all recorded against the release.' },
  },
  {
    name: 'Events',
    spec: { plain: '8 kinds of event', tech: '8 event types' },
    body: { plain: 'Label nights, festival stages, showcases and livestreams. Lineups with set times, budgets estimated against actual across nine categories, ticket tiers, guest lists with plus-ones and check-in, and a wrap-up form.', tech: 'Label nights, festival stages, showcases and livestreams. Lineups with set times, budgets estimated against actual across nine categories, ticket tiers, guest lists with plus-ones and check-in, and a wrap-up form.' },
  },
  {
    name: 'Campaigns',
    spec: { plain: 'planned vs actual', tech: 'planned vs actual' },
    body: { plain: 'A calendar of posts you have planned, with the words, the artwork and where each one has got to — plus the goals you set at the start and the real numbers at the end.', tech: 'A content calendar of planned posts with copy, assets and per-item status, plus the targets you set at the start and the real numbers you log against them at the end.' },
  },
  {
    name: 'Sample library',
    spec: { plain: 'with a built-in player', tech: '30 endpoints' },
    body: { plain: 'Folders, tags, favourites and artwork, with a player that keeps going while you browse. Short previews are made for you in the background, the tempo is worked out automatically, and you can zip up a folder or hand someone a link.', tech: 'Folders, tags, favourites and waveforms, with a player bar that keeps playing while you browse. Previews transcode in the background, BPM is detected in your browser, and you can zip a folder or hand someone a share link.' },
  },
  {
    name: 'Tasks',
    spec: { plain: 'list or board', tech: 'list or kanban' },
    body: { plain: 'Priorities, due dates, recurrence, comments, and templates that generate a whole release checklist at once instead of you retyping it every time.', tech: 'Priorities, due dates, recurrence, comments, and templates that generate a whole release checklist at once instead of you retyping it every time.' },
  },
  {
    name: 'Files',
    spec: { plain: 'old versions kept', tech: 'versioned' },
    body: { plain: 'Everything uploaded anywhere, in one place, with older versions kept and space used shown per area. Uploads go straight to your own storage, never through us.', tech: 'Everything uploaded anywhere, in one browser, with old versions kept and storage usage shown per module. Uploads go straight to your bucket, never through us.' },
  },
  {
    name: 'Reports',
    spec: { plain: '6 reports', tech: '6 reports' },
    body: { plain: 'Releases, contacts, events, campaigns, promos and activities, summarised over whatever period you pick.', tech: 'Releases, contacts, events, campaigns, promos and activities, summarised over whatever period you pick.' },
  },
  {
    name: 'Users and audit',
    spec: { plain: '5 permission levels', tech: '5 roles' },
    body: { plain: 'Owner through read-only, two-factor on every account, and a searchable log of every create, edit and delete — who did it, when, from where, and what the value was before.', tech: 'Owner through read-only, two-factor on every account, and a searchable log of every create, edit and delete — who did it, when, from where, and what the value was before.' },
  },
]
