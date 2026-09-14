/**
 * The centre label of a record, set in type.
 *
 * This is the one piece of the page allowed to be loud. Everything a label
 * puts on the paper disc — catalogue number, title, BPM, key, and the small
 * print around the rim — is a field the product stores, so the ornament is
 * also the argument.
 */
export default function CentreLabel() {
  const rim =
    'ALL RIGHTS OF THE PRODUCER AND OWNER OF THE RECORDED WORK RESERVED · UNAUTHORISED COPYING, HIRING, LENDING, PUBLIC PERFORMANCE AND BROADCASTING PROHIBITED · '

  return (
    <div className="relative aspect-square w-full max-w-[31rem]">
      {/* Violet bloom behind the record. */}
      <div
        aria-hidden="true"
        className="absolute inset-[-16%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgb(109 92 246 / 0.45) 0%, rgb(109 92 246 / 0.10) 45%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full drop-shadow-2xl"
        role="img"
        aria-label="A record centre label for Labelnest, catalogue number LN-001."
      >
        <defs>
          <path
            id="rim-path"
            d="M200,200 m-152,0 a152,152 0 1,1 304,0 a152,152 0 1,1 -304,0"
            fill="none"
          />
          <radialGradient id="sheen" cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#3a3f52" />
            <stop offset="38%" stopColor="#1a1d29" />
            <stop offset="100%" stopColor="#0a0b12" />
          </radialGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f4f8" />
            <stop offset="100%" stopColor="#d9dae4" />
          </linearGradient>
        </defs>

        {/* Vinyl and grooves */}
        <circle cx="200" cy="200" r="198" fill="url(#sheen)" />
        <circle cx="200" cy="200" r="198" fill="none" stroke="#ffffff1f" strokeWidth="1" />
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={194 - i * 4.5}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity={0.05}
          />
        ))}

        {/* Paper label */}
        <circle cx="200" cy="200" r="88" fill="url(#paper)" />
        <circle cx="200" cy="200" r="88" fill="none" stroke="#6d5cf6" strokeWidth="5" />
      </svg>

      {/* Rim small print, revolving with the record. */}
      <svg viewBox="0 0 400 400" className="revolve absolute inset-0 h-full w-full" aria-hidden="true">
        <text
          fill="#ffffff"
          opacity="0.32"
          style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.4px', letterSpacing: '0.1em' }}
        >
          <textPath href="#rim-path" startOffset="0">
            {rim + rim}
          </textPath>
        </text>
      </svg>

      {/* The label copy. Static, so it stays readable. */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid aspect-square w-[44%] place-items-center text-center">
          <div>
            <p className="t-code leading-none text-accent-deep">LN&#8209;001</p>
            <p
              className="mt-1.5 text-[clamp(0.95rem,2.4vw,1.35rem)] leading-none font-bold tracking-[-0.03em] text-[#0b0d16]"
              style={{ fontVariationSettings: "'wdth' 112" }}
            >
              Labelnest
            </p>
            <p className="t-code mt-1.5 leading-tight text-[#5b6075]">128 BPM &nbsp;A&nbsp;min</p>
            <span className="mx-auto mt-2 block h-[9px] w-[9px] rounded-full bg-flag" />
          </div>
        </div>
      </div>
    </div>
  )
}
