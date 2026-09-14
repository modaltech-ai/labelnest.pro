/** Same-origin PHP endpoint shipped in `public/api/`. Override to post
 *  somewhere else (Formspree, a Worker) without touching the component. */
const configured = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim()
export const WAITLIST_ENDPOINT = configured || '/api/waitlist.php'
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@labelnest.pro'

export const NAV = [
  { href: '#product', label: 'Product' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#security', label: 'Security' },
  { href: '#roadmap', label: 'Roadmap' },
]
