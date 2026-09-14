import type { Dual } from '../voice'

export type Faq = { q: Dual; a: Dual }

/** Questions a label owner actually asks, answered twice: once in plain
 *  English, once with the mechanism named. Both must be true. */
export const FAQS: Faq[] = [
  {
    q: { plain: 'Is it ready to use?', tech: 'Is Labelnest ready to use?' },
    a: {
      plain:
        'The back office is — a working label runs on it every day. The sign-up-and-pay part around it is not finished, so we are setting labels up by hand, a few at a time. That is what the waitlist is for.',
      tech: 'The back office is — a working label runs on it every day. Self-serve signup and billing are not finished, so we are onboarding labels by hand, a few at a time. That is what the waitlist is for.',
    },
  },
  {
    q: { plain: 'Who is it for?', tech: 'Who is it for?' },
    a: {
      plain:
        'Independent labels small enough that everyone knows everyone, and busy enough that nobody can remember which DJ charted the last EP. It was built for electronic music, but nothing in it is genre-specific.',
      tech: 'Independent labels small enough that everyone knows everyone, and busy enough that nobody can remember which DJ charted the last EP. It was built for electronic music, but nothing in it is genre-specific.',
    },
  },
  {
    q: { plain: 'Do I need to be technical to use it?', tech: 'What does setup involve?' },
    a: {
      plain:
        'No. If you can use Dropbox and a spreadsheet, you can use Labelnest. The one fiddly bit is connecting your own file storage, and we walk you through that step by step — and we can just do it with you on a call.',
      tech: 'Day-to-day use needs nothing technical. Connecting your own R2 bucket involves creating an account, generating keys and pasting a CORS policy we provide; the guided setup verifies each step and names the exact fix when one fails.',
    },
  },
  {
    q: { plain: 'Where is my stuff kept?', tech: 'Where does my data live?' },
    a: {
      plain:
        'Your audio and artwork go into a storage account in your own name — ideally yours, in the part of the world you pick, Europe by default. The records themselves sit on a server in the UK. You can download everything, whenever you want.',
      tech: 'Files go in a Cloudflare R2 bucket — ideally your own, in the jurisdiction you choose, EU by default. The database currently runs in the UK. You can export everything, any time, into your own bucket.',
    },
  },
  {
    q: { plain: 'Can I use my own web address?', tech: 'Can I use my own domain?' },
    a: {
      plain:
        'Yes. You get one from us straight away, and you can swap in your own later by adding a line to your domain settings. We sort out the padlock for you.',
      tech: 'Yes. You get yourlabel.labelnest.pro immediately, and can add your own domain after a TXT record check. Issuing the certificate for a custom domain is still a step we run for you.',
    },
  },
  {
    q: { plain: 'What if I stop paying?', tech: 'What happens if I stop paying?' },
    a: {
      plain:
        'You can still read everything for a while before it is switched off, and you can download it all at any point. If you leave, we delete our copy and never touch your files — those are yours.',
      tech: 'Your workspace goes read-only for a grace period before suspension, and your data stays exportable throughout. If you cancel, we delete our rows and leave your storage bucket untouched, because it is yours.',
    },
  },
  {
    q: { plain: 'What does it cost?', tech: 'What does it cost?' },
    a: {
      plain:
        'Not decided yet, and we would rather say so than invent a number. It will be one monthly price per label with a limit on how many people can log in — and every feature included, with nothing held back for a dearer plan. Waitlist members hear first.',
      tech: 'Not decided yet, and we would rather say so than invent a number. The shape is a flat monthly price per label with a seat cap, and every module available on every plan. Waitlist members hear first.',
    },
  },
  {
    q: { plain: 'Is there a phone app?', tech: 'Is there a mobile app?' },
    a: {
      plain:
        'Not yet. It works in a phone browser, but it is really built for sitting at a desk. A proper phone version is on the list.',
      tech: 'Not yet. It works in a mobile browser but is built desktop-first. An installable PWA is on the roadmap.',
    },
  },
  {
    q: { plain: 'Who is behind it?', tech: 'Who is behind it?' },
    a: {
      plain:
        'Quest4Goa Records, an independent electronic label, together with the team that builds their software. We are our own first customer.',
      tech: 'Quest4Goa Records, an independent electronic label, together with the team that builds their software. We are our own first customer.',
    },
  },
]
