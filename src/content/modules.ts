/**
 * Every entry here is a module that exists in the product today.
 * Check CLAIMS.md before adding or rewording one.
 */
export type Module = {
  name: string
  spec: string
  body: string
  /** Shown as chips in the two lead cells. Must be values the product really has. */
  detailLabel?: string
  details?: string[]
}

export const MODULES: Module[] = [
  {
    name: 'Releases',
    spec: '19 endpoints',
    body: 'Catalogue numbers, track listings with ISRC, BPM and key, artwork, credits, press text, UPC and encrypted revenue splits.',
    detailLabel: 'Six release types',
    details: ['Single', 'EP', 'Album', 'Compilation', 'Remix', 'Various Artists'],
  },
  {
    name: 'Catalogue',
    spec: 'grid or list',
    body: 'Finished work, kept apart from work in progress. A cover-art grid you filter by type and year. One button promotes a release into it, and moves it back if you need to.',
    detailLabel: 'Store link fields on every release',
    details: ['Spotify', 'Apple Music', 'Beatport', 'Bandcamp', 'Tidal', 'Deezer', 'Juno', 'Discogs', '+ your own'],
  },
  {
    name: 'Contacts',
    spec: '18 types',
    body: 'The label address book. DJs, mastering engineers, playlist curators, venues, PR. Multiple emails and phones, social links, tags, relationships between people, and a merge tool for when the same person arrives twice.',
  },
  {
    name: 'Demos and A&R',
    spec: 'public inbox',
    body: 'A submission form the public can use, so unsigned producers stop filling your personal email. Threaded internal notes, bulk triage, AI-drafted replies you edit before sending, and one click to turn a demo into a track.',
  },
  {
    name: 'Promo',
    spec: '5 delivery states',
    body: 'Build a recipient list from your contacts, send a package, then track every recipient through delivery, feedback, rating, chart support and follow-up — all recorded against the release.',
  },
  {
    name: 'Events',
    spec: '8 event types',
    body: 'Label nights, festival stages, showcases and livestreams. Lineups with set times, budgets estimated against actual across nine categories, ticket tiers, guest lists with plus-ones and check-in, and a wrap-up form.',
  },
  {
    name: 'Campaigns',
    spec: 'planned vs actual',
    body: 'A content calendar of planned posts with copy, assets and per-item status, plus the targets you set at the start and the real numbers you log against them at the end.',
  },
  {
    name: 'Sample library',
    spec: '30 endpoints',
    body: 'Folders, tags, favourites and waveforms, with a player bar that keeps playing while you browse. Previews transcode in the background, BPM is detected in your browser, and you can zip a folder or hand someone a share link.',
  },
  {
    name: 'Tasks',
    spec: 'list or kanban',
    body: 'Priorities, due dates, recurrence, comments, and templates that generate a whole release checklist at once instead of you retyping it every time.',
  },
  {
    name: 'Files',
    spec: 'versioned',
    body: 'Everything uploaded anywhere, in one browser, with old versions kept and storage usage shown per module. Uploads go straight to your bucket, never through us.',
  },
  {
    name: 'Reports',
    spec: '6 reports',
    body: 'Releases, contacts, events, campaigns, promos and activities, summarised over whatever period you pick.',
  },
  {
    name: 'Users and audit',
    spec: '5 roles',
    body: 'Owner through read-only, two-factor on every account, and a searchable log of every create, edit and delete — who did it, when, from where, and what the value was before.',
  },
]
