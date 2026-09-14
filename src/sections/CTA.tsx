import WaitlistForm from '../components/WaitlistForm'

export default function CTA() {
  return (
    <section id="access" className="aura relative isolate band overflow-hidden">
      <div className="shell">
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className="t-h2">Early access, one label at a time.</h2>
          <p className="t-lead mx-auto mt-5 max-w-[48ch]">
            We&rsquo;re onboarding a handful of labels before public launch, and
            setting each one up personally. Tell us where to reach you and roughly
            what you release.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-[34rem] flex-col items-stretch">
          <WaitlistForm source="footer-cta" withLabelField />
        </div>

        <p className="muted mx-auto mt-5 max-w-[40ch] text-center text-sm">
          One email when there&rsquo;s a workspace ready. Nothing else, ever.
        </p>
      </div>
    </section>
  )
}
