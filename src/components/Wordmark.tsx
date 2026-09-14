/** Labelnest, set as type. One word, capital L, lowercase n — always. */
export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.38em] ${className}`}>
      <span
        aria-hidden="true"
        className="relative inline-grid h-[0.92em] w-[0.92em] shrink-0 place-items-center rounded-full border border-accent/60 bg-accent/10"
      >
        <span className="block h-[0.26em] w-[0.26em] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
      </span>
      <span className="font-bold tracking-[-0.035em]">Labelnest</span>
    </span>
  )
}
