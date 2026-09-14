export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Is Labelnest ready to use?',
    a: 'The back office is — a working label runs on it every day. The self-serve signup and billing around it are not finished, so we are onboarding labels by hand, a few at a time. That is what the waitlist is for.',
  },
  {
    q: 'Who is it for?',
    a: 'Independent labels small enough that everyone knows everyone, and busy enough that nobody can remember which DJ charted the last EP. It was built for electronic music, but nothing in it is genre-specific.',
  },
  {
    q: 'Where does my data live?',
    a: 'Your files go in a Cloudflare R2 bucket — ideally your own, in the jurisdiction you choose, EU by default. The database currently runs in the UK. You can export everything, any time, into your own bucket.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Yes. You get yourlabel.labelnest.pro immediately, and you can add your own domain after a TXT record check. Issuing the certificate for a custom domain is still a step we run for you.',
  },
  {
    q: 'What happens if I stop paying?',
    a: 'Your workspace goes read-only for a grace period before it is suspended, and your data stays exportable throughout. If you cancel, we delete our rows and leave your storage bucket completely untouched, because it is yours.',
  },
  {
    q: 'Do I need a Cloudflare account?',
    a: 'It is the recommended setup, and it keeps your storage costs on your own bill rather than marked up on ours.',
  },
  {
    q: 'What does it cost?',
    a: 'Not decided yet, and we would rather say so than invent a number. The shape is a flat monthly price per label with a seat cap, and every feature available on every plan — no modules held back for a higher tier. Waitlist members hear first.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Not yet. It works in a phone browser, but it is built for a desk. An installable app is on the list.',
  },
  {
    q: 'Who is behind it?',
    a: 'Quest4Goa Records, an independent electronic label, together with the team that builds their software. We are our own first customer.',
  },
]
